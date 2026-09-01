'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import {
  getMediaAssetsAction,
  updateMediaAltTextAction,
  deleteMediaAssetAction,
  MediaAssetRecord,
} from './actions';

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

const initialDefaultAssets: MediaAssetItem[] = [
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
  const [assets, setAssets] = useState<MediaAssetItem[]>(initialDefaultAssets);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAltText, setEditAltText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  // Upload Modal State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadAltText, setUploadAltText] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    getMediaAssetsAction()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const dbAssets: MediaAssetItem[] = res.data.map((rec: MediaAssetRecord) => ({
            id: rec.id,
            fileName: rec.file_name,
            publicUrl: rec.public_url,
            mimeType: rec.mime_type,
            sizeBytes: rec.size_bytes,
            altText: rec.alt_text,
            isReferenced: false,
            createdAt: rec.created_at ? rec.created_at.substring(0, 10) : '2026-09-01',
          }));
          setAssets(dbAssets);
        }
        if (isMounted) {
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        console.warn('Failed to load media assets safely:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!allowed.includes(file.type.toLowerCase())) {
      setUploadError(`Unsupported file format (${file.type || 'unknown'}). Please upload JPEG, PNG, WebP, AVIF, or GIF images.`);
      return;
    }

    setSelectedFile(file);
    setUploadAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError(null);
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleCancelModal = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadAltText('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;
    if (!uploadAltText.trim()) {
      setUploadError('Mandatory accessibility Alt Text is required before uploading.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('altText', uploadAltText.trim());

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.success && result.data) {
        const newAsset: MediaAssetItem = {
          id: result.data.id,
          fileName: result.data.file_name,
          publicUrl: result.data.public_url,
          mimeType: result.data.mime_type,
          sizeBytes: result.data.size_bytes,
          altText: result.data.alt_text,
          isReferenced: false,
          createdAt: new Date().toISOString().substring(0, 10),
        };

        setAssets([newAsset, ...assets]);
        handleCancelModal();
      } else {
        setUploadError(result.error || 'Failed to upload image. Please try again.');
      }
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Error processing image upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAltText = async (id: string) => {
    if (!editAltText.trim()) return;
    try {
      await updateMediaAltTextAction(id, editAltText.trim());
      setAssets(assets.map((a) => (a.id === id ? { ...a, altText: editAltText.trim() } : a)));
      setEditingId(null);
    } catch (err: unknown) {
      console.error('Error saving alt text:', err);
    }
  };

  const handleDeleteAsset = async (asset: MediaAssetItem) => {
    if (asset.isReferenced) {
      setDeleteWarning(
        `Asset "${asset.fileName}" is currently referenced by published content. Explicit confirmation required before deletion.`
      );
      setTimeout(() => setDeleteWarning(null), 4000);
      return;
    }

    try {
      await deleteMediaAssetAction(asset.id);
      setAssets(assets.filter((a) => a.id !== asset.id));
    } catch (err: unknown) {
      console.error('Error deleting asset:', err);
    }
  };

  const filteredAssets = assets.filter(
    (a) =>
      a.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ImageIcon className="w-4 h-4 text-accent shrink-0" />
            <span>Managed Media Repository</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Media Asset Library</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Upload raster images (JPEG, PNG, WebP, AVIF, GIF) with mandatory accessibility alt text. Raw SVG uploads remain blocked for security.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handleTriggerUpload}
          leftIcon={<Upload className="w-4 h-4 text-brand-black" />}
        >
          Upload Image Asset
        </Button>
      </div>

      {deleteWarning && (
        <div className="p-4 bg-amber-50 text-amber-900 rounded border border-amber-300 text-xs font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{deleteWarning}</span>
        </div>
      )}

      {/* Upload Image Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-md border border-border shadow-2xl max-w-lg w-full p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                <h2 className="text-heading-md font-bold text-brand-black">Upload New Image Asset</h2>
              </div>
              <button
                onClick={handleCancelModal}
                className="p-1 rounded hover:bg-surface-subtle text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs font-mono">
                {uploadError}
              </div>
            )}

            <div className="space-y-4">
              {/* Preview Box */}
              {previewUrl && (
                <div className="relative aspect-[16/9] rounded border border-border bg-brand-black overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Upload preview" className="object-contain max-h-full max-w-full" />
                </div>
              )}

              <div className="space-y-1 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">File Name:</span>
                  <span className="font-semibold text-brand-black">{selectedFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Size:</span>
                  <span className="font-semibold text-brand-black">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="font-semibold text-brand-black">{selectedFile.type}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-brand-black flex items-center justify-between">
                  <span>Mandatory Alt Text *</span>
                  <span className="text-[10px] text-slate-400 font-normal">Accessibility requirement</span>
                </label>
                <Input
                  placeholder="Describe image for screen readers and SEO..."
                  value={uploadAltText}
                  onChange={(e) => setUploadAltText(e.target.value)}
                  variantSurface="light"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" size="md" onClick={handleCancelModal} disabled={isUploading}>
                Cancel
              </Button>
              <Button
                variant="accent"
                size="md"
                onClick={handleConfirmUpload}
                disabled={isUploading}
                leftIcon={
                  isUploading ? (
                    <Loader2 className="w-4 h-4 text-brand-black animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-brand-black" />
                  )
                }
              >
                {isUploading ? 'Uploading...' : 'Save & Publish Image'}
              </Button>
            </div>
          </div>
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

      {/* Asset Grid / Empty Loading State */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-accent" />
          <span>Loading media asset repository...</span>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="p-12 text-center bg-surface-subtle rounded border border-border text-slate-500 space-y-3">
          <ImageIcon className="w-8 h-8 mx-auto text-slate-400" />
          <p className="text-body-md font-semibold text-brand-black">No media assets found</p>
          <p className="text-xs text-slate-500 font-mono">
            Upload an image asset using the button above to add to the library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAssets.map((asset: MediaAssetItem) => {
            const isEditing = editingId === asset.id;

            return (
              <Card key={asset.id} variant="light" className="p-5 space-y-4 flex flex-col justify-between shadow-xs">
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
                    leftIcon={
                      copiedId === asset.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
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
      )}
    </div>
  );
}
