import type { CollectionConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { seo } from '../fields/seo';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';
import { validateTokensCollection } from '../hooks/validateTokens';

/**
 * Blog categories (package E, brief §A). Read is logged-in only (brief §0 security rule) —
 * public blog pages read through the Local API with `overrideAccess: true` (src/lib/cms/categories.ts).
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Blog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  hooks: {
    beforeValidate: [validateTokensCollection],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Category name, e.g. "Reformer Pilates".' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Used in the URL: /blog/category/<slug>.' } },
    { name: 'description', type: 'textarea', admin: { description: 'Shown at the top of the category page. Optional.' } },
    seo(),
  ],
};
