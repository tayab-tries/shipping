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
import { CityGatewayRouting } from '@/components/destinations/CityGatewayRouting';
import { CityDeliveryCoverage } from '@/components/destinations/CityDeliveryCoverage';
import { getSanityDestinationCityBySlugs, getSanityDestinationsList } from '@/sanity/lib/fetch';
import { getCityLogisticsData, cityLogisticsProfiles } from '@/lib/destinations/city-logistics-data';

interface CityPageProps {
  params: Promise<{ country: string; city: string }>;
}

/**
 * Pre-render static params for published destination city routes.
 */
export async function generateStaticParams() {
  const sanityDestinations = await getSanityDestinationsList();
  const params: Array<{ country: string; city: string }> = [];
  const seenKeys = new Set<string>();

  if (sanityDestinations && sanityDestinations.length > 0) {
    for (const country of sanityDestinations) {
      if (country.cities) {
        for (const city of country.cities) {
          const key = `${country.slug}/${city.slug}`;
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            params.push({
              country: country.slug,
              city: city.slug,
            });
          }
        }
      }
    }
  }

  // Ensure all 12 core diaspora hub profiles are represented
  for (const profile of Object.values(cityLogisticsProfiles)) {
    const key = `${profile.countrySlug}/${profile.citySlug}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      params.push({
        country: profile.countrySlug,
        city: profile.citySlug,
      });
    }
  }

  const publishedCountries = getPublishedStaticDestinations();
  for (const country of publishedCountries) {
    for (const city of country.cities) {
      if (city.status === 'published' && city.isVerified === true && city.isIndexable === true) {
        const key = `${country.slug}/${city.slug}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          params.push({
            country: country.slug,
            city: city.slug,
          });
        }
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
  const sanityCity = await getSanityDestinationCityBySlugs(countrySlug, citySlug, { stega: false });
  const fallbackResult = getStaticDestinationCity(countrySlug, citySlug);
  const cityLogistics = getCityLogisticsData(countrySlug, citySlug);

  if (!sanityCity && !fallbackResult && !cityLogistics) {
    return {
      title: `Destination City Not Found | ${siteConfig.name}`,
    };
  }

  const cityName = sanityCity?.name || cityLogistics?.cityName || fallbackResult?.city.name || citySlug;
  const countryName = sanityCity?.country?.name || cityLogistics?.countryName || fallbackResult?.country.name || countrySlug;

  const title =
    sanityCity?.seo?.metaTitle ||
    cityLogistics?.metaTitle ||
    (fallbackResult ? `${fallbackResult.city.seoTitle} | ${siteConfig.name}` : `Cargo to ${cityName}, ${countryName} | ${siteConfig.name}`);

  const description =
    sanityCity?.seo?.metaDescription ||
    cityLogistics?.metaDescription ||
    fallbackResult?.city.seoDescription ||
    `Cargo shipping services to ${cityName}, ${countryName}. Door-to-door delivery, customs clearance, and air & sea freight from Pakistan.`;

  const canonicalUrl = `https://raahiinternational.com/destinations/${countrySlug}/${citySlug}`;

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
      images: sanityCity?.seo?.socialImage ? [{ url: sanityCity.seo.socialImage }] : [],
    },
  };
}

