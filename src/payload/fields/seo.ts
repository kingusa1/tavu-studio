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
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
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
