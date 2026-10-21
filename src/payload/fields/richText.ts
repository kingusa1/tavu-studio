import {
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

export type RichTextPreset = 'inline' | 'legal' | 'post';

/**
 * A Lexical field scoped to one of three feature presets (§4.2, §5.6):
 * - `inline`: bold/italic/link inside a single paragraph (e.g. home About's body).
 * - `legal`: adds headings (h2/h3) and lists, for the Terms/Privacy pages.
 * - `post`: adds headings/lists plus quotes and inline images, for blog post bodies (package E,
 *   brief §A). The only preset that allows an upload node.
 */
export function richTextField(name: string, preset: RichTextPreset, overrides?: Partial<Field>): Field {
  const features =
    preset === 'legal'
      ? [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          LinkFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
        ]
      : preset === 'post'
        ? [
            ParagraphFeature(),
            BoldFeature(),
            ItalicFeature(),
            LinkFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
            UnorderedListFeature(),
            OrderedListFeature(),
            BlockquoteFeature(),
            UploadFeature({ collections: { media: { fields: [] } } }),
          ]
        : [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature()];

  return {
    name,
    type: 'richText',
    editor: lexicalEditor({ features: () => features }),
    ...overrides,
  } as Field;
}
