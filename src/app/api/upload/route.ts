import { NextRequest, NextResponse } from 'next/server'
import { uploadMultipleFiles, deleteMultipleFiles } from '@/lib/utils/upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const folder = formData.get('folder') as string

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    if (!folder) {
      return NextResponse.json(
        { error: 'Folder path is required' },
        { status: 400 }
      )
    }

    const results = await uploadMultipleFiles(files, folder)

    return NextResponse.json({
      success: true,
      data: results,
      message: `Successfully uploaded ${results.length} files`
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicIds } = await request.json()

    if (!publicIds || !Array.isArray(publicIds)) {
      return NextResponse.json(
        { error: 'Public IDs array is required' },
        { status: 400 }
      )
    }

    await deleteMultipleFiles(publicIds)

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${publicIds.length} files`
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete files', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
