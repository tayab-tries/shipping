import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getPublishedLocations } from '@/lib/locations/location-content';
import { getLocationHref, toLocationKey, toLocationKeys } from '@/lib/locations/location-slugs';
import { getLahoreRouteForCountry, LAHORE_LOCATION_KEY } from '@/lib/routes/lahore-content';

export interface DestinationOriginGridProps {
  countryName: string;
  countrySlug: string;
  supportedOrigins?: string[];
}

export async function DestinationOriginGrid({
  countryName,
  countrySlug,
  supportedOrigins,
}: DestinationOriginGridProps) {
  const publishedLocations = await getPublishedLocations();

  // Null/broken CMS reference entries are dropped before matching
  const originKeys = toLocationKeys(supportedOrigins);

  const activeOrigins =
    originKeys.length > 0
      ? publishedLocations.filter(
          (loc) => originKeys.includes(loc.slug) || originKeys.includes(toLocationKey(loc.name))
        )
      : publishedLocations;

  const originsToRender = activeOrigins.length > 0 ? activeOrigins : publishedLocations;

  if (originsToRender.length === 0) return null;

  const lahoreRoute = getLahoreRouteForCountry(countrySlug);

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Pakistan Dispatch Hubs"
          title={`Origin Dispatch Cities to ${countryName}`}
          subtitle={`Doorstep collection and export handling available from key origin cities in Pakistan connecting with ${countryName}.`}
          className="mb-10"
        />

        {/* Editorial Contextual Cross-Linking Banner */}
        <div className="mb-10 p-6 bg-surface-subtle border border-border rounded-lg text-sm text-slate-700 leading-relaxed shadow-xs">
          <p className="font-medium text-slate-800">
            Ship directly to {countryName} from our primary Pakistan dispatch hubs including{' '}
            <Link href="/locations/international-cargo-services-in-lahore" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Lahore Cargo Office</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-karachi" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Karachi Cargo Hub</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-islamabad" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Islamabad Cargo Branch</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-sialkot" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Sialkot Export Cargo Hub</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-faisalabad" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Faisalabad Cargo Center</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-rawalpindi" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Rawalpindi Cargo Office</Link>,{' '}
            <Link href="/locations/international-cargo-services-in-multan" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Multan Cargo Office</Link>, and{' '}
            <Link href="/locations/international-cargo-services-in-peshawar" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Peshawar Cargo Branch</Link>.
            Every origin facility provides complete doorstep collection, commercial packing, export customs clearance, and air or sea consolidation to {countryName}.
          </p>
          {lahoreRoute && (
            <Link
              href={lahoreRoute.path}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-black hover:text-accent underline underline-offset-2"
            >
              Shipping from Lahore: {lahoreRoute.breadcrumbs[lahoreRoute.breadcrumbs.length - 1].label} rates and transit times
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="bg-surface-subtle rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {originsToRender.map((loc) => (
            <div
              key={loc.slug}
              className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/80 transition-colors group"
            >
              <div className="space-y-1 md:w-1/2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span>{loc.province}</span>
                  <span className="text-slate-400 font-bold">→</span>
                  <span className="font-semibold text-brand-black">{countryName}</span>
                </div>
                <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                  <Link href={getLocationHref(loc.slug)}>{loc.name}</Link>
                </h3>
              </div>

              <div className="flex items-center gap-4 md:justify-end md:w-1/2">
                {lahoreRoute && loc.slug === LAHORE_LOCATION_KEY && (
                  <Link
                    href={lahoreRoute.path}
                    className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    <span>Shipping from Lahore</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                  </Link>
                )}
                <Link
                  href={getLocationHref(loc.slug)}
                  className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <span>Explore Origin Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                </Link>
                <Link href={`/quote?origin=${loc.slug}&destination=${countrySlug}`}>
                  <span className="px-3 py-1.5 bg-surface rounded border border-border text-xs font-mono font-semibold hover:border-slate-400 transition-colors">
                    Quote Route
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
