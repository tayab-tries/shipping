'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { requireAdminAuth } from '@/lib/supabase/auth-guard';

/**
 * Server Action: Admin Logout / Revoke Session
 * Signs out from Supabase Auth and removes session cookies, then redirects to /admin/login.
 */
export async function adminLogoutAction() {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Error during admin sign out:', err);
  }
  redirect('/admin/login');
}

/**
 * Server Action: Update Quote Status & Internal Notes
 * Enforces admin authorization, updates the quotes row in Supabase, and revalidates caches.
 */
export async function updateQuoteLeadAction(formData: FormData) {
  await requireAdminAuth(); // Verify active admin session

  const quoteId = formData.get('quoteId') as string;
  const status = formData.get('status') as string;
  const internalNotes = formData.get('internalNotes') as string | null;

  if (!quoteId || !status) {
    throw new Error('Missing required fields (quoteId, status)');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Database service credentials missing in server environment.');
  }

  const supabase = createSupabaseJsClient(supabaseUrl, serviceRoleKey);

  const updatePayload: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (internalNotes !== null && internalNotes !== undefined) {
    updatePayload.internal_notes = internalNotes;
  }

  const { error } = await supabase
    .from('quotes')
    .update(updatePayload)
    .eq('id', quoteId);

  if (error) {
    console.error('Failed to update quote in Supabase:', error.message);
    throw new Error(`Failed to update quote record: ${error.message}`);
  }

  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath('/admin/quotes');
}
