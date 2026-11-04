import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { getDestinationCityLinks } from '@/lib/destinations/city-logistics-data';

export interface DestinationCityLinksProps {
  countrySlug: string;
  citySlug: string;
  cityName: string;
  countryName: string;
}

/** Links a destination city page to its sibling cities first, then to every other profiled city abroad. */
export function DestinationCityLinks({ countrySlug, citySlug, cityName, countryName }: DestinationCityLinksProps) {
  const others = getDestinationCityLinks(`${countrySlug}/${citySlug}`);
  const sameCountry = others.filter((city) => city.countrySlug === countrySlug);
  const elsewhere = others.filter((city) => city.countrySlug !== countrySlug);

  if (others.length === 0) return null;

  const group = (title: string, cities: typeof others) =>
    cities.length > 0 && (
      <nav aria-label={title} className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cities.map((city) => (
            <Link
              key={city.key}
              href={city.href}
              className="flex items-center justify-between gap-3 p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-sm font-semibold text-brand-black transition-colors"
            >
              <span className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 shrink-0 text-accent-dark" />
                {city.label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            </Link>
          ))}
        </div>
      </nav>
    );

  return (
    <section className="w-full bg-surface pt-16 lg:pt-20 pb-8 text-brand-black">
      <Container>
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-heading-xl font-bold text-brand-black">Other delivery cities</h2>
            <p className="text-body-md text-slate-600 max-w-prose">
              Shipping somewhere other than {cityName}? We deliver door to door across {countryName} and to these cities abroad.
            </p>
          </div>
          {group(`More cities in ${countryName}`, sameCountry)}
          {group('Cities in other countries', elsewhere)}
        </div>
      </Container>
    </section>
  );
}
