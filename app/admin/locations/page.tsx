import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLocationsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">Pakistan Origin Locations</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Manage origin city coverage, physical branch distinction, and location metadata.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add New Location
        </Button>
      </div>

      <div className="bg-surface p-4 rounded-md border border-border flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search origin cities..."
            className="w-full pl-9 pr-3 py-2 bg-surface text-foreground text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="bg-surface rounded-md border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted border-b border-border text-muted-foreground font-mono uppercase tracking-wider">
            <tr>
              <th className="p-3.5">City / Slug</th>
              <th className="p-3.5">Province</th>
              <th className="p-3.5">Physical Branch</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3.5" colSpan={5}>
                <div className="py-8 text-center text-muted-foreground text-xs font-mono">
                  No location entities created in Supabase database yet. Click &quot;Add New Location&quot; to begin.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