export default async function DestinationCityDetailPage({ params }: CityPageProps) {
  const { country: countrySlug, city: citySlug } = await params;
  const sanityCity = await getSanityDestinationCityBySlugs(countrySlug, citySlug);
  const fallbackResult = getStaticDestinationCity(countrySlug, citySlug);
  const cityLogistics = getCityLogisticsData(countrySlug, citySlug);

  // Authoritative Publication Check
  if (!sanityCity && !fallbackResult && !cityLogistics) {
    notFound();
  }

  const countryName = sanityCity?.country?.name || cityLogistics?.countryName || fallbackResult?.country.name || countrySlug;
  const cityName = sanityCity?.name || cityLogistics?.cityName || fallbackResult?.city.name || citySlug;
  const region = sanityCity?.country?.region || 'Global';
  const h1 = sanityCity?.h1 || cityLogistics?.h1 || fallbackResult?.city.h1 || `Cargo Services to ${cityName}, ${countryName}`;
  const introduction =
    sanityCity?.introduction ||
    cityLogistics?.metaDescription ||
    fallbackResult?.city.introduction ||
    `Cargo shipping to ${cityName}, ${countryName}.`;
  const overview =
    sanityCity?.overview ||
    cityLogistics?.editorialOverview ||
    fallbackResult?.city.overview ||
    introduction;
  const preparationConsiderations =
    sanityCity?.preparationConsiderations ||
    cityLogistics?.customsProcedures.dutyVatSummary ||
    fallbackResult?.city.preparationConsiderations ||
    '';

  const supportedServices = sanityCity?.country?.supportedServices || fallbackResult?.country.supportedServices || ['air-freight', 'sea-cargo'];
  const supportedOrigins = sanityCity?.country?.supportedOrigins || fallbackResult?.country.supportedOrigins || ['lahore', 'karachi', 'islamabad', 'sialkot'];
  const cityFaqs = cityLogistics?.faqs || sanityCity?.country?.faqs || fallbackResult?.country.faqs || [];

  const quoteUrl = `/quote?destination=${countrySlug}`;

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
    { label: countryName, url: `/destinations/${countrySlug}` },
    { label: cityName, url: `/destinations/${countrySlug}/${citySlug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Service Schema for destination city page
  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cargo & Shipping Services to ${cityName}, ${countryName}`,
    description: sanityCity?.seo?.metaDescription || cityLogistics?.metaDescription || `Cargo shipping to ${cityName}`,
    provider: {
      '@id': 'https://raahiinternational.com/#organization',
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'Country',
        name: countryName,
      },
    },
    serviceType: 'International Cargo Shipping',
  };

  // FAQPage Schema for destination city page
  const cityFaqJsonLd = cityFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

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
      {cityFaqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cityFaqJsonLd) }}
        />
      )}

      {/* 01 HERO (Dark / Photo-led) */}
      <DestinationHero
        countryName={countryName}
        cityName={cityName}
        region={region}
        h1={h1}
        introduction={introduction}
        quoteUrl={quoteUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 LOCAL GATEWAY ROUTING & TIMELINES (LIGHT SUBTLE) */}
      {cityLogistics && <CityGatewayRouting profile={cityLogistics} />}

      {/* 03 METROPOLITAN DELIVERY COVERAGE & COMMODITIES (WHITE) */}
      {cityLogistics && <CityDeliveryCoverage profile={cityLogistics} />}

      {/* 04 OVERVIEW (LIGHT) */}
      <DestinationOverview
        countryName={`${cityName}, ${countryName}`}
        shippingOverview={overview}
      />

      {/* 05 AVAILABLE SERVICES (LIGHT / WHITE - Inherited from parent country) */}
      <DestinationServiceGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedServices={supportedServices}
      />

      {/* 06 PAKISTAN ORIGIN CITIES (WHITE - Inherited from parent country) */}
      <DestinationOriginGrid
        countryName={`${cityName}, ${countryName}`}
        countrySlug={countrySlug}
        supportedOrigins={supportedOrigins}
      />

      {/* 07 SHIPPING PROCESS (LIGHT) */}
      <DestinationProcess countryName={`${cityName}, ${countryName}`} />

      {/* 08 PREPARATION / CUSTOMS / DELIVERY NOTES (WHITE) */}
      <DestinationConsiderations
        countryName={`${cityName}, ${countryName}`}
        preparationConsiderations={preparationConsiderations}
      />

      {/* 09 GUIDES (WHITE) */}
      <DestinationGuides countryName={cityName} />

      {/* 10 CITY-SPECIFIC FAQ ACCORDION (LIGHT) */}
      <DestinationFaq countryName={cityName} faqs={cityFaqs} />

      {/* 11 CTA (BLACK) */}
      <DestinationCta countryName={`${cityName}, ${countryName}`} countrySlug={countrySlug} />
    </article>
  );
}
