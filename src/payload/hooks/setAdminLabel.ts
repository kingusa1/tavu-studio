import type { CollectionBeforeChangeHook } from 'payload';

/**
 * Generic `beforeChange` factory for a computed, read-only admin-list label — used wherever
 * a collection's `useAsTitle` field is derived from other fields rather than typed directly
 * (e.g. Offers' `adminLabel` = "{categoryLabel} — {name}", §2.3, since many rows share the
 * same `name` — "Drop-In" — and need a distinguishing list title).
 */
export function setAdminLabel<T extends Record<string, unknown> = Record<string, unknown>>(
  compute: (data: T) => string,
  fieldName = 'adminLabel',
): CollectionBeforeChangeHook {
  return ({ data }) => ({
    ...data,
    [fieldName]: compute(data as T),
  });
}
