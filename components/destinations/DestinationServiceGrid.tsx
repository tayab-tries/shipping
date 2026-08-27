import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { servicesRegistry } from '@/config/services.config';
import { isPublishedEntity } from '@/lib/content/publication-gate';

export interface DestinationServiceGridProps {
  countryName: string;
  supportedServices: string[];
}

export const DestinationServiceGrid: React.FC<DestinationServiceGridProps> = ({
  countryName,
  supportedServices,
}) => {
  const publishedServices = servicesRegistry.filter(
    (s) => supportedServices.includes(s.slug) && isPublishedEntity('service', s.slug)
  );

  if (publishedServices.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="Supported Modes"
          title={`Available Cargo Services to ${countryName}`}
          subtitle={`Verified shipping options available for freight originating in Pakistan heading to ${countryName}.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {publishedServices.map((service) => (
            <div
              key={service.slug}
              className="bg-surface p-6 rounded-md border border-border space-y-4 shadow-2xs hover:border-border-strong transition-colors min-w-0"
            >
              <h3 className="text-heading-sm font-bold text-foreground">{service.name}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                {service.shortDescription}
              </p>
              <TextLink href={`/services/${service.slug}`} showIcon className="text-xs font-semibold">
                Service Overview
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
