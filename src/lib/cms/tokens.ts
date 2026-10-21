// Server-only: resolves §4.5 price/fact tokens (`{price:slug}`, `{from:category}`,
// `{fact:key}`, `{year}`) inside any CMS value, before it reaches a component.

import { formatAed } from './format';

/** The subset of an Offer that token resolution needs — package B's real type is a superset. */
export type TokenOffer = {
  slug: string;
  category: string;
  price: number | null | undefined;
  active?: boolean;
};

/**
 * The subset of a MassageRitual that token resolution needs (§2.4 field names) — package B's
 * real type is a superset. `.sixValue` is never stored — it is `price * packSessions`,
 * computed here exactly like the Package Pricing Summary table (§2.4).
 */
export type TokenRitual = {
  slug: string;
  price: number | null | undefined;
  price90?: number | null;
  packPrice?: number | null;
  addOnPrice?: number | null;
  packSessions?: number | null;
  active?: boolean;
};

export type TokenFact = { key?: string | null; value?: string | null };

const TOKEN_PATTERN = /\{(?:price|from|fact):[a-z0-9][a-z0-9-]*(?:\.[a-zA-Z]+)?\}|\{year\}/g;

const VARIANT_SUFFIX_TO_FIELD: Partial<Record<string, keyof TokenRitual>> = {
  ninety: 'price90',
  pack: 'packPrice',
  addOn: 'addOnPrice',
};

export type TokenIndex = {
  /** Resolves a single `{...}` token to its display string, or `undefined` if unknown. */
  resolve: (token: string) => string | undefined;
};

/**
 * Builds a lookup for every token in §4.5's table from the current offers, massage rituals
 * and site-settings facts. Resolution happens once, here, in the query layer — components
 * never see a token.
 */
export function buildTokenIndex({
  offers,
  rituals,
  settings,
}: {
  offers: TokenOffer[];
  rituals: TokenRitual[];
  settings: { facts?: TokenFact[] | null } | null | undefined;
}): TokenIndex {
  const priceBySlug = new Map<string, number>();
  const minByCategory = new Map<string, number>();

  const record = (category: string, price: number | null | undefined) => {
    if (price == null) return;
    const current = minByCategory.get(category);
    if (current === undefined || price < current) minByCategory.set(category, price);
  };

  for (const offer of offers) {
    if (offer.active === false) continue;
    if (offer.price != null) priceBySlug.set(offer.slug, offer.price);
    record(offer.category, offer.price);
  }

  for (const ritual of rituals) {
    if (ritual.active === false) continue;
    if (ritual.price != null) priceBySlug.set(ritual.slug, ritual.price);
    record('massage', ritual.price);
    for (const [suffix, field] of Object.entries(VARIANT_SUFFIX_TO_FIELD)) {
      const value = field ? ritual[field] : undefined;
      if (typeof value === 'number') priceBySlug.set(`${ritual.slug}.${suffix}`, value);
    }
    if (typeof ritual.price === 'number' && typeof ritual.packSessions === 'number') {
      priceBySlug.set(`${ritual.slug}.sixValue`, ritual.price * ritual.packSessions);
    }
  }

  const factsByKey = new Map<string, string>();
  for (const fact of settings?.facts ?? []) {
    if (fact.key && fact.value != null) factsByKey.set(fact.key, fact.value);
  }

  const year = new Date().getFullYear();

  function resolve(token: string): string | undefined {
    if (token === '{year}') return String(year);
    const match = token.match(/^\{(price|from|fact):([^}]+)\}$/);
    if (!match) return undefined;
    const [, kind, key] = match;

    if (kind === 'fact') return factsByKey.get(key);

    if (kind === 'from') {
      const min = minByCategory.get(key);
      return min !== undefined ? formatAed(min) : undefined;
    }

    const price = priceBySlug.get(key);
    return price !== undefined ? formatAed(price) : undefined;
  }

  return { resolve };
}

function resolveString(value: string, index: TokenIndex): string {
  if (!value.includes('{')) return value;
  return value.replace(TOKEN_PATTERN, (token) => index.resolve(token) ?? token);
}

/**
 * Recursively resolves every token inside `doc` using `index`, returning a **new** object —
 * `doc` is never mutated. An unknown token is left literal (§4.5) rather than stripped.
 */
export function resolveTokensDeep<T>(doc: T, index: TokenIndex): T {
  if (typeof doc === 'string') {
    return resolveString(doc, index) as unknown as T;
  }
  if (Array.isArray(doc)) {
    return doc.map((item) => resolveTokensDeep(item, index)) as unknown as T;
  }
  if (doc && typeof doc === 'object') {
    const entries = Object.entries(doc as Record<string, unknown>).map(
      ([key, value]) => [key, resolveTokensDeep(value, index)] as const,
    );
    return Object.fromEntries(entries) as T;
  }
  return doc;
}
