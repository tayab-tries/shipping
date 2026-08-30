'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface ArticleItemInput {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt?: string;
  content_markdown: string;
  category: string;
  reading_time_minutes?: number;
  is_published?: boolean;
}

export async function getArticlesListAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getArticlesListAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishArticleAction(
  input: ArticleItemInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish articles.' };
    }

    // 3. Upsert into articles table
    const payload = {
      title: input.title,
      slug: input.slug,
      meta_title: input.meta_title || `${input.title} | Cargo Shipping Guides`,
      meta_description: input.meta_description || input.excerpt || input.title,
      excerpt: input.excerpt || '',
      content_markdown: input.content_markdown,
      category: input.category || 'Guides',
      reading_time_minutes: input.reading_time_minutes || 5,
      is_published: input.is_published ?? true,
      published_at: input.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let articleId = input.id;

    if (articleId) {
      const { error: updateError } = await supabase
        .from('articles')
        .update(payload)
        .eq('id', articleId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newArt, error: insertError } = await supabase
        .from('articles')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newArt) {
        return { success: false, error: insertError?.message || 'Failed to insert article.' };
      }
      articleId = newArt.id;
    }

    if (!articleId) {
      return { success: false, error: 'Failed to resolve article ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'article',
      articleId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving article.';
    return { success: false, error: msg };
  }
}
