'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface CredentialItemInput {
  id?: string;
  title: string;
  issuing_authority: string;
  license_number?: string;
  verification_url?: string;
  badge_image_url?: string;
  display_order?: number;
  is_verified?: boolean;
}

export async function getCredentialsListAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('credentials')
      .select('*')
      .order('display_order', { ascending: true });

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error('getCredentialsListAction error:', err);
    return { success: false, data: [] };
  }
}

export async function saveAndPublishCredentialAction(
  input: CredentialItemInput
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish credentials.' };
    }

    // 3. Upsert into credentials table
    const payload = {
      title: input.title,
      issuing_authority: input.issuing_authority,
      license_number: input.license_number || '',
      verification_url: input.verification_url || '',
      badge_image_url: input.badge_image_url || '',
      display_order: input.display_order ?? 0,
      is_verified: input.is_verified ?? true,
    };

    let credId = input.id;

    if (credId) {
      const { error: updateError } = await supabase
        .from('credentials')
        .update(payload)
        .eq('id', credId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { data: newCred, error: insertError } = await supabase
        .from('credentials')
        .insert(payload)
        .select('id')
        .single();

      if (insertError || !newCred) {
        return { success: false, error: insertError?.message || 'Failed to insert credential.' };
      }
      credId = newCred.id;
    }

    if (!credId) {
      return { success: false, error: 'Failed to resolve credential ID.' };
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'credential',
      credId,
      payload as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving credential.';
    return { success: false, error: msg };
  }
}
