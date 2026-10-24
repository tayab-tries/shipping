'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { navConfig as defaultNavConfig, NavItem } from '@/config/nav.config';
import { cn } from '@/components/ui/Button';

interface DesktopNavProps {
  navItems?: { label: string; href: string }[];
}

type DesktopNavItem = Pick<NavItem, 'href' | 'children' | 'viewAllHref' | 'viewAllLabel'> & { label: string };

export const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // CMS items only carry label + href, so dropdown children come from the code config by matching href
  const items: DesktopNavItem[] =
    navItems && navItems.length > 0
      ? navItems.map((item) => ({ ...defaultNavConfig.find((d) => d.href === item.href), ...item }))
      : defaultNavConfig;

  const close = () => setOpenIdx(null);

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      onKeyDown={(e) => {
        if (e.key === 'Escape') close();
      }}
    >
      {items.map((item, idx) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const linkClass = cn(
          'px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isActive
            ? 'text-accent font-semibold bg-brand-navy/60'
            : 'text-slate-200 hover:text-white hover:bg-brand-navy-light/40'
        );

        if (!item.children || item.children.length === 0) {
          return (
            <Link key={idx} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          );
        }

        const isOpen = openIdx === idx;
        const panelId = `nav-dropdown-${idx}`;
        const isWide = item.children.length > 6;

        return (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => setOpenIdx(idx)}
            onMouseLeave={close}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
            }}
          >
            <div className="flex items-center">
              <Link href={item.href} onClick={close} className={cn(linkClass, 'pr-1.5')}>
                {item.label}
              </Link>
              <button
                type="button"
                aria-label={`${item.label} menu`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="p-1 -ml-1 rounded-md text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
              </button>
            </div>

            {/* pt-2 bridges the gap so the panel stays open while the pointer moves onto it */}
            <div
              id={panelId}
              className={cn('absolute left-0 top-full pt-2 z-50', isOpen ? 'block' : 'hidden')}
            >
              <div
                className={cn(
                  'rounded-lg border border-border-dark bg-brand-black shadow-xl p-2',
                  isWide ? 'w-[28rem]' : 'w-72'
                )}
              >
                <ul className={cn('grid gap-0.5', isWide && 'grid-cols-2')}>
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className={cn(
                            'block px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                            isChildActive
                              ? 'bg-brand-navy/60 text-accent'
                              : 'text-slate-200 hover:text-white hover:bg-brand-navy-light/40'
                          )}
                        >
                          <span className="block text-sm font-medium">{child.title}</span>
                          {child.description && (
                            <span className="block text-xs text-slate-400 mt-0.5">{child.description}</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {item.viewAllHref && (
                  <Link
                    href={item.viewAllHref}
                    onClick={close}
                    className="mt-1 flex items-center justify-between px-3 py-2 border-t border-border-dark text-sm font-semibold text-accent hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-b-md"
                  >
                    {item.viewAllLabel || `View all ${item.label.toLowerCase()}`}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};
