import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessStepItem } from '@/types/content';

export interface ServiceProcessProps {
  steps: ProcessStepItem[];
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="Operational Sequence"
          title="Service Handling Process"
          subtitle="Step-by-step handling workflow for your cargo shipment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-surface p-5 rounded-md border border-border space-y-2">
              <div className="text-display-sm font-mono font-extrabold text-slate-300">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-heading-sm font-bold text-foreground">{step.title}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
