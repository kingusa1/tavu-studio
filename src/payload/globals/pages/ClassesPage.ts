import type { GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { link } from '../../fields/link';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/classes` (CMS-Content-Model.md §3.5 classes-page, package C). */
export const ClassesPage: GlobalConfig = {
  slug: 'classes-page',
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
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [image(), { name: 'title', type: 'text' }, { name: 'intro', type: 'textarea' }],
        },
        {
          name: 'packages',
          label: 'Packages',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
          admin: {
            description:
              'Card titles and CTAs come from Site Settings → Price cards. Rows are the Reformer and Breathing Room offers flagged "Show on Classes" — edit those in Prices & Packages.',
          },
        },
        {
          name: 'policies',
          label: 'Policies',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true },
            { name: 'heading', type: 'text' },
          ],
          admin: { description: 'Items come from Policies whose "Show on" includes Classes.' },
        },
        {
          name: 'reformerRoom',
          label: 'Reformer Room',
          fields: [
            image(),
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'lead', type: 'textarea', admin: { description: 'Tokens allowed, e.g. {fact:reformer-capacity}.' } },
            { name: 'body', type: 'textarea', admin: { description: 'Tokens allowed, e.g. {fact:reformer-duration}.' } },
            link({ name: 'cta' }),
            { name: 'cardCtaLabel', type: 'text' },
            { name: 'cardCtaHref', type: 'text' },
          ],
          admin: { description: 'Class cards below are the active Reformer classes.' },
        },
        {
          name: 'breathingRoom',
          label: 'Breathing Room',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'lead', type: 'textarea' },
            { name: 'body', type: 'textarea' },
            link({ name: 'cta' }),
            image(),
            { name: 'cardCtaLabel', type: 'text' },
            { name: 'cardCtaHref', type: 'text' },
          ],
          admin: { description: 'Class cards below are the active Breathing Room classes.' },
        },
        { label: 'CTA', fields: [ctaSection({ maxButtons: 1 })] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
