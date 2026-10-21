import type { Field } from 'payload';

import { image } from './image';

/** The small image card with 2 title lines and a bullet list (group `card`). */
export function overlayCard(overrides?: Partial<Field>): Field {
  return {
    name: 'card',
    type: 'group',
    fields: [
      image({ name: 'image' }),
      { name: 'eyebrow', type: 'text', defaultValue: 'TAVÚ' },
      { name: 'titleLine1', type: 'text' },
      { name: 'titleLine2', type: 'text', admin: { description: 'Rendered in italic.' } },
      {
        name: 'bullets',
        type: 'array',
        maxRows: 4,
        fields: [{ name: 'text', type: 'text', admin: { description: 'Tokens allowed, e.g. {price:slug}.' } }],
      },
    ],
    ...overrides,
  } as Field;
}
