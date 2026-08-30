'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Globe, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getDestinationCountriesAction, saveAndPublishDestinationCountryAction, DestinationCountryInput } from './actions';

export default function AdminDestinationsPage() {
  const [countries, setCountries] = useState<DestinationCountryInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCountry, setEditingCountry] = useState<DestinationCountryInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await getDestinationCountriesAction();
        if (res.success && res.data) {
          setCountries(res.data as DestinationCountryInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load destination countries:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCountries();
  }, []);

  const handleAddNew = () => {
    setEditingCountry({
      name: 'New Country',
      slug: `new-country-${Date.now()}`,
      iso_code: 'NC',
      h1: 'Cargo & Freight Forwarding Services to New Country',
      meta_title: 'Cargo to New Country from Pakistan | Cargo Shipping',
      meta_description: 'Fast air freight and ocean sea cargo shipping services connecting Pakistan to New Country.',
      customs_summary: '',
      is_active: true,
      prohibited_items: [],
      required_docs: [],
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountry) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishDestinationCountryAction(editingCountry);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Destination country published! Cloudflare production build triggered successfully.'
              : 'Destination country saved and snapshot recorded in database.',
          });
        }
        const refresh = await getDestinationCountriesAction();
        if (refresh.success && refresh.data) {
          setCountries(refresh.data as DestinationCountryInput[]);
        }
        setEditingCountry(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save destination country.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing destination country.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Globe className="w-4 h-4 text-accent shrink-0" />
            <span>International Network Manager</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">International Destination Countries</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage destination country corridors and sub-destination city hierarchies.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleAddNew} leftIcon={<Plus className="w-4 h-4 text-brand-black" />}>
          Add Destination Country
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

      {editingCountry ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingCountry.id ? `Edit Country: ${editingCountry.name}` : 'Create New Destination Country'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingCountry(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Country Name"
                value={editingCountry.name}
                onChange={(e) => setEditingCountry({ ...editingCountry, name: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="URL Slug"
                value={editingCountry.slug}
                onChange={(e) => setEditingCountry({ ...editingCountry, slug: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="ISO Code (2-char)"
                value={editingCountry.iso_code}
                onChange={(e) => setEditingCountry({ ...editingCountry, iso_code: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Input
              label="H1 Heading"
              value={editingCountry.h1}
              onChange={(e) => setEditingCountry({ ...editingCountry, h1: e.target.value })}
              variantSurface="light"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="SEO Meta Title"
                value={editingCountry.meta_title}
                onChange={(e) => setEditingCountry({ ...editingCountry, meta_title: e.target.value })}
                variantSurface="light"
              />
              <Textarea
                label="SEO Meta Description"
                value={editingCountry.meta_description}
                onChange={(e) => setEditingCountry({ ...editingCountry, meta_description: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Textarea
              label="Customs Clearance Summary"
              value={editingCountry.customs_summary || ''}
              onChange={(e) => setEditingCountry({ ...editingCountry, customs_summary: e.target.value })}
              variantSurface="light"
            />

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingCountry(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish Country'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-surface rounded-md border border-border overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border text-slate-500 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Country / Slug</th>
                <th className="p-3.5">ISO Code</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td className="p-3.5" colSpan={4}>
                    <div className="py-8 text-center text-slate-500 text-xs font-mono">
                      Loading destination countries from Supabase...
                    </div>
                  </td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td className="p-3.5" colSpan={4}>
                    <div className="py-8 text-center text-slate-500 text-xs font-mono">
                      No destination country entities created in Supabase database yet.
                    </div>
                  </td>
                </tr>
              ) : (
                countries.map((c) => (
                  <tr key={c.id || c.slug} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-brand-black text-sm">{c.name}</div>
                      <div className="font-mono text-slate-500 text-xs">/destinations/{c.slug}</div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700 font-bold">{c.iso_code}</td>
                    <td className="p-3.5">
                      <Badge variant={c.is_active ? 'accent' : 'outline'}>
                        {c.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button variant="outline" size="sm" onClick={() => setEditingCountry(c)}>
                        Edit Country
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
