import React from 'react';
import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { primaryCta } from '@/config/nav.config';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TopBar } from './TopBar';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-brand-black/95 backdrop-blur-md border-b border-border-dark sticky top-0 z-40">
      <TopBar />
      <Container>
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            >
              <Package className="w-6 h-6 text-accent shrink-0" />
              <span>{siteConfig.name}</span>
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
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
};
