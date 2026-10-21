import type { CollectionConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Booking and class rules shown on several pages (CMS-Content-Model.md §2.6). The bullet
 * glyph ("•" on schedule/classes, "-" on appointments) stays per-surface in the page code —
 * it is presentation, not content.
 */
export const Policies: CollectionConfig = {
  slug: 'policies',
  admin: {
    group: 'Classes & Events',
    useAsTitle: 'label',
    defaultColumns: ['label', 'showOn', 'sortOrder'],
  },
  access: {
    read: authenticated,
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
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'The bold lead-in, with its punctuation exactly as shown, e.g. "First time?", "Cancellation:".' },
    },
    { name: 'text', type: 'textarea', required: true },
    {
      name: 'showOn',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Schedule', value: 'schedule' },
        { label: 'Classes', value: 'classes' },
        { label: 'Appointments', value: 'appointments' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
