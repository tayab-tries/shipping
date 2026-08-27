'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, Package, Search } from 'lucide-react';
import { mainNavigation, primaryCta } from '@/config/nav.config';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Mobile Hamburger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
        className="p-2.5 text-slate-200 hover:text-white hover:bg-brand-navy-light rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Slide-over Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-black overflow-y-auto animate-in fade-in-50 duration-150 text-slate-200">
          {/* Header row in mobile drawer */}
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-border-dark bg-brand-black sticky top-0 z-10">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-bold text-lg text-white">
              <Package className="w-6 h-6 text-accent" />
              <span>{siteConfig.name}</span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2 text-slate-200 hover:bg-brand-navy-light rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div ref={drawerRef} className="flex-1 px-4 sm:px-6 py-6 space-y-8">
            <nav className="space-y-6">
              {mainNavigation.map((group) => (
                <div key={group.title} className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider px-2">
                    {group.title}
                  </div>
                  {group.children && group.children.length > 0 ? (
                    <div className="space-y-1">
                      {group.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          onClick={closeMenu}
                          className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-slate-200 hover:bg-brand-navy-light transition-colors"
                        >
                          <span>{child.title}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={group.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-slate-200 hover:bg-brand-navy-light transition-colors"
                    >
                      <span>{group.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Tracking Shortcut & Primary CTA */}
            <div className="pt-6 border-t border-border-dark space-y-3">
              <Link href="/track" onClick={closeMenu} className="block w-full">
                <Button variant="outline" className="w-full justify-center text-white border-border-dark" leftIcon={<Search className="w-4 h-4" />}>
                  Track Shipment
                </Button>
              </Link>
              <Link href={primaryCta.href} onClick={closeMenu} className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  {primaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
