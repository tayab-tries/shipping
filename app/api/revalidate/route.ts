import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity publish webhook → refresh the cached site.
 *
 * Content is cross-linked (footer, homepage, related cards, sitemap), so every publish
 * invalidates the whole site; each page re-renders lazily on its next visit.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new NextResponse('Server configuration error: SANITY_REVALIDATE_SECRET is missing.', { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(request, secret);
    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    revalidatePath('/', 'layout');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ revalidated: true, type: body?._type ?? null, slug: body?.slug ?? null, now: Date.now() });
  } catch (error) {
    console.error('[revalidate] webhook error:', error);
    return new NextResponse('Revalidation failed', { status: 500 });
  }
}
