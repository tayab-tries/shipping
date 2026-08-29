'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, Edit, Copy, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { IMAGE_SLOTS } from '@/lib/constants/images';

interface MediaAssetItem {
  id: string;
  fileName: string;
  publicUrl: string;
  mimeType: string;
  sizeBytes: number;
  altText: string;
  isReferenced: boolean;
  createdAt: string;
}

const initialAssets: MediaAssetItem[] = [
  {
    id: 'med-1',
    fileName: 'air_cargo_hero.jpg',
    publicUrl: IMAGE_SLOTS.heroBackground.src,
    mimeType: 'image/jpeg',
    sizeBytes: 245000,
    altText: IMAGE_SLOTS.heroBackground.alt,
    isReferenced: true,
    createdAt: '2026-08-20',
  },
  {
    id: 'med-2',
    fileName: 'air_freight_cargo.jpg',
    publicUrl: IMAGE_SLOTS.serviceAir.src,
    mimeType: 'image/jpeg',
    sizeBytes: 180000,
    altText: IMAGE_SLOTS.serviceAir.alt,
    isReferenced: true,
    createdAt: '2026-08-22',
  },
  {
    id: 'med-3',
    fileName: 'pakistan_logistics_hub.jpg',
    publicUrl: IMAGE_SLOTS.pakistanHub.src,
    mimeType: 'image/jpeg',
    sizeBytes: 210000,
    altText: IMAGE_SLOTS.pakistanHub.alt,
    isReferenced: true,
    createdAt: '2026-08-25',
  },
];

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAssetItem[]>(initialAssets);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAltText, setEditAltText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  const filteredAssets = assets.filter(
    (a: MediaAssetItem) =>
      a.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAltText = (id: string) => {
    setAssets(assets.map((a: MediaAssetItem) => (a.id === id ? { ...a, altText: editAltText } : a)));
    setEditingId(null);
  };

  const handleDeleteAsset = (asset: MediaAssetItem) => {
    if (asset.isReferenced) {
      setDeleteWarning(
        `Asset "${asset.fileName}" is currently referenced by published content. Explicit confirmation required before deletion.`
      );
      setTimeout(() => setDeleteWarning(null), 4000);
      return;
    }
    setAssets(assets.filter((a: MediaAssetItem) => a.id !== asset.id));
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ImageIcon className="w-4 h-4 text-accent shrink-0" />
            <span>Managed Media Repository</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Media Asset Library</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Upload raster images (JPEG, PNG, WebP, AVIF) with mandatory accessibility alt text. Raw SVG uploads remain blocked for security.
          </p>
        </div>

        <Button variant="accent" size="md" leftIcon={<Upload className="w-4 h-4 text-brand-black" />}>
          Upload Image Asset
        </Button>
      </div>

      {deleteWarning && (
        <div className="p-4 bg-amber-50 text-amber-900 rounded border border-amber-300 text-xs font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{deleteWarning}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Input
            placeholder="Search by file name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variantSurface="light"
          />
        </div>
        <div className="text-xs font-mono text-slate-500">
          Showing {filteredAssets.length} of {assets.length} assets
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAssets.map((asset: MediaAssetItem) => {
          const isEditing = editingId === asset.id;

          return (
            <Card key={asset.id} variant="light" className="p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/10] bg-brand-black rounded border border-border overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.publicUrl} alt={asset.altText} className="object-cover w-full h-full" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-black truncate max-w-[180px]">
                      {asset.fileName}
                    </span>
                    <Badge variant={asset.isReferenced ? 'navy' : 'outline'} className="text-[10px]">
                      {asset.isReferenced ? 'Referenced' : 'Unused'}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    {(asset.sizeBytes / 1024).toFixed(1)} KB • {asset.mimeType.replace('image/', '').toUpperCase()}
                  </span>
                </div>

                {/* Alt Text Display / Editor */}
                {isEditing ? (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Input
                      label="Mandatory Alt Text"
                      value={editAltText}
                      onChange={(e) => setEditAltText(e.target.value)}
                      variantSurface="light"
                    />
                    <Button variant="accent" size="sm" className="w-full" onClick={() => handleSaveAltText(asset.id)}>
                      Save Alt Text
                    </Button>
                  </div>
                ) : (
                  <div className="p-2.5 bg-surface-subtle rounded border border-border text-xs text-slate-700 space-y-1 font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Alt Text</span>
                    <p className="line-clamp-2">{asset.altText}</p>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(isEditing ? null : asset.id);
                    setEditAltText(asset.altText);
                  }}
                  leftIcon={<Edit className="w-3.5 h-3.5" />}
                >
                  {isEditing ? 'Close' : 'Alt Text'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyUrl(asset.id, asset.publicUrl)}
                  leftIcon={copiedId === asset.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedId === asset.id ? 'Copied' : 'URL'}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  isIconOnly
                  onClick={() => handleDeleteAsset(asset)}
                  aria-label="Delete media asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
