import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

export type RichTextPreset = 'inline' | 'legal';

/**
 * A Lexical field scoped to one of two feature presets (§4.2, §5.6):
 * - `inline`: bold/italic/link inside a single paragraph (e.g. home About's body).
 * - `legal`: adds headings (h2/h3) and lists, for the Terms/Privacy pages. No uploads or
 *   blocks in either preset — content stays renderable by the plain JSX converters.
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
      : [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature()];

  return {
    name,
    type: 'richText',
    editor: lexicalEditor({ features: () => features }),
    ...overrides,
  } as Field;
}
