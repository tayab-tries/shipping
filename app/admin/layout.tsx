import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  MapPin,
  Globe,
  FileText,
  HelpCircle,
  Building2,
  ArrowLeftRight,
  Image as ImageIcon,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Locations', href: '/admin/locations', icon: MapPin },
    { label: 'Destinations', href: '/admin/destinations', icon: Globe },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Business Settings', href: '/admin/business', icon: Building2 },
    { label: '301 Redirects', href: '/admin/redirects', icon: ArrowLeftRight },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-slate-800 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-secondary shrink-0" />
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">CMS Control</span>
            <span className="text-sm font-bold text-foreground">{siteConfig.name}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md text-foreground hover:bg-surface-muted hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded text-[11px] font-mono">
              Edge SSG Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
