import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface QuoteSuccessViewProps {
  quoteReference: string;
  senderName: string;
  originCity: string;
  destinationCountry: string;
}

export const QuoteSuccessView: React.FC<QuoteSuccessViewProps> = ({
  quoteReference,
  senderName,
  originCity,
  destinationCountry,
}) => {
  return (
    <div className="bg-surface p-8 lg:p-12 rounded-md border border-border text-center space-y-6 max-w-2xl mx-auto shadow-xs">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
          Submission Received
        </span>
        <h2 className="text-display-sm font-bold text-foreground">
          Thank You, {senderName}!
        </h2>
        <p className="text-body-md text-muted-foreground leading-relaxed">
          Your international shipping quote request has been recorded. Our operations team is reviewing your route ({originCity} to {destinationCountry}).
        </p>
      </div>

      <div className="bg-surface-subtle p-4 rounded-md border border-border font-mono text-sm space-y-1">
        <p className="text-xs text-muted-foreground uppercase">Your Reference Number</p>
        <p className="text-heading-sm font-extrabold text-primary select-all">
          {quoteReference}
        </p>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Please retain your reference number for future communication. Our team will get in touch using your preferred contact method.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full sm:w-auto">
            Return to Home
          </Button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Contact Operations
          </Button>
        </Link>
      </div>
    </div>
  );
};
