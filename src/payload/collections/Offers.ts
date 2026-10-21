import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Stub — package B replaces this with the full schema (CMS-Content-Model.md §2.3):
 * adminLabel, name, slug, category, kind, price, duration/validity copy, includes/notes,
 * highlight, display overrides, featureCard, visibility, availableFrom/Until, structuredData,
 * llmsLine. Access, versions and the revalidate hook are already wired per §2's conventions.
 */
export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    group: 'Prices & Menu',
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
