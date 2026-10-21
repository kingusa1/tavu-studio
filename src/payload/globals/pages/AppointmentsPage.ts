import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/**
 * `/appointments` (CMS-Content-Model.md §3.5 appointments-page, package C). The Mindbody
 * widget id comes from Site Settings → Booking (Mindbody); the big package card is the Offer
 * flagged "Show on Appointments" (rendered with `display.fullName`/`display.cardSubtitle`);
 * items in "Appointment Information" come from Policies whose "Show on" includes Appointments.
 */
export const AppointmentsPage: GlobalConfig = {
  slug: 'appointments-page',
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
    { name: 'packagesHeading', type: 'text' },
    {
      name: 'info',
      type: 'group',
      fields: [{ name: 'heading', type: 'text' }],
    },
    seo(),
  ],
};
