import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { primaryCta as defaultPrimaryCta } from '@/config/nav.config';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TopBar } from './TopBar';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsFull } from '@/sanity/lib/fetch';

export const Header = async () => {
  const [business, sanitySettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsFull(),
  ]);

  const brandName = sanitySettings?.businessName || business.brandName || siteConfig.name;
  const phone = sanitySettings?.phone || business.phonePrimary;
  const whatsappNumber = sanitySettings?.whatsappNumber || business.whatsappNumber;
  const logoSrc = sanitySettings?.logoUrl || '/images/brand/logo-white.svg';

  const ctaLabel = sanitySettings?.primaryCta?.label || defaultPrimaryCta.label;
  const ctaHref = sanitySettings?.primaryCta?.href || defaultPrimaryCta.href;

  return (
    <header className="w-full bg-brand-black/95 backdrop-blur-md border-b border-border-dark sticky top-0 z-40">
      <TopBar />
      <Container>
        <div className="flex items-center justify-between h-20 sm:h-24 lg:h-26 gap-4 sm:gap-6">
          {/* Prominent High-Visibility Vector SVG Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="flex items-center hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs shrink-0 py-1"
              aria-label={`${brandName} Homepage`}
            >
              <Image
                src={logoSrc}
                alt={`${brandName} Logo`}
                width={240}
                height={140}
                priority
                className="h-12 sm:h-16 lg:h-18 w-auto object-contain max-h-[76px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />
          </div>

          {/* Primary CTA & Mobile Navigation Controller */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Link href={ctaHref}>
                <Button
                  variant="accent"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4 shrink-0 text-brand-black" />}
                >
                  {ctaLabel}
                </Button>
              </Link>
            </div>
            <MobileNav
              brandName={brandName}
              phone={phone}
              whatsappNumber={whatsappNumber}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};
