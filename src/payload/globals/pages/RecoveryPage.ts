import type { GlobalConfig } from 'payload';

import { link, seo } from '../../fields';
import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/recovery` (CMS-Content-Model.md §3.5 recovery-page, package B). */
export const RecoveryPage: GlobalConfig = {
  slug: 'recovery-page',
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
      name: 'cards',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'priceText', type: 'text', admin: { description: 'Tokens allowed, e.g. "From {from:contrast} AED →".' } },
      ],
    },
    link({ name: 'cta' }),
    seo(),
  ],
};
