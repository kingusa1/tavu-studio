import type { Field } from 'payload';

export type LinkFieldArgs = {
  name: string;
  required?: boolean;
};

/**
 * A label + href pair, used everywhere the site has a button or text link whose target may
 * be internal (a plain path, since every page is a global — no `relationTo`) or external.
 */
export function link({ name, required = false }: LinkFieldArgs, overrides?: Partial<Field>): Field {
  return {
    name,
    type: 'group',
    fields: [
      { name: 'label', type: 'text', required },
      {
        name: 'href',
        type: 'text',
        required,
        validate: (value: unknown) => {
          if (!value && !required) return true;
          if (typeof value === 'string' && /^(\/|#|https:\/\/|mailto:|tel:)/.test(value)) {
            return true;
          }
          return 'Must start with /, #, https://, mailto: or tel:';
        },
      },
      { name: 'newTab', type: 'checkbox', defaultValue: false },
    ],
    ...overrides,
  } as Field;
}
