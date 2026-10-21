'use client';

import { NodeFormat } from '@payloadcms/richtext-lexical';
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type LexicalRichTextProps = ComponentProps<typeof LexicalRichText>;

export type RichTextPreset = 'inline' | 'legal' | 'post';

export type RichTextProps = {
  data: LexicalRichTextProps['data'];
  /** Matches the `richTextField(name, preset)` the data came from (§4.2). */
  preset?: RichTextPreset;
  /** Bold renders as `<span className={boldClassName}>` instead of `<strong>` when set (home About uses "text-primary font-medium", §3.5). */
  boldClassName?: string;
  className?: string;
};

function buildConverters(boldClassName?: string): JSXConvertersFunction {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    link: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      const href = node.fields.url ?? '#';
      if (node.fields.newTab) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={href}>{children}</Link>;
    },
    text: ({ node }) => {
      let text: ReactNode = node.text;
      if (node.format & NodeFormat.IS_BOLD) {
        text = boldClassName ? <span className={boldClassName}>{text}</span> : <strong>{text}</strong>;
      }
      if (node.format & NodeFormat.IS_ITALIC) {
        text = <em>{text}</em>;
      }
      return text;
    },
  });
}

/**
 * Shared Lexical → JSX renderer for both `richTextField` presets (§4.2). `legal` content
 * (headings/lists) renders through the same converters here — the Terms/Privacy page's
 * section-splitting layout is a separate component, `src/components/legal/LegalRichText.tsx`
 * (package D, §5.6), built on top of this one.
 */
export function RichText({ data, boldClassName, className, preset: _preset }: RichTextProps): ReactNode {
  return <LexicalRichText data={data} converters={buildConverters(boldClassName)} className={className} disableContainer />;
}
