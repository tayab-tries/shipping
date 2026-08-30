'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, CheckCircle2, Navigation, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { getSiteNavigationAction, saveAndPublishSiteNavigationAction } from './actions';
import { mainNavigation, footerNavigation } from '@/config/nav.config';

interface NavItem {
  id: string;
  label: string;
  href: string;
  location: 'header' | 'footer' | 'topbar';
  enabled: boolean;
  sortOrder: number;
}

export default function AdminNavigationManager() {
  const [headerItems, setHeaderItems] = useState<NavItem[]>([]);
  const [footerItems, setFooterItems] = useState<NavItem[]>([]);
  const [activeTab, setActiveTab] = useState<'header' | 'footer' | 'topbar'>('header');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadNav() {
      try {
        const res = await getSiteNavigationAction();
        if (res.success && res.data) {
          const hItems: NavItem[] = (res.data.header || []).map((h: { title: string; href: string }, i: number) => ({
            id: `h-${i}`,
            label: h.title,
            href: h.href,
            location: 'header',
            enabled: true,
            sortOrder: i + 1,
          }));
          const fItems: NavItem[] = (res.data.footer || []).flatMap((group: { title: string; items: { label: string; href: string }[] }, gIdx: number) =>
            (group.items || []).map((item: { label: string; href: string }, i: number) => ({
              id: `f-${gIdx}-${i}`,
              label: item.label,
              href: item.href,
              location: 'footer',
              enabled: true,
              sortOrder: i + 1,
            }))
          );

          setHeaderItems(hItems.length > 0 ? hItems : mainNavigation.map((h, i) => ({
            id: `h-${i}`,
            label: h.title,
            href: h.href,
            location: 'header',
            enabled: true,
            sortOrder: i + 1,
          })));

          setFooterItems(fItems.length > 0 ? fItems : footerNavigation.flatMap((group, gIdx) =>
            group.items.map((item, i) => ({
              id: `f-${gIdx}-${i}`,
              label: item.label,
              href: item.href,
              location: 'footer',
              enabled: true,
              sortOrder: i + 1,
            }))
          ));
        }
      } catch (err: unknown) {
        console.error('Failed to load navigation:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNav();
  }, []);

  const items = activeTab === 'header' ? headerItems : footerItems;
  const setItems = activeTab === 'header' ? setHeaderItems : setFooterItems;

  const handleAddItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      href: '/',
      location: activeTab,
      enabled: true,
      sortOrder: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof NavItem, value: string | boolean | number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);

    try {
      const headerPayload = headerItems.filter((i) => i.enabled).map((i) => ({ title: i.label, href: i.href }));
      const footerPayload = [
        {
          title: 'Quick Links',
          items: footerItems.filter((i) => i.enabled).map((i) => ({ label: i.label, href: i.href })),
        },
      ];

      const res = await saveAndPublishSiteNavigationAction({
        header: headerPayload,
        footer: footerPayload,
      });

      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Site navigation published! Cloudflare production build triggered successfully.'
              : 'Site navigation saved and snapshot recorded in database.',
          });
        }
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to publish site navigation.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing navigation.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Navigation className="w-4 h-4 text-accent shrink-0" />
            <span>Site Structure Manager</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Site Navigation Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage links for Header, Footer, and TopBar navigation menus without source code edits.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          disabled={saving || loading}
          onClick={handleSave}
          leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
        >
          {saving ? 'Publishing...' : 'Save & Publish Navigation'}
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

      {/* Navigation Location Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 text-xs font-mono">
        {(['header', 'footer', 'topbar'] as const).map((loc) => (
          <button
            key={loc}
            onClick={() => setActiveTab(loc)}
            className={`px-4 py-2 rounded-md font-semibold uppercase transition-colors ${
              activeTab === loc
                ? 'bg-brand-black text-white'
                : 'bg-surface-subtle text-slate-600 hover:text-brand-black'
            }`}
          >
            {loc} Menu ({loc === 'header' ? headerItems.length : footerItems.length})
          </button>
        ))}
      </div>

      {/* Nav Items List */}
      <Card variant="light" className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
            {activeTab} Links Configuration
          </h3>
          <Button variant="outline" size="sm" onClick={handleAddItem} leftIcon={<Plus className="w-4 h-4" />}>
            Add Nav Link
          </Button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            Loading site navigation configuration...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            No navigation links configured for this menu location yet.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-surface rounded border border-border flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                  <Input
                    label="Label"
                    value={item.label}
                    onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                    variantSurface="light"
                  />
                  <Input
                    label="URL Path (href)"
                    value={item.href}
                    onChange={(e) => handleUpdateItem(item.id, 'href', e.target.value)}
                    variantSurface="light"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={item.enabled ? 'accent' : 'outline'}>
                    {item.enabled ? 'Active' : 'Disabled'}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateItem(item.id, 'enabled', !item.enabled)}
                  >
                    {item.enabled ? 'Disable' : 'Enable'}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    isIconOnly
                    onClick={() => handleDeleteItem(item.id)}
                    aria-label="Delete link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
