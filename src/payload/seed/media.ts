// Seeds the 31 images referenced from src/ into the Media collection (§2.2). Idempotent:
// matches an existing doc by `filename` first, so re-running `npm run seed` never
// re-uploads or duplicates a file — it only needs to upload once per environment/schema.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Payload } from 'payload';

type MediaSeedEntry = { filename: string; alt: string };

const MEDIA_FILES: MediaSeedEntry[] = [
  { filename: 'logo.png', alt: 'TAVÚ Wellness logo' },
  { filename: 'opengraph-image.png', alt: 'TAVÚ Studio — Abu Dhabi' },
  { filename: 'background.webp', alt: 'TAVÚ Studio ambient background' },
  { filename: 'hero-reformer-studio.webp', alt: 'TAVÚ Movement Classes — Reformer studio' },
  { filename: 'hero-ice-baths.webp', alt: 'TAVÚ ice bath contrast therapy' },
  { filename: 'hero-entrance-sign.webp', alt: 'TAVÚ Studio entrance sign' },
  { filename: 'reformer-room-new.webp', alt: 'Reformer Room' },
  { filename: 'service-reformer-logo.webp', alt: 'Reformer Studio' },
  { filename: 'service-reformer-mirror.webp', alt: 'Reformer studio mirror wall' },
  { filename: 'service-breathing-props.webp', alt: 'Breathing Room class props' },
  { filename: 'gallery-breathing-room.webp', alt: 'Breathing Room' },
  { filename: 'service-sauna.webp', alt: 'Sauna' },
  { filename: 'gallery-sauna-salt.webp', alt: 'TAVÚ spa facilities' },
  { filename: 'gallery-sauna-infrared.webp', alt: 'Infrared sauna' },
  { filename: 'service-ice-baths.webp', alt: 'Ice bath' },
  { filename: 'service-recovery-equipment.webp', alt: 'NormaTec compression therapy equipment' },
  { filename: 'service-massage-towels.webp', alt: 'Massage Room' },
  { filename: 'about-exterior.webp', alt: 'TAVÚ Studio exterior' },
  { filename: 'about-reception.webp', alt: 'TAVÚ Studio reception' },
  { filename: 'about-lounge.webp', alt: 'TAVÚ Studio lounge' },
  { filename: 'about-entrance.webp', alt: 'TAVÚ Studio entrance' },
  { filename: 'amenity-coffee.webp', alt: 'TAVÚ Studio coffee amenity' },
  { filename: 'ta-grounds-reformer.webp', alt: 'Reformer Pilates at TAVÚ' },
  { filename: 'event-sound-healing-1.webp', alt: 'Sound healing event' },
  { filename: 'event-sound-healing-2.webp', alt: 'Sound healing event' },
  { filename: 'event-alo-1.webp', alt: 'Alo collaboration event' },
  { filename: 'event-alo-2.webp', alt: 'Alo collaboration event' },
  { filename: 'event-beyondlefifth-1.webp', alt: 'Beyond Le Fifth collaboration event' },
  { filename: 'event-beyondlefifth-2.webp', alt: 'Beyond Le Fifth collaboration event' },
  { filename: 'partner-alo-logo.webp', alt: 'Alo partner logo' },
  { filename: 'partner-uae-jiujitsu.webp', alt: 'UAE Jiu-Jitsu partner logo' },
];

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function mimeTypeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_TYPES[ext] ?? 'application/octet-stream';
}

const mediaIds = new Map<string, number>();

/** Looks up a seeded Media doc's id by filename — call `seedMedia()` first. */
export function mediaId(filename: string): number {
  const id = mediaIds.get(filename);
  if (id === undefined) {
    throw new Error(`mediaId("${filename}"): not seeded yet — add it to MEDIA_FILES or run seedMedia() first.`);
  }
  return id;
}

export async function seedMedia(payload: Payload): Promise<void> {
  let created = 0;
  let reused = 0;

  for (const { filename, alt } of MEDIA_FILES) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });

    const existingDoc = existing.docs[0];
    if (existingDoc) {
      mediaIds.set(filename, existingDoc.id);
      reused += 1;
      continue;
    }

    const filePath = path.resolve(process.cwd(), 'public', filename);
    const buffer = await readFile(filePath);

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: mimeTypeFor(filename),
        name: filename,
        size: buffer.length,
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    });
    mediaIds.set(filename, doc.id);
    created += 1;
  }

  payload.logger.info(`seedMedia: ${created} created, ${reused} reused (${mediaIds.size} total)`);
}
