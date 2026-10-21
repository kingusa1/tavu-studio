import type { GlobalConfig } from 'payload';

import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * Fixed copy for `/blog` (hero + empty-state), package E brief §A. Read is logged-in only
 * (brief §0) — the `/blog` page reads through the Local API with `overrideAccess: true`
 * (src/lib/cms/globals.ts `getGlobal`, same as every other page global).
 */
export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  admin: { group: 'Pages' },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  versions: { max: 25 },
  hooks: {
    beforeValidate: [validateTokensGlobal],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'intro', type: 'textarea' },
      ],
    },
    {
      name: 'emptyState',
      type: 'group',
      admin: { description: 'Shown on /blog when there are 0 published posts.' },
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'text', type: 'textarea' },
      ],
    },
    seo(),
  ],
};
