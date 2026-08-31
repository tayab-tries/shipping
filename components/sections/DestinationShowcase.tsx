import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const DestinationShowcase: React.FC = () => {
  const corridors = [
    { country: 'United Kingdom', code: 'uk', hub: 'London (LHR / LGW)', mode: 'Air & Sea Cargo' },
    { country: 'United Arab Emirates', code: 'uae', hub: 'Dubai (DXB / DWC)', mode: 'Express & Door-to-Door' },
    { country: 'United States', code: 'usa', hub: 'New York (JFK) & Major Ports', mode: 'Air & Sea Cargo' },
    { country: 'Canada', code: 'canada', hub: 'Toronto (YYZ)', mode: 'Air & Ocean Cargo' },
    { country: 'Saudi Arabia', code: 'ksa', hub: 'Riyadh (RUH) & Jeddah (JED)', mode: 'Direct Air & Doorstep' },
  ];

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Trade Corridors"
          title="Direct International Cargo Routes"
          subtitle="Cargo delivery routes connecting Pakistan export hubs with destination markets worldwide."
          className="mb-14"
        />

        {/* Trade Corridor Route Rows */}
        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {corridors.map((item) => (
            <Link
              key={item.code}
              href={`/destinations/${item.code}`}
              className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
            >
              {/* Route Direction & Country */}
              <div className="space-y-1 md:w-1/3">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span>Pakistan</span>
                  <span className="text-slate-400 font-bold">→</span>
                  <span className="font-semibold text-brand-black">{item.country}</span>
                </div>
                <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                  Cargo to {item.country}
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
                <span>View Route</span>
                <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Explore All International Destination Corridors →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
