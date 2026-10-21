import type { CollectionConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: authenticated,
  },
  upload: {
    // Narrowed from ['image/*', 'video/mp4', 'application/pdf'] (EGR-02/SEC-11): the seed data
    // and the whole frontend (checked: no <video>, no .pdf reference anywhere in src/) only
    // ever use png/webp/jpg/jpeg; svg and arbitrary video/pdf were unused attack surface
    // (an SVG can carry a script, hosted on a different origin).
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    focalPoint: true,
    // No imageSizes: next/image already resizes on demand at request time, so
    // Payload doesn't need to pre-generate a fixed set of derivative files.
    // Admin-only thumbnail goes through /_next/image instead of the full-size Supabase
    // original (EGR-02 — the media library was pulling ~4.7MB of full-size originals).
    adminThumbnail: ({ doc }) =>
      typeof doc.url === 'string' ? `/_next/image?url=${encodeURIComponent(doc.url)}&w=384&q=75` : null,
    // NOTE: Payload 3.91's UploadConfig type has no `limits.fileSize` option (checked
    // node_modules/payload/dist/uploads/types.d.ts — no `limits` key exists at all). The
    // server-wide multipart default is 20MB/file (fetchAPI-multipart/index.js), which this
    // version cannot override per-collection; flagged in the report rather than faked.
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
