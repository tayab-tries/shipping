import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminBusinessPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">Business Settings Editor</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Manage contact information, operating hours, and physical office specifications.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </div>

      <div className="bg-surface p-6 rounded-md border border-border space-y-6">
        <div className="space-y-4">
          <h2 className="text-heading-sm font-bold text-foreground">General Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Brand Name</label>
              <input
                type="text"
                defaultValue="BRAND_NAME"
                className="w-full p-2.5 bg-surface text-foreground rounded border border-border"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Legal Name</label>
              <input
                type="text"
                placeholder="Legal Business Name"
                className="w-full p-2.5 bg-surface text-foreground rounded border border-border"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Primary Phone</label>
              <input
                type="text"
                placeholder="+92 300 0000000"
                className="w-full p-2.5 bg-surface text-foreground rounded border border-border"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">WhatsApp Support Number</label>
              <input
                type="text"
                placeholder="+92 300 0000000"
                className="w-full p-2.5 bg-surface text-foreground rounded border border-border"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <h2 className="text-heading-sm font-bold text-foreground">Physical Office Verification</h2>
          <p className="text-xs text-muted-foreground">
            Strict rule: Physical office addresses entered here must be verified prior to publication.
          </p>
          <div className="p-4 bg-surface-muted rounded text-xs text-muted-foreground font-mono">
            No physical branch offices verified in business configuration.
          </div>
        </div>
      </div>
    </div>
  );
}
