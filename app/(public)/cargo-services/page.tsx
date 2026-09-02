import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane,
  Ship,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  ListOrdered,
  Tag,
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
  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber || siteConfig.contact?.whatsappNumber || activePhone;
  const cleanPhone = activePhone.replace(/\s+/g, '');

  const quoteWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I would like to inquire about Air & Sea Cargo services from Pakistan. Please provide a quote.'
  );

  const doorToDoorWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I need a Door-to-Door cargo shipping quote from Pakistan. Please guide me.'
  );

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Air & Sea Cargo Services', url: '/cargo-services' },
  ];

  const airCargoRates = [
    { country: 'UAE', flag: '🇦🇪', minWeight: '20 KG', pricePkr: 'PKR 650 – 850', priceUsd: '£2.20 – £2.80 / kg' },
    { country: 'Saudi Arabia', flag: '🇸🇦', minWeight: '20 KG', pricePkr: 'PKR 750 – 950', priceUsd: '£2.50 – £3.20 / kg' },
    { country: 'Qatar', flag: '🇶🇦', minWeight: '20 KG', pricePkr: 'PKR 800 – 1,000', priceUsd: '£2.70 – £3.40 / kg' },
    { country: 'Oman', flag: '🇴🇲', minWeight: '20 KG', pricePkr: 'PKR 750 – 950', priceUsd: '£2.50 – £3.20 / kg' },
    { country: 'Bahrain', flag: '🇧🇭', minWeight: '20 KG', pricePkr: 'PKR 800 – 1,000', priceUsd: '£2.70 – £3.40 / kg' },
    { country: 'Kuwait', flag: '🇰🇼', minWeight: '20 KG', pricePkr: 'PKR 850 – 1,050', priceUsd: '£2.80 – £3.60 / kg' },
    { country: 'United Kingdom', flag: '🇬🇧', minWeight: '20 KG', pricePkr: 'PKR 950 – 1,250', priceUsd: '£3.20 – £4.20 / kg' },
    { country: 'USA', flag: '🇺🇸', minWeight: '20 KG', pricePkr: 'PKR 1,200 – 1,500', priceUsd: '$4.20 – $5.50 / kg' },
    { country: 'Canada', flag: '🇨🇦', minWeight: '20 KG', pricePkr: 'PKR 1,250 – 1,550', priceUsd: '$4.50 – $5.80 / kg' },
    { country: 'Australia', flag: '🇦🇺', minWeight: '20 KG', pricePkr: 'PKR 1,350 – 1,650', priceUsd: '$4.80 – $6.20 / kg' },
    { country: 'Germany', flag: '🇩🇪', minWeight: '20 KG', pricePkr: 'PKR 1,100 – 1,350', priceUsd: '€3.50 – €4.50 / kg' },
    { country: 'France', flag: '🇫🇷', minWeight: '20 KG', pricePkr: 'PKR 1,100 – 1,350', priceUsd: '€3.50 – €4.50 / kg' },
    { country: 'Italy', flag: '🇮🇹', minWeight: '20 KG', pricePkr: 'PKR 1,100 – 1,350', priceUsd: '€3.50 – €4.50 / kg' },
    { country: 'Spain', flag: '🇪🇸', minWeight: '20 KG', pricePkr: 'PKR 1,150 – 1,400', priceUsd: '€3.80 – €4.80 / kg' },
    { country: 'Netherlands', flag: '🇳🇱', minWeight: '20 KG', pricePkr: 'PKR 1,100 – 1,350', priceUsd: '€3.50 – €4.50 / kg' },
    { country: 'Turkey', flag: '🇹🇷', minWeight: '20 KG', pricePkr: 'PKR 900 – 1,150', priceUsd: '$3.20 – $4.10 / kg' },
    { country: 'Malaysia', flag: '🇲🇾', minWeight: '20 KG', pricePkr: 'PKR 850 – 1,100', priceUsd: '$3.00 – $3.90 / kg' },
    { country: 'Singapore', flag: '🇸🇬', minWeight: '20 KG', pricePkr: 'PKR 950 – 1,200', priceUsd: '$3.40 – $4.30 / kg' },
    { country: 'Japan', flag: '🇯🇵', minWeight: '20 KG', pricePkr: 'PKR 1,300 – 1,600', priceUsd: '$4.60 – $5.70 / kg' },
  ];

  const seaCargoRates = [
    { country: 'UAE', flag: '🇦🇪', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 250 – 350 / kg' },
    { country: 'Saudi Arabia', flag: '🇸🇦', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 300 – 400 / kg' },
    { country: 'Qatar', flag: '🇶🇦', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 320 – 420 / kg' },
    { country: 'Oman', flag: '🇴🇲', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 300 – 400 / kg' },
    { country: 'UK', flag: '🇬🇧', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 450 – 580 / kg' },
    { country: 'USA', flag: '🇺🇸', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 550 – 720 / kg' },
    { country: 'Canada', flag: '🇨🇦', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 580 – 750 / kg' },
    { country: 'Australia', flag: '🇦🇺', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 600 – 780 / kg' },
    { country: 'Germany', flag: '🇩🇪', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 480 – 620 / kg' },
    { country: 'France', flag: '🇫🇷', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 480 – 620 / kg' },
    { country: 'Italy', flag: '🇮🇹', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 480 – 620 / kg' },
    { country: 'Netherlands', flag: '🇳🇱', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 480 – 620 / kg' },
    { country: 'Turkey', flag: '🇹🇷', service: 'LCL', minReq: '70–100 KG', pricePkr: 'PKR 400 – 520 / kg' },
  ];

  const faqs = [
    {
      question: 'What is the minimum weight for air cargo?',
      answer:
        'Our minimum air cargo shipment weight is 20 kg. Actual service availability and pricing depend on destination and cargo requirements.',
    },
    {
      question: 'What is the minimum weight for sea cargo?',
      answer:
        'Our minimum sea cargo requirement is approximately 70–100 kg, depending on destination, shipment type and available service.',
    },
    {
      question: 'Which is cheaper, air cargo or sea cargo?',
      answer:
        'Sea cargo is generally more economical for larger and heavier shipments, while air cargo is generally faster but has a higher transportation cost.',
    },
    {
      question: 'Which is faster, air or sea cargo?',
      answer:
        'Air cargo is generally faster than sea cargo. Exact transit times vary depending on destination, carrier, customs clearance and operational factors.',
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
        'No. Rates displayed on this page are average/indicative rates. Your final quotation depends on shipment details, destination, carrier and applicable charges.',
    },
    {
      question: 'How can I get an exact cargo rate?',
      answer:
        'Send us your pickup city, destination, cargo type, weight, dimensions and number of packages. Our team can then provide a quotation based on your shipment requirements.',
    },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      {/* 1. HERO SECTION — DUAL AIR & SEA CARGO HUB */}
      <section className="relative w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <Container>
          <div className="max-w-4xl space-y-6">
            <Breadcrumbs items={breadcrumbs} className="text-slate-400" />
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="accent" size="sm" className="font-mono uppercase tracking-wider font-bold">
                Air & Sea Cargo Hub
              </Badge>
              <span className="text-xs text-slate-400 font-mono">• Direct Export Dispatch from Pakistan</span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl font-bold tracking-tight text-white">
              Air & Sea Cargo Services from Pakistan
            </h1>

            <p className="text-body-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              Reliable international air freight and ocean sea cargo solutions connecting Pakistan with destinations worldwide.
            </p>

            <p className="text-body-md text-slate-300 leading-relaxed max-w-3xl">
              At Raahi International Cargo & Logistics Services, we provide complete international air cargo and sea cargo solutions for individuals, families, traders and commercial exporters. Whether you need to send a smaller shipment quickly by air or move larger cargo economically by sea, we help you choose the best shipping option based on cargo type, weight, volume, destination, urgency and budget.
            </p>

            {/* DUAL MODE CALLOUT BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl">
              <div className="bg-brand-black/80 rounded-md p-4 border border-emerald-500/40 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 rounded-xs text-emerald-400 shrink-0">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Air Cargo Express</div>
                  <div className="text-body-sm font-bold text-white">Minimum 20 KG • Fast Air Freight</div>
                </div>
              </div>

              <div className="bg-brand-black/80 rounded-md p-4 border border-blue-500/40 flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/20 rounded-xs text-blue-400 shrink-0">
                  <Ship className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase">Sea Cargo Economical</div>
                  <div className="text-body-sm font-bold text-white">Minimum 70–100 KG • LCL & FCL</div>
                </div>
              </div>
            </div>

            {/* HERO BUTTONS WITH CONFORTABLE SPACING */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="font-bold w-full sm:w-auto text-base shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Get a Shipping Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold w-full sm:w-auto text-base shadow-sm"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <section className="w-full py-12 lg:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* MAIN ARTICLE (8 COLS) */}
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
                    <a href="#air-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-emerald-700">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 💰 Air Cargo Rate Table
                    </a>
                  </li>
                  <li>
                    <a href="#part-2-sea-cargo" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Part 2 — Sea Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#sea-cargo-rates" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-blue-700">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 💰 Sea Cargo Rate Table
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

                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs bg-white">
                  <table className="w-full text-left text-sm sm:text-base border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                        <th className="py-4 px-6 border-b border-slate-800">Feature</th>
                        <th className="py-4 px-6 border-b border-slate-800 text-accent font-bold">✈️ Air Cargo</th>
                        <th className="py-4 px-6 border-b border-slate-800">🚢 Sea Cargo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Best For</td>
                        <td className="py-4 px-6 font-semibold text-slate-900">Faster shipments</td>
                        <td className="py-4 px-6">Larger & heavier shipments</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Minimum Weight</td>
                        <td className="py-4 px-6"><Badge variant="accent" size="sm">20 KG</Badge></td>
                        <td className="py-4 px-6"><Badge variant="secondary" size="sm">70–100 KG</Badge></td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Transit Time</td>
                        <td className="py-4 px-6 text-emerald-700 font-semibold">Generally faster (3–7 Days)</td>
                        <td className="py-4 px-6 text-slate-600">Generally slower (20–35 Days)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Cost</td>
                        <td className="py-4 px-6">Higher per kg</td>
                        <td className="py-4 px-6 font-semibold text-emerald-700">More economical for larger shipments</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Suitable For</td>
                        <td className="py-4 px-6">Personal & commercial cargo</td>
                        <td className="py-4 px-6">Personal, commercial & bulk cargo</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Main Pricing Factor</td>
                        <td className="py-4 px-6">Actual/volumetric weight</td>
                        <td className="py-4 px-6">Weight/volume and shipment type</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-black">Delivery Options</td>
                        <td className="py-4 px-6">Airport-to-airport / door-to-door where available</td>
                        <td className="py-4 px-6">Port-to-port / door-to-door where available</td>
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
                  <Badge variant="accent" size="md" className="shrink-0 font-bold text-sm">20 KG MIN</Badge>
                </div>

                {/* WHAT CAN YOU SEND BY AIR CARGO */}
                <div className="space-y-4">
                  <h3 className="text-heading-md font-bold text-brand-black">What Can You Send by Air Cargo?</h3>
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
                </div>

                {/* AIR CARGO RATE TABLE — CLEAN, PLEASING & SPACIOUS WITH EXPLICIT PRICES */}
                <div id="air-cargo-rates" className="scroll-mt-28 space-y-6 pt-4">
                  <div className="bg-emerald-950 text-white p-6 rounded-md border border-emerald-500/40 space-y-3 shadow-md">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Indicative Rate Card — Air Freight</span>
                      </div>
                      <Badge variant="accent" size="sm" className="font-mono font-bold">20 KG MIN</Badge>
                    </div>
                    <h3 className="text-heading-lg font-bold text-white">
                      Average Air Cargo Rates from Pakistan
                    </h3>
                    <p className="text-body-xs text-emerald-200">
                      Sample indicative air rates from major export hubs in Pakistan to worldwide destinations.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          <th className="py-4 px-6 border-b border-slate-800">Destination Country</th>
                          <th className="py-4 px-6 border-b border-slate-800 text-emerald-400">Indicative Air Rate</th>
                          <th className="py-4 px-6 border-b border-slate-800">Min Weight</th>
                          <th className="py-4 px-6 border-b border-slate-800 text-right">Get Exact Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
                        {airCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-bold text-slate-900 text-base sm:text-lg flex items-center gap-3">
                              <span className="text-2xl">{rate.flag}</span>
                              <span className="font-bold">{rate.country}</span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-base sm:text-lg font-bold font-mono text-emerald-700">
                                  {rate.pricePkr}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  ({rate.priceUsd})
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded-full border border-slate-200">
                                {rate.minWeight}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <Link href={`/quote?service=air-freight`}>
                                <Button variant="accent" size="sm" className="font-bold text-xs px-4 py-2">
                                  Get Rate →
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-body-xs text-slate-500 italic">
                    * Rate Disclaimer: The rates indicated above are average/indicative rates for information purposes only and may change without notice. Actual shipping charges depend on origin, destination, actual weight, volumetric weight, cargo type, airline, service level, customs requirements, fuel surcharges and other applicable charges. Contact Raahi International for a current quotation.
                  </p>
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
                  <Badge variant="secondary" size="md" className="shrink-0 font-bold text-sm">70–100 KG MIN</Badge>
                </div>

                {/* SEA CARGO RATE TABLE — CLEAN, PLEASING & SPACIOUS WITH EXPLICIT PRICES */}
                <div id="sea-cargo-rates" className="scroll-mt-28 space-y-6 pt-4">
                  <div className="bg-blue-950 text-white p-6 rounded-md border border-blue-500/40 space-y-3 shadow-md">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                        <Tag className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Indicative Rate Card — Ocean Freight</span>
                      </div>
                      <Badge variant="secondary" size="sm" className="font-mono font-bold">70–100 KG MIN</Badge>
                    </div>
                    <h3 className="text-heading-lg font-bold text-white">
                      Average Sea Cargo Rates from Pakistan
                    </h3>
                    <p className="text-body-xs text-blue-200">
                      Indicative ocean freight guidelines for LCL & FCL shipments departing Karachi Port & Port Qasim.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          <th className="py-4 px-6 border-b border-slate-800">Destination Country</th>
                          <th className="py-4 px-6 border-b border-slate-800">Service Mode</th>
                          <th className="py-4 px-6 border-b border-slate-800 text-blue-400">Indicative Ocean Rate</th>
                          <th className="py-4 px-6 border-b border-slate-800">Min Requirement</th>
                          <th className="py-4 px-6 border-b border-slate-800 text-right">Get Exact Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
                        {seaCargoRates.map((rate) => (
                          <tr key={rate.country} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-bold text-slate-900 text-base sm:text-lg flex items-center gap-3">
                              <span className="text-2xl">{rate.flag}</span>
                              <span className="font-bold">{rate.country}</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="px-3 py-1 bg-blue-100 text-blue-900 border border-blue-200 font-mono font-bold text-xs rounded-full">
                                {rate.service}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-bold font-mono text-blue-900 text-base sm:text-lg">
                              {rate.pricePkr}
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded-full border border-slate-200">
                                {rate.minReq}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <Link href={`/quote?service=sea-cargo`}>
                                <Button variant="outline" size="sm" className="font-bold text-xs px-4 py-2 border-blue-500 text-blue-700 hover:bg-blue-50">
                                  Get Rate →
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                  <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-emerald-950 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-emerald-600" /> Choose Air Cargo If:
                    </h3>
                    <ul className="space-y-2.5 text-body-sm text-emerald-900 font-medium">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>You need faster delivery for time-critical goods.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Your shipment is relatively smaller (above 20 kg minimum).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Delivery speed takes priority over lower ocean freight cost.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>You are sending personal belongings, clothing, business samples, or excess baggage.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-200 p-6 rounded-md space-y-4">
                    <h3 className="text-heading-sm font-bold text-blue-950 flex items-center gap-2">
                      <Ship className="w-5 h-5 text-blue-600" /> Choose Sea Cargo If:
                    </h3>
                    <ul className="space-y-2.5 text-body-sm text-blue-900 font-medium">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Your shipment is large or heavy (70–100 kg minimum requirement).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Cost efficiency is more important than speed.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>You have flexible delivery timelines for planned logistics.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>You are shipping bulk commercial stock, machinery, or full household relocations.</span>
                      </li>
                    </ul>
                  </div>
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

                <div className="bg-brand-black text-white p-6 sm:p-8 rounded-md space-y-5 shadow-md">
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
                      <Button variant="accent" size="md" className="font-bold shadow-sm">
                        Request Door-to-Door Quote
                      </Button>
                    </a>
                  </div>
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

            {/* STICKY SIDEBAR (4 COLS) WITH CONFORTABLE BUTTON SPACING */}
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

                {/* SIDEBAR BUTTONS WITH CLEAR SEPARATION */}
                <div className="space-y-4 font-sans">
                  <Link href="/quote" className="block">
                    <Button variant="accent" size="lg" className="w-full font-bold shadow-md">
                      Calculate Rate Online
                    </Button>
                  </Link>
                  <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-2">
                    <Button
                      variant="outline-dark"
                      size="lg"
                      className="w-full border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/15 font-bold shadow-sm"
                      leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                    >
                      WhatsApp Us Now
                    </Button>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-dark space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                    <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
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
                  Logistics Services & Options
                </h4>
                <div className="space-y-2 text-body-xs">
                  <a href="#quick-comparison" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
                    <span>Air vs Sea Cargo Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
                  </a>
                  <a href="#air-cargo-rates" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between text-emerald-800 font-bold">
                    <span>Air Cargo Rate Card</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                  </a>
                  <a href="#sea-cargo-rates" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between text-blue-800 font-bold">
                    <span>Sea Cargo Rate Card</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
                  </a>
                  <Link href="/services/commercial-cargo" className="block p-2.5 rounded-xs bg-surface-subtle hover:bg-border transition-colors font-semibold text-brand-black flex items-center justify-between">
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
              Get Your Air & Sea Cargo Quote
            </h2>

            <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Whether you need the speed of air freight or the cost efficiency of sea freight, Raahi International can help you arrange an international shipping solution from Pakistan.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold text-base shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
                >
                  Request a Quote
                </Button>
              </Link>
              <a href={quoteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold text-base shadow-sm"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </a>
              <a href={`tel:${cleanPhone}`} className="w-full sm:w-auto">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 font-bold text-base shadow-sm"
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
