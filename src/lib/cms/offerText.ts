// Server-only: per-surface pure formatters for Offers and MassageRituals (§4.6). These are
// the parity contract — a builder who needs a string these can't produce adds a display
// override to the schema (§2.3 `display`); they never edit the formula here to match one
// page's copy at the expense of another's.

import { formatAed } from './format';
import { PLUS_VAT } from '@/lib/vat';

export type TextRow = { text: string };

export type OfferDisplay = {
  fullName?: string | null;
  compactDescription?: string | null;
  pricingDuration?: string | null;
  cardSubtitle?: string | null;
} | null;

/** The subset of an Offer every formatter needs (§2.3 field names) — package B's real type is a superset. */
export type OfferLike = {
  name: string;
  price: number;
  pricePeriod?: string | null;
  durationShort?: string | null;
  durationLong?: string | null;
  capacityLabel?: string | null;
  validity?: string | null;
  complimentary?: string | null;
  description?: string | null;
  bonus?: string | null;
  note?: string | null;
  includesHeading?: string | null;
  includes?: TextRow[] | null;
  notesHeading?: string | null;
  notes?: TextRow[] | null;
  benefits?: TextRow[] | null;
  recommendedFor?: TextRow[] | null;
  highlight?: { enabled?: boolean | null; label?: string | null } | null;
  display?: OfferDisplay;
  llmsLine?: string | null;
};

export type OfferSurface =
  | 'homeReformer'
  | 'homeBreathing'
  | 'pricing'
  | 'classes'
  | 'servicePage'
  | 'contrastPage'
  | 'bigCard'
  | 'membership';

export type OfferRow = {
  name: string;
  description?: string;
  duration?: string;
  badge?: string;
  subtitle?: string;
  bonus?: string;
  note?: string;
  validityLine?: string;
  price: string;
  period?: string;
  includesHeading?: string;
  includes?: TextRow[];
  notesHeading?: string;
  notes?: TextRow[];
  benefits?: TextRow[];
  recommendedFor?: TextRow[];
  highlight?: { enabled?: boolean | null; label?: string | null } | null;
};

/** `offerRow(offer, surface)` — §4.6's table, one branch per surface. */
export function offerRow(offer: OfferLike, surface: OfferSurface): OfferRow {
  const price = formatAed(offer.price);
  const displayName = offer.display?.fullName || offer.name;
  const includesLine = offer.complimentary ? `Includes ${offer.complimentary}` : undefined;

  switch (surface) {
    case 'homeReformer':
      return {
        name: offer.name,
        description: offer.description || `Valid ${offer.validity}.`,
        bonus: offer.bonus || includesLine,
        price,
      };

    case 'homeBreathing':
      return {
        name: offer.name,
        description: offer.complimentary ? `Includes ${offer.complimentary}.` : offer.description || undefined,
        validityLine: offer.validity ? `Valid ${offer.validity}` : undefined,
        note: offer.note || undefined,
        price,
      };

    case 'pricing':
      return {
        name: displayName,
        description: offer.description || `Valid ${offer.validity}.`,
        bonus: offer.bonus || includesLine,
        duration: offer.display?.pricingDuration || offer.durationShort || undefined,
        note: offer.note || undefined,
        price,
        period: offer.pricePeriod || undefined,
      };

    case 'classes':
      return {
        name: offer.name,
        description: offer.display?.compactDescription || offer.description || `Valid ${offer.validity}`,
        bonus: offer.complimentary ? `+ ${offer.complimentary}` : undefined,
        price,
      };

    case 'servicePage':
      return {
        name: offer.name,
        description: offer.description || `Valid ${offer.validity}.`,
        bonus: offer.bonus || includesLine,
        note: offer.note || undefined,
        price,
      };

    case 'contrastPage':
      return {
        name: offer.name,
        description: offer.description || undefined,
        duration: offer.durationLong || undefined,
        badge: offer.capacityLabel || undefined,
        note: offer.note || undefined,
        price,
      };

    case 'bigCard':
      return {
        name: displayName,
        description: offer.description || undefined,
        subtitle: offer.display?.cardSubtitle || undefined,
        includesHeading: offer.includesHeading || undefined,
        includes: offer.includes || undefined,
        notesHeading: offer.notesHeading || undefined,
        notes: offer.notes || undefined,
        benefits: offer.benefits || undefined,
        recommendedFor: offer.recommendedFor || undefined,
        price,
      };

    case 'membership':
      return {
        name: offer.name,
        description: offer.description || undefined,
        validityLine: offer.validity ? `Valid for ${offer.validity}` : undefined,
        includes: offer.includes || undefined,
        highlight: offer.highlight,
        price,
      };

    default:
      return { name: offer.name, price };
  }
}

/**
 * The llms.txt line for one offer (§5.8 point 4; the fallback formula named in §4.6's last
 * row). Not routed through `offerRow` — the llms.txt generator (package B, §5.8) calls this
 * directly.
 */
export function offerLlmsLine(offer: OfferLike): string {
  if (offer.llmsLine) return offer.llmsLine;
  const name = offer.display?.fullName || offer.name;
  return `- ${name}: ${formatAed(offer.price)}`;
}

