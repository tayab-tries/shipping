import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedDestinations,
  getDestinationBySlug,
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
import { DestinationGuides } from '@/components/destinations/DestinationGuides';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

/**
 * Pre-render static params for published and verified country destination routes.
 */
export async function generateStaticParams() {
  const publishedDestinations = await getPublishedDestinations();
  return publishedDestinations.map((dest) => ({
    country: dest.slug,
  }));
}

/**
 * Dynamic metadata generator for country destination pages.
 */
export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const destination = await getDestinationBySlug(country);

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

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { country } = await params;
  const destination = await getDestinationBySlug(country);

  // 1. Authoritative Verification & Publication Check
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

  // Service Schema for country page
  const destinationServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `International Cargo Shipping to ${destination.name}`,
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
    serviceType: 'International Cargo Shipping',
  };

  // FAQ Schema if visible FAQ content exists
  const faqJsonLd =
    destination.faqs && destination.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: destination.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 01 HERO (Dark / Photo-led) */}
      <DestinationHero
        countryName={destination.name}
        region={destination.region}
        h1={destination.h1}
        introduction={destination.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 OVERVIEW (LIGHT) */}
      <DestinationOverview
        countryName={destination.name}
        shippingOverview={destination.shippingOverview}
      />

      {/* 03 AVAILABLE SERVICES (LIGHT / WHITE) */}
      <DestinationServiceGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedServices={destination.supportedServices}
      />

      {/* 04 PAKISTAN ORIGIN CITIES (WHITE) */}
      <DestinationOriginGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        supportedOrigins={destination.supportedOrigins}
      />

      {/* 05 SHIPPING PROCESS (LIGHT) */}
      <DestinationProcess countryName={destination.name} />

      {/* 06 PREPARATION / CUSTOMS (WHITE) */}
      <DestinationConsiderations
        countryName={destination.name}
        customsGuidance={destination.customsGuidance}
      />

      {/* 07 DESTINATION CITIES (LIGHT) */}
      <DestinationSubCitiesGrid
        countryName={destination.name}
        countrySlug={destination.slug}
        cities={destination.cities}
      />

      {/* 08 GUIDES (WHITE) */}
      <DestinationGuides countryName={destination.name} />

      {/* 09 FAQ (LIGHT) */}
      <DestinationFaq countryName={destination.name} faqs={destination.faqs} />

      {/* 10 CTA (BLACK) */}
      <DestinationCta countryName={destination.name} countrySlug={destination.slug} />
    </article>
  );
}
