import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';

export const DestinationShowcase: React.FC = () => {
  const destinations = [
    { country: 'United Kingdom', slug: 'uk', region: 'Europe' },
    { country: 'United Arab Emirates', slug: 'uae', region: 'Middle East' },
    { country: 'United States', slug: 'usa', region: 'North America' },
    { country: 'Canada', slug: 'canada', region: 'North America' },
    { country: 'Saudi Arabia', slug: 'ksa', region: 'Middle East' },
  ];

  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-slate-200">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            badge="Global Reach"
            title="International Shipping Corridors"
            subtitle="Connecting shippers in Pakistan with key international cargo destinations."
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
          <TextLink href="/destinations" showIcon className="shrink-0 font-semibold text-accent">
            View All Destinations
          </TextLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <div
              key={dest.slug}
              className="bg-surface p-5 rounded-md border border-border-dark flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                  {dest.region}
                </span>
                <h3 className="text-heading-sm font-bold text-foreground">{dest.country}</h3>
              </div>
              <TextLink href={`/destinations/${dest.slug}`} variant="muted" showIcon className="text-xs">
                Destination Guide
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
