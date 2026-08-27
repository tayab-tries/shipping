import React from 'react';
import { clsx } from 'clsx';
import { FormLabel, FormHint, FormError } from './FormControls';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, required, disabled, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <FormLabel htmlFor={textareaId} required={required}>
            {label}
          </FormLabel>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          disabled={disabled}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={clsx(
            'w-full bg-surface text-foreground placeholder:text-muted-foreground text-sm font-normal rounded-md border border-border px-3.5 py-2.5 transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60 resize-y',
            {
              'border-danger focus:ring-danger': Boolean(error),
            },
            className
          )}
          {...props}
        />
        {error ? <FormError>{error}</FormError> : hint ? <FormHint>{hint}</FormHint> : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
