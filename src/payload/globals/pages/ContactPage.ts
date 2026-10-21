import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { image } from '../../fields/image';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/contact` (CMS-Content-Model.md §3.5 contact-page, package D). */
export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: { group: 'Pages' },
  access: {
    read: authenticated,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
    beforeValidate: [validateTokensGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'headingLead', type: 'text', admin: { description: 'e.g. "Let\'s" (plain weight).' } },
            { name: 'headingEmphasis', type: 'text', admin: { description: 'e.g. "Connect" (italic, light weight).' } },
            { name: 'intro', type: 'text' },
          ],
        },
        {
          name: 'imageCard',
          label: 'Image Card',
          fields: [image({ name: 'image' }), { name: 'caption', type: 'text' }],
        },
        {
          name: 'tiles',
          label: 'Info Tiles',
          admin: { description: 'Labels only — the address, hours, phone, email and WhatsApp values come from Site Settings.' },
          fields: [
            { name: 'locationLabel', type: 'text' },
            { name: 'hoursLabel', type: 'text' },
            { name: 'phoneLabel', type: 'text' },
            { name: 'emailLabel', type: 'text' },
            { name: 'whatsappLabel', type: 'text', admin: { description: 'Chat button text, e.g. "Chat Now".' } },
          ],
        },
        {
          name: 'form',
          label: 'Contact Form',
          fields: [
            { name: 'nameLabel', type: 'text' },
            { name: 'namePlaceholder', type: 'text' },
            { name: 'emailLabel', type: 'text' },
            { name: 'emailPlaceholder', type: 'text' },
            { name: 'messageLabel', type: 'text' },
            { name: 'messagePlaceholder', type: 'text' },
            { name: 'submitLabel', type: 'text' },
            { name: 'submittingLabel', type: 'text' },
            { name: 'footnote', type: 'text' },
            {
              name: 'whatsappTemplate',
              type: 'textarea',
              admin: { description: 'The WhatsApp message built on submit. Placeholders: {name} {email} {message}.' },
            },
            {
              name: 'errors',
              type: 'group',
              admin: { description: 'Validation error messages.' },
              fields: [
                { name: 'name', type: 'text' },
                { name: 'email', type: 'text' },
                { name: 'message', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'map',
          label: 'Map',
          admin: { description: 'The embed URL comes from Site Settings.' },
          fields: [{ name: 'title', type: 'text' }],
        },
        {
          label: 'SEO',
          fields: [seo()],
        },
      ],
    },
  ],
};
