import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { richTextField } from '../fields/richText';
import { seo } from '../fields/seo';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Terms of Service and Privacy Policy (CMS-Content-Model.md §2.9). One doc per route, picked
 * by `slug`. `body` holds every numbered section (`##` h2 / `###` h3); the contact card at the
 * end of the last section is a separate structured field so it can read live contact details.
 */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    group: 'Site',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'lastUpdated'],
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
    { name: 'title', type: 'text', required: true, admin: { description: 'Page heading, e.g. "Terms of Service".' } },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Terms of Service (/terms-of-service)', value: 'terms-of-service' },
        { label: 'Privacy Policy (/privacy-policy)', value: 'privacy-policy' },
        { label: 'Editorial Policy (/editorial-policy)', value: 'editorial-policy' },
      ],
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        date: { displayFormat: 'MMMM yyyy' },
        description: 'Shown as "Last Updated: {Month Year}".',
      },
    },
    richTextField('body', 'legal', {
      admin: { description: 'Numbered sections. Use Heading 2 for each numbered section, Heading 3 for sub-sections.' },
    }),
    {
      name: 'contactCard',
      type: 'group',
      admin: { description: 'The contact box shown at the end of the last section.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'organisationName', type: 'text' },
        { name: 'addressLines', type: 'array', fields: [{ name: 'line', type: 'text' }] },
        { name: 'showEmail', type: 'checkbox', defaultValue: true, admin: { description: 'Uses the email from Site Settings.' } },
        { name: 'showWhatsapp', type: 'checkbox', defaultValue: true, admin: { description: 'Uses the WhatsApp number from Site Settings.' } },
        { name: 'hoursNote', type: 'text', admin: { description: 'Optional, e.g. "Operating Hours: 9:00 AM – 9:00 PM, 7 days a week".' } },
      ],
    },
    seo(),
  ],
};
