import type { CollectionConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';
import { validateTokensCollection } from '../hooks/validateTokens';

/**
 * Answer-engine FAQ content (package E, brief §C). Grouped by `topic`, shown on `/faq` and as a
 * section just before the final CTA on the matching service page. Read is logged-in only (brief
 * §0) — public pages filter `active: true` themselves through the Local API with
 * `overrideAccess: true` (src/lib/cms/faqs.ts).
 */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    group: 'Blog',
    useAsTitle: 'question',
    defaultColumns: ['question', 'topic', 'active', 'sortOrder'],
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
    { name: 'question', type: 'text', required: true },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: { description: 'Plain text. Prices can be written as {price:slug}.' },
    },
    {
      name: 'topic',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Reformer Pilates', value: 'reformer-pilates' },
        { label: 'Breathing Room', value: 'breathing-room' },
        { label: 'Contrast Therapy', value: 'contrast-therapy' },
        { label: 'Compression Therapy', value: 'compression-therapy' },
        { label: 'Massage', value: 'massage' },
        { label: 'Memberships & Pricing', value: 'memberships-pricing' },
        { label: 'Booking', value: 'booking' },
      ],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'sourceNote',
      type: 'text',
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { position: 'sidebar', description: 'Internal only — where this fact comes from. Never shown publicly.' },
    },
  ],
};
