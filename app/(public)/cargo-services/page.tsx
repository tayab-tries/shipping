import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane,
  Ship,
  Truck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  Clock,
  Package,
  HelpCircle,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/config/site.config';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsData } from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export const metadata: Metadata = {
  title: `Air & Sea Cargo Services from Pakistan | ${siteConfig.name}`,
  description:
    'Raahi International offers air and sea cargo services from Pakistan worldwide. Ship personal and commercial cargo with air freight, sea freight, customs clearance and delivery solutions.',
  alternates: {
    canonical: `${siteConfig.domain}/cargo-services`,
  },
  openGraph: {
    title: `Air & Sea Cargo Services from Pakistan | ${siteConfig.name}`,
    description:
      'Raahi International offers air and sea cargo services from Pakistan worldwide. Ship personal and commercial cargo with air freight, sea freight, customs clearance and delivery solutions.',
    url: `${siteConfig.domain}/cargo-services`,
    type: 'website',
  },
};

export default async function CargoServicesPage() {
  const [business, sanitySiteSettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  const activePhone = sanitySiteSettings?.phone || business.phonePrimary || siteConfig.phone || '+92 300 1234567';
  const whatsappNumber = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || siteConfig.contact?.whatsappNumber || activePhone;

  const quoteWhatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I would like to inquire about Air & Sea Cargo services from Pakistan. Please provide a quote.'
  );

  const doorToDoorWhatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I need a Door-to-Door cargo shipping quote from Pakistan. Please guide me.'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Air & Sea Cargo Services', url: '/cargo-services' },
  ];

  const airCargoRates = [
    { country: 'UAE', flag: '🇦🇪', minWeight: '20 KG' },
    { country: 'Saudi Arabia', flag: '🇸🇦', minWeight: '20 KG' },
    { country: 'Qatar', flag: '🇶🇦', minWeight: '20 KG' },
    { country: 'Oman', flag: '🇴🇲', minWeight: '20 KG' },
    { country: 'Bahrain', flag: '🇧🇭', minWeight: '20 KG' },
    { country: 'Kuwait', flag: '🇰🇼', minWeight: '20 KG' },
    { country: 'United Kingdom', flag: '🇬🇧', minWeight: '20 KG' },
    { country: 'USA', flag: '🇺🇸', minWeight: '20 KG' },
    { country: 'Canada', flag: '🇨🇦', minWeight: '20 KG' },
    { country: 'Australia', flag: '🇦🇺', minWeight: '20 KG' },
    { country: 'Germany', flag: '🇩🇪', minWeight: '20 KG' },
    { country: 'France', flag: '🇫🇷', minWeight: '20 KG' },
    { country: 'Italy', flag: '🇮🇹', minWeight: '20 KG' },
    { country: 'Spain', flag: '🇪🇸', minWeight: '20 KG' },
    { country: 'Netherlands', flag: '🇳🇱', minWeight: '20 KG' },
    { country: 'Turkey', flag: '🇹🇷', minWeight: '20 KG' },
    { country: 'Malaysia', flag: '🇲🇾', minWeight: '20 KG' },
    { country: 'Singapore', flag: '🇸🇬', minWeight: '20 KG' },
    { country: 'Japan', flag: '🇯🇵', minWeight: '20 KG' },
  ];

  const seaCargoRates = [
    { country: 'UAE', flag: '🇦🇪', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Saudi Arabia', flag: '🇸🇦', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Qatar', flag: '🇶🇦', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Oman', flag: '🇴🇲', service: 'LCL', minReq: '70–100 KG' },
    { country: 'UK', flag: '🇬🇧', service: 'LCL', minReq: '70–100 KG' },
    { country: 'USA', flag: '🇺🇸', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Canada', flag: '🇨🇦', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Australia', flag: '🇦🇺', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Germany', flag: '🇩🇪', service: 'LCL', minReq: '70–100 KG' },
    { country: 'France', flag: '🇫🇷', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Italy', flag: '🇮🇹', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Netherlands', flag: '🇳🇱', service: 'LCL', minReq: '70–100 KG' },
    { country: 'Turkey', flag: '🇹🇷', service: 'LCL', minReq: '70–100 KG' },
  ];

  const faqs = [
    {
      question: 'What is the minimum weight for air cargo?',
      answer:
        'Our minimum air cargo shipment weight is 20 kg. Actual service availability and pricing depend on the destination and cargo requirements.',
    },
    {
      question: 'What is the minimum weight for sea cargo?',
      answer:
        'Our minimum sea cargo requirement is approximately 70–100 kg, depending on the destination, shipment type and available service.',
    },
    {
      question: 'Which is cheaper, air cargo or sea cargo?',
      answer:
        'Sea cargo is generally more economical for larger and heavier shipments, while air cargo is generally faster but has a higher transportation cost.',
    },
    {
      question: 'Which is faster, air or sea cargo?',
      answer:
        'Air cargo is generally faster than sea cargo. Exact transit times vary depending on the destination, carrier, customs clearance and other operational factors.',
    },
    {
      question: 'Can I ship personal belongings by air?',
      answer:
        'Yes, eligible personal belongings can be shipped by air, subject to carrier and destination-country regulations.',
    },
    {
      question: 'Can I ship household goods by sea?',
      answer:
        'Yes, sea freight can be suitable for larger quantities of household goods and personal belongings, subject to applicable regulations.',
    },
    {
      question: 'What is LCL sea cargo?',
      answer:
        'LCL means Less Than Container Load. Your cargo shares container space with shipments belonging to other customers.',
    },
    {
      question: 'What is FCL sea cargo?',
      answer:
        'FCL means Full Container Load, where an entire container is allocated to your shipment.',
    },
    {
      question: 'Are the rates on this page final?',
      answer:
        'No. Rates displayed on this page are average/indicative rates. Your final quotation depends on your shipment details, destination, carrier and applicable charges.',
    },
    {
      question: 'How can I get an exact cargo rate?',
      answer:
        'Send us your pickup city, destination, cargo type, weight, dimensions and number of packages. Our team can then provide a quotation based on your shipment requirements.',
    },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <Container>
          <div className="max-w-4xl space-y-6">
            <Breadcrumbs items={breadcrumbs} className="text-slate-400" />
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="accent" size="sm" className="font-mono uppercase tracking-wider font-bold">
                Complete Cargo Solutions
              </Badge>
              <span className="text-xs text-slate-400 font-mono">• Air Freight & Ocean Sea Shipping</span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl font-bold tracking-tight text-white">
              Air & Sea Cargo Services from Pakistan
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              Reliable international cargo solutions connecting Pakistan with destinations worldwide.
            </p>

            <p className="text-body-md text-slate-300 leading-relaxed max-w-3xl">
              At Raahi International Cargo & Logistics Services, we provide international air cargo and sea cargo solutions for individuals, families, traders and businesses. Whether you need to send a smaller shipment quickly by air or move larger cargo economically by sea, we help you choose a suitable shipping option based on your cargo type, weight, volume, destination, urgency and budget.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-emerald-400 font-semibold">
              <span className="px-3 py-1.5 bg-brand-black/60 rounded-xs border border-border-dark flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-accent" /> Air Cargo
              </span>
              <span className="px-3 py-1.5 bg-brand-black/60 rounded-xs border border-border-dark flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-accent" /> Sea Cargo
              </span>
              <span className="px-3 py-1.5 bg-brand-black/60 rounded-xs border border-border-dark flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Customs Clearance
              </span>
              <span className="px-3 py-1.5 bg-brand-black/60 rounded-xs border border-border-dark flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-accent" /> Door-to-Door Solutions
              </span>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/quote">
                <Button
                  variant="accent"
                  size="lg"
                  className="font-bold w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Get a Shipping Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold w-full sm:w-auto"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN LAYOUT WITH SIDEBAR TABLE OF CONTENTS */}
      <section className="w-full py-12 lg:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* ARTICLE CONTENT (8 COLS) */}
            <main className="lg:col-span-8 space-y-16">
              
              {/* TABLE OF CONTENTS INDEX BOX */}
              <nav
                aria-label="Table of contents"
                className="bg-surface-subtle border border-border rounded-md p-6 lg:p-8 space-y-4 shadow-2xs"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  <ListOrdered className="w-4 h-4 text-accent-dark shrink-0" />
                  <span>On This Page — Quick Navigation</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium text-slate-700">
                  <li>
                    <a href="#quick-comparison" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Quick Service Comparison
                    </a>
                  </li>
                  <li>
                    <a href="#part-1-air-cargo" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Part 1 — Air Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#air-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo Rates Table
                    </a>
                  </li>
                  <li>
                    <a href="#air-cargo-process" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo Workflow
                    </a>
                  </li>
                  <li>
                    <a href="#part-2-sea-cargo" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Part 2 — Sea Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#sea-cargo-options" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> LCL vs FCL Container Options
                    </a>
                  </li>
                  <li>
                    <a href="#sea-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Sea Cargo Rates Table
                    </a>
                  </li>
                  <li>
                    <a href="#sea-cargo-process" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Sea Cargo Workflow
                    </a>
                  </li>
                  <li>
                    <a href="#air-vs-sea" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air vs Sea Decision Guide
                    </a>
                  </li>
                  <li>
                    <a href="#door-to-door" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Door-to-Door Delivery
                    </a>
                  </li>
                  <li>
                    <a href="#cargo-requirements" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Quote Information Required
                    </a>
                  </li>
                  <li>
                    <a href="#faqs" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Frequently Asked Questions
                    </a>
                  </li>
                </ul>
              </nav>

              {/* 2. QUICK SERVICE COMPARISON */}
              <section id="quick-comparison" className="scroll-mt-28 space-y-6">
                <div className="border-b border-border pb-3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Side-by-Side Comparison</div>
                  <h2 className="text-heading-xl font-bold text-brand-black">Choose the Right Cargo Option</h2>
                </div>

                <div className="overflow-x-auto border border-border rounded-md shadow-xs">
                  <table className="w-full text-left text-body-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white text-xs font-mono uppercase tracking-wider">
                        <th className="p-4 border-b border-border-dark">Feature</th>
                        <th className="p-4 border-b border-border-dark bg-brand-navy-light text-accent">✈️ Air Cargo</th>
                        <th className="p-4 border-b border-border-dark">🚢 Sea Cargo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface font-normal text-slate-700">
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Best For</td>
                        <td className="p-4 font-semibold text-brand-black">Faster shipments</td>
                        <td className="p-4">Larger & heavier shipments</td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Minimum Weight</td>
                        <td className="p-4"><Badge variant="accent" size="sm">20 KG</Badge></td>
                        <td className="p-4"><Badge variant="secondary" size="sm">70–100 KG</Badge></td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Transit Time</td>
                        <td className="p-4 text-emerald-700 font-semibold">Generally faster</td>
                        <td className="p-4 text-slate-600">Generally slower</td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Cost</td>
                        <td className="p-4">Higher per kg</td>
                        <td className="p-4 font-semibold text-emerald-700">More economical for larger shipments</td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Suitable For</td>
                        <td className="p-4">Personal & commercial cargo</td>
                        <td className="p-4">Personal, commercial & bulk cargo</td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Main Pricing Factor</td>
                        <td className="p-4">Actual/volumetric weight</td>
                        <td className="p-4">Weight/volume and shipment type</td>
                      </tr>
                      <tr className="hover:bg-surface-subtle transition-colors">
                        <td className="p-4 font-bold text-brand-black">Delivery Options</td>
                        <td className="p-4">Airport-to-airport / door-to-door where available</td>
                        <td className="p-4">Port-to-port / door-to-door where available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-body-xs text-slate-500 italic">
                  * Transit times, service availability and final charges vary by destination, carrier and shipment requirements.
                </p>
              </section>

              {/* PART 1 — AIR CARGO */}
              <section id="part-1-air-cargo" className="scroll-mt-28 space-y-8">
                <div className="border-b border-border pb-3">
                  <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">PART 1 — AIR CARGO</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo Services from Pakistan</h2>
                  <p className="text-body-md text-slate-600">Fast International Air Freight for Your Cargo</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    When time matters, air cargo is one of the most efficient ways to transport goods internationally. Raahi International arranges air freight solutions for customers sending permitted cargo from Pakistan to destinations around the world.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Our air cargo service is suitable for customers who need a faster international transportation option and for shipments where speed is more important than the lower transportation cost typically associated with sea freight.
                  </p>
                </div>

                {/* MINIMUM WEIGHT BADGE CALLOUT */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-md flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Air Cargo Requirement</div>
                    <div className="text-heading-sm font-bold text-amber-900">Minimum Air Cargo Weight: 20 KG</div>
                    <p className="text-body-xs text-amber-800 mt-1">
                      For shipments below 20 kg, available courier or parcel solutions may be more appropriate depending on destination and cargo type.
                    </p>
                  </div>
                  <Badge variant="accent" size="md" className="shrink-0 font-bold">20 KG MIN</Badge>
                </div>

                {/* WHAT CAN YOU SEND BY AIR CARGO */}
                <div className="space-y-4">
                  <h3 className="text-heading-md font-bold text-brand-black">What Can You Send by Air Cargo?</h3>
                  <p className="text-body-sm text-slate-600">
                    Depending on airline restrictions and destination-country regulations, air freight can be suitable for:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Personal belongings',
                      'Household items',
                      'Clothing & garments',
                      'Documents and permitted parcels',
                      'Business samples',
                      'E-commerce shipments',
                      'Commercial goods',
                      'Spare parts',
                      'Electronics and equipment',
                      'Machinery parts',
                      'General permitted cargo',
                      'Other non-restricted goods',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-body-sm font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-body-xs text-slate-500 pt-2">
                    * Cargo acceptance depends on airline regulations, customs requirements and the laws of the destination country.
                  </p>
                </div>

                {/* WHY CHOOSE AIR CARGO */}
                <div className="space-y-4">
                  <h3 className="text-heading-md font-bold text-brand-black">Why Choose Air Cargo?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-dark" /> Faster International Transportation
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        Air freight is generally much faster than sea freight, making it suitable when your shipment needs to reach its destination sooner.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black flex items-center gap-2">
                        <Plane className="w-4 h-4 text-accent-dark" /> Ideal for Time-Sensitive Shipments
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        Businesses and individuals can use air cargo when delivery speed is a higher priority.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent-dark" /> Worldwide Reach
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        Air transportation connects Pakistan with major international destinations through established airline and cargo networks.
                      </p>
                    </div>

                    <div className="bg-surface border border-border p-5 rounded-md space-y-2">
                      <div className="font-bold text-brand-black flex items-center gap-2">
                        <Package className="w-4 h-4 text-accent-dark" /> Suitable for Smaller Shipments
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        Air freight can be particularly practical for shipments that are too large for standard courier services but don&apos;t justify sea freight.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AIR CARGO PRICING & VOLUMETRIC WEIGHT */}
                <div className="space-y-4 bg-surface-subtle p-6 border border-border rounded-md">
                  <h3 className="text-heading-md font-bold text-brand-black">Air Cargo Pricing & Volumetric Weight</h3>
                  <p className="text-body-sm text-slate-700 leading-relaxed">
                    Air freight is generally calculated according to the <strong>chargeable weight</strong> of the shipment. The chargeable weight may be based on either <strong>Actual Weight</strong> or <strong>Volumetric Weight</strong> — whichever is higher, according to the applicable carrier&apos;s calculation.
                  </p>
                  <div className="bg-white p-4 border border-border rounded-xs space-y-2 text-body-xs text-slate-700">
                    <div className="font-bold text-brand-black">Why Does Volumetric Weight Matter?</div>
                    <p>
                      A shipment can be lightweight but take up a large amount of space inside an aircraft. For this reason, airlines calculate a volumetric weight based on the dimensions of the package (Length × Width × Height in cm / 5000). Your final chargeable weight can therefore be different from the physical weight shown on a scale.
                    </p>
                  </div>
                </div>

                {/* AIR CARGO RATE TABLE */}
                <div id="air-cargo-rates" className="scroll-mt-28 space-y-4 pt-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-heading-md font-bold text-brand-black">Average Air Cargo Rates from Pakistan</h3>
                    <Badge variant="outline" size="sm" className="font-mono text-xs">Indicative Rates Only</Badge>
                  </div>

                  <div className="overflow-x-auto border border-border rounded-md shadow-xs">
                    <table className="w-full text-left text-body-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white text-xs font-mono uppercase tracking-wider">
                          <th className="p-3.5 border-b border-border-dark">Destination</th>
                          <th className="p-3.5 border-b border-border-dark">Average Rate / KG</th>
                          <th className="p-3.5 border-b border-border-dark">Minimum Weight</th>
                          <th className="p-3.5 border-b border-border-dark text-right">Get Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-surface font-normal text-slate-700">
                        {airCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                            <td className="p-3.5 font-bold text-brand-black flex items-center gap-2">
                              <span>{rate.flag}</span>
                              <span>{rate.country}</span>
                            </td>
                            <td className="p-3.5 text-accent-dark font-mono font-bold">
                              <Link href="/quote" className="hover:underline">
                                Request Live Rate →
                              </Link>
                            </td>
                            <td className="p-3.5"><Badge variant="accent" size="sm">{rate.minWeight}</Badge></td>
                            <td className="p-3.5 text-right">
                              <Link href={`/quote?service=air-freight`}>
                                <Button variant="ghost" size="sm" className="font-semibold text-accent-dark">
                                  Quote
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-body-xs text-slate-500 italic">
                    * Rate Disclaimer: The rates indicated above are average/indicative rates for information purposes only and may change without notice. Actual shipping charges depend on the origin, destination, actual weight, volumetric weight, cargo type, airline, service level, customs requirements, fuel surcharges and other applicable charges. Contact Raahi International for a current quotation.
                  </p>
                </div>

                {/* AIR CARGO PROCESS */}
                <div id="air-cargo-process" className="scroll-mt-28 space-y-6 pt-4">
                  <h3 className="text-heading-md font-bold text-brand-black">How Air Cargo Shipping Works</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { step: '01', title: 'Send Your Shipment Details', desc: 'Tell us your pickup city, destination, cargo description, number of packages, weight and dimensions.' },
                      { step: '02', title: 'Receive Your Quote', desc: 'We calculate the applicable shipping requirements and provide a quotation.' },
                      { step: '03', title: 'Cargo Pickup / Drop-Off', desc: 'Depending on the selected service, your shipment can be collected or delivered to the required cargo facility.' },
                      { step: '04', title: 'Documentation & Customs', desc: 'We coordinate the applicable documentation and customs clearance requirements.' },
                      { step: '05', title: 'Air Transportation', desc: 'Your shipment is transported by air toward the destination.' },
                      { step: '06', title: 'Destination Handling', desc: 'The shipment goes through the required destination procedures.' },
                      { step: '07', title: 'Final Delivery', desc: 'For eligible door-to-door services, the shipment is coordinated toward the recipient\'s address.' },
                    ].map((st) => (
                      <div key={st.step} className="bg-surface border border-border p-5 rounded-md flex gap-4">
                        <div className="font-mono font-bold text-accent-dark text-lg">{st.step}</div>
                        <div className="space-y-1">
                          <div className="font-bold text-brand-black text-body-sm">{st.title}</div>
                          <p className="text-body-xs text-slate-600 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PART 2 — SEA CARGO */}
              <section id="part-2-sea-cargo" className="scroll-mt-28 space-y-8 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="secondary" size="sm" className="mb-2 font-mono uppercase">PART 2 — SEA CARGO</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Sea Cargo Services from Pakistan</h2>
                  <p className="text-body-md text-slate-600">Economical International Shipping for Larger Shipments</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Sea cargo is a practical option for customers who need to transport larger, heavier or higher-volume shipments internationally. Compared with air freight, sea transportation generally takes longer but can offer a more economical solution for larger shipments.
                  </p>
                  <p className="text-body-md text-slate-700 leading-relaxed font-normal">
                    Raahi International helps coordinate sea cargo shipments from Pakistan to international destinations, subject to route availability and cargo requirements.
                  </p>
                </div>

                {/* MINIMUM SEA WEIGHT BADGE CALLOUT */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-md flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">Sea Cargo Requirement</div>
                    <div className="text-heading-sm font-bold text-blue-950">Minimum Sea Cargo Weight: 70–100 KG</div>
                    <p className="text-body-xs text-blue-900 mt-1">
                      For larger shipments, sea freight becomes particularly useful when priority is cost efficiency rather than transit speed.
                    </p>
                  </div>
                  <Badge variant="secondary" size="md" className="shrink-0 font-bold">70–100 KG MIN</Badge>
                </div>

                {/* WHAT CAN YOU SEND BY SEA CARGO */}
                <div className="space-y-4">
                  <h3 className="text-heading-md font-bold text-brand-black">What Can You Send by Sea Cargo?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Household goods',
                      'Personal belongings',
                      'Furniture & woodwork',
                      'Commercial goods',
                      'Machinery & tools',
                      'Equipment & inventory',
                      'Business stock',
                      'E-commerce bulk stock',
                      'Bulk merchandise',
                      'General permitted cargo',
                      'Relocation shipments',
                      'Larger container shipments',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-body-sm font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEA CARGO OPTIONS — LCL VS FCL */}
                <div id="sea-cargo-options" className="scroll-mt-28 space-y-6 pt-4">
                  <h3 className="text-heading-md font-bold text-brand-black">Sea Cargo Container Options: LCL & FCL</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LCL Card */}
                    <div className="bg-surface border border-border rounded-md p-6 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h4 className="text-heading-sm font-bold text-brand-black">LCL — Less Than Container Load</h4>
                        <Badge variant="secondary" size="sm">Shared Space</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        If your shipment does not require a complete container, LCL (Less Than Container Load) allows your cargo to share container space with other shipments. This is a practical option for smaller shipments above 70–100 kg.
                      </p>
                      <div className="pt-2 space-y-2">
                        <div className="text-xs font-mono font-bold text-slate-500 uppercase">Suitable For:</div>
                        <ul className="space-y-1.5 text-body-xs text-slate-700">
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Small business trade</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Household shipments</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Personal effects</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Partial cargo loads</li>
                        </ul>
                      </div>
                    </div>

                    {/* FCL Card */}
                    <div className="bg-surface border border-border rounded-md p-6 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h4 className="text-heading-sm font-bold text-brand-black">FCL — Full Container Load</h4>
                        <Badge variant="accent" size="sm">Full Container</Badge>
                      </div>
                      <p className="text-body-xs text-slate-600 leading-relaxed">
                        FCL (Full Container Load) is used when your shipment requires an entire 20ft or 40ft shipping container. It is generally suitable for large commercial exports, factory shipments, and high-volume relocations.
                      </p>
                      <div className="pt-2 space-y-2">
                        <div className="text-xs font-mono font-bold text-slate-500 uppercase">Suitable For:</div>
                        <ul className="space-y-1.5 text-body-xs text-slate-700">
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Large commercial exports</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Factory machinery</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Full house relocations</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Bulk trade inventory</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEA CARGO RATE TABLE */}
                <div id="sea-cargo-rates" className="scroll-mt-28 space-y-4 pt-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-heading-md font-bold text-brand-black">Average Sea Cargo Rates from Pakistan</h3>
                    <Badge variant="outline" size="sm" className="font-mono text-xs">Indicative Rates Only</Badge>
                  </div>

                  <div className="overflow-x-auto border border-border rounded-md shadow-xs">
                    <table className="w-full text-left text-body-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white text-xs font-mono uppercase tracking-wider">
                          <th className="p-3.5 border-b border-border-dark">Destination</th>
                          <th className="p-3.5 border-b border-border-dark">Service</th>
                          <th className="p-3.5 border-b border-border-dark">Average Rate</th>
                          <th className="p-3.5 border-b border-border-dark">Minimum Requirement</th>
                          <th className="p-3.5 border-b border-border-dark text-right">Get Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-surface font-normal text-slate-700">
                        {seaCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                            <td className="p-3.5 font-bold text-brand-black flex items-center gap-2">
                              <span>{rate.flag}</span>
                              <span>{rate.country}</span>
                            </td>
                            <td className="p-3.5"><Badge variant="secondary" size="sm">{rate.service}</Badge></td>
                            <td className="p-3.5 text-accent-dark font-mono font-bold">
                              <Link href="/quote" className="hover:underline">
                                Request Live Rate →
                              </Link>
                            </td>
                            <td className="p-3.5"><Badge variant="outline" size="sm">{rate.minReq}</Badge></td>
                            <td className="p-3.5 text-right">
                              <Link href={`/quote?service=sea-cargo`}>
                                <Button variant="ghost" size="sm" className="font-semibold text-accent-dark">
                                  Quote
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SEA CARGO PROCESS */}
                <div id="sea-cargo-process" className="scroll-mt-28 space-y-6 pt-4">
                  <h3 className="text-heading-md font-bold text-brand-black">How Sea Cargo Shipping Works</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { step: '01', title: 'Share Your Cargo Details', desc: 'Provide your pickup location, destination, cargo description, weight, dimensions and approximate volume.' },
                      { step: '02', title: 'Choose LCL or FCL', desc: 'Our team helps determine whether your shipment is more suitable for LCL or FCL based on size and requirements.' },
                      { step: '03', title: 'Receive Your Quotation', desc: 'We review the shipment details and provide the applicable sea freight shipping quotation.' },
                      { step: '04', title: 'Pickup & Documentation', desc: 'Depending on your selected service, your cargo is collected and prepared for international transport.' },
                      { step: '05', title: 'Customs Clearance', desc: 'The shipment goes through required export customs procedures at Karachi Port or Port Qasim.' },
                      { step: '06', title: 'Ocean Transportation', desc: 'Your cargo is loaded onto vessel and transported by sea toward the destination port.' },
                      { step: '07', title: 'Destination Clearance & Delivery', desc: 'After arrival, cargo undergoes destination clearance before final delivery according to service.' },
                    ].map((st) => (
                      <div key={st.step} className="bg-surface border border-border p-5 rounded-md flex gap-4">
                        <div className="font-mono font-bold text-blue-600 text-lg">{st.step}</div>
                        <div className="space-y-1">
                          <div className="font-bold text-brand-black text-body-sm">{st.title}</div>
                          <p className="text-body-xs text-slate-600 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* AIR VS SEA DECISION GUIDE */}
              <section id="air-vs-sea" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="outline" size="sm" className="mb-2 font-mono uppercase">Decision Guide</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo or Sea Cargo — Which Is Right for You?</h2>
                  <p className="text-body-md text-slate-600">
                    Choosing between air and sea freight depends mainly on how quickly you need your shipment, how much cargo you have and your budget.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-emerald-950 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-emerald-600" /> Choose Air Cargo When:
                    </h3>
                    <ul className="space-y-2 text-body-sm text-emerald-900 font-medium">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> You need faster transportation</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Your shipment is relatively smaller</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Delivery time is important</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> You are shipping time-sensitive goods</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Your cargo meets the minimum 20 kg requirement</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-blue-950 flex items-center gap-2">
                      <Ship className="w-5 h-5 text-blue-600" /> Choose Sea Cargo When:
                    </h3>
                    <ul className="space-y-2 text-body-sm text-blue-900 font-medium">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> You have heavier or larger cargo</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> You are not in a hurry</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Cost efficiency is important</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> You have a higher-volume shipment</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Your shipment meets the approximate 70–100 kg minimum</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-surface border border-border p-6 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-brand-black text-body-md">Still Not Sure Which Mode to Choose?</div>
                    <p className="text-body-xs text-slate-600">Don&apos;t worry. Send us your shipment details and our team will advise the most suitable and cost-effective option.</p>
                  </div>
                  <Link href="/quote">
                    <Button variant="accent" size="sm" className="font-bold shrink-0">
                      Get a Shipping Quote →
                    </Button>
                  </Link>
                </div>
              </section>

              {/* DOOR-TO-DOOR OPTION */}
              <section id="door-to-door" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">Door-to-Door Service</Badge>
                  <h2 className="text-heading-xl font-bold text-brand-black">Need Delivery from Your Door to Their Door?</h2>
                  <p className="text-body-md text-slate-600">
                    For eligible routes and shipments, Raahi International can coordinate complete door-to-door international cargo solutions.
                  </p>
                </div>

                <div className="bg-brand-black text-white p-6 rounded-md space-y-4 shadow-md">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Integrated Workflow</div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-accent font-bold">
                    <span>Pickup in Pakistan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export Handling</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>Customs Clearance</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>Air / Sea Transit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>Destination Clearance</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>Final Door Delivery</span>
                  </div>
                  <p className="text-body-xs text-slate-300">
                    Door-to-door availability and charges depend on destination, cargo type, customs requirements and local delivery arrangements.
                  </p>
                  <div className="pt-2">
                    <a href={doorToDoorWhatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="accent" size="md" className="font-bold">
                        Request Door-to-Door Quote
                      </Button>
                    </a>
                  </div>
                </div>
              </section>

              {/* CARGO REQUIREMENTS */}
              <section id="cargo-requirements" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <h2 className="text-heading-xl font-bold text-brand-black">What Information Do We Need to Quote Your Shipment?</h2>
                  <p className="text-body-md text-slate-600">To provide a fast and accurate shipping quotation, share the following details with our team:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { num: '1', title: 'Pickup City', desc: 'Where your cargo will be collected in Pakistan.' },
                    { num: '2', title: 'Destination', desc: 'Country and city/address where the cargo is going.' },
                    { num: '3', title: 'Cargo Description', desc: 'Tell us what specific items you are shipping.' },
                    { num: '4', title: 'Actual Weight', desc: 'Total physical gross weight of the shipment.' },
                    { num: '5', title: 'Dimensions', desc: 'Length × Width × Height of each package.' },
                    { num: '6', title: 'Number of Packages', desc: 'Tell us how many boxes, bags, or pallets you have.' },
                    { num: '7', title: 'Preferred Service', desc: 'Air cargo or sea cargo preference.' },
                    { num: '8', title: 'Delivery Requirement', desc: 'Airport/port terminal service or door-to-door delivery.' },
                  ].map((req) => (
                    <div key={req.num} className="bg-surface border border-border p-4 rounded-md flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                        {req.num}
                      </div>
                      <div>
                        <div className="font-bold text-brand-black text-body-sm">{req.title}</div>
                        <p className="text-body-xs text-slate-600">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* IMPORTANT SHIPPING INFORMATION */}
              <section id="important-info" className="scroll-mt-28 space-y-4 pt-8 border-t border-border">
                <div className="bg-surface border-l-4 border-accent p-6 rounded-r-md space-y-3">
                  <h3 className="text-heading-sm font-bold text-brand-black flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent-dark" /> Important Shipping Information & Regulations
                  </h3>
                  <p className="text-body-sm text-slate-700 leading-relaxed font-normal">
                    International cargo is subject to the regulations of the origin country, destination country, airline/shipping line and customs authorities. Some products may be restricted or prohibited from international transportation.
                  </p>
                  <p className="text-body-sm text-slate-700 leading-relaxed font-normal">
                    Before accepting your shipment, we may need additional information about the cargo to determine whether it can be transported and what documentation is required. Always provide an accurate description of your goods when requesting a quotation.
                  </p>
                </div>
              </section>

              {/* 100% INLINE FAQS */}
              <section id="faqs" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <div className="border-b border-border pb-3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Frequently Asked Questions</div>
                  <h2 className="text-heading-xl font-bold text-brand-black">Air & Sea Cargo FAQs</h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-surface border border-border rounded-md p-6 space-y-2 shadow-2xs">
                      <h3 className="text-body-md font-bold text-brand-black flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-accent-dark shrink-0 mt-1" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-body-sm text-slate-700 leading-relaxed font-normal pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* STICKY SIDEBAR (4 COLS) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* INSTANT RATE CALCULATOR CARD */}
              <div className="bg-brand-black text-white rounded-md border border-border-dark p-6 space-y-6 shadow-xl">
                <div className="space-y-2 border-b border-border-dark pb-4">
                  <div className="text-xs font-mono text-accent uppercase tracking-wider font-bold">Quick Dispatch</div>
                  <h3 className="text-heading-md font-bold text-white">Get Cargo Quote</h3>
                  <p className="text-body-xs text-slate-300">
                    Get custom air or sea freight rates from Pakistan.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/quote">
                    <Button variant="accent" size="lg" className="w-full font-bold">
                      Calculate Rate Online
                    </Button>
                  </Link>
                  <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      variant="outline-dark"
                      size="lg"
                      className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold"
                      leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                    >
                      WhatsApp Us Now
                    </Button>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-dark space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                    <a href={`tel:${activePhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                      {activePhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Doorstep Pickup Across Pakistan</span>
                  </div>
                </div>
              </div>

              {/* RELATED GUIDES LINK CARD */}
              <div className="bg-surface border border-border rounded-md p-6 space-y-3 shadow-2xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Related Logistics Guides
                </h4>
                <div className="space-y-2 text-body-xs">
                  <Link href="/guides/air-vs-sea-cargo" className="block p-2 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Air vs Sea Cargo Comparison</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </Link>
                  <Link href="/services/air-freight" className="block p-2 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Air Freight Services</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </Link>
                  <Link href="/services/sea-cargo" className="block p-2 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Sea Cargo Services</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </Link>
                  <Link href="/services/commercial-cargo" className="block p-2 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Commercial Cargo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
        <Container size="narrow">
          <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
            <Badge variant="accent" size="sm" className="font-mono uppercase font-bold">
              Ready to Ship Your Cargo?
            </Badge>

            <h2 className="text-display-md sm:text-display-lg font-bold text-white tracking-tight">
              Get Your International Cargo Quote
            </h2>

            <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Whether you need the speed of air freight or the cost efficiency of sea freight, Raahi International can help you arrange an international shipping solution from Pakistan.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Request a Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
              <a href={`tel:${activePhone.replace(/\s+/g, '')}`} className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 font-bold"
                  leftIcon={<Phone className="w-4 h-4 text-slate-300 shrink-0" />}
                >
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
