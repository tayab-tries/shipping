'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search, Phone } from 'lucide-react';
import { navConfig, primaryCta } from '@/config/nav.config';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  brandName?: string;
  phone?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ brandName: propBrand, phone: propPhone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const brandName = propBrand || siteConfig.name;
  const phone = propPhone || siteConfig.phone || '+92 300 1234567';

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lock page scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Accessibility: Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <div className="lg:hidden">
      {/* Mobile Hamburger Button (Min 44px touch target) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu'}
        aria-expanded={isOpen}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md bg-brand-navy hover:bg-brand-navy-light text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-In Side Drawer (Full Height, Right Aligned) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:w-80 bg-brand-black border-l border-border-dark flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header with Prominent Logo & Close Button */}
        <div className="flex items-center justify-between border-b border-border-dark pb-4">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/images/logo.png"
              alt={`${brandName} Logo`}
              width={180}
              height={54}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-brand-navy/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-6 space-y-2 overflow-y-auto flex-1">
          {navConfig.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`block px-4 py-3 text-base font-semibold rounded-md min-h-[44px] flex items-center justify-between transition-colors ${
                  isActive ? 'text-accent bg-brand-navy font-bold' : 'text-slate-200 hover:text-white hover:bg-brand-navy-light/40'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-border-dark pt-6 space-y-4 shrink-0">
          <Link href={primaryCta.href} onClick={closeMenu} className="block w-full">
            <Button
              variant="accent"
              size="lg"
              className="w-full min-h-[44px]"
              rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
            >
              {primaryCta.label}
            </Button>
          </Link>
          <Link href="/track" onClick={closeMenu} className="block w-full">
            <Button
              variant="outline-dark"
              size="lg"
              className="w-full min-h-[44px]"
              leftIcon={<Search className="w-4 h-4 text-accent" />}
            >
              Track Shipment
            </Button>
          </Link>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Phone className="w-3.5 h-3.5 text-accent" />
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
