import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface RelatedLocationsBarProps {
  supportedOrigins: string[];
}

export const RelatedLocationsBar: React.FC<RelatedLocationsBarProps> = ({ supportedOrigins }) => {
  const publishedOrigins = supportedOrigins.filter((slug) =>
    isPublishedEntity('location', slug)
  );

  if (publishedOrigins.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-10 lg:py-12">
      <Container>
        <SectionHeading
          badge="Origins Context"
          title="Pakistan Origin Collection Hubs"
          subtitle="Local collection cities in Pakistan serving international cargo."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {publishedOrigins.map((slug) => (
            <div
              key={slug}
              className="bg-surface p-4 rounded-md border border-border flex flex-col justify-between space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground capitalize">{slug} Hub</h3>
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
