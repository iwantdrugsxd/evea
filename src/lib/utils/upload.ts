import { CloudinaryService, CloudinaryUploadResult } from '@/lib/cloudinary'

export interface UploadResult {
  url: string
  publicId: string
  secureUrl: string
  width: number
  height: number
  format: string
  resourceType: string
}

export async function uploadFile(file: File, folder: string): Promise<UploadResult> {
  try {
    console.log('Uploading file to Cloudinary:', file.name, 'to folder:', folder)
    
    const result = await CloudinaryService.uploadFile(file, {
      folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      max_file_size: 10 * 1024 * 1024 // 10MB
    })
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload file')
  }
}

export async function uploadMultipleFiles(files: File[], folder: string): Promise<UploadResult[]> {
  try {
    console.log('Uploading multiple files to Cloudinary:', files.length, 'files to folder:', folder)
    
    const results = await CloudinaryService.uploadMultipleFiles(files, {
      folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      max_file_size: 10 * 1024 * 1024 // 10MB
    })
    
    return results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type
    }))
  } catch (error) {
    console.error('Multiple upload error:', error)
    throw new Error('Failed to upload files')
  }
}

export async function deleteFile(publicId: string): Promise<void> {
  try {
    await CloudinaryService.deleteFile(publicId)
  } catch (error) {
    console.error('Delete error:', error)
  }
}

export async function deleteMultipleFiles(publicIds: string[]): Promise<void> {
  try {
    await CloudinaryService.deleteMultipleFiles(publicIds)
  } catch (error) {
    console.error('Multiple delete error:', error)
  }
}

export function getOptimizedUrl(publicId: string, options: any = {}): string {
  return CloudinaryService.getOptimizedUrl(publicId, options)
}

export function getThumbnailUrl(publicId: string, width: number = 300, height: number = 200): string {
  return CloudinaryService.getThumbnailUrl(publicId, width, height)
}