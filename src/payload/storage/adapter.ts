import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';
import { buildStoragePathData } from '@payloadcms/plugin-cloud-storage/utilities';

import { buildPublicURL, deleteObject, uploadObject } from './supabaseRest';
import type { SupabaseStorageConnection } from './supabaseRest';
import type { ClientUploadsConfig } from '@payloadcms/plugin-cloud-storage/types';

export type CreateSupabaseAdapterArgs = SupabaseStorageConnection & {
  clientUploads?: ClientUploadsConfig;
};

/**
 * Builds the `Adapter` factory @payloadcms/plugin-cloud-storage expects.
 * Mirrors the shape of @payloadcms/storage-vercel-blob's adapter.ts, swapping
 * the Vercel Blob SDK calls for raw Supabase Storage REST calls (supabaseRest.ts).
 */
export function createSupabaseAdapter({ bucket, clientUploads, serviceRoleKey, supabaseUrl }: CreateSupabaseAdapterArgs): Adapter {
  return ({ prefix = '' }) => ({
    name: 'supabase',
    clientUploads,
    generateURL: ({ filename, prefix: urlPrefix = '' }) => {
      const { storageFilePath } = buildStoragePathData({
        collectionPrefix: prefix,
        docPrefix: urlPrefix,
        filename,
      });
      return buildPublicURL({ bucket, storageFilePath, supabaseUrl });
    },
    handleDelete: async ({ storageFilePath }) => {
      await deleteObject({ bucket, serviceRoleKey, storageFilePath, supabaseUrl });
    },
    handleUpload: async ({ data, file, storageFilePath }) => {
      await uploadObject({
        bucket,
        buffer: file.buffer,
        mimeType: file.mimeType,
        serviceRoleKey,
        storageFilePath,
        supabaseUrl,
      });
      return data;
    },
    // disablePayloadAccessControl is set on the collection (see payload.config.ts), so the
    // Media `url` field is always the Supabase public URL — this route is only reachable if
    // something requests the local /api/<collection>/file/:filename path directly, and the
    // content-requirement probe Payload runs for client uploads (see brief item 4 / the
    // getFileFromClientUpload research) follows a redirect response the same way it follows
    // any other upload handler response.
    staticHandler: async (_req, { params: { filename, prefix: urlPrefix } }) => {
      const { storageFilePath } = buildStoragePathData({
        collectionPrefix: prefix,
        docPrefix: urlPrefix,
        filename,
      });
      const publicUrl = buildPublicURL({ bucket, storageFilePath, supabaseUrl });
      return Response.redirect(publicUrl, 302);
    },
  });
}
