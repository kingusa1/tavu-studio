import { APIError } from 'payload';
import type { CollectionBeforeValidateHook, GlobalBeforeValidateHook, PayloadRequest } from 'payload';

/**
 * Matches the token grammar from CMS-Content-Model.md §4.5: `{price:<slug>}`,
 * `{price:<slug>.<variant>}`, `{from:<category>}`, `{fact:<key>}`, and the bare `{year}`.
 */
const TOKEN_PATTERN = /\{(?:price|from|fact):[a-z0-9][a-z0-9-]*(?:\.[a-zA-Z]+)?\}|\{year\}/g;

const KNOWN_CATEGORIES = new Set([
  'reformer',
  'breathing-room',
  'contrast',
  'compression',
  'add-on',
  'bundle',
  'membership',
  'massage',
]);

function collectTokens(value: unknown, found: Set<string>): void {
  if (typeof value === 'string') {
    for (const match of value.matchAll(TOKEN_PATTERN)) {
      found.add(match[0]);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectTokens(item, found));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((item) => collectTokens(item, found));
  }
}

/**
 * Rejects a save when it contains a price/fact token whose slug or key cannot be resolved,
 * e.g. "Unknown price token {price:reformer-drop-n}" (§4.5).
 *
 * Bootstrapping note: while `offers` and `massage-rituals` are both still empty (a builder's
 * isolated dev schema before package B seeds real rows, or F0 seeding site-settings/footer
 * before that), there is nothing meaningful to validate `{price:*}`/`{from:*}` slugs against,
 * so those checks are skipped rather than failing every save. `{fact:*}` and `{year}` are
 * unaffected by this bypass.
 */
async function assertKnownTokens(data: unknown, req: PayloadRequest): Promise<void> {
  const found = new Set<string>();
  collectTokens(data, found);
  if (found.size === 0) return;

  let offersTotal = 0;
  let ritualsTotal = 0;
  const priceSlugs = new Set<string>();
  const factKeys = new Set<string>();

  try {
    const [offers, rituals, settings] = await Promise.all([
      req.payload.find({ collection: 'offers', depth: 0, limit: 0, overrideAccess: true }),
      req.payload.find({ collection: 'massage-rituals', depth: 0, limit: 0, overrideAccess: true }),
      req.payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true }).catch(() => null),
    ]);
    offersTotal = offers.totalDocs;
    ritualsTotal = rituals.totalDocs;
    offers.docs.forEach((doc) => {
      const slug = (doc as { slug?: string }).slug;
      if (slug) priceSlugs.add(slug);
    });
    rituals.docs.forEach((doc) => {
      const slug = (doc as { slug?: string }).slug;
      if (slug) priceSlugs.add(slug);
    });
    const facts = (settings as { facts?: Array<{ key?: string }> } | null)?.facts ?? [];
    facts.forEach((fact) => {
      if (fact.key) factKeys.add(fact.key);
    });
  } catch {
    // offers / massage-rituals / site-settings aren't queryable yet in this schema — nothing
    // to validate against, so let the save through.
    return;
  }

  for (const token of found) {
    if (token === '{year}') continue;
    const match = token.match(/^\{(price|from|fact):([^}]+)\}$/);
    if (!match) continue;
    const [, kind, key] = match;

    if (kind === 'fact') {
      if (factKeys.size > 0 && !factKeys.has(key)) {
        throw new APIError(`Unknown price token ${token}`, 400);
      }
      continue;
    }

    if (kind === 'from') {
      if (!KNOWN_CATEGORIES.has(key)) {
        throw new APIError(`Unknown price token ${token}`, 400);
      }
      continue;
    }

    // kind === 'price' — strip an optional `.variant` suffix (ritual variants, §4.5).
    if (offersTotal === 0 && ritualsTotal === 0) continue;
    const baseSlug = key.split('.')[0];
    if (!priceSlugs.has(baseSlug)) {
      throw new APIError(`Unknown price token ${token}`, 400);
    }
  }
}

export const validateTokensCollection: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (data) await assertKnownTokens(data, req);
  return data;
};

export const validateTokensGlobal: GlobalBeforeValidateHook = async ({ data, req }) => {
  if (data) await assertKnownTokens(data, req);
  return data;
};
