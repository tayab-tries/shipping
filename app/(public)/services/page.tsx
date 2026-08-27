import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Plane, Ship, Truck, FileText, Building2, Luggage, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getEnabledServices } from '@/config/services.config';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Core Cargo & Logistics Services | ${siteConfig.name}`,
  description:
    'Explore international air freight, ocean sea cargo, door-to-door shipping, and commercial cargo services originating from Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/services`,
  },
};

const iconMap = {
  Package: Package,
  Plane: Plane,
  Ship: Ship,
  Truck: Truck,
  FileText: FileText,
  Building2: Building2,
  Luggage: Luggage,
};

export default function ServicesHubPage() {
  const services = getEnabledServices();

  const coreServices = services.filter((s) => s.category === 'core');
  const specializedServices = services.filter((s) => s.category === 'specialized');

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16">
      <Container>
        {/* Header & Breadcrumbs */}
        <div className="space-y-6 max-w-4xl mb-16">
          <Breadcrumbs items={breadcrumbs} />
          <SectionHeading
            badge="Service Architecture"
            title="Core International Cargo & Logistics Services"
            subtitle="Reliable shipping options connecting exporters, businesses, and individuals across Pakistan with global destinations."
          />
        </div>

        {/* Core Services Section */}
        {coreServices.length > 0 && (
          <div className="space-y-8 mb-16">
            <div className="border-b border-border pb-3">
              <h2 className="text-heading-md font-bold text-foreground flex items-center gap-2">
                <Badge variant="accent">Core Freight Modes</Badge>
                <span>Primary Cargo Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreServices.map((service) => {
                const IconComponent = iconMap[service.iconName] || Package;
                const quoteUrl = service.quoteCargoType
                  ? `/quote?cargo=${service.quoteCargoType}`
                  : '/quote';

                return (
                  <div
                    key={service.slug}
                    className="bg-surface p-6 rounded-md border border-border flex flex-col justify-between space-y-6 shadow-2xs hover:border-border-strong transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="p-3 bg-surface-muted rounded-md inline-block">
                        <IconComponent className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-heading-sm font-bold text-foreground">{service.name}</h3>
                      <p className="text-body-sm text-muted-foreground leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                      <TextLink href={`/services/${service.slug}`} showIcon className="text-xs font-semibold">
                        View Details
                      </TextLink>
                      <Link href={quoteUrl}>
                        <Button variant="outline" size="sm">
                          Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Specialized Services Section */}
        {specializedServices.length > 0 && (
          <div className="space-y-8 mb-16">
            <div className="border-b border-border pb-3">
              <h2 className="text-heading-md font-bold text-foreground flex items-center gap-2">
                <Badge variant="secondary">Specialized Logistics</Badge>
                <span>Commercial & Personal Cargo Solutions</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializedServices.map((service) => {
                const IconComponent = iconMap[service.iconName] || Package;

                return (
                  <div
                    key={service.slug}
                    className="bg-surface p-5 rounded-md border border-border flex flex-col justify-between space-y-4 hover:border-border-strong transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="p-2.5 bg-surface-muted rounded-md inline-block">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-heading-sm font-bold text-foreground">{service.name}</h3>
                      <p className="text-body-sm text-muted-foreground leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <TextLink href={`/services/${service.slug}`} showIcon className="text-xs font-semibold pt-2">
                      Explore Service
                    </TextLink>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selection Guidance Callout */}
        <div className="bg-surface-muted border border-border p-8 rounded-md space-y-4">
          <h2 className="text-heading-sm font-bold text-foreground">Need Assistance Choosing a Shipping Mode?</h2>
          <p className="text-body-sm text-muted-foreground leading-relaxed max-w-3xl">
            Air freight is ideal for urgent, high-priority cargo, while sea cargo is cost-effective for large commercial ocean freight. Door-to-door shipping provides integrated pickup and destination doorstep delivery.
          </p>
          <div className="pt-2">
            <Link href="/quote">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request a Custom Shipping Quote
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
