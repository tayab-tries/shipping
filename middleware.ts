import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getStaticRedirectManifest } from '@/lib/cms/redirect-exporter';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function middleware(request: NextRequest) {
  // 0. Dedicated Host Redirect for workers.dev safeguard
  const rawHost = request.headers.get('host') || request.nextUrl.hostname;
  const host = rawHost.split(':')[0].toLowerCase();
  if (host === 'cargo.raahiinternational4.workers.dev') {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://raahiinternational.com${pathname}${search}`, 301);
  }

  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Static 301 Redirect Manifest (Fast path)
  const redirects = getStaticRedirectManifest();
  const matchedRedirect = redirects.find((r) => r.source_path === pathname);
  if (matchedRedirect) {
    return NextResponse.redirect(new URL(matchedRedirect.target_path, request.url), matchedRedirect.status_code);
  }

  // 2. EXEMPT /admin/login GET requests explicitly - return plain NextResponse.next() immediately
  if (pathname.startsWith('/admin/login') && method === 'GET') {
    return NextResponse.next();
  }

  // 3. Endpoint-Specific Rate Limiting (SENSITIVE / MUTATING POST REQUESTS ONLY)
  // Public GET page requests, RSC flight prefetch calls, and static assets bypass application rate limiting completely.
  if (method === 'POST') {
    let rateLimitKeyPrefix: string | null = null;

    if (pathname === '/api/quote') {
      rateLimitKeyPrefix = 'quote:';
    } else if (pathname === '/api/track') {
      rateLimitKeyPrefix = 'track:';
    } else if (pathname.startsWith('/admin/login')) {
      rateLimitKeyPrefix = 'auth:';
    }

    if (rateLimitKeyPrefix) {
      try {
        const ctx = getCloudflareContext();
        const env = ctx?.env as { RATE_LIMITER?: { limit: (opts: { key: string }) => Promise<{ success: boolean }> } } | undefined;
        if (env?.RATE_LIMITER) {
          const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
          const { success } = await env.RATE_LIMITER.limit({ key: `${rateLimitKeyPrefix}${ip}` });
          if (!success) {
            const isApi = pathname.startsWith('/api/');
            if (isApi) {
              return NextResponse.json(
                {
                  success: false,
                  error: 'Too many requests. Please wait 60 seconds before trying again.',
                  retryAfter: 60,
                },
                {
                  status: 429,
                  headers: {
                    'Retry-After': '60',
                    'Content-Type': 'application/json',
                  },
                }
              );
            }
            return NextResponse.json(
              {
                success: false,
                error: 'Too many authentication attempts. Please wait 60 seconds before trying again.',
                retryAfter: 60,
              },
              {
                status: 429,
                headers: {
                  'Retry-After': '60',
                  'Content-Type': 'application/json',
                },
              }
            );
          }
        }
      } catch {
        // Gracefully continue if Cloudflare context is not available in non-CF environments
      }
    }
  }

  const response = NextResponse.next();

  // 4. Refresh Supabase Session Cookies ONLY for protected /admin routes
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)).*)'],
};
