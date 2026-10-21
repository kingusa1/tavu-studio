import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';

/** The `/method` page (CMS-Content-Model.md §3.5 `method-page`, package A). */
export const MethodPage: GlobalConfig = {
  slug: 'method-page',
  admin: {
    group: 'Pages',
    description: 'The /method page — the 5-level progression system.',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'intro', type: 'textarea' },
            { name: 'progressionHeading', type: 'text' },
            { name: 'progressionIntro', type: 'textarea' },
            {
              name: 'levels',
              type: 'array',
              admin: { description: 'The 5 progression levels, in order.' },
              fields: [
                { name: 'label', type: 'text', admin: { description: 'E.g. "Level 1".' } },
                { name: 'name', type: 'text', admin: { description: 'E.g. "Foundation".' } },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
