import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { link } from '../../fields/link';
import { iconSelect } from '../../fields/options';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * The 4 benefit icons and 3 quick-link icons are still hard-coded JSX today
 * (`src/app/(frontend)/register/page.tsx`) — `cmsIcons.tsx`'s shared `feature` set is empty
 * and also needed by package C, so (as for partnerships-page) these use local keys rendered
 * by the page itself rather than editing that foundation file in parallel (reported in the
 * builder notes). `trustBadges` below reuses the shared `trust` set — it already has the
 * exact 3 icons this page needs.
 */
const BENEFIT_ICON_OPTIONS = [
  { label: 'Instant Booking', value: 'instant-booking' },
  { label: 'Track Your Journey', value: 'track-journey' },
  { label: 'Manage Packages', value: 'manage-packages' },
  { label: 'Exclusive Access', value: 'exclusive-access' },
];

const QUICK_LINK_ICON_OPTIONS = [
  { label: 'Questions (FAQ)', value: 'faq' },
  { label: 'Schedule', value: 'schedule' },
  { label: 'About', value: 'about' },
];

/** `/register` (CMS-Content-Model.md §3.5 register-page, package D). */
export const RegisterPage: GlobalConfig = {
  slug: 'register-page',
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
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'intro', type: 'textarea' },
          ],
        },
        {
          name: 'benefits',
          label: 'Benefits',
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'icon', type: 'select', options: BENEFIT_ICON_OPTIONS },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'perks',
          label: 'Member Perks',
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'items',
              type: 'array',
              maxRows: 6,
              fields: [{ name: 'text', type: 'text' }],
            },
          ],
        },
        {
          name: 'formCard',
          label: 'Form Card',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'text' },
            { name: 'signInPrompt', type: 'text' },
            link({ name: 'signInLink' }),
          ],
        },
        {
          name: 'trustBadges',
          label: 'Trust Badges',
          fields: [
            {
              name: 'items',
              type: 'array',
              maxRows: 3,
              fields: [iconSelect('trust'), { name: 'label', type: 'text' }],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [ctaSection({ maxButtons: 2 }, { admin: { description: '"Ready to Transform Your Wellness?" closing section.' } })],
        },
        {
          name: 'quickLinks',
          label: 'Quick Links',
          fields: [
            {
              name: 'items',
              type: 'array',
              maxRows: 3,
              fields: [
                { name: 'icon', type: 'select', options: QUICK_LINK_ICON_OPTIONS },
                { name: 'title', type: 'text' },
                { name: 'text', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seo()],
        },
      ],
    },
  ],
};
