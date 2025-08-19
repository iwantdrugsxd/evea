import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
})

// Debug: Log configuration (remove in production)
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-3) : 'your_api_secret',
})

export interface CloudinaryUploadResult {
  url: string
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  resource_type: string
}

export interface CloudinaryUploadOptions {
  folder?: string
  transformation?: any
  resource_type?: 'image' | 'video' | 'raw'
  allowed_formats?: string[]
  max_file_size?: number
}

export class CloudinaryService {
  /**
   * Upload a file to Cloudinary
   */
  static async uploadFile(
    file: File | Buffer,
    options: CloudinaryUploadOptions = {}
  ): Promise<CloudinaryUploadResult> {
    try {
      // Check if Cloudinary is configured
      if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
        throw new Error('Cloudinary configuration is incomplete. Please check your environment variables.')
      }

      const {
        folder = 'evea',
        transformation = {},
        resource_type = 'image',
        allowed_formats = ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        max_file_size = 10 * 1024 * 1024 // 10MB
      } = options

      // Convert File to Buffer if needed
      let fileBuffer: Buffer
      let fileName: string

      if (file instanceof File) {
        // Check file size
        if (file.size > max_file_size) {
          throw new Error(`File size exceeds maximum allowed size of ${max_file_size / (1024 * 1024)}MB`)
        }

        // Check file format
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        if (!allowed_formats.includes(fileExtension || '')) {
          throw new Error(`File format not allowed. Allowed formats: ${allowed_formats.join(', ')}`)
        }

        fileBuffer = Buffer.from(await file.arrayBuffer())
        fileName = file.name
      } else {
        fileBuffer = file
        fileName = 'upload'
      }

      // Convert buffer to base64
      const base64File = `data:image/${fileName.split('.').pop()};base64,${fileBuffer.toString('base64')}`

      console.log('Uploading to Cloudinary with config:', {
        folder,
        resource_type,
        fileSize: fileBuffer.length,
        fileName
      })

      // Upload to Cloudinary
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader.upload(
          base64File,
          {
            folder,
            resource_type,
            transformation: {
              quality: 'auto',
              fetch_format: 'auto',
              ...transformation
            },
            unique_filename: true,
            overwrite: false,
            invalidate: true
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error details:', error)
              reject(error)
            } else {
              console.log('Cloudinary upload successful:', result?.secure_url)
              resolve(result as CloudinaryUploadResult)
            }
          }
        )
      })

      console.log('Cloudinary upload successful:', result.secure_url)
      return result
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw error
    }
  }

  /**
   * Upload multiple files to Cloudinary
   */
  static async uploadMultipleFiles(
    files: (File | Buffer)[],
    options: CloudinaryUploadOptions = {}
  ): Promise<CloudinaryUploadResult[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, options))
    return Promise.all(uploadPromises)
  }

  /**
   * Delete a file from Cloudinary
   */
  static async deleteFile(publicId: string): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      })
      console.log('Cloudinary delete successful:', publicId)
    } catch (error) {
      console.error('Cloudinary delete error:', error)
      throw error
    }
  }

  /**
   * Delete multiple files from Cloudinary
   */
  static async deleteMultipleFiles(publicIds: string[]): Promise<void> {
    const deletePromises = publicIds.map(publicId => this.deleteFile(publicId))
    await Promise.all(deletePromises)
  }

  /**
   * Generate optimized image URL with transformations
   */
  static getOptimizedUrl(publicId: string, options: any = {}): string {
    const {
      width = 800,
      height = 600,
      quality = 'auto',
      format = 'auto',
      crop = 'fill'
    } = options

    return cloudinary.url(publicId, {
      width,
      height,
      quality,
      format,
      crop,
      fetch_format: 'auto'
    })
  }

  /**
   * Generate thumbnail URL
   */
  static getThumbnailUrl(publicId: string, width: number = 300, height: number = 200): string {
    return this.getOptimizedUrl(publicId, { width, height, crop: 'fill' })
  }
}

export default cloudinary
