import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminRedirectsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">301 Redirect Manifest Manager</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Authoritative source for static Edge redirect entries (source path $\rightarrow$ target path).
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Redirect Rule
        </Button>
      </div>

      <div className="bg-surface rounded-md border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted border-b border-border text-muted-foreground font-mono uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Source Path</th>
              <th className="p-3.5">Target Path</th>
              <th className="p-3.5">Status Code</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3.5" colSpan={4}>
                <div className="py-8 text-center text-muted-foreground text-xs font-mono">
                  No custom redirect rules created in Supabase database yet.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
