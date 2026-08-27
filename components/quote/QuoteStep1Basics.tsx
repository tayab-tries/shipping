import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Plane, Ship, Truck, Package, Globe } from 'lucide-react';
import { cargoTypes } from '@/types/content';

export interface QuoteStep1Data {
  origin_city: string;
  destination_country: string;
  destination_city?: string;
  cargo_type: string;
}

export interface QuoteStep1BasicsProps {
  data: QuoteStep1Data;
  onChange: (field: keyof QuoteStep1Data, value: string) => void;
  onNext: () => void;
  errors: Record<string, string>;
  locations: Array<{ name: string; slug: string }>;
  destinations: Array<{ name: string; slug: string }>;
}

export const QuoteStep1Basics: React.FC<QuoteStep1BasicsProps> = ({
  data,
  onChange,
  onNext,
  errors,
  locations,
  destinations,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 id="step-heading-1" tabIndex={-1} className="text-heading-md font-bold text-foreground focus:outline-none">
          Step 1: Shipment Basics
        </h2>
        <p className="text-body-sm text-muted-foreground">
          Select your origin city in Pakistan, destination country, and primary cargo type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin City Select */}
        <div className="space-y-2">
          <label htmlFor="origin_city" className="block text-xs font-mono font-semibold text-foreground">
            Origin Collection City <span className="text-red-500">*</span>
          </label>
          <select
            id="origin_city"
            value={data.origin_city}
            onChange={(e) => onChange('origin_city', e.target.value)}
            aria-describedby={errors.origin_city ? 'error-origin_city' : undefined}
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">-- Select Origin City --</option>
            {locations.map((loc) => (
              <option key={loc.slug} value={loc.slug}>
                {loc.name}
              </option>
            ))}
            <option value="other">Other Pakistan City</option>
          </select>
          {errors.origin_city && (
            <p id="error-origin_city" className="text-xs font-semibold text-red-500">
              {errors.origin_city}
            </p>
          )}
        </div>

        {/* Destination Country Select */}
        <div className="space-y-2">
          <label htmlFor="destination_country" className="block text-xs font-mono font-semibold text-foreground">
            Destination Country <span className="text-red-500">*</span>
          </label>
          <select
            id="destination_country"
            value={data.destination_country}
            onChange={(e) => onChange('destination_country', e.target.value)}
            aria-describedby={errors.destination_country ? 'error-destination_country' : undefined}
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">-- Select Destination Country --</option>
            {destinations.map((dest) => (
              <option key={dest.slug} value={dest.slug}>
                {dest.name}
              </option>
            ))}
            <option value="other">Other Destination</option>
          </select>
          {errors.destination_country && (
            <p id="error-destination_country" className="text-xs font-semibold text-red-500">
              {errors.destination_country}
            </p>
          )}
        </div>
      </div>

      {/* Sub-Destination City (Optional) */}
      <div className="space-y-2">
        <label htmlFor="destination_city" className="block text-xs font-mono font-semibold text-foreground">
          Destination City / Postal Area <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <input
          id="destination_city"
          type="text"
          value={data.destination_city || ''}
          onChange={(e) => onChange('destination_city', e.target.value)}
          placeholder="e.g. London, Dubai, New York, Toronto"
          className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Cargo Type Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-mono font-semibold text-foreground">
          Cargo Service Type <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cargoTypes.map((type) => {
            const isSelected = data.cargo_type === type;
            const labels: Record<string, string> = {
              air_freight: 'Air Freight Express',
              sea_cargo: 'Ocean Sea Cargo',
              door_to_door: 'Door-to-Door Cargo',
              commercial_freight: 'Commercial Freight',
              excess_baggage: 'Excess Baggage',
            };
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange('cargo_type', type)}
                className={`p-3 rounded-md border text-left transition-colors flex items-center gap-3 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-surface hover:border-border-strong text-foreground'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0">
                  {type === 'air_freight' && <Plane className="w-4 h-4 text-secondary" />}
                  {type === 'sea_cargo' && <Ship className="w-4 h-4 text-secondary" />}
                  {type === 'door_to_door' && <Truck className="w-4 h-4 text-secondary" />}
                  {type === 'commercial_freight' && <Globe className="w-4 h-4 text-secondary" />}
                  {type === 'excess_baggage' && <Package className="w-4 h-4 text-secondary" />}
                </div>
                <span className="text-xs font-medium">{labels[type]}</span>
              </button>
            );
          })}
        </div>
        {errors.cargo_type && (
          <p className="text-xs font-semibold text-red-500">{errors.cargo_type}</p>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Next: Cargo Details
        </Button>
      </div>
    </div>
  );
};
