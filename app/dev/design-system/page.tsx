import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata.service';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { FormLabel } from '@/components/ui/FormControls';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { TextLink } from '@/components/ui/TextLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HeaderShell } from '@/components/layout/HeaderShell';
import { FooterShell } from '@/components/layout/FooterShell';
import { ArrowRight, Plane, Ship, Package, CheckCircle2, ShieldCheck, Globe, Search } from 'lucide-react';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const metadata: Metadata = constructMetadata({
  title: 'Design System Showcase | Internal QA',
  description: 'Internal design system reference and component showcase.',
  path: '/dev/design-system',
  noindex: true,
});

export default function DesignSystemShowcasePage() {
  const sampleAccordionItems = [
    {
      id: 'item-1',
      title: 'What documents are required for international freight dispatch?',
      content:
        'Standard documentation includes the commercial invoice, packing list, airway bill / bill of lading, and specific export declaration forms depending on origin regulations.',
    },
    {
      id: 'item-2',
      title: 'How is volumetric weight calculated for air freight vs sea freight?',
      content:
        'Air freight volumetric weight is calculated using (Length x Width x Height in cm) / 6000. Sea freight uses CBM (Cubic Meters) volume metric standards.',
    },
    {
      id: 'item-3',
      title: 'Are customs clearance services included in door-to-door shipping?',
      content:
        'Customs clearance is integrated into our door-to-door operational workflows, subject to destination duty and tax regulations.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-24">
      {/* Header Shell Showcase */}
      <HeaderShell
        topBar={
          <Container className="py-2 flex items-center justify-between text-xs text-slate-300 font-mono bg-brand-black-deep">
            <span>Design System Showcase (Authoritative Button Architecture & Media Registry Audit)</span>
            <span className="text-[11px] bg-brand-navy border border-border-dark px-2 py-0.5 rounded-xs text-accent font-semibold">
              UNINDEXED ROUTE
            </span>
          </Container>
        }
        brand={
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <Package className="w-6 h-6 text-accent" />
            <span>BRAND_NAME</span>
          </div>
        }
        navItems={
          <>
            <a href="#colors" className="text-sm font-semibold text-slate-200 hover:text-accent">
              Colors
            </a>
            <a href="#buttons" className="text-sm font-semibold text-slate-200 hover:text-accent">
              Button State Matrix
            </a>
            <a href="#media" className="text-sm font-semibold text-slate-200 hover:text-accent">
              Media Primitives
            </a>
            <a href="#forms" className="text-sm font-semibold text-slate-200 hover:text-accent">
              Forms
            </a>
            <a href="#cards" className="text-sm font-semibold text-slate-200 hover:text-accent">
              Cards
            </a>
          </>
        }
        actions={
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
            Primary CTA
          </Button>
        }
      />

      <Container className="py-12 space-y-20">
        {/* Intro / Page Title */}
        <div>
          <Breadcrumbs
            items={[
              { label: 'Internal QA', url: '/dev' },
              { label: 'Design System Showcase', url: '/dev/design-system' },
            ]}
          />
          <div className="mt-6">
            <SectionHeading
              badge="Design Architecture"
              title="Authoritative Button Matrix & Media Registry"
              subtitle="Demonstration of authoritative button text class composition, icon text-current inheritance, icon-only accessible buttons, and WebP media slot containers."
            />
          </div>
        </div>

        {/* 1. Color Palette Matrix */}
        <section id="colors" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-heading-lg text-foreground font-bold">1. Brand Semantic Color Palette</h2>
            <p className="text-body-sm text-muted-foreground">
              Centralized CSS tokens backing `bg-brand-black`, `bg-brand-navy`, `bg-accent`, and `border-border-dark`.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-brand-black text-white rounded-md border border-border-dark">
              <p className="text-xs font-mono text-slate-400">bg-brand-black</p>
              <p className="text-sm font-bold mt-2">#0B0F17</p>
            </div>
            <div className="p-4 bg-brand-navy text-white rounded-md border border-border-dark">
              <p className="text-xs font-mono text-slate-400">bg-brand-navy</p>
              <p className="text-sm font-bold mt-2">#0F172A</p>
            </div>
            <div className="p-4 bg-brand-navy-light text-white rounded-md border border-border-dark">
              <p className="text-xs font-mono text-slate-400">bg-brand-navy-light</p>
              <p className="text-sm font-bold mt-2">#1E293B</p>
            </div>
            <div className="p-4 bg-accent text-brand-black font-bold rounded-md">
              <p className="text-xs font-mono text-brand-black/80">bg-accent</p>
              <p className="text-sm font-extrabold mt-2">#F97316</p>
            </div>
            <div className="p-4 bg-surface text-foreground rounded-md border border-border">
              <p className="text-xs font-mono text-muted-foreground">bg-surface</p>
              <p className="text-sm font-bold mt-2">#FFFFFF</p>
            </div>
            <div className="p-4 bg-surface-subtle text-foreground rounded-md border border-border">
              <p className="text-xs font-mono text-muted-foreground">bg-surface-subtle</p>
              <p className="text-sm font-bold mt-2">#F8FAFC</p>
            </div>
          </div>
        </section>

        {/* 2. Button State Matrix Audit (Light vs. Dark Surfaces) */}
        <section id="buttons" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-heading-lg text-foreground font-bold">2. Complete Button State Matrix Audit</h2>
            <p className="text-body-sm text-muted-foreground">
              Explicit button label colors (`text-brand-black`, `text-white`) and `text-current` icon inheritance across surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Surface Container */}
            <div className="bg-surface p-8 rounded-md border border-border space-y-6">
              <h3 className="text-heading-sm font-bold text-foreground border-b border-border pb-2">
                Light Surface Buttons (`bg-surface`)
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-muted-foreground block mb-2">Primary CTA (Brand Black Text on Orange)</span>
                  <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get a Shipping Quote
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground block mb-2">Secondary Action (White Text on Black)</span>
                  <Button variant="secondary" leftIcon={<Globe className="w-4 h-4" />}>
                    Explore Locations
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground block mb-2">Outline Action (Explicit Brand Black Text = 16.8:1 AAA)</span>
                  <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
                    Track Shipment Status
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground block mb-2">Ghost Action (Explicit Brand Black Text)</span>
                  <Button variant="ghost">Minimal Action</Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground block mb-2">Icon-Only Mode (Accessible ARIA Label)</span>
                  <Button variant="outline" size="md" isIconOnly aria-label="Search Cargo" leftIcon={<Search className="w-4 h-4" />} />
                </div>
              </div>
            </div>

            {/* Dark Surface Container */}
            <div className="bg-brand-black p-8 rounded-md border border-border-dark text-white space-y-6">
              <h3 className="text-heading-sm font-bold text-white border-b border-border-dark pb-2">
                Dark Surface Buttons (`bg-brand-black`)
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">Primary CTA (Brand Black Text on Orange)</span>
                  <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get a Shipping Quote
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">Secondary Action (White Text on Navy)</span>
                  <Button variant="secondary" leftIcon={<Globe className="w-4 h-4" />}>
                    Explore Locations
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">Outline Dark Action (Explicit White Text = 18.5:1 AAA)</span>
                  <Button variant="outline-dark" leftIcon={<Search className="w-4 h-4 text-accent" />}>
                    Track Shipment Status
                  </Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">Ghost Dark Action (Explicit White Text)</span>
                  <Button variant="ghost-dark">Minimal Dark Action</Button>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">Icon-Only Dark Mode</span>
                  <Button variant="outline-dark" size="md" isIconOnly aria-label="Track Shipment" leftIcon={<Search className="w-4 h-4" />} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Media Registry Primitives */}
        <section id="media" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-heading-lg text-foreground font-bold">3. Centralized Media Registry Slots (`lib/constants/images.ts`)</h2>
            <p className="text-body-sm text-muted-foreground">
              Photographic WebP asset containers with controlled fallback rendering and CLS protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hero Image Primitive */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4">
              <h3 className="text-heading-sm font-bold text-foreground">Hero Image Container Slot</h3>
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-brand-black-deep">
                <Image
                  src={IMAGE_SLOTS.hero.src}
                  alt={IMAGE_SLOTS.hero.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-navy/30 to-transparent" />
              </div>
            </div>

            {/* Service Image Primitive */}
            <div className="bg-surface p-6 rounded-md border border-border space-y-4">
              <h3 className="text-heading-sm font-bold text-foreground">Air Freight Service Slot</h3>
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-brand-black-deep">
                <Image
                  src={IMAGE_SLOTS.serviceAir.src}
                  alt={IMAGE_SLOTS.serviceAir.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Form Controls Showcase */}
        <section id="forms" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-heading-lg text-foreground font-bold">4. Form Fields & Inputs</h2>
            <p className="text-body-sm text-muted-foreground">
              Accessible text inputs, selects, textareas, checkboxes, and radio choices.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-md border border-border space-y-6 max-w-2xl">
            <Input label="Full Name" placeholder="e.g. Muhammad Ali" required />
            <Input label="Phone Number" placeholder="+92 300 1234567" leftIcon={<Globe className="w-4 h-4 text-accent" />} required />
            <Select
              label="Service Option"
              placeholder="Select Cargo Mode"
              options={[
                { value: 'air_freight', label: 'Air Freight' },
                { value: 'sea_cargo', label: 'Sea Cargo' },
              ]}
            />
            <Textarea label="Shipment Notes" placeholder="Special handling requirements..." rows={3} />
            <div className="space-y-3 pt-2">
              <FormLabel>Preferences</FormLabel>
              <Checkbox label="Doorstep Pickup Required" />
              <Radio name="category_demo" label="Personal Baggage" defaultChecked />
              <Radio name="category_demo" label="Commercial Export" />
            </div>
          </div>
        </section>

        {/* 5. Cards & Badges */}
        <section id="cards" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-heading-lg text-foreground font-bold">5. Cards & Badges Showcase</h2>
            <p className="text-body-sm text-muted-foreground">
              Translucent dark cards (`bg-brand-navy/80 backdrop-blur-xs`), sharp geometry (`rounded-md`), and industrial badges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" className="bg-brand-navy/80 backdrop-blur-xs border-border-dark text-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="accent">Air Freight</Badge>
                  <Plane className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-white">Express Air Cargo</CardTitle>
                <CardDescription className="text-slate-400">Fast international air freight dispatch for urgent shipments.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-slate-300">
                  Direct airport-to-airport and airport-to-door freight routing from major Pakistan export hubs.
                </p>
              </CardContent>
              <CardFooter>
                <TextLink href="#" showIcon className="text-accent">
                  Learn Service Details
                </TextLink>
              </CardFooter>
            </Card>

            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">Sea Cargo</Badge>
                  <Ship className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Ocean Freight (FCL/LCL)</CardTitle>
                <CardDescription>Cost-effective sea container shipping for heavy cargo.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted-foreground">
                  Full container load (FCL) and consolidated less-than-container load (LCL) options.
                </p>
              </CardContent>
              <CardFooter>
                <TextLink href="#" showIcon>
                  Explore Sea Freight
                </TextLink>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="success">Door-to-Door</Badge>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <CardTitle>Complete Pickup & Delivery</CardTitle>
                <CardDescription>End-to-end relocation and cargo delivery logistics.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted-foreground">
                  Hassle-free collection from your origin city with destination doorstep delivery.
                </p>
              </CardContent>
              <CardFooter>
                <TextLink href="#" showIcon>
                  View Delivery Coverage
                </TextLink>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-surface p-6 rounded-md border border-border mt-8">
            <h3 className="text-heading-md text-foreground font-semibold mb-4">FAQ Accordion Showcase</h3>
            <Accordion items={sampleAccordionItems} defaultOpenId="item-1" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-4">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>WCAG AA Contrast Compliant Palette & Button State Matrix Showcase</span>
          </div>
        </section>
      </Container>

      {/* Footer Shell Showcase */}
      <FooterShell
        brandSection={
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
              <Package className="w-6 h-6 text-accent" />
              <span>BRAND_NAME</span>
            </div>
            <p className="text-body-sm text-slate-400 max-w-sm">
              International cargo & logistics web application serving shippers across Pakistan with high-reliability air and sea freight dispatch.
            </p>
          </div>
        }
        columns={
          <>
            <div>
              <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Air Freight</a></li>
                <li><a href="#" className="hover:text-white">Sea Cargo</a></li>
                <li><a href="#" className="hover:text-white">Door to Door</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Cargo to UK</a></li>
                <li><a href="#" className="hover:text-white">Cargo to UAE</a></li>
                <li><a href="#" className="hover:text-white">Cargo to USA</a></li>
              </ul>
            </div>
          </>
        }
        bottomBar={
          <>
            <p>© {new Date().getFullYear()} BRAND_NAME. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </>
        }
      />
    </div>
  );
}
