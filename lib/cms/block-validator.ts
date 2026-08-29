import { BLOCK_DEFINITIONS, BlockType } from './block-registry';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateUrl(url: string): boolean {
  if (!url) return false;
  // Block dangerous protocol handlers
  const lower = url.trim().toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return false;
  }
  // Internal paths starting with '/' or valid HTTP/HTTPS URLs
  if (url.startsWith('/')) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateBlockContent(type: BlockType, contentData: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const def = BLOCK_DEFINITIONS[type];

  if (!def) {
    errors.push({ field: 'type', message: `Unknown block type: ${type}` });
    return errors;
  }

  // Validate CTA href URLs if present
  if (typeof contentData.primary_cta_href === 'string' && !validateUrl(contentData.primary_cta_href)) {
    errors.push({ field: 'primary_cta_href', message: 'Invalid or prohibited URL protocol.' });
  }

  if (typeof contentData.secondary_cta_href === 'string' && !validateUrl(contentData.secondary_cta_href)) {
    errors.push({ field: 'secondary_cta_href', message: 'Invalid or prohibited URL protocol.' });
  }

  if (typeof contentData.button_href === 'string' && !validateUrl(contentData.button_href)) {
    errors.push({ field: 'button_href', message: 'Invalid or prohibited URL protocol.' });
  }

  return errors;
}

export function validateMediaUpload(fileName: string, mimeType: string): { isValid: boolean; error?: string } {
  // Reject SVG vector uploads to prevent XSS script injection
  const lowerName = fileName.toLowerCase();
  const lowerMime = mimeType.toLowerCase();

  if (lowerName.endsWith('.svg') || lowerMime.includes('svg')) {
    return {
      isValid: false,
      error: 'Prohibited file type: SVG uploads are blocked to prevent XSS script execution vulnerabilities. Upload JPEG, PNG, WebP, or AVIF instead.',
    };
  }

  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (!allowedMimes.includes(lowerMime)) {
    return {
      isValid: false,
      error: `Unsupported image format: ${mimeType}. Allowed formats: JPEG, PNG, WebP, AVIF.`,
    };
  }

  return { isValid: true };
}
