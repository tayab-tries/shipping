import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface QuoteStep2Data {
  estimated_weight_kg: number;
  package_count: number;
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
  cargo_description: string;
}

export interface QuoteStep2DetailsProps {
  data: QuoteStep2Data;
  onChange: (field: keyof QuoteStep2Data, value: string | number | undefined) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export const QuoteStep2Details: React.FC<QuoteStep2DetailsProps> = ({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 id="step-heading-2" tabIndex={-1} className="text-heading-md font-bold text-foreground focus:outline-none">
          Step 2: Cargo Specifications
        </h2>
        <p className="text-body-sm text-muted-foreground">
          Provide estimated weight, dimensions, and a brief description of your items.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Estimated Weight */}
        <div className="space-y-2">
          <label htmlFor="estimated_weight_kg" className="block text-xs font-mono font-semibold text-foreground">
            Estimated Gross Weight (kg) <span className="text-red-500">*</span>
          </label>
          <input
            id="estimated_weight_kg"
            type="number"
            step="0.5"
            min="0.5"
            value={data.estimated_weight_kg || ''}
            onChange={(e) => onChange('estimated_weight_kg', parseFloat(e.target.value) || 0)}
            aria-describedby={errors.estimated_weight_kg ? 'error-weight' : undefined}
            placeholder="e.g. 25"
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.estimated_weight_kg && (
            <p id="error-weight" className="text-xs font-semibold text-red-500">
              {errors.estimated_weight_kg}
            </p>
          )}
        </div>

        {/* Package Count */}
        <div className="space-y-2">
          <label htmlFor="package_count" className="block text-xs font-mono font-semibold text-foreground">
            Number of Boxes / Packages <span className="text-red-500">*</span>
          </label>
          <input
            id="package_count"
            type="number"
            min="1"
            value={data.package_count || 1}
            onChange={(e) => onChange('package_count', parseInt(e.target.value, 10) || 1)}
            aria-describedby={errors.package_count ? 'error-package_count' : undefined}
            className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.package_count && (
            <p id="error-package_count" className="text-xs font-semibold text-red-500">
              {errors.package_count}
            </p>
          )}
        </div>
      </div>

      {/* Structured Dimensions (Optional) */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-semibold text-foreground">
          Package Dimensions L x W x H (cm) <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <input
              type="number"
              min="1"
              placeholder="Length (cm)"
              value={data.length_cm || ''}
              onChange={(e) => onChange('length_cm', parseInt(e.target.value, 10) || undefined)}
              className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="number"
              min="1"
              placeholder="Width (cm)"
              value={data.width_cm || ''}
              onChange={(e) => onChange('width_cm', parseInt(e.target.value, 10) || undefined)}
              className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="number"
              min="1"
              placeholder="Height (cm)"
              value={data.height_cm || ''}
              onChange={(e) => onChange('height_cm', parseInt(e.target.value, 10) || undefined)}
              className="w-full h-11 px-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Cargo Description */}
      <div className="space-y-2">
        <label htmlFor="cargo_description" className="block text-xs font-mono font-semibold text-foreground">
          Cargo Itemization / Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cargo_description"
          rows={4}
          value={data.cargo_description}
          onChange={(e) => onChange('cargo_description', e.target.value)}
          aria-describedby={errors.cargo_description ? 'error-description' : undefined}
          placeholder="e.g. 3 boxes of clothes, personal effects, commercial garment samples, or household kitchenware"
          className="w-full p-3 rounded-md border border-border bg-surface text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {errors.cargo_description && (
          <p id="error-description" className="text-xs font-semibold text-red-500">
            {errors.cargo_description}
          </p>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Next: Contact Info
        </Button>
      </div>
    </div>
  );
};
