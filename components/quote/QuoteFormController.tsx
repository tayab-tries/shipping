'use client';

import React, { useState, useRef } from 'react';
import { QuoteStep1Basics } from './QuoteStep1Basics';
import { QuoteStep2Details } from './QuoteStep2Details';
import { QuoteStep3Contact } from './QuoteStep3Contact';
import { QuoteSuccessView } from './QuoteSuccessView';
import { quoteSubmissionSchema } from '@/lib/quote/quote-validation';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export interface QuoteFormControllerProps {
  initialOrigin?: string;
  initialDestination?: string;
  initialCargo?: string;
  locations?: Array<{ name: string; slug: string }>;
  destinations?: Array<{ name: string; slug: string }>;
}

export const QuoteFormController: React.FC<QuoteFormControllerProps> = ({
  initialOrigin,
  initialDestination,
  initialCargo,
  locations = [],
  destinations = [],
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState<string>('');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    origin_city: initialOrigin || (locations[0]?.slug || 'lahore'),
    destination_country: initialDestination || (destinations[0]?.slug || 'uk'),
    destination_city: '',
    cargo_type: initialCargo || 'air_freight',
    estimated_weight_kg: '',
    package_count: '1',
    length_cm: '',
    width_cm: '',
    height_cm: '',
    cargo_description: '',
    sender_name: '',
    contact_preference: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
    sender_phone: '',
    sender_email: '',
    additional_notes: '',
    website_hp: '',
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev: Record<string, string>) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const focusFirstInvalidField = (errors: Record<string, string>) => {
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      const el = document.getElementById(firstKey);
      if (el) el.focus();
    }
  };

  const scrollAndFocusTop = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 1 Validation & Transition
  const handleStep1Next = () => {
    const errors: Record<string, string> = {};
    if (!formData.origin_city) errors.origin_city = 'Origin city is required.';
    if (!formData.destination_country) errors.destination_country = 'Destination country is required.';
    if (!formData.cargo_type) errors.cargo_type = 'Cargo type is required.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      focusFirstInvalidField(errors);
      return;
    }

    setFieldErrors({});
    setGlobalError(null);
    setStep(2);
    scrollAndFocusTop();
  };

  // Step 2 Validation & Transition
  const handleStep2Next = () => {
    const errors: Record<string, string> = {};
    const weightNum = parseFloat(formData.estimated_weight_kg);
    const countNum = parseInt(formData.package_count, 10);

    if (!formData.estimated_weight_kg || isNaN(weightNum) || weightNum < 0.5) {
      errors.estimated_weight_kg = 'Estimated weight must be at least 0.5 kg.';
    }
    if (!formData.package_count || isNaN(countNum) || countNum < 1) {
      errors.package_count = 'Package count must be at least 1.';
    }
    if (!formData.cargo_description || formData.cargo_description.trim().length < 5) {
      errors.cargo_description = 'Cargo description must be at least 5 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      focusFirstInvalidField(errors);
      return;
    }

    setFieldErrors({});
    setGlobalError(null);
    setStep(3);
    scrollAndFocusTop();
  };

  // Final Step 3 Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    // Prepare numeric payload for Zod validation
    const payload = {
      origin_city: formData.origin_city,
      destination_country: formData.destination_country,
      destination_city: formData.destination_city || undefined,
      cargo_type: formData.cargo_type as 'air_freight' | 'sea_cargo' | 'door_to_door' | 'commercial_freight' | 'excess_baggage',
      estimated_weight_kg: parseFloat(formData.estimated_weight_kg) || 0,
      package_count: parseInt(formData.package_count, 10) || 1,
      length_cm: formData.length_cm ? parseInt(formData.length_cm, 10) : undefined,
      width_cm: formData.width_cm ? parseInt(formData.width_cm, 10) : undefined,
      height_cm: formData.height_cm ? parseInt(formData.height_cm, 10) : undefined,
      cargo_description: formData.cargo_description,
      sender_name: formData.sender_name,
      contact_preference: formData.contact_preference,
      sender_phone: formData.sender_phone || undefined,
      sender_email: formData.sender_email || undefined,
      additional_notes: formData.additional_notes || undefined,
      website_hp: formData.website_hp || undefined,
      source_page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    };

    // Client-side Zod validation pass
    const parseResult = quoteSubmissionSchema.safeParse(payload);
    if (!parseResult.success) {
      const formattedErrors: Record<string, string> = {};
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      Object.entries(fieldErrors).forEach(([key, messages]) => {
        if (messages && messages[0]) {
          formattedErrors[key] = messages[0];
        }
      });

      setFieldErrors(formattedErrors);
      focusFirstInvalidField(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request. Please try again.');
      }

      setQuoteReference(data.quoteReference || 'QTE-REQUEST-RECEIVED');
      setIsSubmitted(true);
      scrollAndFocusTop();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred submitting your quote.';
      setGlobalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <QuoteSuccessView quoteReference={quoteReference} />;
  }

  return (
    <div ref={formContainerRef} className="w-full">
      {/* 65 / 35 Desktop Split (Form vs Supporting Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* MAIN QUOTE FORM CONTAINER (65% = 8 Cols) */}
        <div className="lg:col-span-8 bg-surface rounded-md border border-border p-6 lg:p-10 shadow-xs">
          
          {/* STEP PROGRESS INDICATOR */}
          <div className="mb-8 border-b border-border pb-6">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-semibold">
              <div
                className={`py-2.5 px-3 rounded border transition-colors ${
                  step === 1
                    ? 'bg-accent text-brand-black border-accent font-bold'
                    : step > 1
                    ? 'bg-surface-subtle text-brand-black border-border'
                    : 'bg-surface-subtle text-slate-400 border-border'
                }`}
              >
                <span className="block text-[10px] uppercase opacity-70">Step 01</span>
                <span className="truncate block">Shipment Basics</span>
              </div>

              <div
                className={`py-2.5 px-3 rounded border transition-colors ${
                  step === 2
                    ? 'bg-accent text-brand-black border-accent font-bold'
                    : step > 2
                    ? 'bg-surface-subtle text-brand-black border-border'
                    : 'bg-surface-subtle text-slate-400 border-border'
                }`}
              >
                <span className="block text-[10px] uppercase opacity-70">Step 02</span>
                <span className="truncate block">Specifications</span>
              </div>

              <div
                className={`py-2.5 px-3 rounded border transition-colors ${
                  step === 3
                    ? 'bg-accent text-brand-black border-accent font-bold'
                    : 'bg-surface-subtle text-slate-400 border-border'
                }`}
              >
                <span className="block text-[10px] uppercase opacity-70">Step 03</span>
                <span className="truncate block">Contact & Send</span>
              </div>
            </div>
          </div>

          {globalError && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded border border-red-200 text-sm font-medium">
              {globalError}
            </div>
          )}

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <QuoteStep1Basics
              formData={{
                origin_city: formData.origin_city,
                destination_country: formData.destination_country,
                destination_city: formData.destination_city,
                cargo_type: formData.cargo_type,
              }}
              locations={locations}
              destinations={destinations}
              errors={fieldErrors}
              onChange={(field, val) => handleFieldChange(field, val)}
              onNext={handleStep1Next}
            />
          )}

          {/* STEP 2: CARGO DETAILS */}
          {step === 2 && (
            <QuoteStep2Details
              formData={{
                estimated_weight_kg: formData.estimated_weight_kg,
                package_count: formData.package_count,
                length_cm: formData.length_cm,
                width_cm: formData.width_cm,
                height_cm: formData.height_cm,
                cargo_description: formData.cargo_description,
              }}
              errors={fieldErrors}
              onChange={(field, val) => handleFieldChange(field, val)}
              onNext={handleStep2Next}
              onBack={() => setStep(1)}
            />
          )}

          {/* STEP 3: CONTACT & SUBMISSION */}
          {step === 3 && (
            <QuoteStep3Contact
              formData={{
                sender_name: formData.sender_name,
                contact_preference: formData.contact_preference,
                sender_phone: formData.sender_phone,
                sender_email: formData.sender_email,
                additional_notes: formData.additional_notes,
                website_hp: formData.website_hp,
              }}
              errors={fieldErrors}
              isSubmitting={isSubmitting}
              onChange={(field, val) => handleFieldChange(field, val)}
              onSubmit={handleSubmit}
              onBack={() => setStep(2)}
            />
          )}
        </div>

        {/* SUPPORTING INFORMATION PANEL (35% = 4 Cols Desktop Only) */}
        <div className="lg:col-span-4 bg-surface-subtle rounded-md border border-border p-6 lg:p-8 space-y-6 shadow-2xs">
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>What You&apos;ll Provide</span>
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Origin City & Destination Country</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Cargo Type & Estimated Weight</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Contact Details (WhatsApp/Phone/Email)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-6 border-t border-border">
            <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>What Happens Next</span>
            </div>
            <ol className="space-y-2.5 text-xs font-mono text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-brand-black">1.</span>
                <span>Request details logged and assigned a reference ID.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-brand-black">2.</span>
                <span>Operations team evaluates cargo specs and route carrier rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-brand-black">3.</span>
                <span>Official quotation delivered via your preferred contact method.</span>
              </li>
            </ol>
          </div>

          <div className="pt-6 border-t border-border flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Freight Forwarding & Export Rate Dispatch</span>
          </div>
        </div>

      </div>
    </div>
  );
};
