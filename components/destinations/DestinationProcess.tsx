import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface DestinationProcessProps {
  countryName: string;
}

export const DestinationProcess: React.FC<DestinationProcessProps> = ({ countryName }) => {
  const steps = [
    {
      step: '01',
      title: 'Quote & Requirement Review',
      description: `Submit your cargo specification and destination requirements in ${countryName} for a clear freight quotation.`,
    },
    {
      step: '02',
      title: 'Origin Collection & Packing',
      description: 'Cargo is received at local dispatch hubs, verified against packing lists, and prepared for air/ocean transport.',
    },
    {
      step: '03',
      title: 'Export Customs Clearance',
      description: 'Export declarations and customs processing are completed prior to air/ocean carrier loading.',
    },
    {
      step: '04',
      title: 'Destination Terminal Arrival',
      description: `Consignments arrive at designated entry ports/airports in ${countryName} for final clearance and delivery.`,
    },
  ];

  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="Corridor Process"
          title={`Shipping Process to ${countryName}`}
          subtitle={`Structured 4-step workflow for cargo moving from Pakistan to ${countryName}.`}
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
