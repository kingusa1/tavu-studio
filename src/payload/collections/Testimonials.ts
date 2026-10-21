import type { CollectionConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { image } from '../fields/image';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Home-page testimonials (§2.8). Not rendered anywhere today (landing/Testimonials.tsx is an
 * orphan component, §1.4) — the 3 seeded rows look like placeholders (invented names, studio
 * photos used as portraits), so they are seeded `active: false` and the home section stays off.
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Classes & Events',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'active', 'sortOrder'],
  },
  access: {
    read: authenticated,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  // DB-04: the frontend's hottest query filters/sorts on active+sortOrder on every page render.
  indexes: [{ fields: ['active', 'sortOrder'] }],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'E.g. "Wellness Enthusiast". Shown as "{role} • {location}".' } },
    { name: 'location', type: 'text', admin: { description: 'E.g. "Abu Dhabi". Shown as "{role} • {location}".' } },
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { description: 'Number of stars shown, 1–5.' },
    },
    image(),
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Only active testimonials can appear on the home page (the section itself is also off by default).',
      },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
