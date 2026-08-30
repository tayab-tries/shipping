'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface LocationItemInput {
  id?: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  meta_title: string;
  meta_description: string;
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

    // 3. Upsert into locations table
    const payload = {
      name: input.name,
      slug: input.slug,
      province: input.province || 'Punjab',
      h1: input.h1 || `Cargo Forwarding Services in ${input.name}`,
      meta_title: input.meta_title || `Cargo Forwarding in ${input.name} | Cargo Shipping`,
      meta_description: input.meta_description || `Reliable cargo and freight forwarding services in ${input.name}, Pakistan.`,
      hub_address: input.hub_address || '',
      phone_local: input.phone_local || '',
      email_local: input.email_local || '',
      is_active: input.is_active ?? true,
      services_offered: input.services_offered || [],
      verified_branches: input.verified_branches || [],
      content_blocks: input.content_blocks || [],
      faqs: input.faqs || [],
      updated_at: new Date().toISOString(),
    };

    let locationId = input.id;

    if (locationId) {
      const { error: updateError } = await supabase
        .from('locations')
        .update(payload)
        .eq('id', locationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newLoc, error: insertError } = await supabase
        .from('locations')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newLoc) {
        return { success: false, error: insertError?.message || 'Failed to insert location.' };
      }
      locationId = newLoc.id;
    }

    if (!locationId) {
      return { success: false, error: 'Failed to resolve location ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'location',
      locationId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving location.';
    return { success: false, error: msg };
  }
}
