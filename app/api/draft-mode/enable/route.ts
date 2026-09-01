import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Verify secret token if defined in environment
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return new NextResponse('Invalid draft mode preview token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = searchParams.get('redirect') || '/';
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
