'use client';

import React, { useState } from 'react';
import { Plus, Edit, CheckCircle2, FileCheck, ShieldCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CmsPageItem {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  isVerified: boolean;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

const initialPages: CmsPageItem[] = [
  {
    id: 'page-1',
    title: 'Commercial Air Freight Compliance Overview',
    slug: 'air-compliance-overview',
    status: 'published',
    isVerified: true,
    seoTitle: 'Commercial Air Freight Compliance | Air Cargo Export Guide',
    seoDescription: 'Verified compliance documentation guidelines for commercial cargo departing Pakistan international airports.',
    updatedAt: '2026-08-25',
  },
  {
    id: 'page-2',
    title: 'Ocean Sea Container Packing Standards',
    slug: 'sea-packing-standards',
    status: 'draft',
    isVerified: false,
    seoTitle: 'Sea Container Packing Standards Pakistan',
    seoDescription: 'Packaging guidelines for ocean FCL and LCL container loading.',
    updatedAt: '2026-08-28',
  },
];

export default function AdminPagesManager() {
  const [pages, setPages] = useState<CmsPageItem[]>(initialPages);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CmsPageItem>>({});
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleCreatePage = () => {
    const newPage: CmsPageItem = {
      id: `page-${Date.now()}`,
      title: 'Untitled CMS Page',
      slug: `page-${Date.now()}`,
      status: 'draft',
      isVerified: false,
      seoTitle: 'Untitled Page SEO Title',
      seoDescription: 'Page description for search engines...',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setPages([newPage, ...pages]);
    setEditingPageId(newPage.id);
    setEditFormData(newPage);
  };

  const handleSavePage = (id: string) => {
    setPages(pages.map((p: CmsPageItem) => (p.id === id ? ({ ...p, ...editFormData } as CmsPageItem) : p)));
    setEditingPageId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((p: CmsPageItem) => p.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <FileCheck className="w-4 h-4 text-accent shrink-0" />
            <span>Controlled Page Builder</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Controlled Pages Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Create and edit block-based content pages without writing React or executable code.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handleCreatePage}
          leftIcon={<Plus className="w-4 h-4 text-brand-black" />}
        >
          Create New CMS Page
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>CMS Page configuration updated successfully!</span>
        </div>
      )}

      {/* Pages List */}
      <div className="space-y-4">
        {pages.map((page: CmsPageItem) => {
          const isEditing = editingPageId === page.id;

          return (
            <Card key={page.id} variant="light" className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-heading-sm font-bold text-brand-black">{page.title}</h3>
                    <Badge variant={page.status === 'published' ? 'accent' : 'outline'}>
                      {page.status.toUpperCase()}
                    </Badge>
                    {page.isVerified && (
                      <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 block">
                    Path: <code className="text-brand-black font-semibold">/{page.slug}</code>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPageId(isEditing ? null : page.id)}
                    leftIcon={<Edit className="w-3.5 h-3.5" />}
                  >
                    {isEditing ? 'Close' : 'Edit Page'}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    isIconOnly
                    onClick={() => handleDeletePage(page.id)}
                    aria-label="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Inline Page Edit Form */}
              {isEditing && (
                <div className="pt-4 border-t border-border space-y-4 bg-surface-subtle p-6 rounded-md">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">
                    Page & SEO Metadata Settings
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Page Title"
                      value={editFormData.title ?? page.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      variantSurface="light"
                    />
                    <Input
                      label="URL Slug"
                      value={editFormData.slug ?? page.slug}
                      onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                      variantSurface="light"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="SEO Title Tag"
                      value={editFormData.seoTitle ?? page.seoTitle}
                      onChange={(e) => setEditFormData({ ...editFormData, seoTitle: e.target.value })}
                      variantSurface="light"
                    />
                    <Textarea
                      label="SEO Meta Description"
                      value={editFormData.seoDescription ?? page.seoDescription}
                      onChange={(e) => setEditFormData({ ...editFormData, seoDescription: e.target.value })}
                      variantSurface="light"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button variant="accent" size="sm" onClick={() => handleSavePage(page.id)}>
                      Save Page Settings
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
