'use client';

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff, Edit, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { BLOCK_DEFINITIONS, BlockType } from '@/lib/cms/block-registry';

interface HomepageBlockItem {
  id: string;
  type: BlockType;
  label: string;
  enabled: boolean;
  sortOrder: number;
  contentData: Record<string, unknown>;
}

const initialBlocks: HomepageBlockItem[] = [
  { id: 'blk-1', type: 'hero', label: BLOCK_DEFINITIONS.hero.label, enabled: true, sortOrder: 1, contentData: { ...BLOCK_DEFINITIONS.hero.defaultData } },
  { id: 'blk-2', type: 'quick_quote', label: BLOCK_DEFINITIONS.quick_quote.label, enabled: true, sortOrder: 2, contentData: { ...BLOCK_DEFINITIONS.quick_quote.defaultData } },
  { id: 'blk-3', type: 'services', label: BLOCK_DEFINITIONS.services.label, enabled: true, sortOrder: 3, contentData: { ...BLOCK_DEFINITIONS.services.defaultData } },
  { id: 'blk-4', type: 'locations', label: BLOCK_DEFINITIONS.locations.label, enabled: true, sortOrder: 4, contentData: { ...BLOCK_DEFINITIONS.locations.defaultData } },
  { id: 'blk-5', type: 'destinations', label: BLOCK_DEFINITIONS.destinations.label, enabled: true, sortOrder: 5, contentData: { ...BLOCK_DEFINITIONS.destinations.defaultData } },
  { id: 'blk-6', type: 'process', label: BLOCK_DEFINITIONS.process.label, enabled: true, sortOrder: 6, contentData: { ...BLOCK_DEFINITIONS.process.defaultData } },
  { id: 'blk-7', type: 'trust', label: BLOCK_DEFINITIONS.trust.label, enabled: true, sortOrder: 7, contentData: { ...BLOCK_DEFINITIONS.trust.defaultData } },
  { id: 'blk-8', type: 'guides', label: BLOCK_DEFINITIONS.guides.label, enabled: true, sortOrder: 8, contentData: { ...BLOCK_DEFINITIONS.guides.defaultData } },
  { id: 'blk-9', type: 'faq', label: BLOCK_DEFINITIONS.faq.label, enabled: true, sortOrder: 9, contentData: { ...BLOCK_DEFINITIONS.faq.defaultData } },
  { id: 'blk-10', type: 'cta', label: BLOCK_DEFINITIONS.cta.label, enabled: true, sortOrder: 10, contentData: { ...BLOCK_DEFINITIONS.cta.defaultData } },
];

export default function AdminHomepageManager() {
  const [blocks, setBlocks] = useState<HomepageBlockItem[]>(initialBlocks);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, unknown>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    // Re-index sortOrder
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

  const handleOpenEdit = (block: HomepageBlockItem) => {
    setEditingBlockId(block.id);
    setEditFormData({ ...block.contentData });
  };

  const handleSaveBlockEdit = (id: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, contentData: { ...editFormData } } : b)));
    setEditingBlockId(null);
  };

  const handlePublishHomepage = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Controlled Block Architecture</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Homepage Block Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Reorder, enable/disable, and edit homepage content sections without modifying source code.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handlePublishHomepage}
          leftIcon={<Save className="w-4 h-4 text-brand-black" />}
        >
          Publish Homepage Changes
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Homepage block configuration updated and snapshot saved!</span>
        </div>
      )}

      {/* Controlled Blocks List */}
      <div className="space-y-4">
        {blocks.map((block, idx) => {
          const isEditing = editingBlockId === block.id;

          return (
            <Card key={block.id} variant="light" className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-400 w-8">
                    0{idx + 1}
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
                <div className="pt-4 border-t border-border space-y-4 bg-surface-subtle p-6 rounded-md">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">
                    Edit {block.label} Data Fields
                  </h4>

                  {Object.entries(block.contentData).map(([key, val]) => (
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
                  ))}

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
    </div>
  );
}
