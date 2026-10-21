import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { image } from '../fields/image';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Special events, collaborations and community moments shown on `/events` (CMS-Content-Model.md
 * §2.7). `kind: 'upcoming'` renders the single "Upcoming Events" card; `kind: 'highlight'`
 * renders the "Events, Partnerships & Community" cards.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Classes & Events',
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'categoryLabel', 'active', 'sortOrder'],
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
    { name: 'title', type: 'text', required: true, admin: { description: 'Event name, e.g. "Sound Healing".' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Upcoming event', value: 'upcoming' },
        { label: 'Past highlight', value: 'highlight' },
      ],
      admin: {
        description: 'Upcoming shows in the "Upcoming Events" card. Highlight shows in "Events, Partnerships & Community".',
      },
    },
    {
      name: 'categoryLabel',
      type: 'text',
      admin: { description: 'Small pill text, e.g. "Sound Healing" or "Special Event · Collaboration".' },
    },
    { name: 'dateLabel', type: 'text', admin: { description: 'e.g. "Full Moon & New Moon".' } },
    { name: 'timeLabel', type: 'text', admin: { description: 'e.g. "Dates to be announced". Upcoming events only.' } },
    {
      name: 'startDate',
      type: 'date',
      admin: { description: 'Optional — used for sorting. Leave empty when the date is not yet fixed.' },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Optional. An Upcoming event whose end date has passed is hidden from the site automatically.',
      },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'images',
      type: 'array',
      maxRows: 2,
      admin: { description: 'Up to 2 photos, shown side by side.' },
      fields: [image({ name: 'image' })],
    },
    image({ name: 'logo' }, { admin: { description: 'Optional partner/brand logo, e.g. ALO or UAE Jiu-Jitsu.' } }),
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
