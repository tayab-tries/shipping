import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminLoginForm from './login-form';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  let hasActiveUser = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      hasActiveUser = true;
    }
  } catch {
    // Gracefully continue to login form if session cannot be determined
  }

  if (hasActiveUser) {
    redirect('/admin/quotes');
  }

  return <AdminLoginForm />;
}
