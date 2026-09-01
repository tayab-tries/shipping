import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export interface TrustedClientItem {
  name: string;
  logo: string;
  sort_order?: number;
}

export interface TrustedMarketSectionProps {
  blockData?: Record<string, unknown>;
}

export const TrustedMarketSection: React.FC<TrustedMarketSectionProps> = ({ blockData }) => {
  const heading = (blockData?.heading as string) || 'TRUSTED BY THE MARKET';

  const defaultLogos: TrustedClientItem[] = [
    { name: 'Ufone', logo: '/images/logos/ufone.svg' },
    { name: 'Daraz', logo: '/images/logos/daraz.svg' },
    { name: 'Faysal Bank', logo: '/images/logos/faysal-bank.svg' },
    { name: 'HBL', logo: '/images/logos/hbl.svg' },
    { name: 'Puma', logo: '/images/logos/puma.svg' },
    { name: 'PTN', logo: '/images/logos/ptn.svg' },
    { name: 'PTCL', logo: '/images/logos/ptcl.svg' },
  ];

  const items: TrustedClientItem[] =
    Array.isArray(blockData?.items) && blockData.items.length > 0
      ? (blockData.items as TrustedClientItem[])
      : defaultLogos;

  // Quadruple items to ensure an unbreakable smooth infinite marquee loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="w-full bg-surface-subtle py-14 lg:py-20 border-b border-border text-brand-black overflow-hidden select-none">
      <Container>
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">
            Corporate Clients & Partners
          </span>
          <h2 className="text-heading-lg sm:text-heading-xl font-extrabold text-brand-black tracking-tight uppercase">
            {heading}
          </h2>
        </div>
      </Container>

      {/* Infinite Logo-Only Carousel Container */}
      <div className="relative w-full max-w-full overflow-hidden pointer-events-none">
        {/* Soft edge blur gradient overlays for smooth transition */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-surface-subtle to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-surface-subtle to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-10 sm:gap-14 w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full py-4 px-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center shrink-0 h-14 w-36 sm:w-44 bg-surface rounded-md border border-border/80 px-6 py-3 shadow-2xs pointer-events-none"
            >
              <Image
                src={item.logo}
                alt={item.name || 'Client Logo'}
                width={160}
                height={48}
                className="max-h-10 w-auto object-contain filter opacity-90 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
