import type { Field } from 'payload';

export type ImageFieldArgs = {
  name?: string;
  required?: boolean;
};

/**
 * A media reference plus an optional per-spot alt override. Render with `resolveImage()`
 * (src/lib/cms/media.ts), which falls back to the Media doc's own `alt` when this group's
 * `alt` is empty (§4.3).
 */
export function image({ name = 'image', required = false }: ImageFieldArgs = {}, overrides?: Partial<Field>): Field {
  return {
    name,
    type: 'group',
    fields: [
      { name: 'media', type: 'upload', relationTo: 'media', required },
      {
        name: 'alt',
        type: 'text',
        admin: {
          description: "Overrides the image's default alt text for this spot only",
        },
      },
    ],
    ...overrides,
  } as Field;
}
