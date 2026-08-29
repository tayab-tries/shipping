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
import { DestinationGuides } from '@/components/destinations/DestinationGuides';
import { DestinationFaq } from '@/components/destinations/DestinationFaq';
import { DestinationCta } from '@/components/destinations/DestinationCta';

interface CityPageProps {
  params: Promise<{ country: string; city: string }>;
}

/**
 * Pre-render static params for published destination city routes.
 */
export async function generateStaticParams() {
  const publishedCountries = getPublishedStaticDestinations();
  const params: Array<{ country: string; city: string }> = [];

  for (const country of publishedCountries) {
    for (const city of country.cities) {
      if (city.status === 'published' && city.isVerified === true && city.isIndexable === true) {
        params.push({
          country: country.slug,
          city: city.slug,
        });
      }
    }
  }

  return params;
}

/**
 * Dynamic metadata generator for destination city pages.
 */
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const result = getStaticDestinationCity(countrySlug, citySlug);

  if (!result) {
    return {
      title: `Destination City Not Found | ${siteConfig.name}`,
    };
  }

  const { city } = result;
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

export default async function DestinationCityDetailPage({ params }: CityPageProps) {
  const { country: countrySlug, city: citySlug } = await params;
  const result = getStaticDestinationCity(countrySlug, citySlug);

  // 1. Authoritative Publication Check (Parent Country + City 3-Way Gate)
  if (!result) {
    notFound();
  }

  const { country, city } = result;
  const quoteUrl = `/quote?destination=${country.slug}`;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: country.name, url: `/destinations/${country.slug}` },
    { label: city.name, url: `/destinations/${country.slug}/${city.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for destination city page
  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cargo & Shipping Services to ${city.name}, ${country.name}`,
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
    serviceType: 'International Cargo Shipping',
  };

  return (
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 01 HERO (Dark / Photo-led) */}
      <DestinationHero
        countryName={country.name}
        cityName={city.name}
        region={country.region}
        h1={city.h1}
        introduction={city.introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 OVERVIEW (LIGHT) */}
      <DestinationOverview
        countryName={`${city.name}, ${country.name}`}
        shippingOverview={city.overview || city.introduction}
      />

      {/* 03 AVAILABLE SERVICES (LIGHT / WHITE - Inherited from parent country) */}
      <DestinationServiceGrid
        countryName={`${city.name}, ${country.name}`}
        countrySlug={country.slug}
        supportedServices={country.supportedServices}
      />

      {/* 04 PAKISTAN ORIGIN CITIES (WHITE - Inherited from parent country) */}
      <DestinationOriginGrid
        countryName={`${city.name}, ${country.name}`}
        countrySlug={country.slug}
        supportedOrigins={country.supportedOrigins}
      />

      {/* 05 SHIPPING PROCESS (LIGHT) */}
      <DestinationProcess countryName={`${city.name}, ${country.name}`} />

      {/* 06 PREPARATION / CUSTOMS / DELIVERY NOTES (WHITE) */}
      <DestinationConsiderations
        countryName={`${city.name}, ${country.name}`}
        preparationConsiderations={city.preparationConsiderations || city.deliveryCoverageNotes}
      />

      {/* 07 GUIDES (WHITE) */}
      <DestinationGuides countryName={city.name} />

      {/* 08 FAQ (LIGHT) */}
      <DestinationFaq countryName={city.name} faqs={country.faqs} />

      {/* 09 CTA (BLACK) */}
      <DestinationCta countryName={`${city.name}, ${country.name}`} countrySlug={country.slug} />
    </article>
  );
}
