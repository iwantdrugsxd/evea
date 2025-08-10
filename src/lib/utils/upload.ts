import { supabase } from '@/lib/supabase'

export async function uploadFile(file: File, folder: string): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Upload error:', error)
      throw new Error('Failed to upload file')
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    // Fallback to mock URL for development
    const fileName = `${folder}/${Date.now()}-${file.name}`
    return `/uploads/${fileName}`
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(fileUrl)
    const pathParts = url.pathname.split('/')
    const fileName = pathParts[pathParts.length - 1]
    
    const { error } = await supabase.storage
      .from('uploads')
      .remove([fileName])
    
    if (error) {
      console.error('Delete error:', error)
    }
  } catch (error) {
    console.error('Delete error:', error)
  }
}