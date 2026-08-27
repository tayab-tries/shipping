import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { DestinationCityData } from '@/lib/destinations/destination-content';

export interface DestinationSubCitiesGridProps {
  countryName: string;
  countrySlug: string;
  cities: DestinationCityData[];
}

export const DestinationSubCitiesGrid: React.FC<DestinationSubCitiesGridProps> = ({
  countryName,
  countrySlug,
  cities,
}) => {
  const publishedCities = cities.filter(
    (c) => c.status === 'published' && c.isVerified === true && c.isIndexable === true
  );

  if (publishedCities.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="City Destinations"
          title={`Popular Destination Cities in ${countryName}`}
          subtitle={`Key urban centers in ${countryName} receiving international cargo shipments.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {publishedCities.map((city) => (
            <div
              key={city.slug}
              className="bg-surface p-5 rounded-md border border-border space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground">{city.name}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-2">
                {city.introduction}
              </p>
              <TextLink href={`/destinations/${countrySlug}/${city.slug}`} showIcon className="text-xs font-semibold">
                {city.name} Cargo Info
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
