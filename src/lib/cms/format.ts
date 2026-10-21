// Server-only: pure formatting helpers for the query layer (§4.4). No Payload/DB access here.

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export type AedStyle = 'number' | 'suffix' | 'prefix' | 'schema';

/**
 * One formatter, four observed styles (§4.4). Uses the fixed `en-US` locale (not `en-AE` or
 * the runtime default) so server and client output match — avoids hydration drift.
 */
export function formatAed(value: number, style: AedStyle = 'number'): string {
  const n = nf.format(value); // 1550 -> "1,550", 820 -> "820"
  switch (style) {
    case 'suffix':
      return `${n} AED`; // massage:16 "350 AED", recovery:31 "From 275 AED"
    case 'prefix':
      return `AED ${n}`; // massage:446-449 "AED 1,620"
    case 'schema':
      return String(value); // layout.tsx:174,224 "160", "1050" (no separator)
    default:
      return n; // Packages:114, pricing:99, classes:177 "1,550" + separate "AED" label
  }
}
