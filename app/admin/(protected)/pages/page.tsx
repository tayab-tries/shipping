'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, CheckCircle2, FileCheck, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getCmsPagesListAction, saveAndPublishCmsPageAction, CmsPageItemInput } from './actions';

export default function AdminPagesManager() {
  const [pages, setPages] = useState<CmsPageItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPageItemInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadPages() {
      try {
        const res = await getCmsPagesListAction();
        if (res.success && res.data) {
          setPages(res.data as CmsPageItemInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load CMS pages:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  const handleCreatePage = () => {
    setEditingPage({
      title: 'New Dynamic Page',
      slug: `page-${Date.now()}`,
      meta_title: 'New Page | Cargo Shipping',
      meta_description: 'Description for search engines.',
      content_markdown: '# Page Title\n\nPage markdown content here.',
      is_published: true,
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishCmsPageAction(editingPage);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'CMS page published! Cloudflare production build triggered successfully.'
              : 'CMS page saved and snapshot recorded in database.',
          });
        }
        const refresh = await getCmsPagesListAction();
        if (refresh.success && refresh.data) {
          setPages(refresh.data as CmsPageItemInput[]);
        }
        setEditingPage(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save CMS page.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing CMS page.' });
    } finally {
      setSaving(false);
    }
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

      {statusMessage && (
        <div
          className={`p-4 rounded border text-sm font-semibold flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : statusMessage.type === 'warning'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {editingPage ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingPage.id ? `Edit Page: ${editingPage.title}` : 'Create New CMS Page'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingPage(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Page Title"
                value={editingPage.title}
                onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="URL Slug"
                value={editingPage.slug}
                onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="SEO Meta Title"
                value={editingPage.meta_title}
                onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })}
                variantSurface="light"
              />
              <Textarea
                label="SEO Meta Description"
                value={editingPage.meta_description}
                onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Textarea
              label="Page Content (Markdown)"
              value={editingPage.content_markdown}
              onChange={(e) => setEditingPage({ ...editingPage, content_markdown: e.target.value })}
              variantSurface="light"
            />

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingPage(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish Page'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              Loading CMS pages from Supabase...
            </div>
          ) : pages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No CMS pages created in Supabase database yet.
            </div>
          ) : (
            pages.map((page) => (
              <Card key={page.id || page.slug} variant="light" className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-heading-sm font-bold text-brand-black">{page.title}</h3>
                      <Badge variant={page.is_published ? 'accent' : 'outline'}>
                        {page.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <span className="text-xs font-mono text-slate-500 block">
                      Path: <code className="text-brand-black font-semibold">/{page.slug}</code>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPage(page)}
                      leftIcon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit Page
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
