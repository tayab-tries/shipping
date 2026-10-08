import React from 'react';
import { MapPin, PackageCheck, ShieldCheck, Truck, FileCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CityLogisticsProfile } from '@/lib/destinations/city-logistics-data';

export interface CityDeliveryCoverageProps {
  profile: CityLogisticsProfile;
}

export const CityDeliveryCoverage: React.FC<CityDeliveryCoverageProps> = ({ profile }) => {
  const { cityName, countryName, deliveryZones, cargoTypes, customsProcedures } = profile;

  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        {/* SECTION 1: METROPOLITAN DELIVERY ZONES */}
        <div className="mb-16">
          <SectionHeading
            badge="Local Coverage"
            title={`Metropolitan Delivery Zones in ${cityName}`}
            subtitle={`Scheduled doorstep distribution across residential boroughs, commercial retail clusters, and industrial districts.`}
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliveryZones.map((zone, idx) => (
              <div
                key={idx}
                className="bg-surface-subtle rounded-md border border-border p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-accent-dark shrink-0" />
                    <h4 className="text-heading-sm font-bold text-brand-black">{zone.zoneName}</h4>
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 bg-surface px-2.5 py-1 rounded border border-border">
                    Active Route
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      Coverage Areas:
                    </span>
                    <span className="text-body-xs text-slate-800 font-medium leading-relaxed block mt-0.5">
                      {zone.coverageAreas}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      Postal / ZIP Identifiers:
                    </span>
                    <span className="font-mono text-slate-700 block mt-0.5">
                      {zone.postalOrZipCodes}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center gap-1.5 text-slate-600 font-mono">
                    <Truck className="w-3.5 h-3.5 text-accent-dark shrink-0" />
                    <span>{zone.dispatchSchedule}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: COMMON CARGO COMMODITIES & COMPLIANCE */}
        <div className="mb-16">
          <SectionHeading
            badge="Cargo Specialization"
            title={`Common Consignments Shipped to ${cityName} from Pakistan`}
            subtitle={`Key commercial goods, diaspora commodities, and regulatory clearance prerequisites.`}
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cargoTypes.map((cargo, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-md border border-border p-6 space-y-3 shadow-xs hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PackageCheck className="w-5 h-5 text-accent-dark shrink-0" />
                  <h4 className="text-heading-sm font-bold text-brand-black">{cargo.category}</h4>
                </div>

                <p className="text-body-xs text-slate-700 leading-relaxed">
                  <strong className="text-brand-black font-semibold">Typical Items: </strong>
                  {cargo.typicalItems}
                </p>

                <div className="pt-2 border-t border-border bg-surface-subtle p-3 rounded text-xs font-mono text-slate-700 space-y-1">
                  <div className="flex items-start gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-black font-semibold">Customs Requirement: </strong>
                      {cargo.complianceRequirement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: LOCAL CUSTOMS & REGULATORY SUMMARY */}
        <div className="bg-surface-subtle rounded-md border border-border p-6 lg:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2.5 bg-brand-navy rounded text-white shrink-0">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Border Protocol
              </span>
              <h3 className="text-heading-md font-bold text-brand-black">
                Customs Authority & Clearance Details: {cityName}, {countryName}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-surface p-4 rounded border border-border space-y-1.5">
              <span className="font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Governing Authority
              </span>
              <span className="text-sm font-bold text-brand-black block">
                {customsProcedures.authority}
              </span>
              <span className="text-slate-600 block">
                Official destination customs agency governing clearance declarations.
              </span>
            </div>

            <div className="bg-surface p-4 rounded border border-border space-y-1.5">
              <span className="font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Bonded Inspection Depot
              </span>
              <span className="text-sm font-bold text-brand-black block">
                {customsProcedures.clearanceDepot}
              </span>
              <span className="text-slate-600 block">
                Designated bonded examination facility for cargo verification.
              </span>
            </div>

            <div className="bg-surface p-4 rounded border border-border space-y-1.5">
              <span className="font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Taxes, Duty & Relocation Rules
              </span>
              <span className="text-slate-700 block leading-relaxed">
                {customsProcedures.dutyVatSummary}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              All commercial and personal shipments to {cityName} are pre-cleared electronically before dispatch to eliminate holdover demurrage.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
