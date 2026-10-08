import React from 'react';
import { Plane, Ship, Train, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { CityLogisticsProfile } from '@/lib/destinations/city-logistics-data';

export interface CityGatewayRoutingProps {
  profile: CityLogisticsProfile;
}

export const CityGatewayRouting: React.FC<CityGatewayRoutingProps> = ({ profile }) => {
  const { cityName, countryName, gateways, transitTimelines, editorialOverview } = profile;

  const getGatewayIcon = (type: 'air' | 'ocean' | 'inland') => {
    switch (type) {
      case 'air':
        return <Plane className="w-5 h-5 text-accent" />;
      case 'ocean':
        return <Ship className="w-5 h-5 text-accent" />;
      case 'inland':
        return <Train className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Port & Gateway Routing"
          title={`International Freight Gateways & Clearance Hubs for ${cityName}`}
          subtitle={`Direct and connecting air, ocean, and inland multimodal corridors serving the ${profile.metroAreaName}.`}
          className="mb-10"
        />

        {/* Editorial Logistics Context */}
        <div className="bg-surface rounded-md border border-border p-6 lg:p-8 mb-10 shadow-xs space-y-4">
          <h3 className="text-heading-md font-bold text-brand-black">
            Logistics Infrastructure & Corridor Overview: Pakistan to {cityName}
          </h3>
          <p className="text-body-md text-slate-700 leading-relaxed font-normal">
            {editorialOverview}
          </p>
        </div>

        {/* Gateways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gateways.map((gw, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-md border border-border p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-slate-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-brand-navy rounded text-white shrink-0">
                    {getGatewayIcon(gw.type)}
                  </div>
                  {gw.code && (
                    <Badge variant="outline" className="font-mono text-xs uppercase font-bold">
                      {gw.code}
                    </Badge>
                  )}
                </div>

                <h4 className="text-heading-sm font-bold text-brand-black">{gw.name}</h4>
                <p className="text-body-xs text-slate-600 leading-relaxed">{gw.role}</p>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-start gap-2 text-xs font-mono text-slate-600">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-brand-black font-semibold">Bonded Terminal: </strong>
                    {gw.customsTerminal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transit Timelines Matrix */}
        <div className="bg-brand-black rounded-md border border-border-dark p-6 lg:p-8 text-white space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-dark pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                Transit Performance Benchmarks
              </span>
              <h3 className="text-heading-lg font-bold text-white mt-1">
                Typical Doorstep Timelines: Pakistan to {cityName}, {countryName}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Clock className="w-4 h-4 text-accent" />
              <span>Includes customs clearance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-brand-navy/60 p-4 rounded border border-border-dark space-y-2">
              <span className="text-xs font-mono text-accent uppercase font-bold block">
                Air Express Cargo
              </span>
              <span className="text-sm font-bold text-white block">{transitTimelines.airExpress}</span>
              <span className="text-xs text-slate-300 block">
                Priority boarding from LHE, KHI, ISB
              </span>
            </div>

            <div className="bg-brand-navy/60 p-4 rounded border border-border-dark space-y-2">
              <span className="text-xs font-mono text-accent uppercase font-bold block">
                Standard Air Freight
              </span>
              <span className="text-sm font-bold text-white block">{transitTimelines.airStandard}</span>
              <span className="text-xs text-slate-300 block">
                Consolidated scheduled linehaul
              </span>
            </div>

            <div className="bg-brand-navy/60 p-4 rounded border border-border-dark space-y-2">
              <span className="text-xs font-mono text-accent uppercase font-bold block">
                Ocean LCL (Shared)
              </span>
              <span className="text-sm font-bold text-white block">{transitTimelines.seaLcl}</span>
              <span className="text-xs text-slate-300 block">
                Palletized ocean freight delivery
              </span>
            </div>

            <div className="bg-brand-navy/60 p-4 rounded border border-border-dark space-y-2">
              <span className="text-xs font-mono text-accent uppercase font-bold block">
                Ocean FCL (Full Container)
              </span>
              <span className="text-sm font-bold text-white block">{transitTimelines.seaFcl}</span>
              <span className="text-xs text-slate-300 block">
                Direct container chassis placement
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-border-dark/60 text-xs font-mono text-slate-300 flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>
              <strong className="text-white">Last-Mile Routing: </strong>
              {transitTimelines.lastMileNotes}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
