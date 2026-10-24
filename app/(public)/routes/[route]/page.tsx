import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOgImages } from '@/lib/seo/metadata.service';
import { ROUTE_PAGES } from '@/lib/routes/registry';
import { CityLandingPage } from '@/components/routes/CityLandingPage';
import { getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

interface RoutePageProps {
  params: Promise<{ route: string }>;
}

// Only the curated origin → destination routes exist; anything else 404s
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ROUTE_PAGES).map((route) => ({ route }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { route } = await params;
  const page = ROUTE_PAGES[route];
  if (!page) return {};

  const canonicalUrl = `https://raahiinternational.com${page.path}`;
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: canonicalUrl,
      siteName: 'Raahi International',
      type: 'website',
      images: getOgImages(),
    },
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { route } = await params;
  const page = ROUTE_PAGES[route];
  if (!page) notFound();

  const [business, sanitySiteSettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  return (
    <CityLandingPage
      page={page}
      whatsappNumber={sanitySiteSettings?.whatsappNumber || business?.whatsappNumber}
    />
  );
}
