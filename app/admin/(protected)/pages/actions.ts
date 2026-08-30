'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface CmsPageItemInput {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content_markdown: string;
  is_published?: boolean;
}

export async function getCmsPagesListAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('cms_pages')
      .select('*')
      .order('title', { ascending: true });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getCmsPagesListAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishCmsPageAction(
  input: CmsPageItemInput
): Promise<PublishResult> {
  try {
    const supabase = await createClient();

    // 1. Verify authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return { success: false, error: 'Unauthorized: User authentication required.' };
    }

    // 2. Fetch active admin profile
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, role, is_active')
      .eq('id', userData.user.id)
      .single();

    if (!profile || !profile.is_active || profile.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish CMS pages.' };
    }

    // 3. Upsert into cms_pages table
    const payload = {
      title: input.title,
      slug: input.slug,
      meta_title: input.meta_title || `${input.title} | Cargo Shipping`,
      meta_description: input.meta_description || input.title,
      content_markdown: input.content_markdown || '',
      is_published: input.is_published ?? true,
      published_at: input.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let pageId = input.id;

    if (pageId) {
      const { error: updateError } = await supabase
        .from('cms_pages')
        .update(payload)
        .eq('id', pageId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newPage, error: insertError } = await supabase
        .from('cms_pages')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newPage) {
        return { success: false, error: insertError?.message || 'Failed to insert CMS page.' };
      }
      pageId = newPage.id;
    }

    if (!pageId) {
      return { success: false, error: 'Failed to resolve page ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'page',
      pageId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving CMS page.';
    return { success: false, error: msg };
  }
}
