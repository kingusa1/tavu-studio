import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { accentSelect } from '../../fields/options';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/services` index (CMS-Content-Model.md §3.5 services-page, package C). */
export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  admin: { group: 'Pages' },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    beforeValidate: [validateTokensGlobal],
    afterChange: [revalidateGlobalAfterChange],
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
            { name: 'title', type: 'text' },
            { name: 'intro', type: 'textarea' },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'items',
              type: 'array',
              minRows: 5,
              maxRows: 5,
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Movement", "Breath", "Recovery"' } },
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea', admin: { description: 'Tokens allowed.' } },
                image(),
                {
                  name: 'imagePosition',
                  type: 'select',
                  defaultValue: 'center',
                  options: [
                    { label: 'Center', value: 'center' },
                    { label: 'Center (40%)', value: 'center-40' },
                  ],
                },
                accentSelect('service'),
                {
                  name: 'features',
                  type: 'array',
                  maxRows: 4,
                  fields: [{ name: 'text', type: 'text', admin: { description: 'Tokens allowed.' } }],
                },
                { name: 'href', type: 'text' },
              ],
            },
            { name: 'learnMoreLabel', type: 'text', defaultValue: 'Learn More' },
          ],
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 2 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
