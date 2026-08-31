'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface LocationItemInput {
  id?: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seo_title?: string;
  seo_description?: string;
  meta_title?: string;
  meta_description?: string;
  introduction?: string;
  hub_address?: string;
  phone_local?: string;
  email_local?: string;
  is_active?: boolean;
  services_offered?: unknown[];
  verified_branches?: unknown[];
  content_blocks?: unknown[];
  faqs?: unknown[];
}

export async function getLocationsListAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('locations')
      .select('*')
      .order('name', { ascending: true });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getLocationsListAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishLocationAction(
  input: LocationItemInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish locations.' };
    }

    // 3. Build comprehensive payload compatible with both initial & patched schemas
    const titleValue = input.meta_title || input.seo_title || `Cargo Forwarding in ${input.name} | Cargo Shipping`;
    const descValue = input.meta_description || input.seo_description || `Reliable cargo and freight forwarding services in ${input.name}, Pakistan.`;
    const introValue = input.introduction || `Cargo receiving and pickup dispatch services operate across ${input.name}, Pakistan.`;

    const payload: Record<string, unknown> = {
      name: input.name,
      slug: input.slug,
      province: input.province || 'Punjab',
      h1: input.h1 || `Cargo Forwarding Services in ${input.name}`,
      meta_title: titleValue,
      meta_description: descValue,
      seo_title: titleValue,
      seo_description: descValue,
      introduction: introValue,
      hub_address: input.hub_address || '',
      phone_local: input.phone_local || '',
      email_local: input.email_local || '',
      is_active: input.is_active ?? true,
      status: 'published',
      is_verified: true,
      is_indexable: true,
      services_offered: input.services_offered || [],
      verified_branches: input.verified_branches || [],
      content_blocks: input.content_blocks || [],
      faqs: input.faqs || [],
      updated_at: new Date().toISOString(),
    };

    // 4. Resilient Upsert with schema fallback (prunes missing un-migrated columns dynamically)
    const currentPayload = { ...payload };
    let locationId = input.id;
    let success = false;
    let lastErrorMessage = '';

    for (let attempt = 0; attempt < 5; attempt++) {
      if (locationId) {
        const { error: updateError } = await supabase
          .from('locations')
          .update(currentPayload)
          .eq('id', locationId);

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
        const { data: newLoc, error: insertError } = await supabase
          .from('locations')
          .insert(currentPayload)
          .select('id')
          .single();

        if (!insertError && newLoc) {
          locationId = newLoc.id;
          success = true;
          break;
        }

        lastErrorMessage = insertError?.message || 'Failed to insert location.';
        const match = lastErrorMessage.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      }
    }

    if (!success || !locationId) {
      return { success: false, error: lastErrorMessage || 'Failed to save location.' };
    }

    // 5. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'location',
      locationId,
      currentPayload,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving location.';
    return { success: false, error: msg };
  }
}
