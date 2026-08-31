'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface ArticleItemInput {
  id?: string;
  title: string;
  slug: string;
  seo_title?: string;
  seo_description?: string;
  meta_title?: string;
  meta_description?: string;
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

    // 3. Dual schema payload
    const titleVal = input.meta_title || input.seo_title || `${input.title} | Cargo Shipping Guides`;
    const descVal = input.meta_description || input.seo_description || input.excerpt || input.title;

    const payload: Record<string, unknown> = {
      title: input.title,
      slug: input.slug,
      meta_title: titleVal,
      meta_description: descVal,
      seo_title: titleVal,
      seo_description: descVal,
      excerpt: input.excerpt || '',
      content_markdown: input.content_markdown || '',
      category: input.category || 'Guides',
      reading_time_minutes: input.reading_time_minutes || 5,
      is_published: input.is_published ?? true,
      status: input.is_published ? 'published' : 'draft',
      is_verified: true,
      is_indexable: true,
      published_at: input.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    // 4. Resilient Upsert with column fallback
    const currentPayload = { ...payload };
    let articleId = input.id;
    let success = false;
    let lastErrorMessage = '';

    for (let attempt = 0; attempt < 5; attempt++) {
      if (articleId) {
        const { error: updateError } = await supabase
          .from('articles')
          .update(currentPayload)
          .eq('id', articleId);

        if (!updateError) {
          success = true;
          break;
        }

        lastErrorMessage = updateError.message;
        const match = updateError.message.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      } else {
        const { data: newArt, error: insertError } = await supabase
          .from('articles')
          .insert(currentPayload)
          .select('id')
          .single();

        if (!insertError && newArt) {
          articleId = newArt.id;
          success = true;
          break;
        }

        lastErrorMessage = insertError?.message || 'Failed to insert article.';
        const match = lastErrorMessage.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      }
    }

    if (!success || !articleId) {
      return { success: false, error: lastErrorMessage || 'Failed to save article.' };
    }

    // 5. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'article',
      articleId,
      currentPayload,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving article.';
    return { success: false, error: msg };
  }
}
