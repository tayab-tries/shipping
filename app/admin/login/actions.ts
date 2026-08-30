'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface AdminLoginResult {
  success?: boolean;
  error?: string;
}

/**
 * Server Action for Admin Login
 * Runs exclusively on the Cloudflare Worker server process where Cloudflare Runtime Variables
 * (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are accessible at runtime.
 * 
 * Executes signInWithPassword, writes auth cookies to cookieStore, then calls redirect('/admin')
 * OUTSIDE any try/catch block so Next.js handles navigation natively.
 */
export async function adminLoginAction(formData: {
  email?: string;
  password?: string;
}): Promise<AdminLoginResult | void> {
  const email = formData.email?.trim() || '';
  const password = formData.password || '';

  if (!email || !password) {
    return {
      success: false,
      error: 'Please enter both email and password.',
    };
  }

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

  // Next.js redirect MUST be called outside any try/catch block
  redirect('/admin');
}
