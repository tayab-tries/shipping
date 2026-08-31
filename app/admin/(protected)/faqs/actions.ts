'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface FaqItemInput {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  display_order?: number;
  is_published?: boolean;
}

export async function getFaqsListAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: true });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getFaqsListAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishFaqAction(
  input: FaqItemInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish FAQs.' };
    }

    // 3. Dual schema payload
    const payload: Record<string, unknown> = {
      question: input.question,
      answer: input.answer,
      category: input.category || 'general',
      entity_type: input.category || 'general',
      display_order: input.display_order ?? 0,
      sort_order: input.display_order ?? 0,
      is_published: input.is_published ?? true,
      status: input.is_published ? 'published' : 'draft',
      updated_at: new Date().toISOString(),
    };

    // 4. Resilient Upsert with column fallback
    const currentPayload = { ...payload };
    let faqId = input.id;
    let success = false;
    let lastErrorMessage = '';

    for (let attempt = 0; attempt < 5; attempt++) {
      if (faqId) {
        const { error: updateError } = await supabase
          .from('faqs')
          .update(currentPayload)
          .eq('id', faqId);

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
        const { data: newFaq, error: insertError } = await supabase
          .from('faqs')
          .insert(currentPayload)
          .select('id')
          .single();

        if (!insertError && newFaq) {
          faqId = newFaq.id;
          success = true;
          break;
        }

        lastErrorMessage = insertError?.message || 'Failed to insert FAQ.';
        const match = lastErrorMessage.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      }
    }

    if (!success || !faqId) {
      return { success: false, error: lastErrorMessage || 'Failed to save FAQ.' };
    }

    // 5. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'page',
      faqId,
      currentPayload,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving FAQ.';
    return { success: false, error: msg };
  }
}
