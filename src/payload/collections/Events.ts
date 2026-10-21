import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/** Stub — package D replaces this with the full schema (CMS-Content-Model.md §2.7). */
export const Events: CollectionConfig = {
  slug: 'events',
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
