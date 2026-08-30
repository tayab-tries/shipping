'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getLocationsListAction, saveAndPublishLocationAction, LocationItemInput } from './actions';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<LocationItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [editingLoc, setEditingLoc] = useState<LocationItemInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await getLocationsListAction();
        if (res.success && res.data) {
          setLocations(res.data as LocationItemInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load locations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

  const filtered = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingLoc({
      name: 'New City',
      slug: `new-city-${Date.now()}`,
      province: 'Punjab',
      h1: 'Cargo Forwarding Services in New City',
      meta_title: 'Cargo Forwarding in New City | Cargo Shipping',
      meta_description: 'Reliable air and sea cargo services in New City, Pakistan.',
      hub_address: '',
      phone_local: '',
      email_local: '',
      is_active: true,
      services_offered: [],
      verified_branches: [],
      content_blocks: [],
      faqs: [],
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishLocationAction(editingLoc);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Location published! Cloudflare production build triggered successfully.'
              : 'Location saved and snapshot recorded in database.',
          });
        }
        // Refresh list
        const refresh = await getLocationsListAction();
        if (refresh.success && refresh.data) {
          setLocations(refresh.data as LocationItemInput[]);
        }
        setEditingLoc(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save location.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing location.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span>Pakistan Coverage Manager</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Pakistan Origin Locations</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage origin city coverage, physical branch distinction, and location metadata.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleAddNew} leftIcon={<Plus className="w-4 h-4 text-brand-black" />}>
          Add New Location
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

      {editingLoc ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingLoc.id ? `Edit Location: ${editingLoc.name}` : 'Create New Location'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingLoc(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="City Name"
                value={editingLoc.name}
                onChange={(e) => setEditingLoc({ ...editingLoc, name: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="URL Slug"
                value={editingLoc.slug}
                onChange={(e) => setEditingLoc({ ...editingLoc, slug: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Province"
                value={editingLoc.province}
                onChange={(e) => setEditingLoc({ ...editingLoc, province: e.target.value })}
                variantSurface="light"
              />
            </div>

            <Input
              label="H1 Heading"
              value={editingLoc.h1}
              onChange={(e) => setEditingLoc({ ...editingLoc, h1: e.target.value })}
              variantSurface="light"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="SEO Meta Title"
                value={editingLoc.meta_title}
                onChange={(e) => setEditingLoc({ ...editingLoc, meta_title: e.target.value })}
                variantSurface="light"
              />
              <Textarea
                label="SEO Meta Description"
                value={editingLoc.meta_description}
                onChange={(e) => setEditingLoc({ ...editingLoc, meta_description: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Hub Address"
                value={editingLoc.hub_address || ''}
                onChange={(e) => setEditingLoc({ ...editingLoc, hub_address: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Local Contact Phone"
                value={editingLoc.phone_local || ''}
                onChange={(e) => setEditingLoc({ ...editingLoc, phone_local: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Local Contact Email"
                value={editingLoc.email_local || ''}
                onChange={(e) => setEditingLoc({ ...editingLoc, email_local: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingLoc(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish Location'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <>
          <div className="bg-surface p-4 rounded-md border border-border flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search origin cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface text-brand-black text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="bg-surface rounded-md border border-border overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-slate-500 font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">City / Slug</th>
                  <th className="p-3.5">Province</th>
                  <th className="p-3.5">Hub Address</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td className="p-3.5" colSpan={5}>
                      <div className="py-8 text-center text-slate-500 text-xs font-mono">
                        Loading locations from Supabase...
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td className="p-3.5" colSpan={5}>
                      <div className="py-8 text-center text-slate-500 text-xs font-mono">
                        No locations found. Click &quot;Add New Location&quot; to create one.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((loc) => (
                    <tr key={loc.id || loc.slug} className="hover:bg-surface-subtle transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-brand-black text-sm">{loc.name}</div>
                        <div className="font-mono text-slate-500 text-xs">/locations/{loc.slug}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">{loc.province}</td>
                      <td className="p-3.5 text-slate-600">{loc.hub_address || '—'}</td>
                      <td className="p-3.5">
                        <Badge variant={loc.is_active ? 'accent' : 'outline'}>
                          {loc.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <Button variant="outline" size="sm" onClick={() => setEditingLoc(loc)}>
                          Edit Location
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
