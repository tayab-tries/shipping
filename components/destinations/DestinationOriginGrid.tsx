import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface DestinationOriginGridProps {
  countryName: string;
  supportedOrigins: string[];
}

export const DestinationOriginGrid: React.FC<DestinationOriginGridProps> = ({
  countryName,
  supportedOrigins,
}) => {
  const publishedOrigins = supportedOrigins.filter((slug) =>
    isPublishedEntity('location', slug)
  );

  if (publishedOrigins.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="Pakistan Origins"
          title={`Origin Cargo Hubs Shipping to ${countryName}`}
          subtitle={`Primary commercial collection cities in Pakistan dispatching cargo to ${countryName}.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {publishedOrigins.map((slug) => (
            <div
              key={slug}
              className="bg-surface p-4 rounded-md border border-border flex flex-col justify-between space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground capitalize">{slug} Origin Hub</h3>
              <TextLink href={`/locations/${slug}`} showIcon className="text-xs">
                City Shipping Info
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
