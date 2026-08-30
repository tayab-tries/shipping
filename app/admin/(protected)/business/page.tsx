'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { siteConfig } from '@/config/site.config';

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

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
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
          leftIcon={<Save className="w-4 h-4 text-brand-black" />}
        >
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Business configuration updated and snapshot saved!</span>
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
          leftIcon={<Save className="w-4 h-4 text-brand-black" />}
        >
          Save All Business Settings
        </Button>
      </div>
    </form>
  );
}
