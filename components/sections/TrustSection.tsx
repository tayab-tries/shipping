import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface TrustSectionProps {
  blockData?: Record<string, unknown>;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ blockData }) => {
  const badge = (blockData?.badge as string) || 'Reliability';
  const title = (blockData?.title as string) || 'RELIABLE CARGO DELIVERY FROM PAKISTAN';
  const subtitle =
    (blockData?.subtitle as string) ||
    'Factual operational capabilities for international air and sea cargo export shipments.';

  const credentials = [
    {
      category: 'HOME PICKUP & PACKAGING',
      title: 'Doorstep Collection Across Pakistan',
      description: 'Scheduled cargo collection directly from homes and commercial addresses across major Pakistani cities with export packaging inspection.',
    },
    {
      category: 'AIR & SEA DISPATCH',
      title: 'International Air & Ocean Freight Allocations',
      description: 'Air cargo dispatches departing major airport terminals and ocean container shipping connecting Pakistan export gateways.',
    },
    {
      category: 'CARGO VISIBILITY',
      title: 'Online Tracking Reference System',
      description: 'Enter your tracking number online to check current milestone progress, export clearance, international dispatch, and final delivery status.',
    },
  ];

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border text-brand-black">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} className="mb-12" />

        {/* Evidence List */}
        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {credentials.map((item, idx) => (
            <div key={idx} className="p-6 lg:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="md:w-1/4 space-y-1">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider">
                  {item.category}
                </span>
                <div className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span>✓ Verified Capability</span>
                </div>
              </div>

              <div className="md:w-3/4 space-y-2">
                <h3 className="text-heading-md font-bold text-brand-black">{item.title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
