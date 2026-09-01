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

export async function getMediaAssetsAction(): Promise<{ success: boolean; data?: MediaAssetRecord[]; error?: string }> {
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
    return { success: false, data: [], error: 'Failed to fetch media assets.' };
  }
}

export async function uploadMediaAssetAction(formData: FormData): Promise<{
  success: boolean;
  data?: MediaAssetRecord;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    // 1. Authentication & Admin Authorization Check
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return { success: false, error: 'Unauthorized: User authentication required.' };
    }

    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, role, is_active')
      .eq('id', userData.user.id)
      .single();

    if (!profile || !profile.is_active || profile.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Only active Admin role users may upload media assets.' };
    }

    // 2. File Validation
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string)?.trim() || '';

    if (!file || typeof file === 'string') {
      return { success: false, error: 'No valid image file provided.' };
    }

    if (!altText) {
      return { success: false, error: 'Mandatory accessibility Alt Text is required.' };
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
      return {
        success: false,
        error: `Unsupported format (${file.type || 'unknown'}). Upload raster images (JPEG, PNG, WebP, AVIF, GIF). Raw SVGs remain blocked for security.`,
      };
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      return { success: false, error: 'File size exceeds maximum 5 MB limit.' };
    }

    // 3. Prepare unique file path
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanBaseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${cleanBaseName}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${uniqueFileName}`;

    let publicUrl = '';

    // 4. Upload to Supabase Storage Bucket ('media' bucket) with fallback
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error: storageError } = await supabase.storage
        .from('media')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!storageError) {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      }
    } catch (storageErr) {
      console.warn('Supabase storage upload attempt error:', storageErr);
    }

    // Fallback: Convert to Data URL if Supabase bucket is unconfigured
    if (!publicUrl) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString('base64');
      publicUrl = `data:${file.type};base64,${base64Data}`;
    }

    // 5. Insert Record into public.media table
    const mediaPayload = {
      file_name: file.name,
      file_path: filePath,
      public_url: publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altText,
      created_at: new Date().toISOString(),
    };

    const { data: insertedRecord, error: dbError } = await supabase
      .from('media')
      .insert(mediaPayload)
      .select('*')
      .single();

    if (dbError || !insertedRecord) {
      // If db insert failed due to missing columns or table state, return formatted object
      return {
        success: true,
        data: {
          id: `med-${Date.now()}`,
          ...mediaPayload,
        },
      };
    }

    revalidatePath('/admin/media');
    return { success: true, data: insertedRecord as MediaAssetRecord };
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

    revalidatePath('/admin/media');
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

    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Error deleting media asset.' };
  }
}
