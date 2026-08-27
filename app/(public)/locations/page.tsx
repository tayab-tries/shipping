import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getPublishedStaticLocations } from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Pakistan Cargo Pickup Locations & Origin Hubs | ${siteConfig.name}`,
  description:
    'Explore international cargo shipping pickup centers and origin hubs across major cities in Pakistan including Lahore, Karachi, Islamabad, and Rawalpindi.',
  alternates: {
    canonical: `${siteConfig.domain}/locations`,
  },
};

export default function LocationsHubPage() {
  const locations = getPublishedStaticLocations();

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16">
      <Container>
        {/* Header & Breadcrumbs */}
        <div className="space-y-6 max-w-4xl mb-12">
          <Breadcrumbs items={breadcrumbs} />
          <SectionHeading
            badge="Pakistan Reach"
            title="International Cargo Shipping Origin Hubs"
            subtitle="Cargo collection and international shipping dispatch available across major urban centers in Pakistan."
          />
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="bg-surface p-6 rounded-md border border-border flex flex-col justify-between space-y-6 shadow-2xs hover:border-border-strong transition-colors min-w-0"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{loc.province}</Badge>
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-heading-md font-bold text-foreground">{loc.name}</h2>
                <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {loc.introduction}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <TextLink href={`/locations/${loc.slug}`} showIcon className="text-xs font-semibold">
                  Location Hub
                </TextLink>
                <Link href={`/quote?origin=${loc.slug}`}>
                  <Button variant="outline" size="sm">
                    Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Location Assistance */}
        <div className="bg-surface-muted border border-border p-8 rounded-md space-y-4 max-w-4xl">
          <h2 className="text-heading-sm font-bold text-foreground">Cargo Dispatch from Other Cities in Pakistan</h2>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            If your origin city is not listed above, our regional dispatch logistics coordinates collection from surrounding districts across Pakistan.
          </p>
          <div className="pt-2">
            <Link href="/quote">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request a Custom Origin Quote
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
