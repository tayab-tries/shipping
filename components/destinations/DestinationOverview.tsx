import React from 'react';
import { Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface DestinationOverviewProps {
  countryName: string;
  shippingOverview?: string;
}

export const DestinationOverview: React.FC<DestinationOverviewProps> = ({
  countryName,
  shippingOverview,
}) => {
  if (!shippingOverview) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-10 lg:py-12">
      <Container>
        <div className="bg-surface p-6 lg:p-8 rounded-md border border-border space-y-3 shadow-2xs max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Corridor Shipping Context</span>
          </div>

          <h2 className="text-heading-md font-bold text-foreground">
            Shipping & Logistics Overview — {countryName}
          </h2>

          <p className="text-body-md text-muted-foreground leading-relaxed">
            {shippingOverview}
          </p>
        </div>
      </Container>
    </section>
  );
};
