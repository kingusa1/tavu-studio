// Server-only: resolves an `image()` field group (src/payload/fields/image.ts) into plain
// props a `next/image` caller can spread directly (§4.3).

import type { Media } from '@/payload-types';

export type ImageFieldValue = {
  media?: Media | number | null;
  alt?: string | null;
} | null | undefined;

export type ResolvedImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * `depth: 1` (used everywhere in this query layer) always populates `media` into the full
 * `Media` document — the `number` branch only guards against a caller passing depth 0 data.
 */
export function resolveImage(field: ImageFieldValue): ResolvedImage | null {
  const media = field?.media;
  if (!media || typeof media === 'number' || !media.url) return null;

  return {
    src: media.url,
    alt: field?.alt || media.alt,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  };
}
