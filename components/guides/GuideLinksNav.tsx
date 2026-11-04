import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getGuideLinks } from '@/lib/guides/guide-links';

/** Sidebar box linking every published shipping guide. */
export async function GuideLinksNav({ className = '' }: { className?: string }) {
  const guides = await getGuideLinks();
  if (guides.length === 0) return null;

  return (
    <nav aria-label="Shipping guides" className={`bg-surface rounded-md border border-border p-6 space-y-4 shadow-xs ${className}`}>
      <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Before you ship: guides</p>
      <div className="space-y-2.5">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.href}
            className="flex items-center justify-between gap-3 p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 shrink-0 text-accent-dark" />
              {guide.title}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          </Link>
        ))}
        <Link
          href="/guides"
          className="flex items-center justify-between gap-3 p-3 text-xs font-bold text-accent-dark hover:text-brand-black transition-colors"
        >
          All shipping guides
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>
    </nav>
  );
}
