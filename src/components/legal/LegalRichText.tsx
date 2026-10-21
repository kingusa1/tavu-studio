import { NodeFormat } from '@payloadcms/richtext-lexical';
import type {
  DefaultNodeTypes,
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical';
import Link from 'next/link';
import { Fragment } from 'react';
import type { ReactNode } from 'react';

export type ContactCardData = {
  enabled?: boolean | null;
  organisationName?: string | null;
  addressLines?: Array<{ line?: string | null }> | null;
  showEmail?: boolean | null;
  showWhatsapp?: boolean | null;
  hoursNote?: string | null;
  /** Resolved values — the page passes these in from site-settings, §2.9. */
  email?: string | null;
  whatsappDisplay?: string | null;
  whatsappHref?: string | null;
};

export type LegalRichTextProps = {
  data: { root: { children: DefaultNodeTypes[] } } | null | undefined;
  contactCard?: ContactCardData | null;
};

function renderInline(nodes: DefaultNodeTypes[] | undefined): ReactNode {
  return (nodes ?? []).map((node, index) => <Fragment key={index}>{renderInlineNode(node)}</Fragment>);
}

function renderInlineNode(node: DefaultNodeTypes): ReactNode {
  switch (node.type) {
    case 'text': {
      const textNode = node as SerializedTextNode;
      let text: ReactNode = textNode.text;
      if (textNode.format & NodeFormat.IS_BOLD) text = <strong>{text}</strong>;
      if (textNode.format & NodeFormat.IS_ITALIC) text = <em>{text}</em>;
      return text;
    }
    case 'link': {
      const linkNode = node as SerializedLinkNode;
      const href = linkNode.fields?.url ?? '#';
      const children = renderInline(linkNode.children as DefaultNodeTypes[] | undefined);
      if (linkNode.fields?.newTab) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="underline hover:text-accent transition-colors">
          {children}
        </Link>
      );
    }
    case 'linebreak':
      return <br />;
    default:
      return null;
  }
}

function renderList(node: SerializedListNode, key: number): ReactNode {
  const items = (node.children ?? []) as SerializedListItemNode[];
  if (node.listType === 'number') {
    return (
      <ol key={key} className="list-disc list-inside space-y-2 pl-4">
        {items.map((item, i) => (
          <li key={i}>{renderInline(item.children as DefaultNodeTypes[] | undefined)}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul key={key} className="list-disc list-inside space-y-2 pl-4">
      {items.map((item, i) => (
        <li key={i}>{renderInline(item.children as DefaultNodeTypes[] | undefined)}</li>
      ))}
    </ul>
  );
}

function renderBlock(node: DefaultNodeTypes, key: number, options: { mt4: boolean; mb4: boolean }): ReactNode {
  switch (node.type) {
    case 'heading': {
      const heading = node as SerializedHeadingNode;
      if (heading.tag === 'h2') {
        return (
          <h2 key={key} className="text-2xl font-headline font-bold mb-4">
            {renderInline(heading.children as DefaultNodeTypes[] | undefined)}
          </h2>
        );
      }
      return (
        <h3 key={key} className="text-lg font-semibold mt-4 mb-2">
          {renderInline(heading.children as DefaultNodeTypes[] | undefined)}
        </h3>
      );
    }
    case 'paragraph': {
      const paragraph = node as SerializedParagraphNode;
      const classes = ['leading-relaxed', options.mt4 && 'mt-4', options.mb4 && 'mb-4'].filter(Boolean).join(' ');
      return (
        <p key={key} className={classes}>
          {renderInline(paragraph.children as DefaultNodeTypes[] | undefined)}
        </p>
      );
    }
    case 'list':
      return renderList(node as SerializedListNode, key);
    default:
      return null;
  }
}

/** Splits `root.children` into one chunk per `h2` heading — one chunk = one numbered section. */
function splitIntoSections(nodes: DefaultNodeTypes[]): DefaultNodeTypes[][] {
  const sections: DefaultNodeTypes[][] = [];
  for (const node of nodes) {
    if (node.type === 'heading' && (node as SerializedHeadingNode).tag === 'h2') {
      sections.push([node]);
      continue;
    }
    if (sections.length === 0) {
      sections.push([node]);
    } else {
      sections[sections.length - 1]!.push(node);
    }
  }
  return sections;
}

/**
 * Lexical output is flat (h2, p, h3, ul …); today each numbered part of the Terms/Privacy
 * pages is its own `<section>` inside `div.space-y-8` (CMS-Content-Model.md §5.6). This
 * renderer reconstructs that: splits at every `h2`, renders each chunk as a `<section>` with
 * the legacy classes applied verbatim, and appends `contactCard` inside the last section —
 * exactly where today's hand-written JSX puts it (terms:303-320, privacy:207-222).
 */
export default function LegalRichText({ data, contactCard }: LegalRichTextProps): ReactNode {
  const nodes = data?.root?.children ?? [];
  const sections = splitIntoSections(nodes);

  return (
    <div className="space-y-8 text-primary/90">
      {sections.map((section, sectionIndex) => {
        const isLastSection = sectionIndex === sections.length - 1;
        return (
          <section key={sectionIndex}>
            {section.map((node, nodeIndex) => {
              const prev = section[nodeIndex - 1];
              const next = section[nodeIndex + 1];
              const isLastNode = nodeIndex === section.length - 1;
              const mt4 = node.type === 'paragraph' && prev?.type === 'paragraph';
              const mb4 =
                node.type === 'paragraph' &&
                (next?.type === 'list' || (isLastSection && isLastNode && Boolean(contactCard?.enabled)));
              return renderBlock(node, nodeIndex, { mt4, mb4 });
            })}
            {isLastSection && contactCard?.enabled && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <p className="font-semibold">{contactCard.organisationName}</p>
                {(contactCard.addressLines ?? []).map((line, i) => (
                  <p key={i} className={i === 0 ? 'mt-2' : undefined}>
                    {line?.line}
                  </p>
                ))}
                {contactCard.showEmail && contactCard.email && (
                  <p className="mt-4">
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${contactCard.email}`} className="underline hover:text-accent transition-colors">
                      {contactCard.email}
                    </a>
                  </p>
                )}
                {contactCard.showWhatsapp && contactCard.whatsappDisplay && (
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a href={contactCard.whatsappHref ?? '#'} className="underline hover:text-accent transition-colors">
                      {contactCard.whatsappDisplay}
                    </a>
                  </p>
                )}
                {contactCard.hoursNote && <p className="mt-4 text-sm text-muted-foreground">{contactCard.hoursNote}</p>}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
