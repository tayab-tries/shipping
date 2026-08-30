'use server';

import { createClient } from '@/lib/supabase/server';

export interface AdminLoginResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action for Admin Login
 * Runs exclusively on the Cloudflare Worker server process where Cloudflare Runtime Variables
 * (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are accessible at runtime.
 * 
 * Sets session HTTP cookies via Supabase SSR client + Next.js cookies().
 */
export async function adminLoginAction(formData: {
  email?: string;
  password?: string;
}): Promise<AdminLoginResult> {
  const email = formData.email?.trim() || '';
  const password = formData.password || '';

  if (!email || !password) {
    return {
      success: false,
      error: 'Please enter both email and password.',
    };
  }

  try {
    const supabase = await createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return {
        success: false,
        error: signInError.message,
      };
    }

    return {
      success: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server authentication failed.';
    console.error('adminLoginAction error:', msg);
    return {
      success: false,
      error: msg,
    };
  }
}
