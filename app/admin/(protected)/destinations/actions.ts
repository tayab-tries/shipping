'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface DestinationCountryInput {
  id?: string;
  name: string;
  slug: string;
  iso_code: string;
  h1: string;
  meta_title: string;
  meta_description: string;
  customs_summary?: string;
  is_active?: boolean;
  prohibited_items?: unknown[];
  required_docs?: unknown[];
}

export async function getDestinationCountriesAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('destination_countries')
      .select('*')
      .order('name', { ascending: true });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getDestinationCountriesAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishDestinationCountryAction(
  input: DestinationCountryInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish destination countries.' };
    }

    // 3. Upsert into destination_countries table
    const payload = {
      name: input.name,
      slug: input.slug,
      iso_code: input.iso_code || input.slug.toUpperCase(),
      h1: input.h1 || `Cargo & Freight Services to ${input.name}`,
      meta_title: input.meta_title || `Cargo to ${input.name} from Pakistan | Cargo Shipping`,
      meta_description: input.meta_description || `Fast air freight and ocean sea cargo shipping services connecting Pakistan to ${input.name}.`,
      customs_summary: input.customs_summary || '',
      is_active: input.is_active ?? true,
      prohibited_items: input.prohibited_items || [],
      required_docs: input.required_docs || [],
      updated_at: new Date().toISOString(),
    };

    let countryId = input.id;

    if (countryId) {
      const { error: updateError } = await supabase
        .from('destination_countries')
        .update(payload)
        .eq('id', countryId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newCountry, error: insertError } = await supabase
        .from('destination_countries')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newCountry) {
        return { success: false, error: insertError?.message || 'Failed to insert destination country.' };
      }
      countryId = newCountry.id;
    }

    if (!countryId) {
      return { success: false, error: 'Failed to resolve destination country ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'destination',
      countryId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving destination country.';
    return { success: false, error: msg };
  }
}
