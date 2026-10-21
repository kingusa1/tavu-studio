import type { Field } from 'payload';

import { image } from './image';

/** The shared hero block used by every `/services/*` detail page (group `hero`). */
export function serviceHero(overrides?: Partial<Field>): Field {
  return {
    name: 'hero',
    type: 'group',
    fields: [
      image({ name: 'image' }),
      {
        name: 'imagePosition',
        type: 'select',
        defaultValue: 'center',
        options: [
          { label: 'Center', value: 'center' },
          { label: 'Center (40%)', value: 'center-40' },
        ],
      },
      { name: 'eyebrow', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'intro', type: 'textarea' },
    ],
    ...overrides,
  } as Field;
}
