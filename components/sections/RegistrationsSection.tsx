import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export interface RegistrationItem {
  name: string;
  logo: string;
  orgName?: string;
  description?: string;
  sort_order?: number;
}

export interface RegistrationsSectionProps {
  blockData?: Record<string, unknown>;
}

export const RegistrationsSection: React.FC<RegistrationsSectionProps> = ({ blockData }) => {
  const heading =
    (blockData?.heading as string) ||
    'WE ARE REGISTERED WITH FBR AND ASSOCIATED WITH';

  const defaultItems: RegistrationItem[] = [
    {
      name: 'FBR',
      logo: '/images/logos/fbr.svg',
      orgName: 'Federal Board of Revenue',
      description: 'Government of Pakistan',
    },
    {
      name: 'IAM (USA)',
      logo: '/images/logos/iam-usa.svg',
      orgName: 'International Association of Movers',
      description: 'USA Global Network',
    },
    {
      name: 'MOVERS P.O.E',
      logo: '/images/logos/movers-poe.svg',
      orgName: 'Movers Port of Entry',
      description: 'Registered Port Alliance',
    },
    {
      name: 'FIDI GLOBAL ALLIANCE',
      logo: '/images/logos/fidi.svg',
      orgName: 'FIDI Global Alliance',
      description: 'FAIM Quality Certified',
    },
    {
      name: 'CANADIAN ASSOCIATION OF MOVERS (CAM)',
      logo: '/images/logos/cam.svg',
      orgName: 'Canadian Association of Movers',
      description: 'CAM Canada',
    },
  ];

  const items: RegistrationItem[] =
    Array.isArray(blockData?.items) && blockData.items.length > 0
      ? (blockData.items as RegistrationItem[])
      : defaultItems;

  return (
    <section className="w-full bg-brand-navy py-14 lg:py-20 border-b border-border-dark text-white select-none">
      <Container>
        <div className="text-center space-y-10 max-w-5xl mx-auto">
          {/* Heading */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block">
              Official Registrations & Global Affiliations
            </span>
            <h2 className="text-heading-lg sm:text-heading-xl lg:text-2xl font-extrabold text-white tracking-tight uppercase">
              {heading}
            </h2>
          </div>

          {/* Clean Horizontal Logo Grid (Static, NOT Clickable) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-brand-black-deep/80 rounded-md border border-border-dark p-5 flex flex-col items-center justify-center text-center h-full min-h-[135px] shadow-sm pointer-events-none"
              >
                <div className="relative w-full h-12 flex items-center justify-center mb-3">
                  <Image
                    src={item.logo}
                    alt={item.name || item.orgName || 'Registration Logo'}
                    width={180}
                    height={50}
                    className="max-h-12 w-auto object-contain filter drop-shadow-sm"
                  />
                </div>
                {item.orgName && (
                  <span className="text-[11px] font-mono font-semibold text-slate-300 line-clamp-1">
                    {item.orgName}
                  </span>
                )}
                {item.description && (
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                    {item.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
