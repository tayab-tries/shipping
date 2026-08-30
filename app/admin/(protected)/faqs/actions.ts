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
      .order('display_order', { ascending: true });

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

    // 3. Upsert into faqs table
    const payload = {
      question: input.question,
      answer: input.answer,
      category: input.category || 'general',
      display_order: input.display_order ?? 0,
      is_published: input.is_published ?? true,
    };

    let faqId = input.id;

    if (faqId) {
      const { error: updateError } = await supabase
        .from('faqs')
        .update(payload)
        .eq('id', faqId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newFaq, error: insertError } = await supabase
        .from('faqs')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newFaq) {
        return { success: false, error: insertError?.message || 'Failed to insert FAQ.' };
      }
      faqId = newFaq.id;
    }

    if (!faqId) {
      return { success: false, error: 'Failed to resolve FAQ ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'page',
      faqId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving FAQ.';
    return { success: false, error: msg };
  }
}
