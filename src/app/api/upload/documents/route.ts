import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { google } from 'googleapis'
import { Readable } from 'stream'
import { z } from 'zod'

const DocumentUploadSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  documents: z.array(z.object({
    type: z.enum(['business_license', 'tax_certificate', 'insurance_policy', 'aadhar_card', 'pan_card', 'gst_certificate']),
    fileName: z.string().min(1, 'File name is required'),
    fileData: z.string().min(1, 'File data is required'), // Base64 encoded file
    mimeType: z.string().min(1, 'MIME type is required')
  })).min(1, 'At least one document is required')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Document Upload Start ---')
    
    const body = await request.json()
    console.log('Request body received')
    
    const validatedData = DocumentUploadSchema.parse(body)
    console.log('Data validated successfully')

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
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found. Current step:', vendorData.registration_step)

    // Allow if registration step is 3 or higher (document upload step)
    if (vendorData.registration_step < 3) {
      console.error('Invalid registration step. Expected: >= 3, Got:', vendorData.registration_step)
      return NextResponse.json(
        { error: 'Complete business details first' },
        { status: 400 }
      )
    }

    // If already completed step 4, return success
    if (vendorData.registration_step >= 4) {
      console.log('Documents already uploaded. Current step:', vendorData.registration_step)
      return NextResponse.json({
        success: true,
        message: 'Documents already uploaded',
        registrationStep: vendorData.registration_step
      })
    }

    // Initialize Google Drive API with OAuth client credentials
    console.log('Initializing Google Drive API...')
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    // Set credentials
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    const drive = google.drive({ version: 'v3', auth: oauth2Client })

    // Test authentication
    console.log('Testing Google Drive authentication...')
    try {
      await drive.about.get({ fields: 'user' })
      console.log('✅ Google Drive authentication successful')
    } catch (authError) {
      console.error('❌ Google Drive authentication failed:', authError)
      return NextResponse.json(
        { error: 'Google Drive authentication failed. Please check your OAuth credentials.' },
        { status: 500 }
      )
    }

    // Find or create vendor documents folder
    console.log('Finding or creating vendor documents folder...')
    let folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

    if (!folderId) {
      // Create a new folder for vendor documents
      const folderMetadata = {
        name: 'EVEA Vendor Documents',
        mimeType: 'application/vnd.google-apps.folder'
      }

      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id'
      })

      folderId = folder.data.id!
      console.log('Created new folder:', folderId)
    }

    // Upload each document to Google Drive
    console.log('Uploading documents to Google Drive...')
    const uploadedDocuments = []

    for (const doc of validatedData.documents) {
      try {
        console.log(`Uploading ${doc.fileName}...`)

        // Convert base64 to buffer
        const fileBuffer = Buffer.from(doc.fileData, 'base64')
        console.log('File buffer created, size:', fileBuffer.length, 'bytes')

        // Create readable stream
        const readableStream = new Readable()
        readableStream.push(fileBuffer)
        readableStream.push(null)

        // Generate unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const fileName = `${doc.type}_${timestamp}_${doc.fileName}`
        console.log('Uploading file:', fileName)

        // Upload file to Google Drive
        const fileMetadata = {
          name: fileName,
          parents: folderId ? [folderId] : undefined
        }

        const media = {
          mimeType: doc.mimeType,
          body: readableStream
        }

        const file = await drive.files.create({
          requestBody: fileMetadata,
          media: media
        })

        console.log('File uploaded successfully, ID:', file.data.id)

        // Generate links
        const viewLink = `https://drive.google.com/file/d/${file.data.id}/view`
        const downloadLink = `https://drive.google.com/uc?id=${file.data.id}`

        uploadedDocuments.push({
          vendor_id: validatedData.vendorId,
          document_type: doc.type,
          file_name: fileName,
          file_url: viewLink,
          file_size: fileBuffer.length,
          upload_date: new Date().toISOString(),
          status: 'pending'
        })

        console.log(`✅ ${doc.fileName} uploaded successfully`)

      } catch (uploadError) {
        console.error(`❌ Failed to upload ${doc.fileName}:`, uploadError)
        return NextResponse.json(
          { error: `Failed to upload ${doc.fileName}` },
          { status: 500 }
        )
      }
    }

    // Save documents to database
    console.log('Saving documents to database...')
    const { error: documentsError } = await supabaseAdmin
      .from('vendor_documents')
      .insert(uploadedDocuments)

    if (documentsError) {
      console.error('Failed to save documents to database:', documentsError)
      return NextResponse.json(
        { error: 'Failed to save documents to database' },
        { status: 500 }
      )
    }

    console.log('Documents saved to database successfully')

    // Update vendor registration step to completed
    console.log('Updating vendor registration step...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        registration_step: 4, // Registration completed
        verification_status: 'pending_review' // Ready for admin review
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to complete registration' },
        { status: 500 }
      )
    }

    console.log('Vendor registration completed')

    console.log('--- Document Upload Success ---')
    return NextResponse.json({
      success: true,
      message: 'Documents uploaded successfully to Google Drive. Your application is now pending admin review.',
      registrationStep: 4,
      uploadedCount: uploadedDocuments.length
    })

  } catch (error) {
    console.error('Document upload error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to upload documents' },
      { status: 500 }
    )
  }
}