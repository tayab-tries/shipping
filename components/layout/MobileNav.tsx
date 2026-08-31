'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search, Phone, Package } from 'lucide-react';
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

  const closeMenu = () => setIsOpen(false);

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

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost-dark"
        size="md"
        isIconOnly
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-brand-black flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-border-dark pb-4">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-bold text-lg text-white">
              <Package className="w-5 h-5 text-accent" />
              <span>{brandName}</span>
            </Link>
            <Button
              variant="ghost-dark"
              size="md"
              isIconOnly
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 space-y-2">
            {navConfig.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-4 py-3 text-base font-semibold rounded-md min-h-[44px] flex items-center justify-between ${
                    isActive ? 'text-accent bg-brand-navy' : 'text-slate-200 hover:text-white hover:bg-brand-navy-light/40'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          {/* Drawer Actions */}
          <div className="border-t border-border-dark pt-6 space-y-4">
            <Link href={primaryCta.href} onClick={closeMenu} className="block w-full">
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
              >
                {primaryCta.label}
              </Button>
            </Link>
            <Link href="/track" onClick={closeMenu} className="block w-full">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full"
                leftIcon={<Search className="w-4 h-4 text-accent" />}
              >
                Track Shipment
              </Button>
            </Link>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                {phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
