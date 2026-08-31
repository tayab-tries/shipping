import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[680px] sm:min-h-[75vh] lg:min-h-[78vh] max-h-[90vh] w-full overflow-hidden bg-brand-black flex flex-col justify-center border-b border-border-dark">
      {/* 1. Full-Bleed Background Image & Layout Fallback Container */}
      <div className="absolute inset-0 z-0 bg-brand-black-deep">
        <Image
          src={IMAGE_SLOTS.heroBackground.src}
          alt={IMAGE_SLOTS.heroBackground.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-[65%_center] lg:object-[center_right] opacity-80"
        />

        {/* 2. Directional Gradient Overlay — Desktop (90deg linear gradient) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(
              90deg,
              rgba(7,10,15,0.96) 0%,
              rgba(7,10,15,0.88) 24%,
              rgba(7,10,15,0.62) 52%,
              rgba(7,10,15,0.28) 78%,
              rgba(7,10,15,0.18) 100%
            )`,
          }}
        />

        {/* 3. Directional Gradient Overlay — Mobile (180deg vertical gradient) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none md:hidden"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(7,10,15,0.78) 0%,
              rgba(7,10,15,0.52) 45%,
              rgba(7,10,15,0.72) 100%
            )`,
          }}
        />

        {/* 4. Dotted Route Line + Moving Cargo Aircraft */}
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
            <animateMotion
              dur="20s"
              repeatCount="indefinite"
              rotate="auto"
              calcMode="linear"
            >
              <mpath href="#freight-hero-route" />
            </animateMotion>
          </g>
        </svg>
      </div>

      {/* 5. Hero Content Stack Layered ABOVE Image & Route (relative z-20) */}
      <Container className="relative z-20 py-16 lg:py-24">
        <div className="w-full lg:w-[58%] max-w-[700px] space-y-6">
          {/* Compact Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-1 bg-brand-navy/80 text-slate-200 border border-border-dark rounded-xs">
              AIR & SEA CARGO DELIVERY
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-white leading-[0.98] max-w-[700px]">
            <span>SEND CARGO.</span> <br />
            <span className="text-accent">WE HANDLE THE REST.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-[16px] sm:text-[18px] text-slate-300 leading-[1.6] font-normal max-w-[620px]">
            Door-to-door cargo delivery by air and sea, from Pakistan to destinations around the world.
          </p>

          {/* Dual CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px]">
            <Link href="/quote">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto h-[46px] min-w-[200px]"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
              >
                Get a Shipping Quote
              </Button>
            </Link>

            <Link href="/track">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto h-[46px] min-w-[160px]"
                leftIcon={<Search className="w-4 h-4 text-slate-300 shrink-0" />}
              >
                Track Shipment
              </Button>
            </Link>
          </div>

          {/* Capability Micro Line */}
          <div className="pt-6 mt-5 border-t border-border-dark/80 flex flex-wrap items-center gap-2 sm:gap-4 text-[12px] font-mono uppercase tracking-[0.08em] text-slate-400">
            <span>AIR CARGO</span>
            <span className="text-accent">•</span>
            <span>SEA CARGO</span>
            <span className="text-accent">•</span>
            <span>DOOR-TO-DOOR</span>
            <span className="text-accent">•</span>
            <span>CUSTOMS CLEARANCE</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
