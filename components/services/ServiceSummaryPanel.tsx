import React from 'react';
import { Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface ServiceSummaryPanelProps {
  serviceOverview: string;
  targetAudience: string[];
  keyConsiderations: string[];
}

export const ServiceSummaryPanel: React.FC<ServiceSummaryPanelProps> = ({
  serviceOverview,
  targetAudience,
  keyConsiderations,
}) => {
  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12">
      <Container>
        <div className="bg-surface p-6 lg:p-8 rounded-md border border-border space-y-8 shadow-2xs">
          {/* Overview text */}
          <div className="space-y-2">
            <h2 className="text-heading-sm font-bold text-foreground uppercase tracking-wider text-secondary">
              Service Overview
            </h2>
            <p className="text-body-md text-foreground leading-relaxed">
              {serviceOverview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border-subtle">
            {/* Target Audience / Use Cases */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Users className="w-4 h-4 text-secondary" />
                <span>Suitable Shipment Profiles</span>
              </div>
              <ul className="space-y-2">
                {targetAudience.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Considerations */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <AlertCircle className="w-4 h-4 text-accent" />
                <span>Important Considerations</span>
              </div>
              <ul className="space-y-2">
                {keyConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
