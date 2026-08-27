import React from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { FormLabel, FormHint, FormError } from './FormControls';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, hint, error, options, placeholder, id, required, disabled, ...props },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <FormLabel htmlFor={selectId} required={required}>
            {label}
          </FormLabel>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={clsx(
              'w-full bg-surface text-foreground text-sm font-normal rounded-md border border-border px-3.5 py-2.5 pr-10 appearance-none transition-colors duration-150 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'disabled:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60',
              {
                'border-danger focus:ring-danger': Boolean(error),
              },
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled selected hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 text-muted-foreground pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? <FormError>{error}</FormError> : hint ? <FormHint>{hint}</FormHint> : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
