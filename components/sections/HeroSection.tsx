import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Globe, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-brand-black text-white py-20 lg:py-32 overflow-hidden border-b border-border-dark min-h-[640px] flex items-center">
      {/* 1. Full-Width Cinematic Freight Photography Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGE_SLOTS.hero.src}
          alt={IMAGE_SLOTS.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Dark Cinematic Gradient Overlay (Left-to-Right for High Headline Contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/40 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/60" />
      </div>

      {/* 2. Optional Minor Decorative Dotted Route Overlay */}
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
        aria-hidden="true"
      >
        <path d="M 200 450 Q 600 150 1000 450" stroke="#F97316" strokeWidth="2" strokeDasharray="8 6" fill="none" />
        <circle cx="200" cy="450" r="5" fill="#F8FAFC" />
        <circle cx="1000" cy="450" r="5" fill="#F97316" />
      </svg>

      {/* 3. Hero Content Positioned Over Dark Overlay */}
      <Container className="relative z-10">
        <div className="max-w-3xl space-y-6">
          <div>
            <Badge variant="accent" size="md" className="mb-4 shadow-sm">
              International Freight Services from Pakistan
            </Badge>
            {/* Single Unique H1 Heading with Orange Keyphrase Accent */}
            <h1 className="text-display-xl text-white font-extrabold tracking-tight leading-tight">
              International Cargo & <span className="text-accent">Shipping Services</span> from Pakistan
            </h1>
          </div>

          <p className="text-body-lg text-slate-200 max-w-2xl leading-relaxed drop-shadow-xs">
            Reliable air freight, ocean sea cargo, and door-to-door shipping connecting shippers across Pakistan with destinations worldwide.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/quote" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get a Shipping Quote
              </Button>
            </Link>
            <Link href="/track" className="w-full sm:w-auto">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Search className="w-4 h-4 text-accent" />}
              >
                Track Shipment
              </Button>
            </Link>
          </div>

          {/* Neutral Capability Trust Indicators */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent shrink-0" />
              <span>Worldwide Destination Network</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Sanitized Public Tracking</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
