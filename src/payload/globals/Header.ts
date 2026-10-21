import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { link } from '../fields/link';
import { iconSelect } from '../fields/options';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

/** Primary nav — dropdown menus, login/register links and the two header CTAs (§3.2). */
export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Site',
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
      name: 'dropdowns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' },
            { name: 'href', type: 'text', required: true },
            iconSelect('nav', 'icon'),
          ],
        },
      ],
    },
    {
      name: 'login',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'mobileLabel', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'ariaLabel', type: 'text' },
      ],
    },
    {
      name: 'register',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'mobileLabel', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    link({ name: 'secondaryCta' }),
    link({ name: 'primaryCta' }),
  ],
};
