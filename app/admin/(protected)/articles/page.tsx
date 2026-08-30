'use client';

import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getArticlesListAction, saveAndPublishArticleAction, ArticleItemInput } from './actions';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItemInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await getArticlesListAction();
        if (res.success && res.data) {
          setArticles(res.data as ArticleItemInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const handleAddNew = () => {
    setEditingArticle({
      title: 'New Guide Title',
      slug: `guide-${Date.now()}`,
      meta_title: 'New Guide Title | Cargo Shipping Guides',
      meta_description: 'Educational guide on international freight forwarding and customs documentation from Pakistan.',
      excerpt: 'Short excerpt describing the key takeaways of this shipping guide.',
      content_markdown: '# Guide Title\n\nWrite your guide content here in markdown format.',
      category: 'Guides',
      reading_time_minutes: 5,
      is_published: true,
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishArticleAction(editingArticle);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Article published! Cloudflare production build triggered successfully.'
              : 'Article saved and snapshot recorded in database.',
          });
        }
        const refresh = await getArticlesListAction();
        if (refresh.success && refresh.data) {
          setArticles(refresh.data as ArticleItemInput[]);
        }
        setEditingArticle(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save article.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing article.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <BookOpen className="w-4 h-4 text-accent shrink-0" />
            <span>Educational Content Manager</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Articles & Shipping Guides</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Create and edit Markdown articles, customs guidance, and educational resources.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleAddNew} leftIcon={<Plus className="w-4 h-4 text-brand-black" />}>
          Create New Article
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

      {editingArticle ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingArticle.id ? `Edit Article: ${editingArticle.title}` : 'Create New Article'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingArticle(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Article Title"
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="URL Slug"
                value={editingArticle.slug}
                onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Category"
                value={editingArticle.category}
                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="SEO Meta Title"
                value={editingArticle.meta_title}
                onChange={(e) => setEditingArticle({ ...editingArticle, meta_title: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Excerpt"
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Textarea
              label="SEO Meta Description"
              value={editingArticle.meta_description}
              onChange={(e) => setEditingArticle({ ...editingArticle, meta_description: e.target.value })}
              variantSurface="light"
            />

            <Textarea
              label="Content (Markdown)"
              value={editingArticle.content_markdown}
              onChange={(e) => setEditingArticle({ ...editingArticle, content_markdown: e.target.value })}
              variantSurface="light"
            />

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingArticle(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish Article'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-surface rounded-md border border-border overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border text-slate-500 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Title / Slug</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td className="p-3.5" colSpan={4}>
                    <div className="py-8 text-center text-slate-500 text-xs font-mono">
                      Loading articles from Supabase...
                    </div>
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td className="p-3.5" colSpan={4}>
                    <div className="py-8 text-center text-slate-500 text-xs font-mono">
                      No article entities created in Supabase database yet.
                    </div>
                  </td>
                </tr>
              ) : (
                articles.map((art) => (
                  <tr key={art.id || art.slug} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-brand-black text-sm">{art.title}</div>
                      <div className="font-mono text-slate-500 text-xs">/guides/{art.slug}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700">{art.category}</td>
                    <td className="p-3.5">
                      <Badge variant={art.is_published ? 'accent' : 'outline'}>
                        {art.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button variant="outline" size="sm" onClick={() => setEditingArticle(art)}>
                        Edit Article
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
