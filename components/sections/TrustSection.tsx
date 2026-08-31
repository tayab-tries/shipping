import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const TrustSection: React.FC = () => {
  const credentials = [
    {
      category: 'CUSTOMS & DECLARATION',
      title: 'Commercial Export Customs Declaration',
      description: 'Standardized customs filing and documentation processing for air cargo and ocean container shipments originating in Pakistan.',
    },
    {
      category: 'LINEHAUL ALLOCATIONS',
      title: 'Scheduled Airline Cargo Capacity',
      description: 'Direct booking allocations on international scheduled air carriers operating from Pakistan airport cargo terminals.',
    },
    {
      category: 'PUBLIC VISIBILITY',
      title: 'Milestone Progress Tracking',
      description: 'Public tracking reference system displaying origin pickup, airport export clearance, linehaul dispatch, and destination arrival timestamps.',
    },
  ];

  return (
    <section className="w-full bg-surface-subtle py-20 lg:py-28 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Operational Standards"
          title="Verified Cargo Standards & Compliance"
          subtitle="Operational capabilities for international air and sea cargo export shipments."
          className="mb-14"
        />

        {/* Evidence List */}
        <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
          {credentials.map((item, idx) => (
            <div key={idx} className="p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="md:w-1/4 space-y-1">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider">
                  {item.category}
                </span>
                <div className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span>✓ Verified Standard</span>
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
