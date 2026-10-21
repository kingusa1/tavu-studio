import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * `/schedule` (CMS-Content-Model.md §3.5 schedule-page, package C). The Mindbody widget id
 * comes from Site Settings → Booking (Mindbody); items in "Booking Information" come from
 * Policies whose "Show on" includes Schedule.
 */
export const SchedulePage: GlobalConfig = {
  slug: 'schedule-page',
  admin: { group: 'Pages' },
  access: {
    read: authenticated,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    beforeValidate: [validateTokensGlobal],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'bookingInfo',
      type: 'group',
      fields: [{ name: 'heading', type: 'text' }],
    },
    seo(),
  ],
};
