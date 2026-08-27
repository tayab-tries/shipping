import React from 'react';
import Image from 'next/image';
import { Plane, Ship, Package, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const ServicesOverview: React.FC = () => {
  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-slate-200">
      <Container>
        <SectionHeading
          badge="Cargo Options"
          title="Core Cargo & Logistics Services"
          subtitle="Flexible air, ocean, and door-to-door cargo solutions tailored to your shipment requirements."
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />

        {/* Asymmetric Photography-Led 2:1 Feature Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
          {/* Featured Major Service (Air Freight Tarmac Loading - Spans 7 Cols) */}
          <div className="lg:col-span-7 bg-surface rounded-md border border-border-dark overflow-hidden flex flex-col justify-between group text-foreground shadow-md">
            <div className="relative w-full aspect-[16/9] bg-brand-black-deep">
              <Image
                src={IMAGE_SLOTS.serviceAir.src}
                alt={IMAGE_SLOTS.serviceAir.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="accent" size="md">Featured Service</Badge>
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-heading-lg font-bold text-foreground">Air Freight Services</h3>
                <Plane className="w-6 h-6 text-accent shrink-0" />
              </div>
              <p className="text-body-md text-muted-foreground leading-relaxed">
                Direct express air cargo transport from Pakistan export terminals to international airports worldwide. Ideal for time-sensitive commercial shipments and personal baggage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Express Flight Schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Volumetric Weight Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Airport Customs Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Sanitized Tracking Milestones</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <TextLink href="/services/air-freight" showIcon className="text-accent font-semibold">
                  Air Freight Service Details
                </TextLink>
              </div>
            </div>
          </div>

          {/* Supporting Services Column (Spans 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Sea Cargo Ocean Vessel */}
            <Card variant="bordered" className="bg-surface border-border-dark flex-1 flex flex-col justify-between overflow-hidden group">
              <div className="relative w-full h-44 bg-brand-black-deep">
                <Image
                  src={IMAGE_SLOTS.serviceSea.src}
                  alt={IMAGE_SLOTS.serviceSea.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
              </div>
              <CardHeader className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">Ocean Dispatch</Badge>
                  <Ship className="w-5 h-5 text-accent shrink-0" />
                </div>
                <CardTitle>Sea Cargo / Ocean Freight</CardTitle>
                <CardDescription>Ocean container shipping for heavy, bulk, and commercial cargo.</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <TextLink href="/services/sea-cargo" showIcon>
                  Sea Cargo Details
                </TextLink>
              </CardFooter>
            </Card>

            {/* Door-to-Door Courier Delivery */}
            <Card variant="bordered" className="bg-surface border-border-dark flex-1 flex flex-col justify-between overflow-hidden group">
              <div className="relative w-full h-44 bg-brand-black-deep">
                <Image
                  src={IMAGE_SLOTS.serviceDoor.src}
                  alt={IMAGE_SLOTS.serviceDoor.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
              </div>
              <CardHeader className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default">Complete Delivery</Badge>
                  <Package className="w-5 h-5 text-accent shrink-0" />
                </div>
                <CardTitle>Door-to-Door Shipping</CardTitle>
                <CardDescription>Integrated doorstep collection and final-mile destination delivery.</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <TextLink href="/services/door-to-door" showIcon>
                  Door-to-Door Details
                </TextLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
