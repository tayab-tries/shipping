import React from 'react';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface RelatedDestinationsBarProps {
  destinationSlugs: string[];
}

export const RelatedDestinationsBar: React.FC<RelatedDestinationsBarProps> = ({ destinationSlugs }) => {
  // Filter destinations using publication lookup abstraction
  const publishedDestinations = destinationSlugs.filter((slug) =>
    isPublishedEntity('destination', slug)
  );

  // Safely omit rendering if no destination pages are published yet
  if (publishedDestinations.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-8">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            Available Destination Corridors
          </span>
          <div className="flex flex-wrap gap-4 text-xs">
            {publishedDestinations.map((slug) => (
              <TextLink key={slug} href={`/destinations/${slug}`}>
                {slug.toUpperCase()}
              </TextLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
