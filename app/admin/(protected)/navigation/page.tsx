'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save, CheckCircle2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface NavItem {
  id: string;
  label: string;
  href: string;
  location: 'header' | 'footer' | 'topbar';
  enabled: boolean;
  sortOrder: number;
  openInNewTab?: boolean;
}

const initialNavItems: NavItem[] = [
  { id: 'nav-1', label: 'Services', href: '/services', location: 'header', enabled: true, sortOrder: 1 },
  { id: 'nav-2', label: 'Locations', href: '/locations', location: 'header', enabled: true, sortOrder: 2 },
  { id: 'nav-3', label: 'Destinations', href: '/destinations', location: 'header', enabled: true, sortOrder: 3 },
  { id: 'nav-4', label: 'Guides', href: '/guides', location: 'header', enabled: true, sortOrder: 4 },
  { id: 'nav-5', label: 'Track Shipment', href: '/track', location: 'header', enabled: true, sortOrder: 5 },
  { id: 'nav-6', label: 'Request a Quote', href: '/quote', location: 'header', enabled: true, sortOrder: 6 },
  { id: 'nav-7', label: 'Air Freight', href: '/services/air-freight', location: 'footer', enabled: true, sortOrder: 1 },
  { id: 'nav-8', label: 'Sea Cargo', href: '/services/sea-cargo', location: 'footer', enabled: true, sortOrder: 2 },
];

export default function AdminNavigationManager() {
  const [items, setItems] = useState<NavItem[]>(initialNavItems);
  const [activeTab, setActiveTab] = useState<'header' | 'footer' | 'topbar'>('header');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredItems = items
    .filter((i) => i.location === activeTab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handleAddItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      href: '/',
      location: activeTab,
      enabled: true,
      sortOrder: filteredItems.length + 1,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof NavItem, value: string | boolean | number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
          onClick={handleSave}
          leftIcon={<Save className="w-4 h-4 text-brand-black" />}
        >
          Save Navigation Changes
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Navigation configuration saved successfully!</span>
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
            {loc} Menu ({items.filter((i) => i.location === loc).length})
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

        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            No navigation links configured for this menu location yet.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
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
