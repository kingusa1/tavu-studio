import type { GlobalConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { link } from '../fields/link';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

/**
 * Copy for the 404, error and loading states (§3.4). `error.tsx` reads this through
 * `SiteDataProvider` with the current strings as hard-coded fallbacks, so it still renders if
 * the CMS is unreachable. There is deliberately no `(frontend)/loading.tsx`: a loading boundary
 * starts streaming before a page can call notFound(), so missing blog URLs answered 200, not 404.
 */
export const SystemPages: GlobalConfig = {
  slug: 'system-pages',
  admin: {
    group: 'Site',
  },
  access: {
    read: authenticated,
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
      admin: {
        description:
          'Not shown at the moment: the site has no loading screen, because a loading screen made missing blog pages answer "200 OK" instead of "404 Not Found" to search engines.',
      },
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
};
