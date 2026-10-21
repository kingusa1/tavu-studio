import type { Field, GroupField } from 'payload';

import { overlayCard } from '../../fields/overlayCard';

/**
 * `overlayCard()` (§4, foundation) with a short `dbName` on the nested `bullets` array — §7
 * R9: `<page>_v_version_overview_card_bullets` plus Payload's `_parent_id`/`_order` index and
 * FK suffixes exceeds Postgres's 63-char limit on the longer page-global slugs (observed via
 * `npm run seed`'s truncated-identifier warning). `overlayCard()`'s own signature only lets a
 * caller override the outer `card` group, not a field nested inside it, so this wraps its
 * output rather than editing the shared helper (CMS-Content-Model.md §6 rule 1).
 */
export function overlayCardShort(dbName: string): Field {
  const base = overlayCard() as GroupField;
  return {
    ...base,
    fields: base.fields.map((field) => ('name' in field && field.name === 'bullets' ? { ...field, dbName } : field)),
  };
}
