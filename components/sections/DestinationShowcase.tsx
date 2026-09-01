import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationShowcaseProps {
  blockData?: Record<string, unknown>;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({ blockData }) => {
  const badge = (blockData?.badge as string) || 'Global Routes';
  const title = (blockData?.title as string) || 'POPULAR DESTINATIONS FROM PAKISTAN';
  const subtitle =
    (blockData?.subtitle as string) ||
    'Direct cargo delivery connecting Pakistan to major international destination countries.';

  const corridors = [
    { country: 'UK', code: 'uk', hub: 'London & UK Nationwide', mode: 'Air & Sea Cargo' },
    { country: 'UAE', code: 'uae', hub: 'Dubai & UAE Nationwide', mode: 'Air & Sea Cargo' },
    { country: 'Saudi Arabia', code: 'ksa', hub: 'Riyadh, Jeddah & KSA', mode: 'Air & Sea Cargo' },
    { country: 'Canada', code: 'canada', hub: 'Toronto & Canada Nationwide', mode: 'Air & Sea Cargo' },
    { country: 'USA', code: 'usa', hub: 'New York & USA Nationwide', mode: 'Air & Sea Cargo' },
  ];

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

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
                  <span className="text-slate-400 block">Coverage Area</span>
                  <span className="font-medium text-slate-800">{item.hub}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Delivery Service</span>
                  <span className="font-medium text-slate-800">{item.mode}</span>
                </div>
              </div>

              {/* Action Link Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black group-hover:text-accent transition-colors shrink-0">
                <span>View Country Details</span>
                <ArrowRight className="w-4 h-4 text-brand-black group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-black hover:text-accent transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Explore All Destinations From Pakistan →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
