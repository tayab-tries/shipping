import React from 'react';
import { clsx } from 'clsx';
import { FormLabel, FormHint, FormError } from './FormControls';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      id,
      required,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <FormLabel htmlFor={inputId} required={required}>
            {label}
          </FormLabel>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground pointer-events-none shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={clsx(
              'w-full bg-surface text-foreground placeholder:text-muted-foreground text-sm font-normal rounded-md border border-border transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'disabled:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60',
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon,
                'px-3.5 py-2.5': !leftIcon,
                'border-danger focus:ring-danger': Boolean(error),
              },
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-muted-foreground shrink-0">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? <FormError>{error}</FormError> : hint ? <FormHint>{hint}</FormHint> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
