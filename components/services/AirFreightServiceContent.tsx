import React from 'react';
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
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AirFreightServiceContentProps {
  phone: string;
  whatsappNumber: string;
}

export const AirFreightServiceContent: React.FC<AirFreightServiceContentProps> = ({
  phone,
  whatsappNumber,
}) => {
  const cleanPhone = phone.replace(/\s+/g, '');
  const quoteWhatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Assalam o Alaikum, I need an Air Cargo rate quote from Pakistan. Please guide me.'
  )}`;

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
        'No. Rates displayed on this page are average/indicative rates. Your final quotation depends on your shipment details, destination, carrier and applicable charges.',
    },
    {
      question: 'How can I get an exact cargo rate?',
      answer:
        'Send us your pickup city, destination, cargo type, weight, dimensions and number of packages. Our team can then provide a quotation based on your shipment requirements.',
    },
  ];

  return (
    <div className="w-full space-y-12">
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
            <a href="#air-cargo-glance" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo at a Glance
            </a>
          </li>
          <li>
            <a href="#air-vs-sea-comparison" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air Cargo vs Sea Cargo Comparison
            </a>
          </li>
          <li>
            <a href="#pricing-tables" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Air & Sea Cargo Rate Tables
            </a>
          </li>
          <li>
            <a href="#which-to-pick" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Which Mode Should You Pick?
            </a>
          </li>
          <li>
            <a href="#transit-times" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Estimated Transit Times
            </a>
          </li>
          <li>
            <a href="#why-raahi" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Why Raahi International
            </a>
          </li>
          <li>
            <a href="#air-cargo-process" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> How Air Cargo Shipping Works
            </a>
          </li>
          <li>
            <a href="#faqs" className="hover:text-accent-dark hover:underline flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> Frequently Asked Questions
            </a>
          </li>
        </ul>
      </nav>

      {/* SECTION: AIR CARGO AT A GLANCE */}
      <section id="air-cargo-glance" className="scroll-mt-28 space-y-6">
        <div className="border-b border-border pb-3">
          <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">Overview</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo at a Glance</h2>
          <p className="text-body-md text-slate-600">
            Fast International Air Freight for Your Cargo Originating from Pakistan
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-4">
          <p className="text-body-md text-slate-700 leading-relaxed font-normal">
            When time matters, air cargo is one of the most efficient ways to transport goods internationally. Raahi International arranges air freight solutions for customers sending permitted cargo from Pakistan to destinations around the world.
          </p>
          <p className="text-body-md text-slate-700 leading-relaxed font-normal">
            Our air cargo service is suitable for customers who need a faster international transportation option and for shipments where speed is more important than the lower transportation cost typically associated with sea freight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <div className="font-bold text-brand-black flex items-center gap-2 text-body-sm">
              <Clock className="w-4 h-4 text-accent-dark" /> Transit Speed
            </div>
            <p className="text-body-xs text-slate-600">
              Generally faster airport-to-airport or door-to-door transit for time-sensitive cargo.
            </p>
          </div>

          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <div className="font-bold text-brand-black flex items-center gap-2 text-body-sm">
              <Package className="w-4 h-4 text-accent-dark" /> Minimum Weight
            </div>
            <p className="text-body-xs text-slate-600">
              Minimum air cargo shipment weight is 20 kg. Ideal for medium to large parcel loads.
            </p>
          </div>

          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <div className="font-bold text-brand-black flex items-center gap-2 text-body-sm">
              <Truck className="w-4 h-4 text-accent-dark" /> Door-to-Door Option
            </div>
            <p className="text-body-xs text-slate-600">
              Complete pickup from Pakistan export hubs to final doorstep delivery worldwide.
            </p>
          </div>
        </div>

        {/* WHAT CAN YOU SEND BY AIR CARGO */}
        <div className="space-y-4 pt-4">
          <h3 className="text-heading-md font-bold text-brand-black">What Can You Send by Air Cargo?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Personal belongings & clothing',
              'Household items',
              'Documents & permitted parcels',
              'Business samples & trade items',
              'E-commerce shipments',
              'Commercial goods & garments',
              'Spare parts & tools',
              'Electronics & equipment',
              'Machinery parts',
              'General permitted cargo',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-body-sm font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-body-xs text-slate-500 italic">
            * Cargo acceptance depends on airline regulations, customs requirements and destination country laws.
          </p>
        </div>
      </section>

      {/* SECTION: AIR CARGO VS SEA CARGO COMPARISON TABLE */}
      <section id="air-vs-sea-comparison" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="outline" size="sm" className="mb-2 font-mono uppercase">Comparison Matrix</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo vs Sea Cargo — Which Should You Choose?</h2>
          <p className="text-body-md text-slate-600">
            Compare key operational metrics between air freight express dispatch and ocean sea container shipping from Pakistan.
          </p>
        </div>

        <div className="overflow-x-auto border border-border rounded-md shadow-xs">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="bg-brand-navy text-white text-xs font-mono uppercase tracking-wider">
                <th className="p-4 border-b border-border-dark">Feature / Criteria</th>
                <th className="p-4 border-b border-border-dark bg-brand-navy-light text-accent">✈️ Air Cargo</th>
                <th className="p-4 border-b border-border-dark">🚢 Sea Cargo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface font-normal text-slate-700">
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Speed / Transit Time</td>
                <td className="p-4 font-semibold text-emerald-700">Generally faster (Express transit)</td>
                <td className="p-4 text-slate-600">Generally slower (Ocean vessel transit)</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Cost Structure</td>
                <td className="p-4">Higher per kg</td>
                <td className="p-4 font-semibold text-emerald-700">More economical for larger shipments</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Best For</td>
                <td className="p-4 font-semibold text-brand-black">Faster, time-sensitive shipments</td>
                <td className="p-4">Larger, heavier & bulky shipments</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Suitable Shipment Size</td>
                <td className="p-4"><Badge variant="accent" size="sm">Min 20 KG</Badge></td>
                <td className="p-4"><Badge variant="secondary" size="sm">Min 70–100 KG</Badge></td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Urgency Level</td>
                <td className="p-4 text-emerald-700 font-semibold">High / Time-Critical</td>
                <td className="p-4 text-slate-600">Flexible / Planned Logistics</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Personal Belongings</td>
                <td className="p-4">Personal baggage, clothing, urgent items</td>
                <td className="p-4">Full household relocations, furniture</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Commercial Cargo</td>
                <td className="p-4">Samples, spare parts, high-value stock</td>
                <td className="p-4">Bulk inventory, factory machinery, LCL/FCL</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Main Pricing Factor</td>
                <td className="p-4">Actual weight vs Volumetric weight</td>
                <td className="p-4">Volume (CBM), weight & LCL/FCL container type</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Door-to-Door Availability</td>
                <td className="p-4">Airport-to-airport / Door-to-door</td>
                <td className="p-4">Port-to-port / Door-to-door</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Typical Use Case</td>
                <td className="p-4">Urgent personal baggage, commercial samples</td>
                <td className="p-4">High-volume commercial export & household moves</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: PRICE TABLE */}
      <section id="pricing-tables" className="scroll-mt-28 space-y-8 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">Indicative Pricing</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">International Air & Sea Cargo Rates</h2>
          <p className="text-body-md text-slate-600">
            Average rate reference tables from Pakistan. Contact Raahi International for live quotation based on your exact cargo specifications.
          </p>
        </div>

        {/* AIR CARGO RATE TABLE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-heading-md font-bold text-brand-black flex items-center gap-2">
              <Plane className="w-5 h-5 text-accent-dark" /> Average Air Cargo Rates from Pakistan
            </h3>
            <Badge variant="outline" size="sm" className="font-mono text-xs">Indicative Only</Badge>
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
                        Contact us for a quote →
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
        </div>

        {/* SEA CARGO RATE TABLE */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-heading-md font-bold text-brand-black flex items-center gap-2">
              <Ship className="w-5 h-5 text-blue-600" /> Average Sea Cargo Rates from Pakistan
            </h3>
            <Badge variant="outline" size="sm" className="font-mono text-xs">Indicative Only</Badge>
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
                        Contact us for a quote →
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

          <p className="text-body-xs text-slate-500 italic">
            * Rate Disclaimer: Rates shown above are indicative and may vary depending on shipment volume, weight, origin, destination, port/airport charges, airline/shipping line, customs requirements, fuel surcharges, and local delivery location. Contact Raahi International for a current quotation.
          </p>
        </div>
      </section>

      {/* SECTION: WHICH ONE SHOULD I PICK? */}
      <section id="which-to-pick" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="outline" size="sm" className="mb-2 font-mono uppercase">Practical Decision Guide</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Which One Should I Pick?</h2>
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

      {/* SECTION: TRANSIT TIME */}
      <section id="transit-times" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="secondary" size="sm" className="mb-2 font-mono uppercase">Timelines</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Estimated Transit Times</h2>
          <p className="text-body-md text-slate-600">
            Compare expected transit timelines between air cargo and ocean sea cargo dispatch from Pakistan export gateways.
          </p>
        </div>

        <div className="overflow-x-auto border border-border rounded-md shadow-xs">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="bg-brand-navy text-white text-xs font-mono uppercase tracking-wider">
                <th className="p-4 border-b border-border-dark">Shipping Mode</th>
                <th className="p-4 border-b border-border-dark">Airport / Port Transit</th>
                <th className="p-4 border-b border-border-dark">Door-to-Door Transit</th>
                <th className="p-4 border-b border-border-dark">Operational Gateways</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface font-normal text-slate-700">
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black flex items-center gap-2">
                  <Plane className="w-4 h-4 text-accent-dark" /> Air Cargo
                </td>
                <td className="p-4 font-semibold text-emerald-700">Generally 3–7 Days</td>
                <td className="p-4 font-semibold text-emerald-700">Generally 5–10 Days</td>
                <td className="p-4">LHE (Lahore), KHI (Karachi), ISB (Islamabad)</td>
              </tr>
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black flex items-center gap-2">
                  <Ship className="w-4 h-4 text-blue-600" /> Sea Cargo (LCL / FCL)
                </td>
                <td className="p-4 text-slate-700 font-semibold">Generally 20–35 Days</td>
                <td className="p-4 text-slate-700 font-semibold">Generally 25–45 Days</td>
                <td className="p-4">Karachi Port & Port Qasim Trade Terminals</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-body-xs text-slate-500 italic">
          * Note: Transit times depend on destination, flight/vessel schedules, customs clearance velocity, and weather conditions.
        </p>
      </section>

      {/* SECTION: WHY RAAHI INTERNATIONAL */}
      <section id="why-raahi" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">Why Choose Us</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Why Raahi International Cargo Services?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <ShieldCheck className="w-6 h-6 text-accent-dark" />
            <div className="font-bold text-brand-black text-body-sm">Door-to-Door Service</div>
            <p className="text-body-xs text-slate-600">
              Integrated collection from your doorstep in Pakistan to final destination delivery.
            </p>
          </div>

          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <Truck className="w-6 h-6 text-accent-dark" />
            <div className="font-bold text-brand-black text-body-sm">Pickup Across Pakistan</div>
            <p className="text-body-xs text-slate-600">
              Convenient doorstep collection operating in Lahore, Karachi, Islamabad, Rawalpindi, Multan & more.
            </p>
          </div>

          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <Plane className="w-6 h-6 text-accent-dark" />
            <div className="font-bold text-brand-black text-body-sm">Worldwide Destinations</div>
            <p className="text-body-xs text-slate-600">
              Global logistics reach connecting Pakistan to UK, USA, UAE, Saudi Arabia, Canada & 50+ countries.
            </p>
          </div>

          <div className="bg-surface border border-border p-5 rounded-md space-y-2">
            <Search className="w-6 h-6 text-accent-dark" />
            <div className="font-bold text-brand-black text-body-sm">Shipment Tracking</div>
            <p className="text-body-xs text-slate-600">
              Online tracking system for monitoring air and ocean cargo progress.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: AIR CARGO PROCESS */}
      <section id="air-cargo-process" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <h2 className="text-heading-xl font-bold text-brand-black">How Air Cargo Shipping Works</h2>
        </div>

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
      </section>

      {/* SECTION: FAQS */}
      <section id="faqs" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Frequently Asked Questions</div>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo & Comparison FAQs</h2>
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

      {/* SECTION: FINAL CONVERSION CTA */}
      <section className="w-full bg-brand-navy p-8 lg:p-12 rounded-md border border-border-dark text-white text-center space-y-6 shadow-xl">
        <Badge variant="accent" size="sm" className="font-mono uppercase font-bold">
          Ready to Ship Your Cargo?
        </Badge>

        <h3 className="text-heading-xl sm:text-display-md font-bold text-white tracking-tight">
          Get Your International Air Cargo Quote
        </h3>

        <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
          Whether you need the speed of air freight or the cost efficiency of sea freight, Raahi International can help you arrange an international shipping solution from Pakistan.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          <a href={`tel:${cleanPhone}`} className="w-full sm:w-auto">
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
      </section>
    </div>
  );
};
