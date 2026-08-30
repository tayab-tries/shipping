import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface AdminUserAuth {
  user: {
    id: string;
    email?: string;
  };
  profile: {
    id: string;
    email: string;
    full_name: string;
    role: 'admin' | 'editor';
    is_active: boolean;
  };
}

/**
 * Server-side Authentication & Authorization Guard for Admin Routes.
 * 
 * Enforces:
 * 1. Authenticated Supabase session user.
 * 2. Active admin_profiles record (is_active === true).
 * 3. Permitted role check ('admin' | 'editor').
 * 4. Optional strict 'admin'-only role check.
 * 
 * Throws server-side redirect('/admin/login') on failure.
 */
export async function requireAdminAuth(requiredRole?: 'admin'): Promise<AdminUserAuth> {
  const supabase = await createClient();

  // 1. Check Supabase Auth session user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/admin/login');
  }

  // 2. Query admin_profiles table for active account
  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, is_active')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !profile.is_active) {
    // Un-authorized user or inactive admin profile
    redirect('/admin/login');
  }

  // 3. Strict role check
  if (requiredRole === 'admin' && profile.role !== 'admin') {
    // Editor attempting admin-only function
    redirect('/admin?error=unauthorized_role');
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile: {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role as 'admin' | 'editor',
      is_active: profile.is_active,
    },
  };
}
