import type { Field, GlobalConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { link } from '../fields/link';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

/** Flattens link()'s own sub-fields for use as a bare array-row shape (no extra nesting). */
const linkRowFields = (link({ name: 'link' }) as { fields: Field[] }).fields;

/**
 * Footer columns, visit-us block and legal links (§3.3). Social icons, address, phone,
 * email and hours are read from `site-settings` instead of being duplicated here.
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Site',
  },
  access: {
    read: authenticated,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'taglineLines',
      type: 'array',
      fields: [{ name: 'line', type: 'text' }],
    },
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'links', type: 'array', fields: linkRowFields },
      ],
    },
    {
      name: 'visitUs',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'mapsLinkLabel', type: 'text' },
        { name: 'hoursHeading', type: 'text' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'Tokens allowed, e.g. {year}.' },
    },
    { name: 'legalLinks', type: 'array', fields: linkRowFields },
  ],
};
