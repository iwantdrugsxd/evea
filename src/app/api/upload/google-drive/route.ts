import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { Readable } from 'stream'

const UploadSchema = z.object({
  vendorId: z.string().uuid(),
  documentType: z.enum(['business_license', 'gst_certificate', 'identity_proof', 'address_proof', 'bank_statement', 'aadhar_card']),
  fileName: z.string(),
  mimeType: z.string(),
  fileData: z.string() // Base64 encoded file data
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Google Drive Upload Start ---')
    
    // Check environment variables
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth environment variables')
      return NextResponse.json(
        { error: 'Google Drive configuration is incomplete' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('Request body received')
    const validatedData = UploadSchema.parse(body)
    console.log('Data validated successfully')

    // Authenticate with Google Drive using OAuth client credentials
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    // Set credentials with refresh token
    auth.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    console.log('Google OAuth configured')

    // Test authentication
    try {
      const drive = google.drive({ version: 'v3', auth })
      
      // Test the authentication by making a simple API call
      console.log('Testing Google Drive authentication...')
      const testResponse = await drive.about.get({
        fields: 'user'
      })
      console.log('Authentication successful, user:', testResponse.data.user?.emailAddress)
      
    } catch (authError) {
      console.error('Google Drive authentication failed:', authError)
      return NextResponse.json(
        { 
          error: 'Google Drive authentication failed', 
          details: 'Please check your OAuth credentials and tokens. You may need to refresh your access token.',
          hint: 'Run the Google OAuth flow to get fresh tokens'
        },
        { status: 401 }
      )
    }

    const drive = google.drive({ version: 'v3', auth })

    // Get vendor info for folder name
    console.log('Fetching vendor data for ID:', validatedData.vendorId)
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('business_name, user_id')
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.business_name)

    // Create or find vendor folder in your private Google Drive
    const folderName = `${validatedData.vendorId}-${vendorData.business_name}`
    console.log('Creating/finding folder:', folderName)
    let folderId = await findOrCreateFolder(drive, folderName)
    console.log('Folder ID:', folderId)

    // Convert base64 to buffer and create readable stream
    const fileBuffer = Buffer.from(validatedData.fileData, 'base64')
    console.log('File buffer created, size:', fileBuffer.length, 'bytes')
    
    const readableStream = new Readable()
    readableStream.push(fileBuffer)
    readableStream.push(null) // End the stream

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `${validatedData.documentType}_${timestamp}_${validatedData.fileName}`
    console.log('Uploading file:', fileName)

    // Upload file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    }

    const media = {
      mimeType: validatedData.mimeType,
      body: readableStream,
    }

    console.log('Starting Google Drive upload...')
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
    })

    console.log('File uploaded successfully, ID:', file.data.id)

    // Generate view link
    const viewLink = `https://drive.google.com/file/d/${file.data.id}/view`
    const downloadLink = `https://drive.google.com/uc?id=${file.data.id}`

    // Save to database
    console.log('Saving to database...')
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

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    console.log('--- Google Drive Upload Success ---')
    return NextResponse.json({
      success: true,
      fileId: file.data.id,
      viewLink: viewLink,
      downloadLink: downloadLink,
      message: 'Document uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Document upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function findOrCreateFolder(drive: any, folderName: string): Promise<string> {
  const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || 'root'
  console.log('Looking for folder in parent:', parentFolderId)

  try {
    // Search for existing folder
    const searchResponse = await drive.files.list({
      q: `name='${folderName.replace(/'/g, "\\'")}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    })

    if (searchResponse.data.files && searchResponse.data.files.length > 0) {
      console.log('Found existing folder:', searchResponse.data.files[0].id)
      return searchResponse.data.files[0].id
    }

    console.log('Creating new folder:', folderName)
    // Create new folder
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    }

    const folder = await drive.files.create({
      requestBody: folderMetadata,
    })

    console.log('Created new folder:', folder.data.id)
    return folder.data.id
  } catch (error) {
    console.error('Google Drive folder error:', error)
    throw new Error(`Failed to create or find folder: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}