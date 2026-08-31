import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const PakistanReachSection: React.FC = () => {
  const verifiedCities = [
    { name: 'Lahore', slug: 'lahore' },
    { name: 'Karachi', slug: 'karachi' },
    { name: 'Islamabad', slug: 'islamabad' },
    { name: 'Rawalpindi', slug: 'rawalpindi' },
    { name: 'Faisalabad', slug: 'faisalabad' },
    { name: 'Sialkot', slug: 'sialkot' },
    { name: 'Multan', slug: 'multan' },
    { name: 'Peshawar', slug: 'peshawar' },
  ];

  return (
    <section className="w-full bg-brand-black py-20 lg:py-28 border-b border-border-dark text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Editorial Statement & Logistics Image (Col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Pakistan Origin Coverage"
              badgeVariant="outline-dark"
              title="Origin Cargo Pickup Across Pakistan"
              subtitle="Doorstep collection and export cargo dispatch operating across primary commercial cities."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />
            <p className="text-body-md text-slate-300 leading-relaxed font-normal">
              We arrange scheduled cargo pickups from commercial hubs and addresses across Pakistan, consolidating shipments for export clearance at international airport and seaport terminals.
            </p>

            <div className="relative aspect-[16/9] rounded-md border border-border-dark overflow-hidden bg-brand-black-deep mt-6">
              <Image
                src={IMAGE_SLOTS.pakistanHub.src}
                alt={IMAGE_SLOTS.pakistanHub.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300">
                Pakistan Export Cargo & Consolidation Desk
              </div>
            </div>
          </div>

          {/* Right Column: Clean City List with Row Dividers (Col-span-6) */}
          <div className="lg:col-span-6 bg-brand-navy/60 border border-border-dark rounded-md p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border-dark pb-4">
              <span className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
                Available Pickup Cities
              </span>
              <span className="text-xs font-mono text-slate-400">Scheduled Dispatch</span>
            </div>

            {/* List with Dividers (Not heavy cards) */}
            <div className="divide-y divide-border-dark">
              {verifiedCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="py-3.5 px-2 flex items-center justify-between hover:bg-brand-black-deep/50 rounded transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors shrink-0" />
                    <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      Cargo Collection in {city.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">Export Ready</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-border-dark flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Collection Services Active</span>
              <Link href="/locations" className="text-accent hover:underline font-semibold flex items-center gap-1">
                <span>View All Locations</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
