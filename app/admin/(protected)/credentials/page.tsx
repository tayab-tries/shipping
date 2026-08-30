'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Award, Edit, CheckCircle2, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { getCredentialsListAction, saveAndPublishCredentialAction, CredentialItemInput } from './actions';

export default function AdminCredentialsManager() {
  const [credentials, setCredentials] = useState<CredentialItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCred, setEditingCred] = useState<CredentialItemInput | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadCreds() {
      try {
        const res = await getCredentialsListAction();
        if (res.success && res.data) {
          setCredentials(res.data as CredentialItemInput[]);
        }
      } catch (err: unknown) {
        console.error('Failed to load credentials:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCreds();
  }, []);

  const handleAddCredential = () => {
    setEditingCred({
      title: 'New Compliance Credential',
      issuing_authority: 'Customs / Industry Body',
      license_number: '',
      verification_url: '',
      badge_image_url: '',
      display_order: credentials.length + 1,
      is_verified: true,
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCred) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveAndPublishCredentialAction(editingCred);
      if (res.success) {
        if (res.warning) {
          setStatusMessage({ type: 'warning', text: res.warning });
        } else {
          setStatusMessage({
            type: 'success',
            text: res.deployHookTriggered
              ? 'Credential published! Cloudflare production build triggered successfully.'
              : 'Credential saved and snapshot recorded in database.',
          });
        }
        const refresh = await getCredentialsListAction();
        if (refresh.success && refresh.data) {
          setCredentials(refresh.data as CredentialItemInput[]);
        }
        setEditingCred(null);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save credential.' });
      }
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error publishing credential.' });
    } finally {
      setSaving(false);
    }
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

      {editingCred ? (
        <Card variant="light" className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-heading-sm font-bold text-brand-black uppercase font-mono">
              {editingCred.id ? `Edit Credential: ${editingCred.title}` : 'Add New Credential Record'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setEditingCred(null)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Credential Title"
                value={editingCred.title}
                onChange={(e) => setEditingCred({ ...editingCred, title: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Issuing Authority"
                value={editingCred.issuing_authority}
                onChange={(e) => setEditingCred({ ...editingCred, issuing_authority: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="License / Registration Number"
                value={editingCred.license_number || ''}
                onChange={(e) => setEditingCred({ ...editingCred, license_number: e.target.value })}
                variantSurface="light"
              />
              <Input
                label="Verification URL"
                value={editingCred.verification_url || ''}
                onChange={(e) => setEditingCred({ ...editingCred, verification_url: e.target.value })}
                variantSurface="light"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" size="md" onClick={() => setEditingCred(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={saving}
                leftIcon={saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-brand-black" />}
              >
                {saving ? 'Publishing...' : 'Save & Publish Credential'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              Loading credentials from Supabase...
            </div>
          ) : credentials.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No credential records created in Supabase database yet.
            </div>
          ) : (
            credentials.map((item) => (
              <Card key={item.id || item.title} variant="light" className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-heading-sm font-bold text-brand-black">{item.title}</h3>
                      <Badge variant={item.is_verified ? 'accent' : 'outline'}>
                        {item.is_verified ? 'Verified' : 'Unverified Draft'}
                      </Badge>
                    </div>
                    <p className="text-body-sm text-slate-600 font-normal">
                      Issued by: <strong className="text-brand-black">{item.issuing_authority}</strong>
                      {item.license_number ? ` • License #${item.license_number}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCred(item)}
                      leftIcon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit Record
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
