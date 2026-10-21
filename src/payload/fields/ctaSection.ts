import type { Field } from 'payload';

import { link } from './link';

export type CtaSectionArgs = {
  maxButtons?: number;
};

/** The repeated "Begin When Ready" style closing block (group `cta`). */
export function ctaSection({ maxButtons = 2 }: CtaSectionArgs = {}, overrides?: Partial<Field>): Field {
  return {
    name: 'cta',
    type: 'group',
    fields: [
      { name: 'enabled', type: 'checkbox', defaultValue: true },
      { name: 'heading', type: 'text' },
      {
        name: 'text',
        type: 'text',
        admin: { description: 'Tokens allowed, e.g. {price:slug}.' },
      },
      {
        name: 'buttons',
        type: 'array',
        maxRows: maxButtons,
        fields: [
          link({ name: 'link', required: true }),
          {
            name: 'style',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Outline', value: 'outline' },
            ],
          },
        ],
      },
    ],
    ...overrides,
  } as Field;
}
