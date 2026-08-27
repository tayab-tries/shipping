import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface LocationProcessProps {
  cityName: string;
}

export const LocationProcess: React.FC<LocationProcessProps> = ({ cityName }) => {
  const steps = [
    {
      step: '01',
      title: 'Quote & Booking',
      description: `Request a shipping quote specifying your origin area in ${cityName}, cargo dimensions, and destination country.`,
    },
    {
      step: '02',
      title: 'Cargo Receiving / Collection',
      description: `Cargo is collected from your specified location in ${cityName} or received at local collection points.`,
    },
    {
      step: '03',
      title: 'Export Customs Processing',
      description: 'Shipments undergo export documentation compliance and airport/port terminal processing.',
    },
    {
      step: '04',
      title: 'International Dispatch',
      description: 'Cargo is dispatched via air or ocean freight to your destination with online status tracking.',
    },
  ];

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="Dispatch Workflow"
          title={`How International Cargo Moves from ${cityName}`}
          subtitle={`A structured 4-step process for cargo shipments originating in ${cityName}.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map((st) => (
            <div key={st.step} className="bg-surface p-5 rounded-md border border-border space-y-2 min-w-0">
              <div className="text-display-sm font-mono font-extrabold text-slate-300">{st.step}</div>
              <h3 className="text-heading-sm font-bold text-foreground">{st.title}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed">{st.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
