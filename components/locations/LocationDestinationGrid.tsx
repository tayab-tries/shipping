import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface LocationDestinationGridProps {
  cityName: string;
  supportedDestinations: string[];
}

export const LocationDestinationGrid: React.FC<LocationDestinationGridProps> = ({
  cityName,
  supportedDestinations,
}) => {
  const publishedDestinations = supportedDestinations.filter((slug) =>
    isPublishedEntity('destination', slug)
  );

  if (publishedDestinations.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="International Reach"
          title={`Popular Shipping Destinations from ${cityName}`}
          subtitle={`Key international shipping corridors connected with cargo dispatch from ${cityName}.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {publishedDestinations.map((slug) => (
            <div
              key={slug}
              className="bg-surface p-4 rounded-md border border-border flex flex-col justify-between space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground">{slug.toUpperCase()}</h3>
              <TextLink href={`/destinations/${slug}`} showIcon className="text-xs">
                View Destination Guide
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
