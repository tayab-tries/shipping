import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export interface HeroSectionProps {
  blockData?: Record<string, unknown>;
  whatsappNumber?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ blockData, whatsappNumber: propWhatsapp }) => {
  const activeWhatsapp = (blockData?.whatsapp_number as string) || propWhatsapp;
  const defaultWhatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  const eyebrow = (blockData?.eyebrow as string) || 'DOOR-TO-DOOR CARGO SHIPPING FROM PAKISTAN';
  const headline = (blockData?.headline as string) || 'SEND CARGO FROM PAKISTAN.\nWE\'LL HANDLE THE REST.';
  const supportingCopy =
    (blockData?.supporting_copy as string) ||
    'Door-to-door cargo delivery by air and sea. We pick up from Pakistan and deliver to destinations worldwide.';
  const primaryCtaLabel = (blockData?.primary_cta_label as string) || 'GET A QUOTE';
  const primaryCtaHref = (blockData?.primary_cta_href as string) || '/quote';
  const secondaryCtaLabel = (blockData?.secondary_cta_label as string) || 'WHATSAPP US';

  let rawSecondaryHref = (blockData?.secondary_cta_href as string) || defaultWhatsappUrl;
  // If secondary CTA is a WhatsApp link, dynamically enforce active admin WhatsApp number
  if (rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp')) {
    const messageMatch = rawSecondaryHref.match(/text=([^&]*)/);
    const customMsg = messageMatch ? decodeURIComponent(messageMatch[1]) : undefined;
    rawSecondaryHref = buildWhatsappUrl(activeWhatsapp, customMsg);
  }

  const capabilityLine =
    (blockData?.capability_line as string) || 'HOME PICKUP • AIR CARGO • SEA CARGO • DOOR-TO-DOOR';
  const bgImage = (blockData?.background_image as string) || IMAGE_SLOTS.heroBackground.src;
  const imageAlt = (blockData?.image_alt_text as string) || IMAGE_SLOTS.heroBackground.alt;

  // Split capability line items cleanly by bullet or pipe
  const capabilities = capabilityLine
    .split(/•|\|/)
    .map((s) => s.trim())
    .filter(Boolean);

  const isWhatsapp = rawSecondaryHref.includes('wa.me') || rawSecondaryHref.includes('whatsapp');

  return (
    <section className="relative min-h-[640px] sm:min-h-[72vh] lg:min-h-[76vh] max-h-[90vh] w-full overflow-hidden bg-brand-black flex flex-col justify-center border-b border-border-dark">
      {/* 1. Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0 bg-brand-black-deep">
        <Image
          src={bgImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-[65%_center] lg:object-[center_right] opacity-80"
        />

        {/* 2. Directional Gradient Overlay — Desktop */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(
              90deg,
              rgba(7,10,15,0.96) 0%,
              rgba(7,10,15,0.88) 26%,
              rgba(7,10,15,0.64) 52%,
              rgba(7,10,15,0.28) 78%,
              rgba(7,10,15,0.18) 100%
            )`,
          }}
        />

        {/* 3. Directional Gradient Overlay — Mobile */}
        <div
          className="absolute inset-0 z-10 pointer-events-none md:hidden"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(7,10,15,0.82) 0%,
              rgba(7,10,15,0.56) 45%,
              rgba(7,10,15,0.76) 100%
            )`,
          }}
        />

        {/* 4. Dotted Route Line + Moving Cargo Aircraft (Technical Animated SVG) */}
        <svg
          className="absolute inset-0 w-full h-full text-accent pointer-events-none z-10 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            id="freight-hero-route"
            d="M -100 650 C 300 600 600 250 1100 300 C 1300 320 1500 150 1600 100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="opacity-15"
          />

          <g className="motion-reduce:hidden opacity-85">
            <g transform="translate(-12, -12) rotate(91) scale(1.35)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="currentColor"
              />
            </g>
            <animateMotion dur="20s" repeatCount="indefinite" rotate="auto" calcMode="linear">
              <mpath href="#freight-hero-route" />
            </animateMotion>
          </g>
        </svg>
      </div>

      {/* 5. Hero Content Stack Layered ABOVE Image */}
      <Container className="relative z-20 py-16 lg:py-24">
        <div className="w-full lg:w-[60%] max-w-[720px] space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-1 bg-brand-navy/80 text-slate-200 border border-border-dark rounded-xs">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[36px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05] max-w-[720px]">
            {headline.includes('\n') ? (
              <>
                <span>{headline.split('\n')[0]}</span> <br />
                <span className="text-accent">{headline.split('\n')[1]}</span>
              </>
            ) : headline.includes('.') ? (
              <>
                <span>{headline.split('.')[0]}.</span> <br />
                <span className="text-accent">{headline.split('.').slice(1).join('.').trim()}</span>
              </>
            ) : (
              <span>{headline}</span>
            )}
          </h1>

          {/* Supporting Copy */}
          <p className="text-[16px] sm:text-[18px] text-slate-300 leading-[1.6] font-normal max-w-[640px]">
            {supportingCopy}
          </p>

          {/* Dual CTAs: GET A QUOTE & WHATSAPP US */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px]">
            <Link href={primaryCtaHref}>
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto h-[48px] min-w-[200px] text-base font-bold"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                {primaryCtaLabel}
              </Button>
            </Link>

            <a
              href={rawSecondaryHref}
              target={isWhatsapp ? '_blank' : '_self'}
              rel={isWhatsapp ? 'noopener noreferrer' : undefined}
            >
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto h-[48px] min-w-[180px] border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-bold"
                leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />}
              >
                {secondaryCtaLabel}
              </Button>
            </a>
          </div>

          {/* Capability Row */}
          <div className="pt-6 mt-5 border-t border-border-dark/80 flex flex-wrap items-center gap-2 sm:gap-4 text-[12px] font-mono uppercase tracking-[0.08em] text-slate-300">
            {capabilities.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-accent">•</span>}
                <span className="font-semibold">{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
