import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface DestinationConsiderationsProps {
  countryName: string;
  customsGuidance?: string;
}

export const DestinationConsiderations: React.FC<DestinationConsiderationsProps> = ({
  countryName,
  customsGuidance,
}) => {
  if (!customsGuidance) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-10 lg:py-12">
      <Container>
        <div className="bg-surface p-6 rounded-md border border-border space-y-3 shadow-2xs max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Verified Preparation & Documentation</span>
          </div>

          <h2 className="text-heading-md font-bold text-foreground">
            Customs & Preparation Considerations for {countryName}
          </h2>

          <p className="text-body-md text-muted-foreground leading-relaxed">
            {customsGuidance}
          </p>
        </div>
      </Container>
    </section>
  );
};
