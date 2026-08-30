'use client';

import React, { useState } from 'react';
import { Plus, Award, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface CredentialItem {
  id: string;
  name: string;
  type: 'registration' | 'certification' | 'association' | 'membership' | 'carrier_network' | 'other';
  description: string;
  verificationUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  sortOrder: number;
}

const initialCredentials: CredentialItem[] = [
  {
    id: 'cred-1',
    name: 'Pakistan Customs Export Declaration Compliance',
    type: 'registration',
    description: 'Verified export declaration compliance for air freight and ocean sea cargo dispatches departing Pakistan ports.',
    verificationUrl: 'https://customs.gov.pk',
    isVerified: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'cred-2',
    name: 'Commercial Air Carrier Network Accreditation',
    type: 'carrier_network',
    description: 'Accredited linehaul cargo space allocation across scheduled commercial flights departing KHI, LHE, and ISB.',
    isVerified: true,
    isActive: true,
    sortOrder: 2,
  },
];

export default function AdminCredentialsManager() {
  const [credentials, setCredentials] = useState<CredentialItem[]>(initialCredentials);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CredentialItem>>({});
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleAddCredential = () => {
    const newItem: CredentialItem = {
      id: `cred-${Date.now()}`,
      name: 'New Compliance Credential',
      type: 'certification',
      description: 'Description of compliance verification standards...',
      isVerified: false,
      isActive: true,
      sortOrder: credentials.length + 1,
    };
    setCredentials([newItem, ...credentials]);
    setEditingId(newItem.id);
    setEditFormData(newItem);
  };

  const handleSave = (id: string) => {
    setCredentials(credentials.map((c: CredentialItem) => (c.id === id ? ({ ...c, ...editFormData } as CredentialItem) : c)));
    setEditingId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter((c: CredentialItem) => c.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Award className="w-4 h-4 text-accent shrink-0" />
            <span>Trust & Compliance Records</span>
          </div>
          <h1 className="text-display-sm font-bold text-brand-black">Verified Credentials Manager</h1>
          <p className="text-body-sm text-slate-600 mt-1">
            Manage business registrations, compliance certificates, and carrier network records. Unverified items are automatically gated from public display.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handleAddCredential}
          leftIcon={<Plus className="w-4 h-4 text-brand-black" />}
        >
          Add Credential Record
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Credential record updated successfully!</span>
        </div>
      )}

      {/* Credentials List */}
      <div className="space-y-4">
        {credentials.map((item: CredentialItem) => {
          const isEditing = editingId === item.id;

          return (
            <Card key={item.id} variant="light" className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-heading-sm font-bold text-brand-black">{item.name}</h3>
                    <Badge variant="navy">{item.type.toUpperCase()}</Badge>
                    <Badge variant={item.isVerified ? 'accent' : 'outline'}>
                      {item.isVerified ? 'Verified' : 'Unverified Draft'}
                    </Badge>
                  </div>
                  <p className="text-body-sm text-slate-600 font-normal">{item.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(isEditing ? null : item.id)}
                    leftIcon={<Edit className="w-3.5 h-3.5" />}
                  >
                    {isEditing ? 'Close' : 'Edit Record'}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    isIconOnly
                    onClick={() => handleDelete(item.id)}
                    aria-label="Delete credential"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Inline Edit Form */}
              {isEditing && (
                <div className="pt-4 border-t border-border space-y-4 bg-surface-subtle p-6 rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Credential Name"
                      value={editFormData.name ?? item.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      variantSurface="light"
                    />
                    <Select
                      label="Type"
                      value={editFormData.type ?? item.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as CredentialItem['type'] })}
                      variantSurface="light"
                    >
                      <option value="registration">Registration</option>
                      <option value="certification">Certification</option>
                      <option value="association">Association</option>
                      <option value="membership">Membership</option>
                      <option value="carrier_network">Carrier Network</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>

                  <Textarea
                    label="Description"
                    value={editFormData.description ?? item.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    variantSurface="light"
                  />

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editFormData.isVerified ?? item.isVerified}
                        onChange={(e) => setEditFormData({ ...editFormData, isVerified: e.target.checked })}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Mark as Verified Compliance Record</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-black cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editFormData.isActive ?? item.isActive}
                        onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Active for Public Display</span>
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button variant="accent" size="sm" onClick={() => handleSave(item.id)}>
                      Save Record
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
