import type { CollectionConfig } from 'payload';

import { priceField } from '../fields';
import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';
import { validateTokensCollection } from '../hooks/validateTokens';

/**
 * The ladies-only massage menu (CMS-Content-Model.md §2.4). `packSessions` + `price` compute
 * the six-session value and the Package Pricing Summary table — never stored directly.
 */
export const MassageRituals: CollectionConfig = {
  slug: 'massage-rituals',
  admin: {
    group: 'Prices & Menu',
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'price', 'packPrice', 'active', 'sortOrder'],
  },
  access: {
    read: authenticated,
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
    { name: 'name', type: 'text', required: true, admin: { description: 'e.g. "FLOW | Relaxation Massage".' } },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'Used by price tokens, e.g. {price:slug}, {price:slug.pack}.' } },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-Body', value: 'full-body' },
        { label: 'Targeted', value: 'targeted' },
        { label: 'Signature Foot', value: 'signature-foot' },
        { label: 'Escape', value: 'escape' },
      ],
    },
    { name: 'cardTitle', type: 'text', admin: { description: 'Overrides Name on the massage page card header, when worded differently there.' } },
    { name: 'description', type: 'textarea', admin: { description: 'Long version, shown on the massage page. Tokens allowed.' } },
    { name: 'shortDescription', type: 'textarea', admin: { description: 'Short version, shown on the pricing page. Tokens allowed.' } },
    { name: 'durationShort', type: 'text', admin: { description: 'e.g. "60 min".' } },
    { name: 'durationLong', type: 'text', admin: { description: 'e.g. "60 Minutes".' } },
    priceField('price', { required: true }),
    priceField('price90', {}),
    { name: 'duration90Long', type: 'text', defaultValue: '90 Minutes' },
    priceField('addOnPrice', {}),
    priceField('packPrice', {}),
    { name: 'packFormula', type: 'text', defaultValue: '5 + 1' },
    { name: 'packSessions', type: 'number', defaultValue: 6 },
    { name: 'packValidity', type: 'text', defaultValue: '45 days' },
    { name: 'benefits', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'includesHeading', type: 'text' },
    { name: 'includes', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'saltBlendsHeading', type: 'text', defaultValue: 'Choose Your Salt Blend' },
    {
      name: 'saltBlends',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
    { name: 'saltBlendsFootnote', type: 'textarea' },
    { name: 'note', type: 'text', admin: { description: 'Tokens allowed.' } },
    { name: 'bookLabel', type: 'text' },
    {
      name: 'llmsLine',
      type: 'text',
      admin: { description: 'Optional. Verbatim llms.txt line, tokens allowed.' },
    },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
