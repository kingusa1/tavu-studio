import type { GlobalConfig } from 'payload';

import { ctaSection, seo } from '../../fields';
import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/pricing` (CMS-Content-Model.md §3.5 pricing-page, package B). */
export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  admin: { group: 'Pages' },
  access: {
    read: authenticated,
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
        {
          name: 'header',
          label: 'Header',
          fields: [
            { name: 'title', type: 'text', admin: { description: 'The H1, e.g. "Choose Your Rhythm".' } },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          name: 'cards',
          label: 'Cards',
          admin: { description: 'Card titles, subtitles and CTAs come from Site Settings → Price cards. Rows come from Offers and the Massage Menu.' },
          fields: [
            { name: 'compressionBenefitsHeading', type: 'text', defaultValue: 'Benefits:' },
            { name: 'compressionRecommendedHeading', type: 'text', defaultValue: 'Recommended for:' },
          ],
        },
        {
          name: 'memberships',
          label: 'Memberships',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true },
            { name: 'heading', type: 'text', defaultValue: 'Memberships' },
          ],
        },
        { label: 'CTA', fields: [ctaSection()] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
