import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { link } from '../../fields/link';
import { seo } from '../../fields/seo';
import { serviceHero } from '../../fields/serviceHero';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';
import { overlayCardShort } from './_overlayCardShort';

/** `/services/compression-therapy` (CMS-Content-Model.md §3.5 compression-therapy-page, package C). */
export const CompressionTherapyPage: GlobalConfig = {
  slug: 'compression-therapy-page',
  admin: { group: 'Pages' },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    beforeValidate: [validateTokensGlobal],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Hero', fields: [serviceHero()] },
        {
          name: 'overview',
          label: 'Overview',
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'paragraphs',
              type: 'array',
              dbName: 'cmp_overview_para',
              fields: [{ name: 'text', type: 'textarea' }],
            },
            link({ name: 'cta' }),
            overlayCardShort('cmp_overview_card_bul'),
          ],
        },
        {
          name: 'pricing',
          label: 'Pricing',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'benefitsHeading', type: 'text' },
            { name: 'recommendedHeading', type: 'text' },
            { name: 'individualCtaLabel', type: 'text' },
            { name: 'packCtaLabel', type: 'text' },
            { name: 'ctaHref', type: 'text' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
          admin: { description: 'The two big cards are the Compression offers flagged "Show on Service Page".' },
        },
        {
          name: 'pairWith',
          label: 'Pair with Contrast Therapy',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea', admin: { description: 'Tokens allowed, e.g. {price:compression-flush}.' } },
            link({ name: 'link' }),
          ],
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 1 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
