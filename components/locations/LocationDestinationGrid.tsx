import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getLocationHref, resolveSupportedDestinations, toLocationKey } from '@/lib/locations/location-slugs';

export interface LocationDestinationGridProps {
  cityName: string;
  supportedDestinations?: string[];
}

const destinationMap: Record<string, { country: string; hub: string; mode: string }> = {
  uk: { country: 'United Kingdom', hub: 'London Heathrow (LHR) & Regional Hubs', mode: 'Direct Air & Sea Cargo' },
  uae: { country: 'United Arab Emirates', hub: 'Dubai (DXB / DWC) & Port Rashid', mode: 'Express Air & Doorstep Delivery' },
  usa: { country: 'United States', hub: 'New York (JFK) & Major Ports', mode: 'Commercial Air & Container Shipping' },
  canada: { country: 'Canada', hub: 'Toronto Pearson (YYZ)', mode: 'Air Cargo & Consolidated Ocean' },
  ksa: { country: 'Saudi Arabia', hub: 'Riyadh (RUH) & Jeddah Port', mode: 'Direct Air Cargo & Doorstep Delivery' },
};

const keyDestinationCities = [
  { name: 'London, UK', href: '/destinations/uk/london' },
  { name: 'Manchester, UK', href: '/destinations/uk/manchester' },
  { name: 'Birmingham, UK', href: '/destinations/uk/birmingham' },
  { name: 'Dubai, UAE', href: '/destinations/uae/dubai' },
  { name: 'Abu Dhabi, UAE', href: '/destinations/uae/abu-dhabi' },
  { name: 'Riyadh, KSA', href: '/destinations/ksa/riyadh' },
  { name: 'Jeddah, KSA', href: '/destinations/ksa/jeddah' },
  { name: 'Toronto, Canada', href: '/destinations/canada/toronto' },
  { name: 'Vancouver, Canada', href: '/destinations/canada/vancouver' },
  { name: 'New York, USA', href: '/destinations/usa/new-york' },
  { name: 'Chicago, USA', href: '/destinations/usa/chicago' },
  { name: 'Houston, USA', href: '/destinations/usa/houston' },
];

const pakistanOrigins = [
  { key: 'lahore', name: 'Lahore Cargo Office' },
  { key: 'karachi', name: 'Karachi Cargo Hub' },
  { key: 'islamabad', name: 'Islamabad Cargo Branch' },
  { key: 'rawalpindi', name: 'Rawalpindi Cargo Office' },
  { key: 'faisalabad', name: 'Faisalabad Cargo Center' },
  { key: 'sialkot', name: 'Sialkot Cargo Hub' },
  { key: 'multan', name: 'Multan Cargo Office' },
  { key: 'peshawar', name: 'Peshawar Cargo Branch' },
].map((hub) => ({ ...hub, href: getLocationHref(hub.key) }));

export const LocationDestinationGrid: React.FC<LocationDestinationGridProps> = ({
  cityName,
  supportedDestinations,
}) => {
  // Empty/missing lists fall back to the default corridors; null or unknown entries are dropped
  const activeDestinations = resolveSupportedDestinations(supportedDestinations)
    .filter((slug) => slug in destinationMap)
    .map((slug) => ({ slug, ...destinationMap[slug] }));

  const currentKey = toLocationKey(cityName);
  const peerOrigins = pakistanOrigins.filter((hub) => hub.key !== currentKey);

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Trade Corridors"
          title={`International Shipping Routes from ${cityName}`}
          subtitle={`Direct cargo trade corridors connecting export dispatch in ${cityName} with global markets.`}
          className="mb-10"
        />

        {/* Editorial Contextual Cross-Linking Banner */}
        <div className="mb-10 p-6 bg-surface-subtle border border-border rounded-lg text-sm text-slate-700 leading-relaxed shadow-xs">
          <p className="font-medium text-slate-800">
            Providing direct air and sea freight export routes from {cityName} to{' '}
            <Link href="/destinations/uk/london" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">London, UK</Link>,{' '}
            <Link href="/destinations/uae/dubai" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Dubai, UAE</Link>,{' '}
            <Link href="/destinations/ksa/jeddah" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Jeddah, KSA</Link>,{' '}
            <Link href="/destinations/canada/toronto" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">Toronto, Canada</Link>, and{' '}
            <Link href="/destinations/usa/new-york" className="font-semibold text-brand-black hover:text-accent underline underline-offset-2">New York, USA</Link>.
            Every shipment dispatched from our {cityName} facility includes complete doorstep pickup, customs documentation, and customs clearance support.
          </p>
        </div>

        {/* Clean Trade Route Rows */}
        {activeDestinations.length > 0 && (
          <div className="bg-surface-subtle rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
            {activeDestinations.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/80 transition-colors group"
              >
                {/* Route Direction & Country */}
                <div className="space-y-1 md:w-1/3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span>{cityName}</span>
                    <span className="text-slate-400 font-bold">→</span>
                    <span className="font-semibold text-brand-black">{item.country}</span>
                  </div>
                  <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                    Cargo from {cityName} to {item.country}
                  </h3>
                </div>

                {/* Hub & Transit Mode Metadata */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 text-xs font-mono text-slate-600 md:w-1/2">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block">Destination Hubs</span>
                    <span className="font-medium text-slate-800">{item.hub}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block">Available Service</span>
                    <span className="font-medium text-slate-800">{item.mode}</span>
                  </div>
                </div>

                {/* Action Link Indicator */}
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black group-hover:text-accent transition-colors shrink-0">
                  <span>View Corridor</span>
                  <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Key Metro Delivery Cities from this Origin */}
        <div className="mt-12 p-6 bg-surface-subtle rounded-md border border-border space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-brand-black">
              Direct Metro Delivery Hubs Served from {cityName}
            </h4>
            <span className="text-[11px] font-mono text-slate-500">12 Verified Terminals</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {keyDestinationCities.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="px-3 py-2 bg-surface hover:bg-slate-100 rounded border border-border text-xs font-medium text-slate-700 hover:text-accent-dark transition-colors truncate text-center"
                title={`Cargo from ${cityName} to ${city.name}`}
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Other Pakistan Departure Hubs */}
        <div className="mt-8 p-6 bg-surface-subtle rounded-md border border-border space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-brand-black">
              Also Dispatching Cargo from Other Pakistan Centers
            </h4>
            <span className="text-[11px] font-mono text-slate-500">Nationwide Pickup</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {peerOrigins.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="px-3 py-1.5 bg-surface hover:bg-slate-100 rounded border border-border text-xs font-medium text-slate-700 hover:text-accent-dark transition-colors"
              >
                {hub.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Explore All Destination Corridors Served from Pakistan →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
