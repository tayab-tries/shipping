import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface ProcessSectionProps {
  blockData?: Record<string, unknown>;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ blockData }) => {
  const badge = (blockData?.badge as string) || 'How It Works';
  const title = (blockData?.title as string) || 'Simple 4-Step Cargo Shipping Process';
  const subtitle =
    (blockData?.subtitle as string) ||
    'From your initial quote to doorstep delivery at your destination address.';

  const steps = [
    {
      num: (blockData?.stage1_num as string) || '01',
      title: (blockData?.stage1_title as string) || 'GET A QUOTE',
      subtitle: (blockData?.stage1_subtitle as string) || 'Submit Online or WhatsApp',
      description:
        (blockData?.stage1_description as string) ||
        'Tell us your pickup city in Pakistan, destination country, and approximate weight.',
    },
    {
      num: (blockData?.stage2_num as string) || '02',
      title: (blockData?.stage2_title as string) || 'HOME PICKUP',
      subtitle: (blockData?.stage2_subtitle as string) || 'Scheduled Address Collection',
      description:
        (blockData?.stage2_description as string) ||
        'We collect your cargo directly from your home or business address in Pakistan.',
    },
    {
      num: (blockData?.stage3_num as string) || '03',
      title: (blockData?.stage3_title as string) || 'INTERNATIONAL SHIPPING',
      subtitle: (blockData?.stage3_subtitle as string) || 'Export Clearance & Dispatch',
      description:
        (blockData?.stage3_description as string) ||
        'Customs declaration and international dispatch via air or sea cargo.',
    },
    {
      num: (blockData?.stage4_num as string) || '04',
      title: (blockData?.stage4_title as string) || 'FINAL DELIVERY',
      subtitle: (blockData?.stage4_subtitle as string) || 'Doorstep Handoff',
      description:
        (blockData?.stage4_description as string) ||
        'Customs clearance at destination and final delivery to the recipient\'s door.',
    },
  ];

  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        {/* Timeline */}
        <div className="bg-surface-subtle border border-border rounded-md p-6 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative divide-y md:divide-y-0 md:divide-x divide-border">
            {steps.map((step, idx) => (
              <div key={step.num} className={`pt-6 md:pt-0 space-y-3 ${idx !== 0 ? 'md:pl-6' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-slate-400">{step.num}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Step {idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-sm font-bold text-brand-black tracking-tight">{step.title}</h3>
                  <div className="text-xs font-mono font-semibold text-accent">{step.subtitle}</div>
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
