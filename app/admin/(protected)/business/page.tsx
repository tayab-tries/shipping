'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Building2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { siteConfig } from '@/config/site.config';
import { saveAndPublishBusinessSettingsAction, getBusinessSettingsAction } from './actions';

export default function AdminBusinessPage() {
  const [formData, setFormData] = useState({
    brandName: siteConfig.name,
    legalName: siteConfig.name,
    phonePrimary: siteConfig.phone,
    whatsappNumber: siteConfig.phone,
    emailInfo: siteConfig.contact.emailInfo,
    operatingHours: 'Mon - Sat: 09:00 - 18:00 (PKT)',
    defaultSeoTitle: siteConfig.defaultSeo.defaultTitle,
    defaultSeoDescription: siteConfig.defaultSeo.defaultDescription,
    footerCopyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await getBusinessSettingsAction();
        if (res.success && res.data) {
          setFormData((prev) => ({
            ...prev,
            brandName: res.data.brandName || prev.brandName,
            legalName: res.data.legalName || prev.legalName,
            phonePrimary: res.data.phonePrimary || prev.phonePrimary,
            whatsappNumber: res.data.whatsappNumber || prev.whatsappNumber,
            emailInfo: res.data.emailInfo || prev.emailInfo,
            operatingHours: res.data.operatingHours || prev.operatingHours,
          }));
        }
      } catch (err: unknown) {
        console.error('Failed to load business settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishBusinessSettingsAction({
        brandName: formData.brandName,
        legalName: formData.legalName,
        phonePrimary: formData.phonePrimary,
        whatsappNumber: formData.whatsappNumber,
        emailInfo: formData.emailInfo,
        operatingHours: formData.operatingHours,
      });

      if (res.success) {
        if (res.warning) {
          setStatusMessage({
            type: 'warning',
            text: res.warning,
          });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Business settings published! Cloudflare production build triggered successfully.'
              : 'Business settings saved and snapshot recorded in database.',
          });
        }
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Failed to publish business settings.',
        });
      }
    } catch (err: unknown) {
      setStatusMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'An error occurred while publishing.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handlePublish} className="space-y-8 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Building2 className="w-4 h-4 text-accent shrink-0" />
            <span>Central Business Configuration</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Business Settings & Global Contact Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage company contact numbers, email addresses, operating hours, and global site defaults without editing source code.
          </p>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="md"
          disabled={saving || loading}
          leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
        >
          {saving ? 'Publishing...' : 'Save & Publish Settings'}
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

      {/* General Company Information */}
      <Card variant="light" className="p-6 space-y-6">
        <h2 className="text-heading-sm font-bold text-brand-black border-b border-border pb-3 uppercase font-mono">
          1. Brand & Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Brand Name"
            value={formData.brandName}
            onChange={(e) => handleChange('brandName', e.target.value)}
            variantSurface="light"
          />
          <Input
            label="Legal Business Name"
            value={formData.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            variantSurface="light"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input
            label="Primary Contact Phone"
            value={formData.phonePrimary}
            onChange={(e) => handleChange('phonePrimary', e.target.value)}
            variantSurface="light"
          />
          <Input
            label="WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={(e) => handleChange('whatsappNumber', e.target.value)}
            variantSurface="light"
          />
          <Input
            label="Info Email Address"
            type="email"
            value={formData.emailInfo}
            onChange={(e) => handleChange('emailInfo', e.target.value)}
            variantSurface="light"
          />
        </div>

        <Input
          label="Operating Hours"
          value={formData.operatingHours}
          onChange={(e) => handleChange('operatingHours', e.target.value)}
          variantSurface="light"
        />
      </Card>

      {/* Global SEO & Footer Settings */}
      <Card variant="light" className="p-6 space-y-6">
        <h2 className="text-heading-sm font-bold text-brand-black border-b border-border pb-3 uppercase font-mono">
          2. Global Default SEO & Footer Settings
        </h2>

        <Input
          label="Default SEO Title Tag"
          value={formData.defaultSeoTitle}
          onChange={(e) => handleChange('defaultSeoTitle', e.target.value)}
          variantSurface="light"
        />

        <Textarea
          label="Default Meta Description"
          value={formData.defaultSeoDescription}
          onChange={(e) => handleChange('defaultSeoDescription', e.target.value)}
          variantSurface="light"
        />

        <Input
          label="Footer Copyright Text"
          value={formData.footerCopyright}
          onChange={(e) => handleChange('footerCopyright', e.target.value)}
          variantSurface="light"
        />
      </Card>

      {/* Office Verification Notice */}
      <Card variant="light" className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Physical Office Verification Rule</span>
        </div>
        <p className="text-body-sm text-slate-600 leading-relaxed font-normal">
          Strict verification rule: Physical office addresses and branch claims must be explicitly verified before local business schema or branch addresses are emitted publicly.
        </p>
      </Card>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={saving || loading}
          leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
        >
          {saving ? 'Publishing...' : 'Save & Publish All Settings'}
        </Button>
      </div>
    </form>
  );
}
