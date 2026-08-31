import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

export interface QuoteStep1Data {
  origin_city: string;
  destination_country: string;
  destination_city?: string;
  cargo_type: string;
}

export interface QuoteStep1BasicsProps {
  formData: QuoteStep1Data;
  locations: Array<{ name: string; slug: string }>;
  destinations: Array<{ name: string; slug: string }>;
  errors?: Record<string, string>;
  onChange: (field: keyof QuoteStep1Data, value: string) => void;
  onNext: () => void;
}

export const QuoteStep1Basics: React.FC<QuoteStep1BasicsProps> = ({
  formData,
  locations = [],
  destinations = [],
  errors = {},
  onChange,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="quote-step-1-form">
      <div className="space-y-1 border-b border-border pb-4">
        <h2 className="text-heading-lg font-bold text-brand-black flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <span>Step 1: Shipment Basics</span>
        </h2>
        <p className="text-body-sm text-slate-600">
          Specify your cargo origin hub in Pakistan, target destination market, and cargo type.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select
          label="Origin City (Pakistan)"
          id="origin_city"
          name="origin_city"
          value={formData.origin_city}
          onChange={(e) => onChange('origin_city', e.target.value)}
          error={errors.origin_city}
          required
          variantSurface="light"
        >
          {locations.map((loc) => (
            <option key={loc.slug} value={loc.slug}>
              {loc.name}
            </option>
          ))}
          <option value="other">Other Pakistan City</option>
        </Select>

        <Select
          label="Destination Country"
          id="destination_country"
          name="destination_country"
          value={formData.destination_country}
          onChange={(e) => onChange('destination_country', e.target.value)}
          error={errors.destination_country}
          required
          variantSurface="light"
        >
          {destinations.map((dest) => (
            <option key={dest.slug} value={dest.slug}>
              {dest.name}
            </option>
          ))}
          <option value="other">Other International Destination</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Destination City (Optional)"
          id="destination_city"
          name="destination_city"
          placeholder="e.g. London, Dubai, Toronto"
          value={formData.destination_city || ''}
          onChange={(e) => onChange('destination_city', e.target.value)}
          error={errors.destination_city}
          variantSurface="light"
        />

        <Select
          label="Cargo Type"
          id="cargo_type"
          name="cargo_type"
          value={formData.cargo_type}
          onChange={(e) => onChange('cargo_type', e.target.value)}
          error={errors.cargo_type}
          required
          variantSurface="light"
        >
          <option value="air_freight">Air Cargo Express</option>
          <option value="sea_cargo">Ocean Sea Cargo (FCL / LCL)</option>
          <option value="door_to_door">Door-to-Door Delivery</option>
          <option value="commercial_freight">Commercial Trade Cargo</option>
          <option value="excess_baggage">Excess Baggage & Personal Belongings</option>
        </Select>
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full sm:w-auto h-[46px]"
          rightIcon={<ArrowRight className="w-4 h-4 text-brand-black shrink-0" />}
        >
          Continue to Cargo Specifications
        </Button>
      </div>
    </form>
  );
};
