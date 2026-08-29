import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Plane, Ship, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const ServicesOverview: React.FC = () => {
  return (
    <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white">
      <Container>
        <SectionHeading
          badge="Core Capabilities"
          title="Integrated Freight Forwarding Services"
          subtitle="Express commercial air freight, ocean container shipping, and door-to-door cargo dispatch."
          className="mb-14 [&_h2]:text-white [&_p]:text-slate-300"
          badgeVariant="outline-dark"
        />

        {/* Behance-Style Asymmetric Composition (Left 7 Cols Dominant Air Freight, Right 5 Cols Editorial Rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Dominant Featured Service: Express Air Freight (Col-span-7) */}
          <div className="lg:col-span-7 bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-8 lg:p-10 flex flex-col justify-between space-y-8 group hover:border-slate-700 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="accent">Featured Freight Mode</Badge>
                <Plane className="w-6 h-6 text-slate-400" />
              </div>

              <div className="space-y-3">
                <h3 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors">
                  Express Air Freight Forwarding
                </h3>
                <p className="text-body-md text-slate-300 leading-relaxed max-w-xl">
                  Time-critical airport-to-airport and door-to-door express air cargo solutions. Scheduled carrier allocations optimized for high-value commercial goods, documents, and urgent export shipments.
                </p>
              </div>

              {/* Dominant Service Photo Anchor */}
              <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-brand-black border border-border-dark mt-4">
                <Image
                  src={IMAGE_SLOTS.serviceAir.src}
                  alt={IMAGE_SLOTS.serviceAir.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300">
                  Palletized Air Cargo Loading Desk
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-dark flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Scheduled Flight Allocations</span>
              <Link href="/services/air-freight">
                <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  Explore Air Freight
                </Button>
              </Link>
            </div>
          </div>

          {/* Supporting Services: Editorial Rows (Col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Supporting Service Row 1: Sea Cargo */}
            <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6 flex-1 flex flex-col justify-between group hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border-dark pb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Ocean Logistics</span>
                  <Ship className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-heading-lg font-bold text-white group-hover:text-accent transition-colors">
                  Sea Cargo Shipping (FCL / LCL)
                </h3>
                <p className="text-body-sm text-slate-300 leading-relaxed">
                  Full container load (FCL) and consolidated less-than-container (LCL) ocean freight services for heavy commercial exports.
                </p>
              </div>

              <div className="pt-4 border-t border-border-dark flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Seaport Corridors</span>
                <Link
                  href="/services/sea-cargo"
                  className="text-xs font-mono font-semibold text-slate-200 hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <span>Sea Freight Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                </Link>
              </div>
            </div>

            {/* Supporting Service Row 2: Door-to-Door */}
            <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6 flex-1 flex flex-col justify-between group hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border-dark pb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Complete Forwarding</span>
                  <Truck className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-heading-lg font-bold text-white group-hover:text-accent transition-colors">
                  Door-to-Door Cargo Delivery
                </h3>
                <p className="text-body-sm text-slate-300 leading-relaxed">
                  End-to-end collection across Pakistan cities with international doorstep destination delivery and customs processing.
                </p>
              </div>

              <div className="pt-4 border-t border-border-dark flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Doorstep Collection</span>
                <Link
                  href="/services/door-to-door"
                  className="text-xs font-mono font-semibold text-slate-200 hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <span>Door-to-Door Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
