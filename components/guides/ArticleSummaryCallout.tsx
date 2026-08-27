import React from 'react';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface ArticleSummaryCalloutProps {
  excerpt: string;
}

export const ArticleSummaryCallout: React.FC<ArticleSummaryCalloutProps> = ({ excerpt }) => {
  if (!excerpt) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-8">
      <Container>
        <div className="bg-surface p-6 rounded-md border border-border space-y-2 shadow-2xs max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Executive Takeaway</span>
          </div>
          <p className="text-body-md font-medium text-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      </Container>
    </section>
  );
};
