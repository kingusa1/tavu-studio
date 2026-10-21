import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { sectionHeader } from '../../fields/sectionHeader';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * The 4 partnership-type icons are still hard-coded JSX today (`src/app/(frontend)/partnerships/page.tsx`)
 * — `cmsIcons.tsx`'s shared `feature` set (CMS-Content-Model.md §3.5) is empty and also needed
 * by package C (contrast-therapy), so rather than edit that foundation file in parallel with
 * another package, this field stores its own local keys rendered by the page itself (reported
 * in the builder notes).
 */
const PARTNERSHIP_ICON_OPTIONS = [
  { label: 'Corporate Wellness', value: 'corporate' },
  { label: 'Sports & Athletics', value: 'sports' },
  { label: 'Hotels & Hospitality', value: 'hotels' },
  { label: 'Brand Collaborations', value: 'brand' },
];

/** `/partnerships` (CMS-Content-Model.md §3.5 partnerships-page, package D). */
export const PartnershipsPage: GlobalConfig = {
  slug: 'partnerships-page',
  admin: { group: 'Pages' },
  access: {
    read: authenticated,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
    beforeValidate: [validateTokensGlobal],
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
          name: 'types',
          label: 'Partnership Types',
          fields: [
            ...sectionHeader({ withIntro: false }),
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'icon', type: 'select', options: PARTNERSHIP_ICON_OPTIONS },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'features',
                  type: 'array',
                  maxRows: 4,
                  fields: [{ name: 'text', type: 'text' }],
                },
              ],
            },
          ],
        },
        {
          name: 'whyPartner',
          label: 'Why Partner',
          fields: [
            image({ name: 'image' }),
            ...sectionHeader({ withIntro: false }),
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              admin: { description: 'Numbered 1-4 automatically on the page (no icon).' },
              fields: [{ name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [ctaSection({ maxButtons: 1 }, { admin: { description: '"Let\'s Work Together" closing section.' } })],
        },
        {
          label: 'SEO',
          fields: [seo()],
        },
      ],
    },
  ],
};
