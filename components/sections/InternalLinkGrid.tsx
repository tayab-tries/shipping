import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, Truck, ArrowRight, Compass } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface InternalLinkGridProps {
  className?: string;
}

export const InternalLinkGrid: React.FC<InternalLinkGridProps> = ({ className = '' }) => {
  const destinationCountries = [
    { label: 'Cargo to United Kingdom', href: '/destinations/uk' },
    { label: 'Cargo to United Arab Emirates', href: '/destinations/uae' },
    { label: 'Cargo to Saudi Arabia (KSA)', href: '/destinations/ksa' },
    { label: 'Cargo to United States', href: '/destinations/usa' },
    { label: 'Cargo to Canada', href: '/destinations/canada' },
  ];

  const destinationCities = [
    { label: 'Cargo to London, UK', href: '/destinations/uk/london' },
    { label: 'Cargo to Manchester, UK', href: '/destinations/uk/manchester' },
    { label: 'Cargo to Birmingham, UK', href: '/destinations/uk/birmingham' },
    { label: 'Cargo to Dubai, UAE', href: '/destinations/uae/dubai' },
    { label: 'Cargo to Abu Dhabi, UAE', href: '/destinations/uae/abu-dhabi' },
    { label: 'Cargo to Riyadh, KSA', href: '/destinations/ksa/riyadh' },
    { label: 'Cargo to Jeddah, KSA', href: '/destinations/ksa/jeddah' },
    { label: 'Cargo to Toronto, Canada', href: '/destinations/canada/toronto' },
    { label: 'Cargo to Vancouver, Canada', href: '/destinations/canada/vancouver' },
    { label: 'Cargo to New York, USA', href: '/destinations/usa/new-york' },
    { label: 'Cargo to Chicago, USA', href: '/destinations/usa/chicago' },
    { label: 'Cargo to Houston, USA', href: '/destinations/usa/houston' },
  ];

  const departureHubs = [
    { label: 'Cargo Services in Lahore', href: '/locations/international-cargo-services-in-lahore', sub: 'Punjab Central Hub (LHR)' },
    { label: 'Cargo Services in Karachi', href: '/locations/international-cargo-services-in-karachi', sub: 'Seaport & Air Terminal (KHI)' },
    { label: 'Cargo Services in Islamabad', href: '/locations/international-cargo-services-in-islamabad', sub: 'Federal Capital Gateway (ISB)' },
    { label: 'Cargo Services in Rawalpindi', href: '/locations/international-cargo-services-in-rawalpindi', sub: 'Twin Cities Dispatch' },
    { label: 'Cargo Services in Faisalabad', href: '/locations/international-cargo-services-in-faisalabad', sub: 'Textile Export Center' },
    { label: 'Cargo Services in Sialkot', href: '/locations/international-cargo-services-in-sialkot', sub: 'Manufacturing & Export Hub (SKT)' },
    { label: 'Cargo Services in Multan', href: '/locations/international-cargo-services-in-multan', sub: 'South Punjab Dispatch Hub' },
    { label: 'Cargo Services in Peshawar', href: '/locations/international-cargo-services-in-peshawar', sub: 'Khyber Pakhtunkhwa Gateway' },
  ];

  const coreServicesAndTools = [
    { label: 'Air Cargo Shipping Services', href: '/cargo-services#part-1-air-cargo', category: 'Mode' },
    { label: 'Sea Cargo & Container Freight', href: '/cargo-services#part-2-sea-cargo', category: 'Mode' },
    { label: 'Air vs Sea Cargo Comparison', href: '/cargo-services#quick-comparison', category: 'Service' },
    { label: 'Commercial B2B Export Cargo', href: '/services/commercial-cargo', category: 'Service' },
    { label: 'Excess Baggage & Personal Belongings', href: '/services/excess-baggage', category: 'Service' },
    { label: 'All Cargo Services Overview', href: '/services', category: 'Directory' },
    { label: 'Instant Freight Rate Calculator', href: '/quote', category: 'Tool' },
    { label: 'Live Shipment Tracking & Status', href: '/track', category: 'Tool' },
    { label: 'Export Customs Documentation Guide', href: '/guides/export-customs-documentation-guide', category: 'Guide' },
    { label: 'Cargo Packaging & Crating Guidelines', href: '/guides/packing-cargo-guide', category: 'Guide' },
    { label: 'Shipping & Customs Guides Directory', href: '/guides', category: 'Directory' },
    { label: 'About Raahi International Logistics', href: '/about', category: 'Corporate' },
  ];

  return (
    <section
      aria-labelledby="internal-link-mesh-heading"
      className={`w-full bg-surface-subtle py-16 lg:py-24 border-t border-b border-border text-brand-black ${className}`}
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-dark uppercase tracking-wider mb-2.5">
            <Compass className="w-4 h-4 text-accent" />
            <span>Complete Freight Routing Network</span>
          </div>
          <h2
            id="internal-link-mesh-heading"
            className="text-heading-xl sm:text-3xl font-extrabold text-brand-black tracking-tight"
          >
            Explore Pakistan Origin Hubs, Global Corridors & Shipping Services
          </h2>
          <p className="text-body-sm text-slate-600 mt-2.5 leading-relaxed">
            Quickly navigate our verified international delivery mesh. Select a departure terminal across Pakistan, an international destination hub, or access our instant quote and tracking tools.
          </p>
        </div>

        {/* 3-Column Semantic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Column 1: International Destinations */}
          <div className="bg-surface rounded-lg border border-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-3.5">
                <div className="p-2 bg-brand-black rounded text-accent">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-heading-md font-bold text-brand-black">
                    International Destinations
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    5 Primary Countries • 12 City Hubs
                  </span>
                </div>
              </div>

              {/* Country Corridors */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
                  Country Trade Corridors
                </span>
                <ul className="space-y-1.5 text-xs font-medium">
                  {destinationCountries.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="flex items-center justify-between text-slate-700 hover:text-accent-dark hover:underline transition-colors py-1 group"
                      >
                        <span className="font-semibold text-brand-black group-hover:text-accent-dark">
                          {c.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-dark group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* City Delivery Hubs */}
              <div className="space-y-2 pt-2 border-t border-border/70">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
                  Key Metro Delivery Cities
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-xs font-medium">
                  {destinationCities.map((city) => (
                    <li key={city.href}>
                      <Link
                        href={city.href}
                        className="text-slate-600 hover:text-brand-black hover:underline transition-colors py-0.5 block truncate"
                        title={city.label}
                      >
                        {city.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-border/70 mt-6">
              <Link
                href="/destinations"
                className="text-xs font-mono font-bold text-accent-dark hover:text-accent flex items-center justify-between transition-colors"
              >
                <span>View All Destination Corridors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Pakistan Departure Hubs */}
          <div className="bg-surface rounded-lg border border-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-3.5">
                <div className="p-2 bg-brand-black rounded text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-heading-md font-bold text-brand-black">
                    Pakistan Departure Hubs
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    8 Verified Dispatch Centers
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
                  Direct Origin Stations
                </span>
                <ul className="space-y-2.5 text-xs font-medium">
                  {departureHubs.map((hub) => (
                    <li key={hub.href}>
                      <Link
                        href={hub.href}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 bg-surface-subtle hover:bg-slate-100 rounded border border-border/80 transition-colors group"
                      >
                        <span className="font-bold text-brand-black group-hover:text-accent-dark">
                          {hub.label}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {hub.sub}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-border/70 mt-6">
              <Link
                href="/locations"
                className="text-xs font-mono font-bold text-accent-dark hover:text-accent flex items-center justify-between transition-colors"
              >
                <span>Explore All Pakistan Pickup Centers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 3: Core Services & Tools */}
          <div className="bg-surface rounded-lg border border-border p-6 sm:p-7 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-3.5">
                <div className="p-2 bg-brand-black rounded text-accent">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-heading-md font-bold text-brand-black">
                    Services & Logistics Tools
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    Transactional Tools & Customs Guides
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
                  Key Logistics Utilities & Solutions
                </span>
                <ul className="space-y-2 text-xs font-medium">
                  {coreServicesAndTools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="flex items-center justify-between gap-2 text-slate-700 hover:text-accent-dark hover:underline transition-colors py-0.5 group"
                      >
                        <span className="font-medium text-brand-black group-hover:text-accent-dark truncate">
                          {tool.label}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-slate-500 shrink-0">
                          {tool.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-border/70 mt-6 flex items-center justify-between">
              <Link
                href="/quote"
                className="text-xs font-mono font-bold text-accent-dark hover:text-accent flex items-center gap-1 transition-colors"
              >
                <span>Get a Fast Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track"
                className="text-xs font-mono text-slate-600 hover:text-brand-black transition-colors"
              >
                Track Live Cargo →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
