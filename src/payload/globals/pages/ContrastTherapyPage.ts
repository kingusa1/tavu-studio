import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { link } from '../../fields/link';
import { iconSelect } from '../../fields/options';
import { seo } from '../../fields/seo';
import { serviceHero } from '../../fields/serviceHero';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';
import { overlayCardShort } from './_overlayCardShort';

/** `/services/contrast-therapy` (CMS-Content-Model.md §3.5 contrast-therapy-page, package C). */
export const ContrastTherapyPage: GlobalConfig = {
  slug: 'contrast-therapy-page',
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
              dbName: 'ctp_overview_para',
              fields: [{ name: 'text', type: 'textarea' }],
            },
            link({ name: 'cta' }),
            overlayCardShort('ctp_overview_card_bul'),
          ],
        },
        {
          name: 'benefits',
          label: 'Benefits',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [iconSelect('feature'), { name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }],
            },
          ],
        },
        {
          name: 'sessions',
          label: 'Sessions',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
          admin: { description: 'Rows are the Contrast offers flagged "Show on Service Page".' },
        },
        {
          name: 'membershipsNote',
          label: 'Memberships note',
          fields: [
            { name: 'prefix', type: 'text' },
            link({ name: 'link' }),
            { name: 'suffix', type: 'text' },
          ],
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 1 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
