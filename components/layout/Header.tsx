import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { primaryCta } from '@/config/nav.config';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TopBar } from './TopBar';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

export const Header = async () => {
  const business = await getPublishedBusinessSettings();
  const brandName = business.brandName || siteConfig.name;

  return (
    <header className="w-full bg-brand-black/95 backdrop-blur-md border-b border-border-dark sticky top-0 z-40">
      <TopBar />
      <Container>
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
              aria-label="Raahi International Homepage"
            >
              <div className="bg-white/95 px-2.5 py-1 rounded flex items-center justify-center border border-white/20 shadow-xs shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Raahi International Logo"
                  width={140}
                  height={40}
                  priority
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-white hidden xl:inline-block font-heading">
                {brandName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />
          </div>

          {/* Primary CTA & Mobile Navigation Controller */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Link href={primaryCta.href}>
                <Button
                  variant="accent"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4 shrink-0 text-brand-black" />}
                >
                  {primaryCta.label}
                </Button>
              </Link>
            </div>
            <MobileNav brandName={brandName} phone={business.phonePrimary} />
          </div>
        </div>
      </Container>
    </header>
  );
};
