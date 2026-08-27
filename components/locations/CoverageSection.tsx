import React from 'react';
import { MapPin, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface CoverageSectionProps {
  cityName: string;
  localCoverageText: string;
  collectionAvailable: boolean;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({
  cityName,
  localCoverageText,
  collectionAvailable,
}) => {
  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <div className="bg-surface p-6 lg:p-8 rounded-md border border-border space-y-4 shadow-2xs max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            {collectionAvailable ? <Truck className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            <span>{cityName} Logistics Coverage</span>
          </div>

          <h2 className="text-heading-md font-bold text-foreground">
            Cargo Pickup & Receiving in {cityName}
          </h2>

          <p className="text-body-md text-muted-foreground leading-relaxed">
            {localCoverageText}
          </p>

          <div className="pt-2 text-xs text-muted-foreground border-t border-border-subtle flex flex-wrap items-center gap-6">
            <span>Operational Hub: {cityName} Origin Zone</span>
            <span>Export Clearance: Central Dispatch Processing</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
