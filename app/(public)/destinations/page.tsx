import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getPublishedStaticDestinations } from '@/lib/destinations/destination-content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `International Shipping Destinations & Trade Corridors | ${siteConfig.name}`,
  description:
    'Explore verified international shipping corridors from Pakistan to the United Kingdom, United States, United Arab Emirates, Canada, Saudi Arabia, and worldwide.',
  alternates: {
    canonical: `${siteConfig.domain}/destinations`,
  },
};

export default function DestinationsHubPage() {
  const destinations = getPublishedStaticDestinations();

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Destinations', url: '/destinations' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16">
      <Container>
        {/* Header & Breadcrumbs */}
        <div className="space-y-6 max-w-4xl mb-12">
          <Breadcrumbs items={breadcrumbs} />
          <SectionHeading
            badge="Global Reach"
            title="International Shipping Destinations & Corridors"
            subtitle="Verified air freight and ocean sea cargo destinations served directly from shipping hubs across Pakistan."
          />
        </div>

        {/* Destination Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {destinations.map((dest) => (
            <div
              key={dest.slug}
              className="bg-surface p-6 rounded-md border border-border flex flex-col justify-between space-y-6 shadow-2xs hover:border-border-strong transition-colors min-w-0"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{dest.region}</Badge>
                  <Globe className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-heading-md font-bold text-foreground">{dest.name}</h2>
                <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {dest.introduction}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <TextLink href={`/destinations/${dest.slug}`} showIcon className="text-xs font-semibold">
                  Destination Corridor
                </TextLink>
                <Link href={`/quote?destination=${dest.slug}`}>
                  <Button variant="outline" size="sm">
                    Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Destination Inquiry */}
        <div className="bg-surface-muted border border-border p-8 rounded-md space-y-4 max-w-4xl">
          <h2 className="text-heading-sm font-bold text-foreground">Shipping to Other Destinations Worldwide</h2>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            If your target destination country is not listed above, our international cargo forwarding network coordinates custom delivery across 150+ countries worldwide.
          </p>
          <div className="pt-2">
            <Link href="/quote">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request a Custom Destination Quote
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
