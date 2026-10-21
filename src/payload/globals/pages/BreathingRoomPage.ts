import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { link } from '../../fields/link';
import { seo } from '../../fields/seo';
import { serviceHero } from '../../fields/serviceHero';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';
import { overlayCardShort } from './_overlayCardShort';

/** `/services/breathing-room` (CMS-Content-Model.md §3.5 breathing-room-page, package C). */
export const BreathingRoomPage: GlobalConfig = {
  slug: 'breathing-room-page',
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
              dbName: 'brp_overview_para',
              fields: [{ name: 'text', type: 'textarea' }],
            },
            {
              name: 'stats',
              type: 'array',
              maxRows: 2,
              admin: {
                description:
                  'The "11" stat is seeded as text, not auto-counted — the owner may prefer "10+" style copy as classes change.',
              },
              fields: [
                { name: 'value', type: 'text' },
                { name: 'label', type: 'text' },
              ],
            },
            link({ name: 'cta' }),
            overlayCardShort('brp_overview_card_bul'),
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
          admin: { description: 'Class cards below are the active Breathing Room classes.' },
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
              'Rows are the Breathing Room offers flagged "Show on Service Page". The Unlimited 3-Month Membership feature card (when active) renders after the grid. The CTA comes from Site Settings → Price cards.',
          },
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 1 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
