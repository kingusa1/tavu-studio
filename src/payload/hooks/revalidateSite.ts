import { revalidatePath } from 'next/cache';
import type { PayloadRequest } from 'payload';

/**
 * Single revalidation hook shared by every content collection's `afterChange`/`afterDelete`
 * and every global's `afterChange` (§5.4, D7). `revalidatePath('/', 'layout')` covers every
 * route because the root layout (site-wide data, JSON-LD) is what changes; `/llms.txt` is
 * revalidated separately since it is a route handler, not a page under the root layout.
 *
 * Skipped entirely when `req.context.disableRevalidate` (seed scripts, migrations) — those
 * run outside a Next request context, where `revalidatePath` always throws.
 */
export const revalidateSite = ({ req }: { req: PayloadRequest }): void => {
  if (req.context?.disableRevalidate) return;
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/llms.txt');
  } catch (err) {
    req.payload.logger.warn({ err }, 'revalidate skipped (no Next request context)');
  }
};

/** Alias for collection `afterChange` — same function, named per call site for readability. */
export const revalidateAfterChange = revalidateSite;
/** Alias for collection `afterDelete` — same function, named per call site for readability. */
export const revalidateAfterDelete = revalidateSite;
/** Alias for global `afterChange` — same function, named per call site for readability. */
export const revalidateGlobalAfterChange = revalidateSite;
