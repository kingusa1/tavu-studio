import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';
import { revalidatePath } from 'next/cache';

/**
 * revalidatePath throws when called outside a request context (e.g. a `payload run` script, or
 * a migration) — this is expected there, not a failure, so it is swallowed rather than crashing
 * the caller. See the official revalidatePage.ts pattern (templates/website, payload v3.91.0).
 */
const safeRevalidate = (): void => {
  try {
    revalidatePath('/', 'layout');
  } catch {
    /* no request context — nothing to revalidate */
  }
};

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    safeRevalidate();
  }
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    safeRevalidate();
  }
  return doc;
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    safeRevalidate();
  }
  return doc;
};
