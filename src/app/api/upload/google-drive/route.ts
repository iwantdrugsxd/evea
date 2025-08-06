import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { supabase } from '@/lib/database/supabase'
import { z } from 'zod'

const UploadSchema = z.object({
  vendorId: z.string().uuid(),
  documentType: z.enum(['business_license', 'gst_certificate', 'identity_proof', 'address_proof', 'bank_statement', 'aadhar_card']),
  fileName: z.string(),
  mimeType: z.string(),
  fileData: z.string() // Base64 encoded file data
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = UploadSchema.parse(body)

    // Authenticate with Google Drive
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    const drive = google.drive({ version: 'v3', auth })

    // Get vendor info for folder name
    const { data: vendorData } = await supabase
      .from('vendors')
      .select('business_name, user_id')
      .eq('id', validatedData.vendorId)
      .single()

    if (!vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Create or find vendor folder
    const folderName = `${validatedData.vendorId}-${vendorData.business_name}`
    let folderId = await findOrCreateFolder(drive, folderName)

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(validatedData.fileData, 'base64')

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `${validatedData.documentType}_${timestamp}_${validatedData.fileName}`

    // Upload file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    }

    const media = {
      mimeType: validatedData.mimeType,
      body: fileBuffer,
    }

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
    })

    // Generate view link
    const viewLink = `https://drive.google.com/file/d/${file.data.id}/view`
    const downloadLink = `https://drive.google.com/uc?id=${file.data.id}`

    // Save to database
    const { error: dbError } = await supabase
      .from('vendor_documents')
      .insert({
        vendor_id: validatedData.vendorId,
        document_type: validatedData.documentType,
        google_drive_file_id: file.data.id,
        google_drive_folder_id: folderId,
        file_name: fileName,
        file_size: fileBuffer.length,
        mime_type: validatedData.mimeType,
        drive_view_link: viewLink,
        drive_download_link: downloadLink
      })

    if (dbError) throw dbError

    return NextResponse.json({
      success: true,
      fileId: file.data.id,
      viewLink: viewLink,
      message: 'Document uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Document upload failed' },
      { status: 500 }
    )
  }
}

async function findOrCreateFolder(drive: any, folderName: string): Promise<string> {
  const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID

  // Search for existing folder
  const searchResponse = await drive.files.list({
    q: `name='${folderName}' and parents in '${parentFolderId}' and mimeType='application/vnd.google-apps.folder'`,
    fields: 'files(id, name)',
  })

  if (searchResponse.data.files.length > 0) {
    return searchResponse.data.files[0].id
  }

  // Create new folder
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentFolderId],
  }

  const folder = await drive.files.create({
    requestBody: folderMetadata,
  })

  return folder.data.id
}