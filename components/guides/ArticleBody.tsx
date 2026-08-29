import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

export interface ArticleBodyProps {
  contentMarkdown: string;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ contentMarkdown }) => {
  if (!contentMarkdown) return null;

  return (
    <div className="prose max-w-prose text-brand-black leading-relaxed font-normal space-y-6">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-display-sm sm:text-3xl font-extrabold text-brand-black pt-6 pb-2 border-b border-border tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-heading-xl font-bold text-brand-black pt-8 pb-2 border-b border-border tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-heading-lg font-bold text-brand-black pt-6 pb-2 tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-body-lg text-slate-700 leading-[1.75] font-normal my-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2.5 my-4 pl-4 list-disc text-body-md text-slate-700 font-normal">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2.5 my-4 pl-4 list-decimal text-body-md text-slate-700 font-normal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          table: ({ children }) => (
            <div className="w-full overflow-x-auto my-8 border border-border rounded-md shadow-xs">
              <table className="w-full text-left text-xs font-mono border-collapse min-w-[500px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-subtle border-b border-border uppercase font-bold text-slate-700">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3.5 border-r border-border last:border-r-0">{children}</th>
          ),
          td: ({ children }) => (
            <td className="p-3.5 border-t border-border border-r border-border last:border-r-0 text-slate-700 bg-surface">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-brand-black">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-4 italic text-slate-700 bg-surface-subtle p-4 rounded-r my-6">
              {children}
            </blockquote>
          ),
        }}
      >
        {contentMarkdown}
      </ReactMarkdown>
    </div>
  );
};
