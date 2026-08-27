import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface ArticleConsiderationsProps {
  containsRegulatoryClaims: boolean;
  verificationNotes?: string;
}

export const ArticleConsiderations: React.FC<ArticleConsiderationsProps> = ({
  containsRegulatoryClaims,
  verificationNotes,
}) => {
  if (!containsRegulatoryClaims || !verificationNotes) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-10">
      <Container>
        <div className="bg-surface p-6 rounded-md border border-border space-y-3 shadow-2xs max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Factual & Compliance Verification</span>
          </div>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            {verificationNotes}
          </p>
        </div>
      </Container>
    </section>
  );
};
