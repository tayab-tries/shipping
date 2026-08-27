import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { QuoteFormController } from '@/components/quote/QuoteFormController';
import { getPublishedStaticLocations } from '@/lib/locations/location-content';
import { getPublishedStaticDestinations } from '@/lib/destinations/destination-content';
import { cargoTypes } from '@/types/content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Request an International Cargo Quote | ${siteConfig.name}`,
  description:
    'Request a custom quotation for air freight, sea cargo, door-to-door shipping, or commercial freight originating in Pakistan.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.domain}/quote`,
  },
};

interface QuotePageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    cargo?: string;
  }>;
}

export default async function PublicQuotePage({ searchParams }: QuotePageProps) {
  const { origin: rawOrigin, destination: rawDestination, cargo: rawCargo } = await searchParams;

  const publishedLocations = getPublishedStaticLocations();
  const publishedDestinations = getPublishedStaticDestinations();

  // Validate prefill origin query param
  const validOrigin = publishedLocations.some((l) => l.slug === rawOrigin)
    ? rawOrigin
    : '';

  // Validate prefill destination query param
  const validDestination = publishedDestinations.some((d) => d.slug === rawDestination)
    ? rawDestination
    : '';

  // Safe Cargo Type prefill mapping
  const cargoSlugMap: Record<string, string> = {
    'air-freight': 'air_freight',
    'sea-cargo': 'sea_cargo',
    'door-to-door': 'door_to_door',
    'commercial-cargo': 'commercial_freight',
    'excess-baggage': 'excess_baggage',
  };

  const normalizedCargoKey = rawCargo ? cargoSlugMap[rawCargo] || rawCargo : undefined;

  const validCargo = (cargoTypes as readonly string[]).includes(normalizedCargoKey || '')
    ? normalizedCargoKey
    : 'air_freight';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Request a Quote', url: '/quote' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16">
      <Container>
        <div className="space-y-6 max-w-4xl mx-auto mb-10 text-center">
          <Breadcrumbs items={breadcrumbs} className="justify-center" />
          <SectionHeading
            badge="Tailored Freight Quotation"
            title="Request Your Shipping Quote"
            subtitle="Fill out your shipment details below. Our operations team will evaluate your cargo specifications and issue an official quote."
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <QuoteFormController
            initialOrigin={validOrigin}
            initialDestination={validDestination}
            initialCargo={validCargo}
            locations={publishedLocations.map((l) => ({ name: l.name, slug: l.slug }))}
            destinations={publishedDestinations.map((d) => ({ name: d.name, slug: d.slug }))}
          />
        </div>
      </Container>
    </div>
  );
}
