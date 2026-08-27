import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle } from 'lucide-react';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  className,
  children,
  required,
  ...props
}) => {
  return (
    <label
      className={clsx('block text-sm font-semibold text-foreground mb-1.5', className)}
      {...props}
    >
      {children}
      {required && <span className="text-danger ml-1" title="Required">*</span>}
    </label>
  );
};

export type FormHintProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormHint: React.FC<FormHintProps> = ({ className, children, ...props }) => {
  return (
    <p className={clsx('mt-1.5 text-xs text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};

export type FormErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormError: React.FC<FormErrorProps> = ({ className, children, ...props }) => {
  if (!children) return null;

  return (
    <p
      className={clsx(
        'mt-1.5 text-xs font-medium text-danger flex items-center gap-1',
        className
      )}
      role="alert"
      {...props}
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
};
