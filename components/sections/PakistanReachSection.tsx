import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const PakistanReachSection: React.FC = () => {
  const hubs = [
    { city: 'Lahore', slug: 'lahore', region: 'Punjab' },
    { city: 'Karachi', slug: 'karachi', region: 'Sindh' },
    { city: 'Islamabad', slug: 'islamabad', region: 'Capital Territory' },
    { city: 'Rawalpindi', slug: 'rawalpindi', region: 'Punjab' },
  ];

  return (
    <section className="w-full bg-brand-black py-16 lg:py-24 border-b border-border-dark text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Origin City List & Visual Anchor */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Nationwide Service"
              title="Serving Customers Across Pakistan"
              subtitle="Cargo shipping operations serving origin locations throughout Pakistan for international dispatch."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />
            <p className="text-body-md text-slate-300 leading-relaxed">
              Whether shipping personal items or commercial cargo, we facilitate collection and freight handling across major urban centers in Pakistan.
            </p>

            {/* Freight Terminal Photo Slot Anchor */}
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-border-dark bg-brand-navy/80 backdrop-blur-xs">
              <Image
                src={IMAGE_SLOTS.pakistanHub.src}
                alt={IMAGE_SLOTS.pakistanHub.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-300 font-semibold">
                PAKISTAN EXPORT CARGO HUB
              </div>
            </div>

            <div className="pt-2">
              <TextLink href="/locations" showIcon className="font-semibold text-accent">
                Explore Origin Hub Locations
              </TextLink>
            </div>
          </div>

          {/* Right Column: Origin Cities Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hubs.map((hub) => (
              <div
                key={hub.slug}
                className="bg-brand-navy/80 backdrop-blur-xs p-5 rounded-md border border-border-dark flex items-start gap-3.5 hover:border-slate-700 transition-colors"
              >
                <div className="p-2 bg-brand-black-deep rounded-md shrink-0 border border-border-dark">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-bold text-white">{hub.city}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{hub.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
