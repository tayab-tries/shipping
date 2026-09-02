import React from 'react';
import Link from 'next/link';
import {
  Truck,
  Clock,
  Package,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface AirFreightServiceContentProps {
  phone?: string;
  whatsappNumber?: string;
}

export const AirFreightServiceContent: React.FC<AirFreightServiceContentProps> = () => {

  const airCargoRates = [
    { country: 'USA', flag: '🇺🇸', rate: 'Rs. 2,750 – 2,950/KG', deliveryTime: '10–15 Days' },
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'Rs. 1,750 – 1,850/KG', deliveryTime: '10–12 Days' },
    { country: 'UAE', flag: '🇦🇪', rate: 'Rs. 1,350 – 1,450/KG', deliveryTime: '10–17 Days' },
    { country: 'Canada', flag: '🇨🇦', rate: 'Rs. 2,850 – 2,950/KG', deliveryTime: '10–15 Days' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'Rs. 2,150 – 2,250/KG', deliveryTime: '10–20 Days' },
    { country: 'Europe', flag: '🇪🇺', rate: 'Rs. 2,350 – 2,450/KG', deliveryTime: '10–15 Days' },
    { country: 'Australia', flag: '🇦🇺', rate: 'Rs. 2,350 – 2,450/KG', deliveryTime: '10–15 Days' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'Rs. 2,350/KG', deliveryTime: '10–15 Days' },
    { country: 'Dubai', flag: '🇦🇪', rate: 'Rs. 1,350 – 1,450/KG', deliveryTime: '10–17 Days' },
  ];

  const seaCargoRates = [
    { country: 'United Kingdom', flag: '🇬🇧', rate: 'Rs. 950 – 1,000/KG', deliveryTime: '1.5 – 2.5 Months' },
    { country: 'UAE', flag: '🇦🇪', rate: 'Rs. 600 – 700/KG', deliveryTime: '1.5 – 2.5 Months' },
    { country: 'USA', flag: '🇺🇸', rate: 'Rs. 1,550 – 1,650/KG', deliveryTime: '2 – 2.5 Months' },
    { country: 'Saudi Arabia', flag: '🇸🇦', rate: 'Rs. 950 – 1,000/KG', deliveryTime: '1.5 – 2.5 Months' },
    { country: 'Germany', flag: '🇩🇪', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months' },
    { country: 'Canada', flag: '🇨🇦', rate: 'Rs. 1,750 – 1,850/KG', deliveryTime: '2 – 3 Months' },
    { country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rate: 'Rs. 1,250/KG', deliveryTime: '1.5 – 2.5 Months' },
    { country: 'Australia', flag: '🇦🇺', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months' },
    { country: 'Europe', flag: '🇪🇺', rate: 'Rs. 1,450/KG', deliveryTime: '2 – 2.5 Months' },
  ];

  return (
    <div className="w-full space-y-12 font-sans">
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
            <a href="#pricing-tables" className="hover:text-accent-dark hover:underline flex items-center gap-1.5 font-bold text-brand-black">
              <ChevronRight className="w-3.5 h-3.5 text-accent-dark shrink-0" /> 💰 Air & Sea Cargo Rate Tables
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
      </section>

      {/* SECTION: AIR CARGO VS SEA CARGO COMPARISON TABLE */}
      <section id="air-vs-sea-comparison" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="outline" size="sm" className="mb-2 font-mono uppercase">Comparison Matrix</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">Air Cargo vs Sea Cargo — Which Should You Choose?</h2>
        </div>

        <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
          <table className="w-full text-left text-body-sm border-collapse">
            <thead>
              <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                <th className="p-4 font-bold text-brand-black">Feature / Criteria</th>
                <th className="p-4 font-bold text-brand-black">✈️ Air Cargo</th>
                <th className="p-4 font-bold text-brand-black">🚢 Sea Cargo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-normal text-slate-700">
              <tr className="hover:bg-surface-subtle transition-colors">
                <td className="p-4 font-bold text-brand-black">Speed / Transit Time</td>
                <td className="p-4 font-semibold text-emerald-700">Generally 10–15 Days</td>
                <td className="p-4 text-slate-600">Generally 1.5–2.5 Months</td>
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
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: PRICE TABLE */}
      <section id="pricing-tables" className="scroll-mt-28 space-y-8 pt-8 border-t border-border">
        <div className="border-b border-border pb-3">
          <Badge variant="accent" size="sm" className="mb-2 font-mono uppercase">Indicative Pricing</Badge>
          <h2 className="text-heading-xl font-bold text-brand-black">International Air & Sea Cargo Rates</h2>
        </div>

        {/* AIR CARGO RATE TABLE */}
        <div className="space-y-4">
          <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-heading-md font-bold text-brand-black">
                Air Cargo Rates & Delivery Time
              </h3>
              <p className="text-body-xs text-slate-600">
                Indicative air cargo rates per KG and estimated delivery timelines from Pakistan.
              </p>
            </div>
            <Badge variant="accent" size="sm" className="font-mono font-bold">Minimum Air Shipment: 20 KG</Badge>
          </div>

          <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
            <table className="w-full text-left text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                  <th className="p-4 font-bold text-brand-black">Destination</th>
                  <th className="p-4 font-bold text-brand-black">Rate</th>
                  <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                  <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-normal text-slate-700">
                {airCargoRates.map((rate) => (
                  <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                      <span className="text-xl">{rate.flag}</span>
                      <span>{rate.country}</span>
                    </td>
                    <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                      {rate.rate}
                    </td>
                    <td className="p-4 text-body-sm text-slate-700 font-medium">
                      {rate.deliveryTime}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/quote?service=air-freight`} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                        Get Quote →
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
          <div className="bg-surface-subtle p-5 rounded-md border border-border flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-heading-md font-bold text-brand-black">
                Sea Cargo Rates & Delivery Time
              </h3>
              <p className="text-body-xs text-slate-600">
                Indicative ocean freight rates (PKR/KG) and estimated delivery timelines from Pakistan.
              </p>
            </div>
            <Badge variant="secondary" size="sm" className="font-mono font-bold">Minimum Sea Cargo: 70–100 KG</Badge>
          </div>

          <div className="overflow-x-auto border border-border rounded-md shadow-xs bg-surface">
            <table className="w-full text-left text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-brand-black text-xs font-mono font-bold uppercase tracking-wider border-b border-border">
                  <th className="p-4 font-bold text-brand-black">Destination</th>
                  <th className="p-4 font-bold text-brand-black">Rate</th>
                  <th className="p-4 font-bold text-brand-black">Delivery Time</th>
                  <th className="p-4 font-bold text-brand-black text-right">Get Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-normal text-slate-700">
                {seaCargoRates.map((rate) => (
                  <tr key={rate.country} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-4 font-bold text-brand-black text-body-md flex items-center gap-2.5">
                      <span className="text-xl">{rate.flag}</span>
                      <span>{rate.country}</span>
                    </td>
                    <td className="p-4 font-bold font-mono text-brand-black text-body-md">
                      {rate.rate}
                    </td>
                    <td className="p-4 text-body-sm text-slate-700 font-medium">
                      {rate.deliveryTime}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/quote?service=sea-cargo`} className="text-xs font-bold text-brand-black hover:text-accent-dark underline">
                        Get Quote →
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
    </div>
  );
};
