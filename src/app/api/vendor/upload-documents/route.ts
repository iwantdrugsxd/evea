import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { google } from 'googleapis'

const UploadDocumentsSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  documents: z.array(z.any()).min(1, 'At least one document is required'),
  documentTypes: z.array(z.string()).min(1, 'Document types are required')
})

// Defer Google Drive API initialization until request time so we can validate env

export async function POST(request: NextRequest) {
  try {
    console.log('--- Document Upload Start ---')
    const formData = await request.formData()
    const vendorId = formData.get('vendorId') as string
    const documents = formData.getAll('documents') as File[]
    const documentTypes = formData.getAll('documentTypes') as string[]
    // OAuth token can be sent in form field or Authorization header
    const providedAccessToken = (formData.get('googleAccessToken') as string) || ''
    const authHeader = request.headers.get('authorization') || ''
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    const googleAccessToken = providedAccessToken || bearerToken
    
    console.log('Vendor ID:', vendorId)
    console.log('Documents count:', documents.length)
    console.log('Document types:', documentTypes)

    // Validate input
    if (!vendorId || documents.length === 0 || documentTypes.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!googleAccessToken) {
      return NextResponse.json(
        { error: 'Missing Google access token. Connect Google Drive and try again.' },
        { status: 400 }
      )
    }

    // Build OAuth2 client using provided access token (user consent flow)
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    oauth2Client.setCredentials({ access_token: googleAccessToken })
    const drive = google.drive({ version: 'v3', auth: oauth2Client })

    // Check if vendor exists and get current registration step
    console.log('Checking vendor status...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        registration_step,
        verification_status
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found. Current step:', vendorData.registration_step)

    // Allow if registration step is 2 or higher (after email verification)
    if (vendorData.registration_step < 2) {
      console.error('Invalid registration step. Expected: >= 2, Got:', vendorData.registration_step)
      return NextResponse.json(
        { error: 'Complete email verification first' },
        { status: 400 }
      )
    }

    // If already completed step 3, return success
    if (vendorData.registration_step >= 3) {
      console.log('Documents already uploaded. Current step:', vendorData.registration_step)
      return NextResponse.json({
        success: true,
        message: 'Documents already uploaded',
        registrationStep: vendorData.registration_step
      })
    }

    // Create vendor folder in Google Drive if it doesn't exist
    console.log('Creating vendor folder in Google Drive...')
    const folderName = `Vendor_${vendorId}_${vendorData.user_id}`
    
    let folderId: string
    try {
      const folderResponse = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
      })
      folderId = folderResponse.data.id!
      console.log('Vendor folder created:', folderId)
    } catch (folderError) {
      console.error('Failed to create folder:', folderError)
      return NextResponse.json(
        { error: 'Failed to create document storage' },
        { status: 500 }
      )
    }

    // Upload documents to Google Drive
    console.log('Uploading documents to Google Drive...')
    const uploadedDocuments = []

    for (let i = 0; i < documents.length; i++) {
      const file = documents[i]
      const documentType = documentTypes[i]
      
      try {
        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer())
        
        // Upload to Google Drive
        const fileResponse = await drive.files.create({
          requestBody: {
            name: `${documentType}_${Date.now()}.${file.name.split('.').pop()}`,
            parents: [folderId],
          },
          media: {
            mimeType: file.type,
            body: buffer,
          },
          fields: 'id,webViewLink,webContentLink',
        })

        const fileId = fileResponse.data.id!
        const viewLink = fileResponse.data.webViewLink!
        const downloadLink = fileResponse.data.webContentLink!

        console.log(`Document ${documentType} uploaded:`, fileId)

        // Store document metadata in database
        const { error: docError } = await supabaseAdmin
          .from('vendor_documents')
          .insert({
            vendor_id: vendorId,
            document_type: documentType,
            google_drive_file_id: fileId,
            google_drive_folder_id: folderId,
            file_name: file.name,
            file_size: file.size,
            mime_type: file.type,
            drive_view_link: viewLink,
            drive_download_link: downloadLink,
            verification_status: 'pending'
          })

        if (docError) {
          console.error('Failed to store document metadata:', docError)
          // Continue with other documents even if one fails
        } else {
          uploadedDocuments.push({
            type: documentType,
            fileId,
            fileName: file.name
          })
        }
      } catch (uploadError) {
        console.error(`Failed to upload document ${documentType}:`, uploadError)
        // Continue with other documents
      }
    }

    if (uploadedDocuments.length === 0) {
      return NextResponse.json(
        { error: 'Failed to upload any documents' },
        { status: 500 }
      )
    }

    // Update vendor registration step
    console.log('Updating vendor registration step...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        registration_step: 3, // Move to services setup step
        verification_documents: uploadedDocuments.map(doc => doc.type)
      })
      .eq('id', vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to update registration progress' },
        { status: 500 }
      )
    }

    console.log('Vendor registration step updated to 3')

    console.log('--- Document Upload Success ---')
    return NextResponse.json({
      success: true,
      message: 'Documents uploaded successfully. Please proceed to set up your services.',
      registrationStep: 3,
      uploadedDocuments: uploadedDocuments.length
    })

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload documents' },
      { status: 500 }
    )
  }
}
