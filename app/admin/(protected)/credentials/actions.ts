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
      .order('created_at', { ascending: true });

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

    // 3. Dual schema payload
    const payload: Record<string, unknown> = {
      name: input.title,
      title: input.title,
      issuing_authority: input.issuing_authority || 'Logistics Authority',
      credential_type: 'certification',
      license_number: input.license_number || '',
      verification_url: input.verification_url || '',
      logo_url: input.badge_image_url || '',
      badge_image_url: input.badge_image_url || '',
      description: input.title,
      display_order: input.display_order ?? 0,
      sort_order: input.display_order ?? 0,
      is_verified: input.is_verified ?? true,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    // 4. Resilient Upsert with column fallback
    const currentPayload = { ...payload };
    let credId = input.id;
    let success = false;
    let lastErrorMessage = '';

    for (let attempt = 0; attempt < 5; attempt++) {
      if (credId) {
        const { error: updateError } = await supabase
          .from('credentials')
          .update(currentPayload)
          .eq('id', credId);

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
        const { data: newCred, error: insertError } = await supabase
          .from('credentials')
          .insert(currentPayload)
          .select('id')
          .single();

        if (!insertError && newCred) {
          credId = newCred.id;
          success = true;
          break;
        }

        lastErrorMessage = insertError?.message || 'Failed to insert credential.';
        const match = lastErrorMessage.match(/Could not find the '(.*?)' column/i);
        if (match && match[1] && currentPayload[match[1]] !== undefined) {
          delete currentPayload[match[1]];
          continue;
        }
        break;
      }
    }

    if (!success || !credId) {
      return { success: false, error: lastErrorMessage || 'Failed to save credential.' };
    }

    // 5. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'credential',
      credId,
      currentPayload,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving credential.';
    return { success: false, error: msg };
  }
}
