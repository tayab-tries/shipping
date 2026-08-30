import React from 'react';
import Link from 'next/link';
import {
  FileText,
  MapPin,
  Globe,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-heading-lg font-bold text-foreground">Operational Content Dashboard</h1>
        <p className="text-body-sm text-muted-foreground mt-1">
          Editorial workflows, pre-publish validation, and system audit logs.
        </p>
      </div>

      {/* Operational Task Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-md border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>DRAFTS IN REVIEW</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-display-md font-bold text-foreground">0</div>
          <span className="text-[11px] text-muted-foreground">Pending publishing approval</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>UNVERIFIED ITEMS</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-display-md font-bold text-foreground">0</div>
          <span className="text-[11px] text-muted-foreground">Requires business verification</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>PUBLISHED LOCATIONS</span>
            <MapPin className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-display-md font-bold text-foreground">0</div>
          <span className="text-[11px] text-muted-foreground">Active origin city hubs</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>DESTINATIONS</span>
            <Globe className="w-4 h-4 text-accent" />
          </div>
          <div className="text-display-md font-bold text-foreground">0</div>
          <span className="text-[11px] text-muted-foreground">Active country corridors</span>
        </div>
      </div>

      {/* Quick Operations Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pre-Publish Checklist Alert */}
        <div className="bg-surface p-6 rounded-md border border-border space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <ShieldAlert className="w-5 h-5 text-secondary" />
            <h2 className="text-heading-sm">Pre-Publish Publishing Gate Rules</h2>
          </div>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            Content must pass the automated SEO completeness checker (`h1`, `seo_title` 30-60 chars, `seo_description` 70-160 chars) and have business verification (`is_verified = true`) set prior to static deployment.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/articles"
              className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Articles & Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <div className="bg-surface p-6 rounded-md border border-border space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-heading-sm">Recent Audit Log Activity</h2>
          </div>
          <div className="p-4 bg-surface-muted rounded-md text-xs text-muted-foreground font-mono">
            No recent administrative publish or modification actions logged.
          </div>
        </div>
      </div>
    </div>
  );
}
