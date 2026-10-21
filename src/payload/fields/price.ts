import type { Field } from 'payload';

export type PriceFieldArgs = {
  required?: boolean;
};

/** AED amount, excluding VAT, formatted at render time by `formatAed()` (§4.4). */
export function priceField(name: string, { required = false }: PriceFieldArgs = {}, overrides?: Partial<Field>): Field {
  return {
    name,
    type: 'number',
    min: 0,
    required,
    admin: {
      step: 1,
      description: 'AED, excluding VAT',
    },
    ...overrides,
  } as Field;
}
