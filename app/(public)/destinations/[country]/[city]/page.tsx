import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedStaticDestinations,
  getStaticDestinationCity,
} from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { DestinationOverview } from '@/components/destinations/DestinationOverview';
import { DestinationServiceGrid } from '@/components/destinations/DestinationServiceGrid';
import { DestinationOriginGrid } from '@/components/destinations/DestinationOriginGrid';
import { DestinationProcess } from '@/components/destinations/DestinationProcess';
import { DestinationConsiderations } from '@/components/destinations/DestinationConsiderations';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';

interface DestinationCityPageProps {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  const publishedDestinations = getPublishedStaticDestinations();
  const paramsList: Array<{ country: string; city: string }> = [];

  for (const country of publishedDestinations) {
    for (const city of country.cities) {
      if (city.status === 'published' && city.isVerified === true && city.isIndexable === true) {
        paramsList.push({
          country: country.slug,
          city: city.slug,
        });
      }
    }
  }

  return paramsList;
}

export async function generateMetadata({ params }: DestinationCityPageProps): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const match = getStaticDestinationCity(countrySlug, citySlug);

  if (!match) {
    return {
      title: `Destination City Not Found | ${siteConfig.name}`,
    };
  }

  const { city } = match;
  const canonicalUrl = `${siteConfig.domain}/destinations/${countrySlug}/${city.slug}`;

  return {
    title: `${city.seoTitle} | ${siteConfig.name}`,
    description: city.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${city.seoTitle} | ${siteConfig.name}`,
      description: city.seoDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function DestinationCityDetailPage({ params }: DestinationCityPageProps) {
  const { country: countrySlug, city: citySlug } = await params;
  const match = getStaticDestinationCity(countrySlug, citySlug);

  // Authoritative Parent & Child Publication Check
  if (!match) {
    notFound();
  }

  const { country, city } = match;
  const quoteUrl = `/quote?destination=${country.slug}`;
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: country.name, url: `/destinations/${country.slug}` },
    { label: city.name, url: `/destinations/${country.slug}/${city.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for Destination City Page
  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cargo Shipping from Pakistan to ${city.name}, ${country.name}`,
    description: city.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'Country',
        name: country.name,
      },
    },
    serviceType: 'International Cargo Delivery',
  };

  return (
    <article className="w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. Destination City Hero */}
      <DestinationHero
        countryName={`${city.name}, ${country.name}`}
        region={country.region}
        h1={city.h1}
        introduction={city.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. City Shipping Overview */}
      <DestinationOverview
        countryName={`${city.name}, ${country.name}`}
        shippingOverview={city.overview || country.shippingOverview}
      />

      {/* 3. Inherited Cargo Services Grid */}
      <DestinationServiceGrid
        countryName={city.name}
        supportedServices={country.supportedServices}
      />

      {/* 4. Inherited Pakistan Origin Cargo Hubs */}
      <DestinationOriginGrid
        countryName={city.name}
        supportedOrigins={country.supportedOrigins}
      />

      {/* 5. 4-Step Shipping Process */}
      <DestinationProcess countryName={`${city.name}, ${country.name}`} />

      {/* 6. City-Specific Preparation & Coverage Considerations */}
      <DestinationConsiderations
        countryName={`${city.name}, ${country.name}`}
        customsGuidance={city.preparationConsiderations || city.deliveryCoverageNotes || country.customsGuidance}
      />

      {/* 7. Country FAQ Accordion */}
      <DestinationFaq countryName={`${city.name}, ${country.name}`} faqs={country.faqs} />

      {/* 8. High-Impact Quote CTA */}
      <DestinationCta countryName={`${city.name}, ${country.name}`} slug={country.slug} />
    </article>
  );
}
