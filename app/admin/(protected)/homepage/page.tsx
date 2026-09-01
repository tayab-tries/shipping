'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  Save,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  getHomepageBlocksAction,
  saveAndPublishHomepageBlocksAction,
  HomepageBlockInput,
} from './actions';

export default function AdminHomepageManager() {
  const [blocks, setBlocks] = useState<HomepageBlockInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, unknown>>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getHomepageBlocksAction();
        if (res.success && res.data) {
          setBlocks(res.data);
        }
      } catch (err: unknown) {
        console.error('Failed to load homepage blocks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setBlocks(updated.map((b, i) => ({ ...b, sortOrder: i + 1 })));
  };

  const handleMoveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setBlocks(updated.map((b, i) => ({ ...b, sortOrder: i + 1 })));
  };

  const handleToggleEnabled = (id: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b)));
  };

  const handleOpenEdit = (block: HomepageBlockInput) => {
    setEditingBlockId(block.id);
    setEditFormData(JSON.parse(JSON.stringify(block.contentData)));
  };

  const handleSaveBlockEdit = (id: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, contentData: { ...editFormData } } : b)));
    setEditingBlockId(null);
  };

  const handlePublishHomepage = async () => {
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishHomepageBlocksAction(blocks);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Homepage blocks published! Cloudflare production build triggered successfully.'
              : 'Homepage blocks saved and snapshot recorded in database.',
          });
        }
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to publish homepage blocks.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing homepage.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = (key: string) => {
    const currentList = Array.isArray(editFormData[key])
      ? (editFormData[key] as Array<Record<string, unknown>>)
      : [];
    const newItem = {
      name: 'New Organization',
      logo: '/images/logos/fbr.svg',
      orgName: '',
      description: '',
      sort_order: currentList.length + 1,
    };
    setEditFormData({
      ...editFormData,
      [key]: [...currentList, newItem],
    });
  };

  const handleRemoveItem = (key: string, idx: number) => {
    const currentList = Array.isArray(editFormData[key])
      ? (editFormData[key] as Array<Record<string, unknown>>)
      : [];
    const updated = currentList.filter((_, i) => i !== idx);
    setEditFormData({
      ...editFormData,
      [key]: updated,
    });
  };

  const handleUpdateItemField = (
    key: string,
    idx: number,
    field: string,
    val: unknown
  ) => {
    const currentList = Array.isArray(editFormData[key])
      ? (editFormData[key] as Array<Record<string, unknown>>)
      : [];
    const updated = [...currentList];
    updated[idx] = { ...updated[idx], [field]: val };
    setEditFormData({
      ...editFormData,
      [key]: updated,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            <span>CMS Content Architecture</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Homepage Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Enable/disable, reorder, and edit homepage content sections. Publishing updates the CMS registry and triggers Cloudflare static regeneration.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handlePublishHomepage}
          disabled={saving}
          leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin text-brand-black" /> : <Save className="w-4 h-4 text-brand-black" />}
        >
          {saving ? 'Publishing...' : 'Publish Homepage'}
        </Button>
      </div>

      {/* Status Feedback Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded border text-xs font-mono flex items-center gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : statusMessage.type === 'warning'
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-red-50 text-red-900 border-red-300'
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

      {/* Loading Skeleton */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading homepage block registry...
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, idx) => {
            const isEditing = editingBlockId === block.id;

            return (
              <Card key={block.id} variant="light" className="p-6 space-y-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400 w-8">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div>
                      <h3 className="text-heading-sm font-bold text-brand-black flex items-center gap-2">
                        <span>{block.label}</span>
                        <Badge variant={block.enabled ? 'accent' : 'outline'}>
                          {block.enabled ? 'Active' : 'Hidden'}
                        </Badge>
                      </h3>
                      <span className="text-xs font-mono text-slate-500">Block type: {block.type}</span>
                    </div>
                  </div>

                  {/* Control Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      aria-label="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={idx === blocks.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      aria-label="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleEnabled(block.id)}
                      leftIcon={block.enabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    >
                      {block.enabled ? 'Hide' : 'Enable'}
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => (isEditing ? handleSaveBlockEdit(block.id) : handleOpenEdit(block))}
                      leftIcon={isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit className="w-3.5 h-3.5" />}
                    >
                      {isEditing ? 'Save Edit' : 'Edit Block'}
                    </Button>
                  </div>
                </div>

                {/* Inline Block Content Drawer */}
                {isEditing && (
                  <div className="pt-4 border-t border-border space-y-6 bg-surface-subtle p-6 rounded-md">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-700">
                      Edit {block.label} Content Fields
                    </h4>

                    {Object.entries(editFormData).map(([key, val]) => {
                      if (Array.isArray(val)) {
                        return (
                          <div key={key} className="space-y-4 pt-2 border-t border-border/80">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold uppercase text-brand-black">
                                {key.replace(/_/g, ' ')} ({val.length} Logos)
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItem(key)}
                                leftIcon={<Plus className="w-3.5 h-3.5" />}
                              >
                                Add Logo Entry
                              </Button>
                            </div>

                            <div className="space-y-4">
                              {val.map((item: Record<string, unknown>, itemIdx: number) => (
                                <div
                                  key={itemIdx}
                                  className="p-4 bg-surface rounded border border-border space-y-3 relative group"
                                >
                                  <div className="flex items-center justify-between pb-2 border-b border-border">
                                    <span className="text-xs font-mono font-bold text-slate-600">
                                      Entry #{itemIdx + 1}: {item.name as string || 'Logo Asset'}
                                    </span>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      isIconOnly
                                      onClick={() => handleRemoveItem(key, itemIdx)}
                                      aria-label="Remove Entry"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Input
                                      label="Name / Label"
                                      value={(item.name as string) || ''}
                                      onChange={(e) =>
                                        handleUpdateItemField(key, itemIdx, 'name', e.target.value)
                                      }
                                      variantSurface="light"
                                    />
                                    <Input
                                      label="Logo Image URL / SVG Path"
                                      value={(item.logo as string) || ''}
                                      onChange={(e) =>
                                        handleUpdateItemField(key, itemIdx, 'logo', e.target.value)
                                      }
                                      variantSurface="light"
                                    />
                                    {item.orgName !== undefined && (
                                      <Input
                                        label="Organization Full Name"
                                        value={(item.orgName as string) || ''}
                                        onChange={(e) =>
                                          handleUpdateItemField(key, itemIdx, 'orgName', e.target.value)
                                        }
                                        variantSurface="light"
                                      />
                                    )}
                                    {item.description !== undefined && (
                                      <Input
                                        label="Sub-text Description"
                                        value={(item.description as string) || ''}
                                        onChange={(e) =>
                                          handleUpdateItemField(key, itemIdx, 'description', e.target.value)
                                        }
                                        variantSurface="light"
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={key} className="space-y-1">
                          {typeof val === 'string' && val.length > 60 ? (
                            <Textarea
                              label={key.replace(/_/g, ' ').toUpperCase()}
                              value={(editFormData[key] ?? val) as string}
                              onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                              variantSurface="light"
                            />
                          ) : (
                            <Input
                              label={key.replace(/_/g, ' ').toUpperCase()}
                              value={(editFormData[key] ?? val) as string}
                              onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                              variantSurface="light"
                            />
                          )}
                        </div>
                      );
                    })}

                    <div className="pt-2 flex justify-end">
                      <Button variant="accent" size="sm" onClick={() => handleSaveBlockEdit(block.id)}>
                        Done Editing
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
