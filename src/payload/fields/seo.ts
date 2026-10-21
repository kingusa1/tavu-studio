import type { Field } from 'payload';

/**
 * Per-page SEO group, consumed by `buildMetadata()` (src/lib/cms/metadata.ts, §4.1). Empty
 * fields fall back to `site-settings.seo` defaults — see the admin description below.
 */
export function seo(overrides?: Partial<Field>): Field {
  return {
    name: 'seo',
    type: 'group',
    admin: {
      description: 'Leave empty to use Site Settings defaults. Prices can be written as {price:slug}.',
    },
    fields: [
      // Package E (SEO brief §D2): guide editors toward the lengths Google renders without
      // truncating — the root title template adds " | TAVÚ Studio" (14 chars) on top of this.
      { name: 'title', type: 'text', admin: { description: 'Aim for 50-60 characters (including " | TAVÚ Studio").' } },
      { name: 'description', type: 'textarea', admin: { description: 'Aim for 120-160 characters.' } },
      { name: 'keywords', type: 'text', hasMany: true },
      { name: 'ogTitle', type: 'text' },
      { name: 'ogDescription', type: 'textarea' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
      {
        name: 'robots',
        type: 'select',
        defaultValue: 'index-follow',
        options: [
          { label: 'Index, Follow', value: 'index-follow' },
          { label: 'No Index, Follow', value: 'noindex-follow' },
          { label: 'No Index, No Follow', value: 'noindex-nofollow' },
        ],
      },
    ],
    ...overrides,
  } as Field;
}
