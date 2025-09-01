import { supabase } from '@/lib/supabase'

export interface UploadResult {
  path: string
  fullPath: string
  publicUrl: string
}

export const storageService = {
  // Upload file to user documents bucket
  uploadUserDocument: async (
    file: File, 
    userId: string, 
    fileName: string
  ): Promise<UploadResult> => {
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/${fileName}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('user-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading file:', error)
      throw new Error('Failed to upload file')
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('user-documents')
      .getPublicUrl(filePath)

    return {
      path: data.path,
      fullPath: data.fullPath,
      publicUrl: urlData.publicUrl
    }
  },

  // Upload assessment file (public bucket)
  uploadAssessmentFile: async (
    file: File, 
    assessmentId: string, 
    fileName: string
  ): Promise<UploadResult> => {
    const fileExt = file.name.split('.').pop()
    const filePath = `${assessmentId}/${fileName}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('assessment-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading assessment file:', error)
      throw new Error('Failed to upload assessment file')
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('assessment-files')
      .getPublicUrl(filePath)

    return {
      path: data.path,
      fullPath: data.fullPath,
      publicUrl: urlData.publicUrl
    }
  },

  // Delete file from storage
  deleteFile: async (bucket: string, filePath: string): Promise<void> => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Error deleting file:', error)
      throw new Error('Failed to delete file')
    }
  },

  // Get file URL
  getFileUrl: (bucket: string, filePath: string): string => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // List user files
  listUserFiles: async (userId: string): Promise<any[]> => {
    const { data, error } = await supabase.storage
      .from('user-documents')
      .list(userId)

    if (error) {
      console.error('Error listing user files:', error)
      return []
    }

    return data || []
  }
}
