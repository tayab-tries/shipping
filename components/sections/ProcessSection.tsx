import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface ProcessSectionProps {
  blockData?: Record<string, unknown>;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ blockData }) => {
  const badge = (blockData?.badge as string) || 'Logistics Workflow';
  const title = (blockData?.title as string) || 'Structured Shipping & Dispatch Process';
  const subtitle =
    (blockData?.subtitle as string) ||
    'Four clear operational stages from initial quote submission to final destination delivery.';

  const steps = [
    {
      num: (blockData?.stage1_num as string) || '01',
      title: (blockData?.stage1_title as string) || 'REQUEST',
      subtitle: (blockData?.stage1_subtitle as string) || 'Quote & Specification',
      description:
        (blockData?.stage1_description as string) ||
        'Submit cargo dimensions, weight, origin city in Pakistan, and destination address for rate quotes.',
    },
    {
      num: (blockData?.stage2_num as string) || '02',
      title: (blockData?.stage2_title as string) || 'COLLECTION',
      subtitle: (blockData?.stage2_subtitle as string) || 'Doorstep Pickup',
      description:
        (blockData?.stage2_description as string) ||
        'Scheduled cargo collection from your address with commercial packaging inspection.',
    },
    {
      num: (blockData?.stage3_num as string) || '03',
      title: (blockData?.stage3_title as string) || 'PROCESSING',
      subtitle: (blockData?.stage3_subtitle as string) || 'Export Clearance',
      description:
        (blockData?.stage3_description as string) ||
        'Customs declaration, carrier booking, and public tracking reference assignment.',
    },
    {
      num: (blockData?.stage4_num as string) || '04',
      title: (blockData?.stage4_title as string) || 'DELIVERY',
      subtitle: (blockData?.stage4_subtitle as string) || 'Destination Handoff',
      description:
        (blockData?.stage4_description as string) ||
        'International customs clearance and final delivery handoff at the recipient address.',
    },
  ];

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-14" />

        {/* Timeline */}
        <div className="bg-surface-subtle border border-border rounded-md p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative divide-y md:divide-y-0 md:divide-x divide-border">
            {steps.map((step, idx) => (
              <div key={step.num} className={`pt-6 md:pt-0 space-y-4 ${idx !== 0 ? 'md:pl-8' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-slate-400">{step.num}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Stage {idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-sm font-bold text-brand-black tracking-tight">{step.title}</h3>
                  <div className="text-xs font-mono font-semibold text-slate-500">{step.subtitle}</div>
                </div>

                <p className="text-body-sm text-slate-600 leading-relaxed font-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
