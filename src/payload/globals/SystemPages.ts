import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { link } from '../fields/link';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

/**
 * Copy for the 404, error and loading states (§3.4). `error.tsx`/`loading.tsx` read this
 * through `SiteDataProvider` with the current strings as hard-coded fallbacks, so they still
 * render if the CMS is unreachable.
 */
export const SystemPages: GlobalConfig = {
  slug: 'system-pages',
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
      name: 'notFound',
      type: 'group',
      fields: [
        { name: 'code', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'textLine1', type: 'text' },
        { name: 'textLine2', type: 'text' },
        link({ name: 'button' }),
      ],
    },
    {
      name: 'error',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'text', type: 'text' },
        { name: 'retryLabel', type: 'text' },
        { name: 'homeLabel', type: 'text' },
      ],
    },
    {
      name: 'loading',
      type: 'group',
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
};
