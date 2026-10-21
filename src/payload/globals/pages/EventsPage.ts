import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { iconSelect } from '../../fields/options';
import { sectionHeader } from '../../fields/sectionHeader';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/events` (CMS-Content-Model.md §3.5 events-page, package D). */
export const EventsPage: GlobalConfig = {
  slug: 'events-page',
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
          fields: [image({ name: 'image' }), { name: 'title', type: 'text' }, { name: 'intro', type: 'textarea' }],
        },
        {
          name: 'upcoming',
          label: 'Upcoming Events',
          fields: [
            ...sectionHeader({ withIntro: false }),
            {
              name: 'emptyText',
              type: 'text',
              admin: { description: 'Shown only when there are zero upcoming events. Leave empty to hide the section in that case.' },
            },
          ],
        },
        {
          name: 'eventTypes',
          label: 'Event Types',
          fields: [
            ...sectionHeader({ withIntro: false }),
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [
                iconSelect('event'),
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'highlights',
          label: 'Collaborations',
          fields: [...sectionHeader({ withIntro: false })],
        },
        {
          label: 'CTA',
          fields: [ctaSection({ maxButtons: 2 }, { admin: { description: '"Stay Updated" closing section.' } })],
        },
        {
          label: 'SEO',
          fields: [seo()],
        },
      ],
    },
  ],
};
