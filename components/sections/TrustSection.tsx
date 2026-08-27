import React from 'react';
import { ShieldCheck, Lock, FileCheck, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: <Lock className="w-5 h-5 text-accent" />,
      title: 'Sanitized Public Tracking Privacy',
      description:
        'Public tracking queries return milestone status events while strictly protecting private customer phone numbers, emails, and full street addresses.',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-accent" />,
      title: 'Structured Quote Processing',
      description:
        'Quote requests are reviewed based on specific origin, destination, cargo category, and weight details to ensure clear communication.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      title: 'Customs & Export Clarity',
      description:
        'Access clear guidance on shipping procedures, prohibited items, and documentation required for export clearance.',
    },
    {
      icon: <Search className="w-5 h-5 text-accent" />,
      title: 'Shipment Milestone Visibility',
      description:
        'Stay updated as your cargo progresses from origin collection through processing and final international delivery.',
    },
  ];

  return (
    <section className="w-full bg-brand-black py-16 lg:py-24 border-b border-border-dark text-white">
      <Container>
        <SectionHeading
          badge="Operational Commitment"
          title="Operational Transparency & Trust"
          subtitle="Built on clear communication, customer privacy protection, and structured shipment handling."
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {trustFeatures.map((feat) => (
            <div
              key={feat.title}
              className="bg-brand-navy p-6 rounded-md border border-border-dark space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="p-2 bg-brand-black-deep rounded-md inline-block border border-border-dark">
                {feat.icon}
              </div>
              <h3 className="text-heading-sm font-semibold text-white">{feat.title}</h3>
              <p className="text-body-sm text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
