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
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white select-none">
      <Container>
        <div className="text-center space-y-12 max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block">
              Official Registrations & Global Affiliations
            </span>
            <h2 className="text-heading-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-snug">
              {heading}
            </h2>
          </div>

          {/* Large High-Contrast White Logo Cards (Static, NOT Clickable) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch justify-center">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-200 p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[185px] shadow-lg pointer-events-none transition-none"
              >
                {/* Logo Image */}
                <div className="relative w-full h-20 flex items-center justify-center mb-4">
                  <Image
                    src={item.logo}
                    alt={item.name || item.orgName || 'Registration Logo'}
                    width={240}
                    height={80}
                    priority
                    className="max-h-16 sm:max-h-20 w-auto object-contain"
                  />
                </div>

                {/* Organization Label */}
                <div className="space-y-1 w-full pt-2 border-t border-slate-100">
                  {item.orgName && (
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">
                      {item.orgName}
                    </span>
                  )}
                  {item.description && (
                    <span className="text-[11px] font-mono font-semibold text-slate-500 block">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
