'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { mainNavigation, NavItem } from '@/config/nav.config';
import { clsx } from 'clsx';

export const DesktopNav: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={navRef} className="hidden lg:flex items-center gap-1">
      {mainNavigation.map((item: NavItem, index: number) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);
        const isOpen = openIndex === index;

        if (!hasChildren) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-accent transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.title}
            </Link>
          );
        }

        return (
          <div key={item.title} className="relative group">
            <button
              type="button"
              onClick={() => toggleDropdown(index)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={clsx(
                'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-accent transition-colors duration-150 rounded-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                {
                  'text-accent': isOpen,
                }
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={clsx('w-4 h-4 text-slate-400 transition-transform duration-150', {
                  'rotate-180 text-accent': isOpen,
                })}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-72 bg-brand-navy rounded-md border border-border-dark shadow-md p-3 z-50 animate-in fade-in-50 duration-150"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="space-y-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      role="menuitem"
                      onClick={() => setOpenIndex(null)}
                      className="block p-2.5 rounded-sm hover:bg-brand-navy-light transition-colors group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover/item:text-accent flex items-center justify-between">
                        <span>{child.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-accent" />
                      </div>
                      {child.description && (
                        <p className="text-xs text-slate-400 mt-0.5 font-normal leading-normal">
                          {child.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>

                {item.viewAllHref && (
                  <div className="mt-2 pt-2 border-t border-border-dark">
                    <Link
                      href={item.viewAllHref}
                      onClick={() => setOpenIndex(null)}
                      className="inline-flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>{item.viewAllLabel || 'View All'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
