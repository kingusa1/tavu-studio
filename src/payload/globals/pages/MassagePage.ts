import type { GlobalConfig } from 'payload';

import { ctaSection, link, overlayCard, seo, serviceHero } from '../../fields';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';
import { validateTokensGlobal } from '../../hooks/validateTokens';

/** `/services/massage` (CMS-Content-Model.md §3.5 massage-page, package B). */
export const MassagePage: GlobalConfig = {
  slug: 'massage-page',
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
        { label: 'Hero', fields: [serviceHero()] },
        {
          name: 'overview',
          label: 'Overview',
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Healing Touch' },
            { name: 'paragraphs', type: 'array', maxRows: 2, fields: [{ name: 'text', type: 'textarea' }] },
            { name: 'badge', type: 'text', defaultValue: 'Ladies Only' },
            link({ name: 'cta' }),
            overlayCard(),
          ],
        },
        {
          name: 'fullBody',
          label: 'Full-Body Rituals',
          admin: { description: 'Rows come from the Massage Menu, group Full-Body.' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'bookLabel', type: 'text', defaultValue: 'Book →' },
            { name: 'bookHref', type: 'text', defaultValue: '/appointments' },
          ],
        },
        {
          name: 'targeted',
          label: 'Targeted Rituals',
          admin: { description: 'Rows come from the Massage Menu, group Targeted.' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'addOnLabel', type: 'text', defaultValue: '30-Minute Add-On' },
            { name: 'ritualLabel', type: 'text', defaultValue: '60-Minute Ritual' },
            { name: 'packLabel', type: 'text', defaultValue: 'Ritual Pack | 5 + 1' },
          ],
        },
        {
          name: 'rooted',
          label: 'ROOTED',
          admin: { description: 'Card data comes from the Massage Menu row "ROOTED | Foot Soaking and Reflexology".' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'TAVÚ Exclusive Foot Ritual' },
            { name: 'intro', type: 'textarea' },
            { name: 'packHeading', type: 'text', defaultValue: 'Ritual Pack' },
          ],
        },
        {
          name: 'escape',
          label: 'Recovery Escape',
          admin: { description: 'Card data comes from the Massage Menu row "TAVÚ Recovery Escape".' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'TAVÚ Recovery Escape' },
            { name: 'intro', type: 'textarea' },
            { name: 'durationPrefix', type: 'text', defaultValue: 'Duration:' },
          ],
        },
        {
          name: 'summary',
          label: 'Package Pricing Summary',
          admin: { description: 'Rows are computed from the Massage Menu (§2.4) — not stored here.' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Package Pricing Summary' },
            {
              name: 'columnLabels',
              type: 'group',
              fields: [
                { name: 'ritual', type: 'text', defaultValue: 'Ritual Price' },
                { name: 'value', type: 'text', defaultValue: 'Six-Session Value' },
                { name: 'pack', type: 'text', defaultValue: 'Package Price' },
                { name: 'saving', type: 'text', defaultValue: 'Saving' },
              ],
            },
            { name: 'footnote', type: 'textarea' },
            { name: 'showVatNote', type: 'checkbox', defaultValue: true },
          ],
        },
        { label: 'CTA', fields: [ctaSection()] },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
