import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export interface PageSeoOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function constructMetadata({
  title,
  description = siteConfig.defaultSeo.defaultDescription,
  path = '',
  ogImage = siteConfig.defaultSeo.defaultOgImage,
  noindex = false,
}: PageSeoOptions): Metadata {
  const canonicalUrl = `${siteConfig.domain}${path}`;
  const fullTitle = siteConfig.defaultSeo.titleTemplate.replace('%s', title);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.domain}${ogImage}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.domain}${ogImage}`],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
