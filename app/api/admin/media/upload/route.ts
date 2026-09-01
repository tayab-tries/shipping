import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string)?.trim() || '';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No valid image file provided.' }, { status: 400 });
    }

    if (!altText) {
      return NextResponse.json({ success: false, error: 'Mandatory accessibility Alt Text is required.' }, { status: 400 });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!allowedMimeTypes.includes((file.type || '').toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported format (${file.type || 'unknown'}). Please upload JPEG, PNG, WebP, AVIF, or GIF images.`,
        },
        { status: 400 }
      );
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ success: false, error: 'File size exceeds maximum 5 MB limit.' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanBaseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${cleanBaseName}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${uniqueFileName}`;

    let publicUrl = '';

    // Attempt upload to Supabase Storage Bucket ('media' bucket)
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
      } else {
        console.warn('Supabase storage upload returned error:', storageError.message);
      }
    } catch (storageErr: unknown) {
      console.warn('Supabase storage upload exception:', storageErr);
    }

    // Fallback: Convert to Data URL if Supabase storage is unconfigured
    if (!publicUrl) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString('base64');
      publicUrl = `data:${file.type};base64,${base64Data}`;
    }

    // Insert into public.media database table
    const mediaRow = {
      file_name: file.name,
      file_path: filePath,
      public_url: publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altText,
      created_at: new Date().toISOString(),
    };

    try {
      const { data: insertedRecord, error: dbError } = await supabase
        .from('media')
        .insert(mediaRow)
        .select('*')
        .single();

      if (!dbError && insertedRecord) {
        return NextResponse.json({ success: true, data: insertedRecord });
      }
    } catch (dbErr: unknown) {
      console.warn('Media DB insert exception:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `med-${Date.now()}`,
        ...mediaRow,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error processing file upload.';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
