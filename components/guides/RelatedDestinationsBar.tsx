import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface RelatedDestinationsBarProps {
  supportedDestinations: string[];
}

export const RelatedDestinationsBar: React.FC<RelatedDestinationsBarProps> = ({
  supportedDestinations,
}) => {
  const publishedDestinations = supportedDestinations.filter((slug) =>
    isPublishedEntity('destination', slug)
  );

  if (publishedDestinations.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-10 lg:py-12">
      <Container>
        <SectionHeading
          badge="Destinations Context"
          title="Related Destination Corridors"
          subtitle="International destinations connected with this guide."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {publishedDestinations.map((slug) => (
            <div
              key={slug}
              className="bg-surface p-4 rounded-md border border-border flex flex-col justify-between space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground uppercase">{slug}</h3>
              <TextLink href={`/destinations/${slug}`} showIcon className="text-xs">
                View Destination Info
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
