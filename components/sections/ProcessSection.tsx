import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Quote Request',
      description:
        'Submit your cargo details, origin city, destination, and estimated weight to receive a detailed quote.',
    },
    {
      step: '02',
      title: 'Collection',
      description:
        'Cargo is received or collected from your specified location in Pakistan according to service agreement.',
    },
    {
      step: '03',
      title: 'Processing & Dispatch',
      description:
        'Cargo is inspected, packed if needed, cleared for export, and dispatched via air or ocean freight.',
    },
    {
      step: '04',
      title: 'Delivery',
      description:
        'Your shipment arrives at destination terminal or address with milestone updates along the route.',
    },
  ];

  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-slate-200">
      <Container>
        <SectionHeading
          badge="Shipment Workflow"
          title="How Your Cargo Is Handled"
          subtitle="A simple 4-step process from initial inquiry to final destination delivery."
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((st) => (
            <div key={st.step} className="space-y-3 relative p-6 bg-brand-black-deep rounded-md border border-border-dark">
              <div className="text-display-lg font-mono font-extrabold text-accent">
                {st.step}
              </div>
              <h3 className="text-heading-sm font-bold text-white">{st.title}</h3>
              <p className="text-body-sm text-slate-400 leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
