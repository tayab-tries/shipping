'use client';

import React, { useState, useEffect } from 'react';
import { QuoteStep1Basics } from './QuoteStep1Basics';
import { QuoteStep2Details } from './QuoteStep2Details';
import { QuoteStep3Contact } from './QuoteStep3Contact';
import { QuoteSuccessView } from './QuoteSuccessView';

export interface QuoteFormControllerProps {
  initialOrigin?: string;
  initialDestination?: string;
  initialCargo?: string;
  locations: Array<{ name: string; slug: string }>;
  destinations: Array<{ name: string; slug: string }>;
}

export const QuoteFormController: React.FC<QuoteFormControllerProps> = ({
  initialOrigin = '',
  initialDestination = '',
  initialCargo = 'air_freight',
  locations,
  destinations,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedReference, setSubmittedReference] = useState<string>('');

  const [formData, setFormData] = useState({
    origin_city: initialOrigin,
    destination_country: initialDestination,
    destination_city: '',
    cargo_type: initialCargo,
    estimated_weight_kg: 10,
    package_count: 1,
    length_cm: undefined as number | undefined,
    width_cm: undefined as number | undefined,
    height_cm: undefined as number | undefined,
    cargo_description: '',
    sender_name: '',
    contact_preference: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
    sender_phone: '',
    sender_email: '',
    additional_notes: '',
    website_hp: '',
  });

  // Focus management between steps
  useEffect(() => {
    const headingId = `step-heading-${step}`;
    const headingElem = document.getElementById(headingId);
    if (headingElem) {
      headingElem.focus();
    }
  }, [step]);

  const handleChange = (field: string, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.origin_city) errs.origin_city = 'Origin city is required.';
    if (!formData.destination_country) errs.destination_country = 'Destination country is required.';
    if (!formData.cargo_type) errs.cargo_type = 'Cargo service type is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.estimated_weight_kg || formData.estimated_weight_kg < 0.5) {
      errs.estimated_weight_kg = 'Estimated weight must be at least 0.5 kg.';
    }
    if (!formData.package_count || formData.package_count < 1) {
      errs.package_count = 'Package count must be at least 1.';
    }
    if (!formData.cargo_description || formData.cargo_description.trim().length < 5) {
      errs.cargo_description = 'Cargo description must be at least 5 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep1 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleNextStep2 = () => {
    if (validateStep2()) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.details) {
          const formattedErrs: Record<string, string> = {};
          Object.keys(json.details).forEach((k) => {
            formattedErrs[k] = json.details[k][0];
          });
          setErrors(formattedErrs);
        } else {
          setErrors({ form: json.error || 'Submission failed. Please check your information.' });
        }
        setIsSubmitting(false);
        return;
      }

      setSubmittedReference(json.quoteReference);
      setStep(4);
    } catch {
      setErrors({ form: 'Network error. Please try again or contact support.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 4) {
    return (
      <QuoteSuccessView
        quoteReference={submittedReference}
        senderName={formData.sender_name}
        originCity={formData.origin_city}
        destinationCountry={formData.destination_country}
      />
    );
  }

  return (
    <div className="bg-surface p-6 sm:p-8 lg:p-10 rounded-md border border-border space-y-8 shadow-xs">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground">
          <span>Step {step} of 3</span>
          <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'}</span>
        </div>
        <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-secondary transition-all duration-300"
            style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          />
        </div>
      </div>

      {errors.form && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
          {errors.form}
        </div>
      )}

      {step === 1 && (
        <QuoteStep1Basics
          data={formData}
          onChange={handleChange}
          onNext={handleNextStep1}
          errors={errors}
          locations={locations}
          destinations={destinations}
        />
      )}

      {step === 2 && (
        <QuoteStep2Details
          data={formData}
          onChange={handleChange}
          onNext={handleNextStep2}
          onBack={() => setStep(1)}
          errors={errors}
        />
      )}

      {step === 3 && (
        <QuoteStep3Contact
          data={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      )}
    </div>
  );
};
