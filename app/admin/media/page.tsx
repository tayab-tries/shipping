import React from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminMediaPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">Media Asset Library</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Upload and manage raster photographic images (JPEG, PNG, WebP, AVIF) with mandatory alt text.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Upload className="w-4 h-4" />}>
          Upload Image
        </Button>
      </div>

      <div className="p-8 bg-surface rounded-md border border-border text-center space-y-3">
        <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto" />
        <h2 className="text-heading-sm font-bold text-foreground">Media Library Empty</h2>
        <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
          Upload JPEG, PNG, WebP, or AVIF image assets. Raw SVG vector uploads are disabled to prevent script security vulnerabilities.
        </p>
      </div>
    </div>
  );
}
