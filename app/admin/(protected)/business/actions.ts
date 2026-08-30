'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface BusinessSettingsInput {
  brandName: string;
  legalName?: string;
  phonePrimary?: string;
  whatsappNumber?: string;
  emailInfo?: string;
  operatingHours?: string;
}

export async function saveAndPublishBusinessSettingsAction(
  input: BusinessSettingsInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish business settings.' };
    }

    // 3. Upsert into business_settings table
    const { data: existingSettings } = await supabase
      .from('business_settings')
      .select('id')
      .limit(1)
      .maybeSingle();

    let businessId = existingSettings?.id;

    if (businessId) {
      const { error: updateError } = await supabase
        .from('business_settings')
        .update({
          brand_name: input.brandName,
          legal_name: input.legalName,
          phone_primary: input.phonePrimary,
          whatsapp_number: input.whatsappNumber,
          email_info: input.emailInfo,
          operating_hours: input.operatingHours,
          updated_at: new Date().toISOString(),
        })
        .eq('id', businessId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newSetting, error: insertError } = await supabase
        .from('business_settings')
        .insert({
          brand_name: input.brandName,
          legal_name: input.legalName,
          phone_primary: input.phonePrimary,
          whatsapp_number: input.whatsappNumber,
          email_info: input.emailInfo,
          operating_hours: input.operatingHours,
          updated_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (insertError || !newSetting) {
        return { success: false, error: insertError?.message || 'Failed to insert business settings.' };
      }
      businessId = newSetting.id;
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'business',
      businessId,
      input as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving business settings.';
    return { success: false, error: msg };
  }
}
