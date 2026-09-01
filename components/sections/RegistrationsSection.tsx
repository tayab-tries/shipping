import React from 'react';
import Image from 'next/image';

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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center space-y-10 max-w-5xl mx-auto mb-10">
          {/* Section Heading */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block">
              Official Registrations & Global Affiliations
            </span>
            <h2 className="text-heading-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-snug">
              {heading}
            </h2>
          </div>
        </div>

        {/* Wide Landscape White Cards Grid (Static, NOT Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between text-center min-h-[145px] shadow-lg pointer-events-none transition-none"
            >
              {/* Logo Asset */}
              <div className="relative w-full h-16 sm:h-20 flex items-center justify-center mb-3">
                <Image
                  src={item.logo}
                  alt={item.name || item.orgName || 'Registration Logo'}
                  width={280}
                  height={80}
                  priority
                  className="max-h-14 sm:max-h-16 w-full object-contain"
                />
              </div>

              {/* Organization Text Block */}
              <div className="space-y-1 w-full pt-3 border-t border-slate-100">
                {item.orgName && (
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                    {item.orgName}
                  </span>
                )}
                {item.description && (
                  <span className="text-[11px] font-mono font-semibold text-slate-500 block leading-tight">
                    {item.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
