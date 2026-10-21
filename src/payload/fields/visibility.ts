import type { Field } from 'payload';

/** Offers' per-surface show/hide flags (§2.3) — which card lists a row appears on. */
export function visibilityFields(overrides?: Partial<Field>): Field {
  return {
    name: 'visibility',
    type: 'group',
    fields: [
      { name: 'showOnHome', type: 'checkbox', defaultValue: false },
      { name: 'showOnPricing', type: 'checkbox', defaultValue: false },
      { name: 'showOnClasses', type: 'checkbox', defaultValue: false },
      { name: 'showOnServicePage', type: 'checkbox', defaultValue: false },
      { name: 'showOnAppointments', type: 'checkbox', defaultValue: false },
      { name: 'showOnLlms', type: 'checkbox', defaultValue: true },
    ],
    ...overrides,
  } as Field;
}
