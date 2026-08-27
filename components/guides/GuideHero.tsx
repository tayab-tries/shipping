import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface GuideHeroProps {
  title: string;
  category: string;
  authorName: string;
  publishedAt: string;
  readingTimeMinutes: number;
  breadcrumbs: Array<{ label: string; url: string }>;
}

export const GuideHero: React.FC<GuideHeroProps> = ({
  title,
  category,
  authorName,
  publishedAt,
  readingTimeMinutes,
  breadcrumbs,
}) => {
  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <div className="space-y-6 max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-4">
            <Badge variant="accent" size="md">
              {category.replace('-', ' ').toUpperCase()}
            </Badge>

            {/* Single H1 Heading */}
            <h1 className="text-display-xl text-primary font-extrabold tracking-tight leading-tight">
              {title}
            </h1>

            {/* Metadata Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-secondary" />
                {authorName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-secondary" />
                {publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary" />
                {readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
