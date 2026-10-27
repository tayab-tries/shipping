import React from 'react';
import { Metadata } from 'next';
import { applyTitleTemplate, pickDescription, pickTitle } from '@/lib/seo/seo-text';
import { getOgImages } from '@/lib/seo/metadata.service';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  getPublishedLocations,
  getLocationBySlug,
  getStaticLocationBySlug,
  LocationData,
  resolveSupportedDestinations,
} from '@/lib/locations/location-content';
import { getLocationHref, toLocationKey, toLocationPathSlug } from '@/lib/locations/location-slugs';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd, getLocalBusinessJsonLd } from '@/lib/seo/jsonld.service';
import { LocationHero } from '@/components/locations/LocationHero';
import { OperationalBadge } from '@/components/locations/OperationalBadge';
import { LocationServiceGrid } from '@/components/locations/LocationServiceGrid';
import { LocationDestinationGrid } from '@/components/locations/LocationDestinationGrid';
import { LocationBlogArticle } from '@/components/locations/LocationBlogArticle';
import { LocationProcess } from '@/components/locations/LocationProcess';
import { LocationGuides } from '@/components/locations/LocationGuides';
import { LocationCta } from '@/components/locations/LocationCta';
import { getSanityLocationBySlug, getSanityLocationsList, getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { CITY_LANDINGS } from '@/lib/routes/registry';
import { CityLandingPage } from '@/components/routes/CityLandingPage';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render static params for published location routes.
 * Locations are keyed by short slug internally; routes use the canonical SEO path segment.
 */
export async function generateStaticParams() {
  const sanityLocations = await getSanityLocationsList();
  const slugs =
    sanityLocations && sanityLocations.length > 0
      ? sanityLocations.map((loc) => loc.slug)
      : (await getPublishedLocations()).map((location) => location.slug);
  return slugs.map(toLocationPathSlug).filter(Boolean).map((slug) => ({ slug }));
}

/**
 * Dynamic metadata generator for city location pages.
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const key = toLocationKey(slug);

  // Lahore and Islamabad use the code-defined copy (lib/routes/*-content.ts), not the Sanity document
  const cityPage = CITY_LANDINGS[key]?.cityPage;
  if (cityPage) {
    const canonicalUrl = `https://raahiinternational.com${cityPage.path}`;
    return {
      title: cityPage.seoTitle,
      description: cityPage.seoDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: cityPage.seoTitle,
        description: cityPage.seoDescription,
        url: canonicalUrl,
        siteName: 'Raahi International',
        type: 'website',
        images: getOgImages(),
      },
    };
  }

  const sanityLocation = await getSanityLocationBySlug(key, { stega: false });
  const fallbackLocation = await getLocationBySlug(key);

  if (!sanityLocation && !fallbackLocation) {
    return {
      title: `Location Not Found | ${siteConfig.name}`,
    };
  }

  const staticLocation = getStaticLocationBySlug(key);
  const title = pickTitle(
    sanityLocation?.seo?.metaTitle,
    fallbackLocation?.seoTitle,
    staticLocation?.seoTitle
  ) || applyTitleTemplate(`Cargo Shipping ${fallbackLocation?.name || ''}`);

  const description = pickDescription(
    sanityLocation?.seo?.metaDescription,
    fallbackLocation?.seoDescription,
    staticLocation?.seoDescription
  ) || 'International cargo shipping services from Pakistan.';

  const canonicalUrl = `https://raahiinternational.com${getLocationHref(key)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Raahi International',
      type: 'website',
      images: getOgImages(sanityLocation?.seo?.socialImage),
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const key = toLocationKey(slug);

  // Short or legacy slugs (e.g. /locations/lahore) resolve to the single canonical SEO path;
  // unknown cities 404 here instead of redirecting to a canonical path that 404s
  if (key && slug !== toLocationPathSlug(key)) {
    const known = CITY_LANDINGS[key] || (await getSanityLocationBySlug(key)) || (await getLocationBySlug(key));
    if (!known) notFound();
    permanentRedirect(getLocationHref(key));
  }

  const cityPage = CITY_LANDINGS[key]?.cityPage;
  if (cityPage) {
    const [business, sanitySiteSettings] = await Promise.all([
      getPublishedBusinessSettings(),
      getSanitySiteSettingsData(),
    ]);
    return (
      <CityLandingPage
        page={cityPage}
        whatsappNumber={sanitySiteSettings?.whatsappNumber || business?.whatsappNumber}
      />
    );
  }

  const [sanityLocation, fallbackLocation, business, sanitySiteSettings] = await Promise.all([
    getSanityLocationBySlug(key),
    getLocationBySlug(key),
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  // Authoritative Verification Check
  if (!sanityLocation && !fallbackLocation) {
    notFound();
  }

  const activePhone = sanitySiteSettings?.phone || business?.phonePrimary;
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business?.whatsappNumber;

  const location: LocationData = {
    id: sanityLocation?._id || fallbackLocation?.id || key,
    name: sanityLocation?.name || fallbackLocation?.name || 'Pakistan City',
    slug: key,
    province: sanityLocation?.province || fallbackLocation?.province || 'Pakistan',
    h1: sanityLocation?.h1 || fallbackLocation?.h1 || `Cargo Services in ${sanityLocation?.name || fallbackLocation?.name}`,
    seoTitle: sanityLocation?.seo?.metaTitle || fallbackLocation?.seoTitle || `Cargo Shipping ${sanityLocation?.name || fallbackLocation?.name}`,
    seoDescription: sanityLocation?.seo?.metaDescription || fallbackLocation?.seoDescription || `Cargo shipping in ${sanityLocation?.name || fallbackLocation?.name}`,
    introduction: sanityLocation?.introduction || fallbackLocation?.introduction || `Cargo shipping services operating across ${sanityLocation?.name || fallbackLocation?.name}.`,
    serviceAvailable: sanityLocation?.serviceAvailable ?? fallbackLocation?.serviceAvailable ?? true,
    collectionAvailable: sanityLocation?.collectionAvailable ?? fallbackLocation?.collectionAvailable ?? true,
    hasPhysicalBranch: sanityLocation?.hasPhysicalBranch ?? fallbackLocation?.hasPhysicalBranch ?? false,
    branchAddress: sanityLocation?.branchAddress || fallbackLocation?.branchAddress || '',
    localCoverageText: sanityLocation?.localCoverageText || fallbackLocation?.localCoverageText || '',
    supportedServices: sanityLocation?.supportedServices || fallbackLocation?.supportedServices || ['air-freight', 'sea-cargo'],
    supportedDestinations: resolveSupportedDestinations(fallbackLocation?.supportedDestinations),
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: sanityLocation?.faqs || fallbackLocation?.faqs || [],
    sections: sanityLocation?.sections || fallbackLocation?.sections,
  };

  const quoteUrl = `/quote?origin=${location.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: location.name, url: getLocationHref(location.slug) },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for location page
  const locationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `International Cargo Shipping in ${location.name}`,
    description: location.seoDescription,
    provider: {
      '@id': 'https://raahiinternational.com/#organization',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
    },
    serviceType: 'International Cargo Shipping',
  };

  // LocalBusiness only for staffed branches; other cities keep Service + areaServed schema above
  const localBusinessJsonLd =
    location.hasPhysicalBranch && location.branchAddress
      ? getLocalBusinessJsonLd({
          key: location.slug,
          name: location.name,
          province: location.province,
          url: getLocationHref(location.slug),
          branchAddress: location.branchAddress,
          description: location.seoDescription,
        })
      : null;

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {localBusinessJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      )}

      {/* 1. Location Hero Block */}
      <LocationHero
        cityName={location.name}
        province={location.province}
        h1={location.h1}
        introduction={location.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Fact-Based Operational Status Indicator */}
      <OperationalBadge
        cityName={location.name}
        hasPhysicalBranch={location.hasPhysicalBranch}
        branchAddress={location.branchAddress}
        collectionAvailable={location.collectionAvailable}
        serviceAvailable={location.serviceAvailable}
      />

      {/* 3. Available Cargo Services Grid */}
      <LocationServiceGrid
        cityName={location.name}
        supportedServices={location.supportedServices}
      />

      {/* 4. Editorial Blog Article Layout with In-Depth Content, Bullets, Links & Full Q&A FAQs */}
      <LocationBlogArticle
        cityName={location.name}
        introduction={location.introduction}
        localCoverageText={location.localCoverageText}
        sections={location.sections}
        faqs={location.faqs}
        phone={activePhone}
        whatsappNumber={activeWhatsapp}
      />

      {/* 5. Supported Destination Countries Grid */}
      <LocationDestinationGrid
        cityName={location.name}
        supportedDestinations={location.supportedDestinations}
      />

      {/* 6. Origin Dispatch Process Workflow */}
      <LocationProcess cityName={location.name} />

      {/* 7. Related Educational Guides */}
      <LocationGuides cityName={location.name} />

      {/* 8. Origin-Specific Quote Conversion CTA */}
      <LocationCta cityName={location.name} slug={location.slug} />
    </article>
  );
}
