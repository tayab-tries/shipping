import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('sanity-preview-secret') || searchParams.get('secret');

  // Verify secret token if SANITY_PREVIEW_SECRET is configured
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  if (expectedSecret && secret && secret !== expectedSecret) {
    return new NextResponse('Invalid draft mode preview token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl =
    searchParams.get('sanity-preview-pathname') ||
    searchParams.get('redirect') ||
    '/';

  const response = NextResponse.redirect(new URL(redirectUrl, request.url));

  // Set SameSite=None; Secure; Partitioned on draft mode cookie for iframe compatibility
  response.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      path: cookie.path || '/',
      httpOnly: cookie.httpOnly ?? true,
      sameSite: 'none',
      secure: true,
      partitioned: true,
    });
  });

  return response;
}
