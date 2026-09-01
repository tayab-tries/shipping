import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedLocations } from '@/lib/locations/location-content';
import { siteConfig } from '@/config/site.config';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const metadata: Metadata = {
  title: `Pakistan Cargo Pickup Locations & Origin Hubs | ${siteConfig.name}`,
  description:
    'Explore international cargo shipping pickup centers and origin hubs across major cities in Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/locations`,
  },
};

export default async function LocationsHubPage() {
  const locations = await getPublishedLocations();

  const featuredCity = locations.length > 0 ? locations[0] : null;
  const supportingCities = locations.length > 1 ? locations.slice(1) : [];

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
  ];

  return (
    <div className="w-full bg-background">
      {/* 1. Locations Hero */}
      <section className="relative w-full bg-brand-black text-white py-16 lg:py-24 border-b border-border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-black-deep">
          <Image
            src={IMAGE_SLOTS.pakistanHub.src}
            alt="Pakistan Export Freight Hubs"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none hidden md:block"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(7,10,15,0.96) 0%,
                rgba(7,10,15,0.88) 35%,
                rgba(7,10,15,0.65) 65%,
                rgba(7,10,15,0.30) 100%
              )`,
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none md:hidden"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(7,10,15,0.88) 0%,
                rgba(7,10,15,0.70) 50%,
                rgba(7,10,15,0.85) 100%
              )`,
            }}
          />
        </div>

        <Container className="relative z-20">
          <Breadcrumbs items={breadcrumbs} variantSurface="dark" className="mb-6" />

          <div className="max-w-3xl space-y-6">
            <Badge variant="outline-dark" size="md" className="text-slate-300 border-border-dark bg-brand-black/60 backdrop-blur-xs">
              Pakistan Origin Coverage
            </Badge>

            <h1 className="text-display-xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              International Cargo Services Across Pakistan
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Doorstep cargo collection and export freight dispatch operating across primary commercial cities in Pakistan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/quote">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto h-[46px]"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Get a Shipping Quote
                </Button>
              </Link>

              <Link href="/track">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto h-[46px]"
                  leftIcon={<Search className="w-4 h-4 text-slate-300 shrink-0" />}
                >
                  Track Shipment
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Featured Origin Cities / Empty State */}
      <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white">
        <Container>
          <SectionHeading
            badge="Origin Destinations"
            title="Primary Pakistan Export Hubs"
            subtitle="Scheduled doorstep collection and cargo handling facilities across key origin cities."
            className="mb-14 [&_h2]:text-white [&_p]:text-slate-300"
            badgeVariant="outline-dark"
          />

          {locations.length === 0 ? (
            <div className="bg-brand-black-deep rounded-md border border-border-dark p-12 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
              <MapPin className="w-10 h-10 text-accent mx-auto" />
              <h2 className="text-heading-xl font-bold text-white">No Locations Added Yet</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                Our operations network is currently updating origin location hubs. You can request a shipping quote directly from any location in Pakistan.
              </p>
              <div className="pt-2">
                <Link href="/quote">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                    Request Pickup Quote
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* ONE Dominant Featured City Card (Col-span-7) */}
              {featuredCity && (
                <div className="lg:col-span-7 bg-brand-black-deep rounded-md border border-border-dark overflow-hidden p-8 lg:p-10 flex flex-col justify-between space-y-8 group hover:border-slate-700 transition-colors shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="accent">Primary Logistics Hub</Badge>
                      <span className="text-xs font-mono text-slate-400">{featuredCity.province}</span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-display-sm font-bold text-white group-hover:text-accent transition-colors flex items-center gap-3">
                        <MapPin className="w-7 h-7 text-accent shrink-0" />
                        <span>{featuredCity.name}</span>
                      </h2>
                      <p className="text-body-md text-slate-300 leading-relaxed max-w-xl">
                        {featuredCity.introduction}
                      </p>
                    </div>

                    {/* Operational Status Badges */}
                    <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-1.5 bg-brand-navy px-3 py-1.5 rounded border border-border-dark">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>Service Available</span>
                      </div>
                      {featuredCity.collectionAvailable && (
                        <div className="flex items-center gap-1.5 bg-brand-navy px-3 py-1.5 rounded border border-border-dark">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                          <span>Doorstep Collection</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border-dark flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Scheduled Dispatch Active</span>
                    <Link href={`/locations/${featuredCity.slug}`}>
                      <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                        View {featuredCity.name} Hub
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Secondary Supporting Cities (Col-span-5) */}
              {supportingCities.length > 0 && (
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  {supportingCities.map((city) => (
                    <div
                      key={city.slug}
                      className="bg-brand-black-deep rounded-md border border-border-dark p-8 space-y-6 flex-1 flex flex-col justify-between group hover:border-slate-700 transition-colors shadow-lg"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border-dark pb-3">
                          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            {city.province}
                          </span>
                          <MapPin className="w-5 h-5 text-slate-400 group-hover:text-accent transition-colors" />
                        </div>
                        <h3 className="text-heading-lg font-bold text-white group-hover:text-accent transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-body-sm text-slate-300 leading-relaxed">
                          {city.introduction}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border-dark flex items-center justify-between">
                        <Link
                          href={`/locations/${city.slug}`}
                          className="text-xs font-mono font-semibold text-slate-200 hover:text-accent flex items-center gap-1.5 transition-colors"
                        >
                          <span>Explore City Hub</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                        </Link>
                        <Link href={`/quote?origin=${city.slug}`}>
                          <Button variant="outline-dark" size="sm">
                            Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* 3. Published City Directory */}
      {locations.length > 0 && (
        <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
          <Container>
            <SectionHeading
              badge="Directory"
              title="Complete Origin City Network Directory"
              subtitle="Operational status and collection coverage across published shipping origin locations."
              className="mb-14"
            />

            <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
              {locations.map((city) => (
                <div
                  key={city.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
                >
                  <div className="space-y-1 md:w-1/3">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {city.province}
                    </div>
                    <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors shrink-0" />
                      <Link href={`/locations/${city.slug}`}>{city.name}</Link>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 md:w-1/3">
                    <div className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded border border-border">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Service Available</span>
                    </div>
                    {city.collectionAvailable && (
                      <div className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded border border-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Collection Active</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/3">
                    <Link
                      href={`/locations/${city.slug}`}
                      className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                    >
                      <span>View City Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                    </Link>
                    <Link href={`/quote?origin=${city.slug}`}>
                      <Button variant="outline" size="sm">
                        Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Service & Dispatch Guidance Section */}
      <section className="w-full bg-brand-navy py-16 text-white border-b border-border-dark">
        <Container>
          <div className="bg-brand-black-deep border border-border-dark p-8 lg:p-12 rounded-md space-y-6 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>Regional Dispatch Coordination</span>
              </div>
              <h2 className="text-heading-xl font-bold text-white">Cargo Dispatch from Other Cities in Pakistan?</h2>
              <p className="text-body-md text-slate-300 leading-relaxed">
                If your origin location is outside primary city centers, our regional logistics team coordinates doorstep pickup and feeder dispatch from surrounding districts across Pakistan.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/quote">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  Request Custom Origin Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Final Conversion Panel */}
      <FinalCtaSection />
    </div>
  );
}
