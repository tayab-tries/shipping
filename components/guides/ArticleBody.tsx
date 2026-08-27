import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Container } from '@/components/ui/Container';

export interface ArticleBodyProps {
  contentMarkdown: string;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ contentMarkdown }) => {
  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <div className="max-w-4xl prose dark:prose-invert prose-slate text-foreground leading-relaxed">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {contentMarkdown}
          </ReactMarkdown>
        </div>
      </Container>
    </section>
  );
};
