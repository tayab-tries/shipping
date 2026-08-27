import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/content';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  className,
}) => {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', url: '/' }, ...items]
    : items;

  const jsonLd = getBreadcrumbJsonLd(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={clsx('flex items-center text-xs text-muted-foreground', className)}
      >
        <ol className="flex items-center flex-wrap gap-1.5">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isFirstHome = showHome && index === 0;

            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-border-strong shrink-0" />}
                {isLast ? (
                  <span className="font-semibold text-foreground" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-foreground transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
                  >
                    {isFirstHome && <Home className="w-3.5 h-3.5 shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