/** The subset of a MassageRitual every formatter needs (§2.4 field names). */
export type RitualLike = {
  group: 'full-body' | 'targeted' | 'signature-foot' | 'escape';
  shortDescription?: string | null;
  description?: string | null;
  durationShort?: string | null;
  durationLong?: string | null;
  price: number;
  price90?: number | null;
  duration90Long?: string | null;
  addOnPrice?: number | null;
  packPrice?: number | null;
  packFormula?: string | null;
  packSessions?: number | null;
  packValidity?: string | null;
  note?: string | null;
};

export type RitualPricingRow = {
  duration?: string;
  description?: string;
  bonus?: string;
  note?: string;
};

/** `ritualRow(r, 'pricing')` — the pricing page's ritual list (§4.6). */
export function pricingRitualRow(ritual: RitualLike): RitualPricingRow {
  const base = {
    duration: ritual.durationShort || undefined,
    description: ritual.shortDescription || undefined,
  };

  switch (ritual.group) {
    case 'full-body':
    case 'signature-foot':
      return {
        ...base,
        bonus: ritual.price90 != null ? `90 min — ${formatAed(ritual.price90)} AED ${PLUS_VAT}` : undefined,
        note:
          ritual.packPrice != null
            ? `Ritual Pack ${ritual.packFormula} Included — ${formatAed(ritual.packPrice)} AED ${PLUS_VAT} · Valid ${ritual.packValidity}`
            : undefined,
      };
    case 'targeted':
      return {
        ...base,
        note:
          ritual.addOnPrice != null && ritual.packPrice != null
            ? `30-min add-on ${formatAed(ritual.addOnPrice)} AED ${PLUS_VAT} · Ritual Pack ${ritual.packFormula} — ${formatAed(ritual.packPrice)} AED ${PLUS_VAT}`
            : undefined,
      };
    case 'escape':
    default:
      return { ...base, note: ritual.note || undefined };
  }
}

export type RitualMassagePageRow = {
  price: string;
  price90?: string;
  packLine?: string;
  packNote?: string;
  addOn?: string;
  ritual?: string;
  pack?: string;
  header?: string;
  note?: string;
};

/**
 * `ritualRow(r, 'massagePage')` — the massage page's cards (§4.6). The `targeted` branch returns bare
 * numbers (the page adds "AED + 5% VAT" as a smaller span); every other branch already ends its
 * prices with "AED + 5% VAT" (PLUS_VAT), so callers must not append it again; labels and connecting words that live on the
 * page global itself (e.g. `escape.durationPrefix`) are composed by the page, not here.
 */
export function massagePageRitualRow(ritual: RitualLike): RitualMassagePageRow {
  const price = formatAed(ritual.price);

  switch (ritual.group) {
    case 'full-body':
      return {
        price: `${price} AED ${PLUS_VAT}`,
        price90: ritual.price90 != null ? `${formatAed(ritual.price90)} AED ${PLUS_VAT}` : undefined,
        packLine: ritual.packPrice != null ? `Ritual Pack | ${ritual.packFormula} Included — ${formatAed(ritual.packPrice)} AED ${PLUS_VAT}` : undefined,
        packNote:
          ritual.packPrice != null && ritual.packSessions != null
            ? `Six-session value ${formatAed(ritual.price * ritual.packSessions)} AED · Valid for ${ritual.packValidity}`
            : undefined,
      };
    case 'targeted':
      return {
        price,
        addOn: ritual.addOnPrice != null ? formatAed(ritual.addOnPrice) : undefined,
        ritual: price,
        pack: ritual.packPrice != null ? formatAed(ritual.packPrice) : undefined,
      };
    case 'signature-foot':
      return {
        price,
        header: ritual.durationLong ? `${ritual.durationLong} · ${price} AED ${PLUS_VAT}` : undefined,
      };
    case 'escape':
    default:
      return {
        price: `${price} AED ${PLUS_VAT}`,
        note: ritual.note ? `${ritual.note}.` : undefined,
      };
  }
}

export type PackageSummaryRow = {
  ritualPrice: number;
  sixSessionValue: number;
  packagePrice: number;
  saving: number;
};

/**
 * The Package Pricing Summary table (§2.4): one row per distinct (price, packPrice) pair
 * among active rituals that have a `packPrice`, ascending by price.
 */
export function buildPackageSummary(rituals: RitualLike[]): PackageSummaryRow[] {
  const seen = new Map<string, PackageSummaryRow>();
  for (const ritual of rituals) {
    if (ritual.packPrice == null || ritual.packSessions == null) continue;
    const key = `${ritual.price}:${ritual.packPrice}`;
    if (seen.has(key)) continue;
    seen.set(key, {
      ritualPrice: ritual.price,
      sixSessionValue: ritual.price * ritual.packSessions,
      packagePrice: ritual.packPrice,
      saving: ritual.price * ritual.packSessions - ritual.packPrice,
    });
  }
  return [...seen.values()].sort((a, b) => a.ritualPrice - b.ritualPrice);
}
