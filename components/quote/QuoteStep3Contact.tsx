import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Send } from 'lucide-react';

export interface QuoteStep3Data {
  sender_name: string;
  contact_preference: 'whatsapp' | 'phone' | 'email';
  sender_phone?: string;
  sender_email?: string;
  additional_notes?: string;
  website_hp?: string;
}

export interface QuoteStep3ContactProps {
  data: QuoteStep3Data;
  onChange: (field: keyof QuoteStep3Data, value: string | undefined) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export const QuoteStep3Contact: React.FC<QuoteStep3ContactProps> = ({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 id="step-heading-3" tabIndex={-1} className="text-heading-md font-bold text-foreground focus:outline-none">
          Step 3: Contact & Submission
        </h2>
        <p className="text-body-sm text-muted-foreground">
          Provide your details so our operations team can send your custom quotation.
        </p>
      </div>

      {/* Hidden Honeypot Field */}
      <input
        type="text"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        value={data.website_hp || ''}
        onChange={(e) => onChange('website_hp', e.target.value)}
        className="hidden opacity-0 w-0 h-0 pointer-events-none absolute"
      />

      <div className="space-y-4">
        {/* Sender Name */}
        <div className="space-y-2">
          <label htmlFor="sender_name" className="block text-xs font-mono font-semibold text-foreground">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="sender_name"
            type="text"
            required
            value={data.sender_name}
            onChange={(e) => onChange('sender_name', e.target.value)}
            aria-describedby={errors.sender_name ? 'error-name' : undefined}
            placeholder="e.g. Muhammad Ali"
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.sender_name && (
            <p id="error-name" className="text-xs font-semibold text-red-500">
              {errors.sender_name}
            </p>
          )}
        </div>

        {/* Contact Preference */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold text-foreground">
            Preferred Contact Method <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['whatsapp', 'phone', 'email'] as const).map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => onChange('contact_preference', pref)}
                className={`py-2.5 px-3 rounded-md border text-center text-xs font-semibold uppercase transition-colors ${
                  data.contact_preference === pref
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border bg-surface text-foreground hover:border-border-strong'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Phone / WhatsApp Number */}
        <div className="space-y-2">
          <label htmlFor="sender_phone" className="block text-xs font-mono font-semibold text-foreground">
            Phone / WhatsApp Number{' '}
            {data.contact_preference !== 'email' && <span className="text-red-500">*</span>}
          </label>
          <input
            id="sender_phone"
            type="tel"
            value={data.sender_phone || ''}
            onChange={(e) => onChange('sender_phone', e.target.value)}
            aria-describedby={errors.sender_phone ? 'error-phone' : undefined}
            placeholder="e.g. +92 300 1234567"
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.sender_phone && (
            <p id="error-phone" className="text-xs font-semibold text-red-500">
              {errors.sender_phone}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="sender_email" className="block text-xs font-mono font-semibold text-foreground">
            Email Address{' '}
            {data.contact_preference === 'email' ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="text-muted-foreground font-normal">(Optional)</span>
            )}
          </label>
          <input
            id="sender_email"
            type="email"
            value={data.sender_email || ''}
            onChange={(e) => onChange('sender_email', e.target.value)}
            aria-describedby={errors.sender_email ? 'error-email' : undefined}
            placeholder="e.g. name@example.com"
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.sender_email && (
            <p id="error-email" className="text-xs font-semibold text-red-500">
              {errors.sender_email}
            </p>
          )}
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <label htmlFor="additional_notes" className="block text-xs font-mono font-semibold text-foreground">
            Additional Instructions / Pickup Notes <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <textarea
            id="additional_notes"
            rows={3}
            value={data.additional_notes || ''}
            onChange={(e) => onChange('additional_notes', e.target.value)}
            placeholder="Any specific delivery constraints or special handling requirements..."
            className="w-full p-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="pt-4 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          disabled={isSubmitting}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </Button>
      </div>
    </form>
  );
};
