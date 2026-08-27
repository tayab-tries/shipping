import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedStaticDestinations,
  getStaticDestinationBySlug,
} from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { DestinationOverview } from '@/components/destinations/DestinationOverview';
import { DestinationServiceGrid } from '@/components/destinations/DestinationServiceGrid';
import { DestinationOriginGrid } from '@/components/destinations/DestinationOriginGrid';
import { DestinationProcess } from '@/components/destinations/DestinationProcess';
import { DestinationConsiderations } from '@/components/destinations/DestinationConsiderations';
import { DestinationSubCitiesGrid } from '@/components/destinations/DestinationSubCitiesGrid';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';

interface DestinationCountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const publishedDestinations = getPublishedStaticDestinations();
  return publishedDestinations.map((destination) => ({
    country: destination.slug,
  }));
}

export async function generateMetadata({ params }: DestinationCountryPageProps): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const destination = getStaticDestinationBySlug(countrySlug);

  if (!destination) {
    return {
      title: `Destination Not Found | ${siteConfig.name}`,
    };
  }

  const canonicalUrl = `${siteConfig.domain}/destinations/${destination.slug}`;

  return {
    title: `${destination.seoTitle} | ${siteConfig.name}`,
    description: destination.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${destination.seoTitle} | ${siteConfig.name}`,
      description: destination.seoDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function DestinationCountryDetailPage({ params }: DestinationCountryPageProps) {
  const { country: countrySlug } = await params;
  const destination = getStaticDestinationBySlug(countrySlug);

  // Authoritative Verification Check
  if (!destination) {
    notFound();
  }

  const quoteUrl = `/quote?destination=${destination.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: destination.name, url: `/destinations/${destination.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for Destination Page
  const destinationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cargo Shipping from Pakistan to ${destination.name}`,
    description: destination.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: destination.name,
    },
    serviceType: 'International Freight Forwarding',
  };

  return (
    <article className="w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. Destination Hero */}
      <DestinationHero
        countryName={destination.name}
        region={destination.region}
        h1={destination.h1}
        introduction={destination.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Shipping Overview */}
      <DestinationOverview
        countryName={destination.name}
        shippingOverview={destination.shippingOverview}
      />

      {/* 3. Available Cargo Services */}
      <DestinationServiceGrid
        countryName={destination.name}
        supportedServices={destination.supportedServices}
      />

      {/* 4. Pakistan Origin Cargo Hubs */}
      <DestinationOriginGrid
        countryName={destination.name}
        supportedOrigins={destination.supportedOrigins}
      />

      {/* 5. 4-Step Shipping Workflow */}
      <DestinationProcess countryName={destination.name} />

      {/* 6. Packing & Customs Considerations */}
      <DestinationConsiderations
        countryName={destination.name}
        customsGuidance={destination.customsGuidance}
      />

      {/* 7. Published Sub-Destination Cities */}
      <DestinationSubCitiesGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        cities={destination.cities}
      />

      {/* 8. Country FAQ Accordion */}
      <DestinationFaq countryName={destination.name} faqs={destination.faqs} />

      {/* 9. High-Impact Quote CTA */}
      <DestinationCta countryName={destination.name} slug={destination.slug} />
    </article>
  );
}
