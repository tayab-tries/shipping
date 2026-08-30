import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getStaticRedirectManifest } from '@/lib/cms/redirect-exporter';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static 301 Redirect Manifest
  const redirects = getStaticRedirectManifest();
  const matchedRedirect = redirects.find((r) => r.source_path === pathname);
  if (matchedRedirect) {
    return NextResponse.redirect(new URL(matchedRedirect.target_path, request.url), matchedRedirect.status_code);
  }

  // 2. EXEMPT /admin/login explicitly - return plain NextResponse.next() immediately
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // 3. Refresh Supabase Session Cookies ONLY for protected /admin routes
  if (pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    if (supabaseUrl && supabaseKey) {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });

      await supabase.auth.getUser();
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
