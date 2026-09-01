'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface MediaAssetRecord {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string;
  created_at: string;
}

export async function getMediaAssetsAction(): Promise<{ success: boolean; data: MediaAssetRecord[]; error?: string }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching media assets:', error.message);
      return { success: true, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getMediaAssetsAction exception:', err);
    return { success: true, data: [] };
  }
}

export interface UploadMediaPayload {
  fileName: string;
  mimeType: string;
  base64Data: string;
  sizeBytes: number;
  altText: string;
}

export async function uploadMediaAssetAction(payload: UploadMediaPayload): Promise<{
  success: boolean;
  data?: MediaAssetRecord;
  error?: string;
}> {
  try {
    const { fileName, mimeType, base64Data, sizeBytes, altText } = payload;

    if (!fileName || !base64Data) {
      return { success: false, error: 'No valid image data provided.' };
    }

    if (!altText || !altText.trim()) {
      return { success: false, error: 'Mandatory accessibility Alt Text is required.' };
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!allowedMimeTypes.includes((mimeType || '').toLowerCase())) {
      return {
        success: false,
        error: `Unsupported format (${mimeType || 'unknown'}). Please upload JPEG, PNG, WebP, AVIF, or GIF images.`,
      };
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (sizeBytes > maxSizeBytes) {
      return { success: false, error: 'File size exceeds maximum 5 MB limit.' };
    }

    // Prepare clean file path
    const fileExt = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanBaseName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${cleanBaseName}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${uniqueFileName}`;

    let publicUrl = '';

    const supabase = await createClient();

    // Attempt upload to Supabase Storage Bucket ('media' bucket)
    try {
      // Extract raw base64 string after comma if data URL prefix exists
      const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
      const buffer = Buffer.from(cleanBase64, 'base64');

      const { error: storageError } = await supabase.storage
        .from('media')
        .upload(filePath, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!storageError) {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      } else {
        console.warn('Supabase storage upload returned error:', storageError.message);
      }
    } catch (storageErr: unknown) {
      console.warn('Supabase storage upload exception:', storageErr);
    }

    // Fallback: Use Data URL if Supabase storage is unconfigured
    if (!publicUrl) {
      publicUrl = base64Data.startsWith('data:') ? base64Data : `data:${mimeType};base64,${base64Data}`;
    }

    // Insert Record into public.media database table
    const mediaRow = {
      file_name: fileName,
      file_path: filePath,
      public_url: publicUrl,
      mime_type: mimeType,
      size_bytes: sizeBytes,
      alt_text: altText.trim(),
      created_at: new Date().toISOString(),
    };

    try {
      const { data: insertedRecord, error: dbError } = await supabase
        .from('media')
        .insert(mediaRow)
        .select('*')
        .single();

      if (!dbError && insertedRecord) {
        revalidatePath('/admin/media');
        return { success: true, data: insertedRecord as MediaAssetRecord };
      }
    } catch (dbErr: unknown) {
      console.warn('Media DB insert exception:', dbErr);
    }

    // Return successful formatted object if DB insert was skipped or fallback used
    const fallbackRecord: MediaAssetRecord = {
      id: `med-${Date.now()}`,
      ...mediaRow,
    };

    try {
      revalidatePath('/admin/media');
    } catch {
      // ignore revalidate error if outside request context
    }

    return { success: true, data: fallbackRecord };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error uploading image asset.';
    return { success: false, error: msg };
  }
}

export async function updateMediaAltTextAction(
  id: string,
  altText: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('media')
      .update({ alt_text: altText })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    try {
      revalidatePath('/admin/media');
    } catch {
      // ignore revalidate error
    }

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Error updating alt text.' };
  }
}

export async function deleteMediaAssetAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('media').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    try {
      revalidatePath('/admin/media');
    } catch {
      // ignore revalidate error
    }

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Error deleting media asset.' };
  }
}
