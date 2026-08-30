'use client';

import React, { useState, useEffect } from 'react';
import { Plus, HelpCircle, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getFaqsListAction, saveAndPublishFaqAction, FaqItemInput } from './actions';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItemInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await getFaqsListAction();
        if (res.success && res.data) {
          setFaqs(res.data as FaqItemInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const handleAddNew = () => {
    setEditingFaq({
      question: 'New Question?',
      answer: 'Answer text for the new question.',
      category: 'general',
      display_order: faqs.length + 1,
      is_published: true,
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishFaqAction(editingFaq);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'FAQ published! Cloudflare production build triggered successfully.'
              : 'FAQ saved and snapshot recorded in database.',
          });
        }
        const refresh = await getFaqsListAction();
        if (refresh.success && refresh.data) {
          setFaqs(refresh.data as FaqItemInput[]);
        }
        setEditingFaq(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save FAQ.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing FAQ.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <HelpCircle className="w-4 h-4 text-accent shrink-0" />
            <span>Q&A & Schema Manager</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Frequently Asked Questions (FAQ) Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage reusable Q&A items and entity associations for structured schema output.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleAddNew} leftIcon={<Plus className="w-4 h-4 text-brand-black" />}>
          Add FAQ Item
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

      {editingFaq ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingFaq.id ? 'Edit FAQ Item' : 'Create New FAQ Item'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingFaq(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Question"
                value={editingFaq.question}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Category"
                value={editingFaq.category || 'general'}
                onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Textarea
              label="Answer"
              value={editingFaq.answer}
              onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
              variantSurface="light"
            />

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingFaq(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish FAQ'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-surface rounded-md border border-border overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border text-slate-500 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Question</th>
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
                      Loading FAQs from Supabase...
                    </div>
                  </td>
                </tr>
              ) : faqs.length === 0 ? (
                <tr>
                  <td className="p-3.5" colSpan={4}>
                    <div className="py-8 text-center text-slate-500 text-xs font-mono">
                      No FAQ items created in Supabase database yet.
                    </div>
                  </td>
                </tr>
              ) : (
                faqs.map((item) => (
                  <tr key={item.id || item.question} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-brand-black text-sm">{item.question}</div>
                      <div className="text-slate-600 text-xs line-clamp-1">{item.answer}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700 uppercase font-mono">{item.category}</td>
                    <td className="p-3.5">
                      <Badge variant={item.is_published ? 'accent' : 'outline'}>
                        {item.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button variant="outline" size="sm" onClick={() => setEditingFaq(item)}>
                        Edit FAQ
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
