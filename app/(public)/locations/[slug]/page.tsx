import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedStaticLocations,
  getStaticLocationBySlug,
} from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { LocationHero } from '@/components/locations/LocationHero';
import { OperationalBadge } from '@/components/locations/OperationalBadge';
import { LocationServiceGrid } from '@/components/locations/LocationServiceGrid';
import { LocationDestinationGrid } from '@/components/locations/LocationDestinationGrid';
import { CoverageSection } from '@/components/locations/CoverageSection';
import { LocationProcess } from '@/components/locations/LocationProcess';
import { LocationFaq } from '@/components/locations/LocationFaq';
import { LocationCta } from '@/components/locations/LocationCta';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render static params for published and verified location routes.
 */
export async function generateStaticParams() {
  const publishedLocations = getPublishedStaticLocations();
  return publishedLocations.map((location) => ({
    slug: location.slug,
  }));
}

/**
 * Dynamic metadata generator for city location pages.
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getStaticLocationBySlug(slug);

  if (!location) {
    return {
      title: `Location Not Found | ${siteConfig.name}`,
    };
  }

  const canonicalUrl = `${siteConfig.domain}/locations/${location.slug}`;

  return {
    title: `${location.seoTitle} | ${siteConfig.name}`,
    description: location.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.seoTitle} | ${siteConfig.name}`,
      description: location.seoDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getStaticLocationBySlug(slug);

  // 1. Authoritative Verification & Publication Check
  if (!location) {
    notFound();
  }

  const quoteUrl = `/quote?origin=${location.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: location.name, url: `/locations/${location.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for location page
  const locationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `International Cargo Shipping in ${location.name}`,
    description: location.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
    },
    serviceType: 'International Cargo Shipping',
  };

  // LocalBusiness schema rendered ONLY if verified physical branch exists
  const localBusinessJsonLd =
    location.hasPhysicalBranch && location.branchAddress
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `${siteConfig.name} - ${location.name} Branch`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.name,
            streetAddress: location.branchAddress,
            addressCountry: 'PK',
          },
        }
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

      {/* 4. Supported Destination Countries Grid */}
      <LocationDestinationGrid
        cityName={location.name}
        supportedDestinations={location.supportedDestinations}
      />

      {/* 5. Local Logistics & Collection Coverage Section */}
      <CoverageSection
        cityName={location.name}
        localCoverageText={location.localCoverageText}
        collectionAvailable={location.collectionAvailable}
      />

      {/* 6. Origin Dispatch Process Workflow */}
      <LocationProcess cityName={location.name} />

      {/* 7. City-Specific FAQ Accordion */}
      <LocationFaq cityName={location.name} faqs={location.faqs} />

      {/* 8. Origin-Specific Quote Conversion CTA */}
      <LocationCta cityName={location.name} slug={location.slug} />
    </article>
  );
}
