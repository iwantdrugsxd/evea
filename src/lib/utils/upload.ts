export async function uploadFile(file: File, folder: string): Promise<string> {
    // This is a mock implementation
    // In production, you would upload to your storage service (Supabase Storage, AWS S3, etc.)
    
    const fileName = `${folder}/${Date.now()}-${file.name}`
    
    // Mock upload - return a placeholder URL
    return `/uploads/${fileName}`
  }