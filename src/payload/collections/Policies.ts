import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Stub — package B replaces this with the full schema (CMS-Content-Model.md §2.6): booking
 * and class rules shown on several pages, with a `showOn` surface select.
 */
export const Policies: CollectionConfig = {
  slug: 'policies',
  admin: {
    group: 'Classes & Events',
    useAsTitle: 'title',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
  ],
};
