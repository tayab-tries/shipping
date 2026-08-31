'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface DestinationCountryInput {
  id?: string;
  name: string;
  slug: string;
  iso_code: string;
  h1: string;
  seo_title?: string;
  seo_description?: string;
  meta_title?: string;
  meta_description?: string;
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

    // 3. Dual schema payload
    const titleVal = input.meta_title || input.seo_title || `Cargo to ${input.name} from Pakistan | Cargo Shipping`;
    const descVal = input.meta_description || input.seo_description || `Fast air freight and ocean sea cargo shipping services connecting Pakistan to ${input.name}.`;

    const payload: Record<string, unknown> = {
      name: input.name,
      slug: input.slug,
      region: 'Global',
      iso_code: input.iso_code || input.slug.toUpperCase(),
      h1: input.h1 || `Cargo & Freight Services to ${input.name}`,
      meta_title: titleVal,
      meta_description: descVal,
      seo_title: titleVal,
      seo_description: descVal,
      introduction: descVal,
      customs_summary: input.customs_summary || '',
      is_active: input.is_active ?? true,
      status: 'published',
      is_verified: true,
      is_indexable: true,
      prohibited_items: input.prohibited_items || [],
      required_docs: input.required_docs || [],
      updated_at: new Date().toISOString(),
    };

    // 4. Resilient Upsert with column fallback
    const currentPayload = { ...payload };
    let countryId = input.id;
    let success = false;
    let lastErrorMessage = '';

    for (let attempt = 0; attempt < 5; attempt++) {
      if (countryId) {
        const { error: updateError } = await supabase
          .from('destination_countries')
          .update(currentPayload)
          .eq('id', countryId);

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
        const { data: newCountry, error: insertError } = await supabase
          .from('destination_countries')
          .insert(currentPayload)
          .select('id')
          .single();

        if (!insertError && newCountry) {
          countryId = newCountry.id;
          success = true;
          break;
        }

        lastErrorMessage = insertError?.message || 'Failed to insert destination country.';
        const match = lastErrorMessage.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      }
    }

    if (!success || !countryId) {
      return { success: false, error: lastErrorMessage || 'Failed to save destination country.' };
    }

    // 5. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'destination',
      countryId,
      currentPayload,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving destination country.';
    return { success: false, error: msg };
  }
}
