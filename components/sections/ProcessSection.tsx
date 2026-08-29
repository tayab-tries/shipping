import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'REQUEST',
      subtitle: 'Quote & Specification',
      description: 'Submit cargo dimensions, weight, origin city in Pakistan, and destination address for rate quotes.',
    },
    {
      num: '02',
      title: 'COLLECTION',
      subtitle: 'Doorstep Pickup',
      description: 'Scheduled cargo collection from your address with commercial packaging inspection.',
    },
    {
      num: '03',
      title: 'PROCESSING',
      subtitle: 'Export Clearance',
      description: 'Customs declaration, carrier booking, and public tracking reference assignment.',
    },
    {
      num: '04',
      title: 'DELIVERY',
      subtitle: 'Destination Handoff',
      description: 'International customs clearance and final delivery handoff at the recipient address.',
    },
  ];

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Logistics Workflow"
          title="Structured Shipping & Dispatch Process"
          subtitle="Four clear operational stages from initial quote submission to final destination delivery."
          className="mb-14"
        />

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline (Thin dividers, no isolated heavy cards) */}
        <div className="bg-surface-subtle border border-border rounded-md p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative divide-y md:divide-y-0 md:divide-x divide-border">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`pt-6 md:pt-0 space-y-4 ${idx !== 0 ? 'md:pl-8' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-slate-400">{step.num}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Stage {idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-sm font-bold text-brand-black tracking-tight">{step.title}</h3>
                  <div className="text-xs font-mono font-semibold text-slate-500">{step.subtitle}</div>
                </div>

                <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
