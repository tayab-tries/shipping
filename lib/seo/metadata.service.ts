import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { applyTitleTemplate } from './seo-text';

export interface PageSeoOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SITE_NAME = 'Raahi International';
export const SITE_URL = 'https://raahiinternational.com';

function toAbsoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

/**
 * Open Graph images for a page, falling back to the site default.
 * Page-level `openGraph` objects replace the root layout's entirely (shallow merge),
 * so every page that sets `openGraph` must include `images` from here.
 */
export function getOgImages(image?: string | null): Array<{ url: string; width?: number; height?: number; alt: string }> {
  if (image && image !== siteConfig.defaultSeo.defaultOgImage) return [{ url: toAbsoluteUrl(image), alt: SITE_NAME }];
  return [{ url: toAbsoluteUrl(siteConfig.defaultSeo.defaultOgImage), width: 1200, height: 630, alt: SITE_NAME }];
}

/** Twitter card images, falling back to the site default. */
export function getTwitterImages(image?: string | null): string[] {
  return [toAbsoluteUrl(image || siteConfig.defaultSeo.defaultOgImage)];
}

export function constructMetadata({
  title,
  description = siteConfig.defaultSeo.defaultDescription,
  path = '',
  ogImage = siteConfig.defaultSeo.defaultOgImage,
  noindex = false,
}: PageSeoOptions): Metadata {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  const canonicalUrl = cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
  const fullTitle = applyTitleTemplate(title);

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: fullTitle,
    description,
    verification: {
      google: 'google4aea07eb5eec62b9',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: getOgImages(ogImage),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: getTwitterImages(ogImage),
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
