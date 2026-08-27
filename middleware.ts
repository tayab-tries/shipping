import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getStaticRedirectManifest } from '@/lib/cms/redirect-exporter';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check static 301 redirect manifest (0 DB queries)
  const redirects = getStaticRedirectManifest();
  const matchedRedirect = redirects.find((r) => r.source_path === pathname);
  if (matchedRedirect) {
    return NextResponse.redirect(new URL(matchedRedirect.target_path, request.url), matchedRedirect.status_code);
  }

  // 2. Admin Route Protection (/admin)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    let response = NextResponse.next({ request });

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
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
