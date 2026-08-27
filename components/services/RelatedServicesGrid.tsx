import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { servicesRegistry } from '@/config/services.config';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface RelatedServicesGridProps {
  relatedSlugs: string[];
}

export const RelatedServicesGrid: React.FC<RelatedServicesGridProps> = ({ relatedSlugs }) => {
  // Filter related services using publication lookup abstraction
  const publishedRelated = servicesRegistry.filter(
    (s) => relatedSlugs.includes(s.slug) && isPublishedEntity('service', s.slug)
  );

  if (publishedRelated.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12">
      <Container>
        <SectionHeading
          badge="Complementary Logistics"
          title="Related Cargo Services"
          subtitle="Explore additional cargo shipping modes and logistics options."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {publishedRelated.map((service) => (
            <div
              key={service.slug}
              className="bg-surface p-5 rounded-md border border-border space-y-3 shadow-2xs hover:border-border-strong transition-colors"
            >
              <h3 className="text-heading-sm font-bold text-foreground">{service.name}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                {service.shortDescription}
              </p>
              <TextLink href={`/services/${service.slug}`} showIcon className="text-xs font-semibold">
                View Service Details
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
