import type { CollectionConfig } from 'payload';

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'],
    focalPoint: true,
    // No imageSizes: next/image already resizes on demand at request time, so
    // Payload doesn't need to pre-generate a fixed set of derivative files.
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
