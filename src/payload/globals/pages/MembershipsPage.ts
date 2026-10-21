import type { GlobalConfig } from 'payload';

import { ctaSection, image, seo } from '../../fields';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/memberships` (CMS-Content-Model.md §3.5 memberships-page, package B). */
export const MembershipsPage: GlobalConfig = {
  slug: 'memberships-page',
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
        {
          name: 'hero',
          label: 'Hero',
          fields: [image({ name: 'image' }), { name: 'title', type: 'text' }, { name: 'intro', type: 'textarea' }],
        },
        {
          name: 'tiers',
          label: 'Tiers',
          admin: { description: 'Tiers come from Offers, category Membership.' },
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Tiers' },
            { name: 'heading', type: 'text', defaultValue: 'Membership Options' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
        },
        { label: 'CTA', fields: [ctaSection()] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
