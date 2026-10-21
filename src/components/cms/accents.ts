/**
 * Tailwind class strings selected via `accentSelect(set)` (src/payload/fields/options.ts).
 * Lives under src/components/ rather than src/lib/ so these literal class strings are scanned
 * by Tailwind (tailwind.config.ts content globs — R4); never store a class string itself in
 * the database, only the key.
 */

/** Hero slide background gradient (pre-CMS source: Hero.tsx:15,22,29). */
export const heroAccents = {
  blue: 'from-blue-500/30',
  cyan: 'from-cyan-500/30',
  amber: 'from-amber-500/30',
} as const;

export type PillarAccent = {
  bg: string;
  text: string;
  border: string;
  glow: string;
  gradient: string;
};

/** Home Method pillar color scheme (pre-CMS source: Method.tsx:42-64). */
export const pillarAccents: Record<string, PillarAccent> = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    gradient: 'from-blue-600/90 via-blue-800/70 to-transparent',
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    gradient: 'from-emerald-600/90 via-emerald-800/70 to-transparent',
  },
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    gradient: 'from-amber-600/90 via-amber-800/70 to-transparent',
  },
};

/**
 * Services index / service detail accent colors (blue|emerald|amber|cyan|rose per
 * CMS-Content-Model.md §3.5 services-page). `services/page.tsx` is not converted yet (package
 * C) — left empty; that package adds its keys when it converts the page.
 */
export const serviceAccents: Record<string, string> = {};

export const accents = { hero: heroAccents, pillar: pillarAccents, service: serviceAccents } as const;

export type AccentSetName = keyof typeof accents;
