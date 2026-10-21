import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';

/**
 * The `/about` page (CMS-Content-Model.md §3.5 `about-page`, package A). Structured fields are
 * used instead of rich text on purpose — every paragraph of the journey copy has its own style.
 */
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    group: 'Pages',
    description: 'The /about page — the studio\'s story.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            image(),
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text', required: true },
            { name: 'intro', type: 'textarea' },
            { name: 'tagline', type: 'text' },
          ],
        },
        {
          name: 'philosophy',
          label: 'Philosophy',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            {
              name: 'lines',
              type: 'array',
              admin: { description: 'Short lines under the heading, e.g. "TA is the grounding…".' },
              fields: [{ name: 'text', type: 'text' }],
            },
            {
              name: 'panels',
              type: 'array',
              minRows: 2,
              maxRows: 2,
              admin: { description: 'Exactly 2 panels — the TA and VU split cards.' },
              fields: [
                image(),
                { name: 'label', type: 'text', admin: { description: 'The large letters on the card, e.g. "TA".' } },
                { name: 'heading', type: 'text' },
                { name: 'text', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'journey',
          label: 'Journey',
          fields: [
            image(),
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'taLabel', type: 'text' },
            { name: 'taText', type: 'text' },
            { name: 'vuLabel', type: 'text' },
            { name: 'vuText', type: 'text' },
            { name: 'paragraph2', type: 'textarea' },
            { name: 'paragraph3', type: 'textarea' },
            { name: 'closingLine1', type: 'text' },
            { name: 'closingLine2', type: 'text' },
          ],
        },
        {
          name: 'gallery',
          label: 'Gallery',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'images',
              type: 'array',
              admin: { description: 'Studio photo grid.' },
              fields: [image()],
            },
          ],
        },
        { label: 'Closing CTA', fields: [ctaSection({ maxButtons: 2 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
