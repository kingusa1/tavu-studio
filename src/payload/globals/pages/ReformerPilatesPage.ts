import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { link } from '../../fields/link';
import { seo } from '../../fields/seo';
import { serviceHero } from '../../fields/serviceHero';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';
import { overlayCardShort } from './_overlayCardShort';

/** `/services/reformer-pilates` (CMS-Content-Model.md §3.5 reformer-pilates-page, package C). */
export const ReformerPilatesPage: GlobalConfig = {
  slug: 'reformer-pilates-page',
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
        { label: 'Hero', fields: [serviceHero()] },
        {
          name: 'overview',
          label: 'Overview',
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'paragraphs',
              type: 'array',
              dbName: 'rpp_overview_para',
              fields: [{ name: 'text', type: 'textarea', admin: { description: 'Tokens allowed, e.g. {fact:reformer-capacity}.' } }],
            },
            {
              name: 'stats',
              type: 'array',
              maxRows: 2,
              fields: [
                { name: 'value', type: 'text', admin: { description: 'Tokens allowed, e.g. {fact:reformer-capacity}.' } },
                { name: 'label', type: 'text' },
              ],
            },
            link({ name: 'cta' }),
            overlayCardShort('rpp_overview_card_bul'),
          ],
        },
        {
          name: 'classes',
          label: 'Classes',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'cardCtaLabel', type: 'text' },
            { name: 'cardCtaHref', type: 'text' },
          ],
          admin: { description: 'Class cards below are the active Reformer classes.' },
        },
        {
          name: 'packages',
          label: 'Packages',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
          admin: {
            description:
              'Rows are the Reformer offers flagged "Show on Service Page". The CTA comes from Site Settings → Price cards.',
          },
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 1 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
