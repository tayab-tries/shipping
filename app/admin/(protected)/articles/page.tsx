import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminArticlesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">Articles & Shipping Guides</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Create and edit Markdown articles, customs guidance, and educational resources.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Article
        </Button>
      </div>

      <div className="bg-surface rounded-md border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted border-b border-border text-muted-foreground font-mono uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Title / Slug</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Author</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3.5" colSpan={5}>
                <div className="py-8 text-center text-muted-foreground text-xs font-mono">
                  No article entities created in Supabase database yet.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
