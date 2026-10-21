import type { CollectionConfig } from 'payload';

import { link, priceField, richTextField, visibilityFields } from '../fields';
import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';
import { setAdminLabel } from '../hooks/setAdminLabel';
import { validateTokensCollection } from '../hooks/validateTokens';

const CATEGORY_OPTIONS = [
  { label: 'Reformer', value: 'reformer' },
  { label: 'Breathing Room', value: 'breathing-room' },
  { label: 'Contrast', value: 'contrast' },
  { label: 'Compression', value: 'compression' },
  { label: 'Add-On', value: 'add-on' },
  { label: 'Bundle', value: 'bundle' },
  { label: 'Membership', value: 'membership' },
] as const;

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_OPTIONS.map((option) => [option.value, option.label]),
);

const computeAdminLabel = (data: Record<string, unknown>): string => {
  const category = typeof data.category === 'string' ? CATEGORY_LABELS[data.category] ?? data.category : 'Offer';
  const name = typeof data.name === 'string' ? data.name : '';
  return `${category} — ${name}`;
};

/**
 * One row per sellable item (CMS-Content-Model.md §2.3). Offers with `featureCard.enabled`
 * are rendered by `FeaturedOfferCard` instead of a plain row; every other offer renders as a
 * row via the per-surface formatters in `src/lib/cms/offerText.ts` (foundation).
 */
export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    group: 'Prices & Menu',
    useAsTitle: 'adminLabel',
    defaultColumns: ['adminLabel', 'category', 'price', 'active', 'sortOrder'],
    listSearchableFields: ['name', 'slug'],
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
    beforeChange: [setAdminLabel(computeAdminLabel)],
    beforeValidate: [validateTokensCollection],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'adminLabel',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
        description: 'Computed automatically — "{category} — {name}" — so rows named "Drop-In" stay distinguishable in the list.',
      },
    },
    { name: 'name', type: 'text', required: true, admin: { description: 'Row/card name, e.g. "Drop-In", "10-Class Pack".' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Used by price tokens, e.g. {price:slug}.' } },
    { name: 'category', type: 'select', required: true, index: true, options: [...CATEGORY_OPTIONS] },
    {
      name: 'kind',
      type: 'select',
      options: [
        { label: 'Drop-In', value: 'drop-in' },
        { label: 'Class Pack', value: 'class-pack' },
        { label: 'Session', value: 'session' },
        { label: 'Package', value: 'package' },
        { label: 'Bundle', value: 'bundle' },
        { label: 'Membership', value: 'membership' },
        { label: 'Add-On', value: 'add-on' },
      ],
    },
    priceField('price', { required: true }),
    { name: 'pricePeriod', type: 'text', admin: { description: 'Optional. Renders "AED / {period}" instead of a bare price.' } },
    { name: 'durationShort', type: 'text', admin: { description: 'e.g. "60 min", "45 min", "6 × 45 min", "20 min".' } },
    { name: 'durationLong', type: 'text', admin: { description: 'e.g. "60 Minutes".' } },
    { name: 'capacityLabel', type: 'text', admin: { description: 'e.g. "Up to 6 Guests".' } },
    { name: 'validity', type: 'text', admin: { description: 'e.g. "2 months", "30 days", "3 consecutive months".' } },
    { name: 'complimentary', type: 'text', admin: { description: 'e.g. "2 complimentary Contrast Therapy sessions".' } },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Main description. Leave empty for packs — the page builds "Valid X." from Validity. Tokens allowed, e.g. {price:slug}.' },
    },
    {
      name: 'bonus',
      type: 'text',
      admin: { description: 'Accent line shown when not derived from Complimentary. Tokens allowed.' },
    },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'Small note, e.g. "Non-transferable & non-refundable". Tokens allowed.' },
    },
    { name: 'includesHeading', type: 'text', defaultValue: 'Package Includes' },
    {
      name: 'includes',
      type: 'array',
      fields: [{ name: 'text', type: 'text', admin: { description: 'Tokens allowed.' } }],
    },
    { name: 'notesHeading', type: 'text', defaultValue: 'Please Note' },
    { name: 'notes', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'benefits', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'recommendedFor', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    {
      name: 'highlight',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'label', type: 'text', defaultValue: 'Most Complete' },
      ],
    },
    {
      name: 'display',
      type: 'group',
      label: 'Advanced display overrides',
      admin: {
        description: 'Only fill these in when the same offer must read differently on another surface (CMS-Content-Model.md §1.3) — never to "fix" copy.',
      },
      fields: [
        { name: 'fullName', type: 'text', admin: { description: 'Overrides Name on the pricing page / big cards.' } },
        { name: 'compactDescription', type: 'text', admin: { description: 'Overrides Description on the classes page.' } },
        { name: 'pricingDuration', type: 'text', admin: { description: 'Overrides Duration (Short) on the pricing page.' } },
        { name: 'cardSubtitle', type: 'text' },
      ],
    },
    {
      name: 'featureCard',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.category === 'breathing-room' || siblingData?.category === 'membership',
        description: 'Full-width card (pricing, classes and service pages) instead of a row.',
      },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'subtitle', type: 'text', admin: { description: 'Tokens allowed, e.g. {price:slug}.' } },
        richTextField('body', 'inline'),
        { name: 'includesHeading', type: 'text', defaultValue: 'Membership Includes' },
        { name: 'policyHeading', type: 'text', defaultValue: 'Booking Policy' },
        { name: 'policyText', type: 'textarea' },
        link({ name: 'cta' }),
      ],
    },
    visibilityFields(),
    {
      name: 'availableFrom',
      type: 'date',
      admin: { position: 'sidebar', description: 'Scheduled return (§5.4) — the daily keep-alive cron must revalidate when this date arrives.' },
    },
    {
      name: 'availableUntil',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'structuredData',
      type: 'group',
      fields: [
        {
          name: 'mode',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Offer', value: 'offer' },
          ],
        },
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea', admin: { description: 'Tokens allowed.' } },
      ],
    },
    {
      name: 'llmsLine',
      type: 'text',
      admin: { description: 'Optional. Verbatim llms.txt line, tokens allowed. Leave empty to auto-generate "- {Name}: {price}".' },
    },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
