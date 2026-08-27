import React from 'react';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface RelatedLocationsBarProps {
  locationSlugs: string[];
}

export const RelatedLocationsBar: React.FC<RelatedLocationsBarProps> = ({ locationSlugs }) => {
  // Filter origin locations using publication lookup abstraction
  const publishedLocations = locationSlugs.filter((slug) =>
    isPublishedEntity('location', slug)
  );

  // Safely omit rendering if no location pages are published yet
  if (publishedLocations.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-8">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            Pakistan Origin Pickup Cities
          </span>
          <div className="flex flex-wrap gap-4 text-xs">
            {publishedLocations.map((slug) => (
              <TextLink key={slug} href={`/locations/${slug}`}>
                {slug.toUpperCase()}
              </TextLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
