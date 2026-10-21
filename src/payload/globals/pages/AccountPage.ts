import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { link } from '../../fields/link';
import { iconSelect } from '../../fields/options';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * The 4 feature icons are still hard-coded JSX today (`src/app/(frontend)/account/page.tsx`)
 * — same "feature" set situation as partnerships-page and register-page (reported in the
 * builder notes); these use local keys rendered by the page itself. `quickActions` reuses
 * `calendar`/`currency` keys for the 2 action buttons, for the same reason.
 */
const FEATURE_ICON_OPTIONS = [
  { label: 'Book Classes', value: 'book-classes' },
  { label: 'View History', value: 'view-history' },
  { label: 'Manage Packages', value: 'manage-packages' },
  { label: 'Book Recovery', value: 'book-recovery' },
];

const QUICK_ACTION_ICON_OPTIONS = [
  { label: 'Calendar', value: 'calendar' },
  { label: 'Currency', value: 'currency' },
];

/** `/account` (CMS-Content-Model.md §3.5 account-page, package D). */
export const AccountPage: GlobalConfig = {
  slug: 'account-page',
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
            { name: 'headingLead', type: 'text', admin: { description: 'e.g. "Your" (plain weight).' } },
            { name: 'headingEmphasis', type: 'text', admin: { description: 'e.g. "Account" (italic, light weight).' } },
            { name: 'intro', type: 'text' },
          ],
        },
        {
          name: 'loginCard',
          label: 'Login Card',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'text' },
            { name: 'signInLabel', type: 'text', admin: { description: 'Visible button text, e.g. "Sign In to Your Account".' } },
            { name: 'widgetInnerText', type: 'text', admin: { description: 'Mindbody widget link text, e.g. "Sign In".' } },
            { name: 'dividerLabel', type: 'text', admin: { description: 'e.g. "or".' } },
            link({ name: 'createAccount' }),
            { name: 'helpPrefix', type: 'text', admin: { description: 'e.g. "Need help?".' } },
            link({ name: 'helpLink' }),
          ],
        },
        {
          name: 'features',
          label: 'Features',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'text' },
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'icon', type: 'select', options: FEATURE_ICON_OPTIONS },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'quickActions',
          label: 'Quick Actions',
          admin: {
            description:
              'Shaped like a CTA section, but each button also carries an icon (calendar/currency) — built manually rather than with the shared CTA helper.',
          },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true },
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
            {
              name: 'buttons',
              type: 'array',
              maxRows: 2,
              fields: [
                link({ name: 'link', required: true }),
                { name: 'icon', type: 'select', options: QUICK_ACTION_ICON_OPTIONS },
              ],
            },
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
          label: 'SEO',
          fields: [seo()],
        },
      ],
    },
  ],
};
