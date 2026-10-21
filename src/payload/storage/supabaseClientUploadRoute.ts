import { buildUploadStoragePathData } from '@payloadcms/plugin-cloud-storage/utilities';
import { APIError, Forbidden, type PayloadHandler, type UploadCollectionSlug } from 'payload';
import { assertClientUploadAccess, assertClientUploadAllowed, assertClientUploadFileSize } from 'payload/internal';

import { createSignedUploadURL } from './supabaseRest';
import type { SupabaseCollectionOption, SupabaseStorageConnection } from './supabaseRest';

type ClientUploadAccess = (args: { collectionSlug: UploadCollectionSlug; req: Parameters<PayloadHandler>[0] }) => boolean | Promise<boolean>;

const defaultAccess: ClientUploadAccess = ({ req }) => Boolean(req.user);

export type GetSupabaseClientUploadRouteArgs = SupabaseStorageConnection & {
  access?: ClientUploadAccess;
  collections: Record<string, SupabaseCollectionOption>;
};

/**
 * Server endpoint for Payload's client-upload flow: checks the requesting user is
 * authenticated and has create access on the target collection (assertClientUploadAccess,
 * from payload/internal — the same check Payload's own REST upload path runs), then mints a
 * Supabase signed upload URL+token so the browser can PUT the file bytes directly to Supabase,
 * never touching this server (and never seeing SUPABASE_SERVICE_ROLE_KEY).
 *
 * Unlike @payloadcms/storage-vercel-blob (which needs a second server round-trip because
 * @vercel/blob/client's handleUpload() owns that callback), Supabase's signed-upload-url API is
 * single-phase: this one call is the complete authorization step.
 */
export const getSupabaseClientUploadRoute = ({
  access = defaultAccess,
  bucket,
  collections,
  serviceRoleKey,
  supabaseUrl,
}: GetSupabaseClientUploadRouteArgs): PayloadHandler =>
  async (req) => {
    try {
      const body = (await req.json?.()) as
        | { collectionSlug?: string; docPrefix?: string; filename?: string; filesize?: number; mimeType?: string }
        | undefined;
      const collectionSlug = body?.collectionSlug;
      const filename = body?.filename;
      const mimeType = body?.mimeType;

      if (typeof collectionSlug !== 'string' || typeof filename !== 'string' || !Object.hasOwn(collections, collectionSlug)) {
        throw new APIError('Invalid upload payload', 400);
      }
      // Validated against `collections` (this adapter's own configured slugs) immediately
      // above — safe to narrow to Payload's generated slug union from here on.
      const slug = collectionSlug as UploadCollectionSlug;

      await assertClientUploadAccess({ collectionSlug: slug, req });
      if (!(await access({ collectionSlug: slug, req }))) {
        throw new Forbidden();
      }
      assertClientUploadFileSize(body?.filesize);
      assertClientUploadAllowed({
        collection: req.payload.collections[slug]?.config,
        filename,
        mimeType,
      });

      const collectionConfig = collections[slug];
      const collectionPrefix = (typeof collectionConfig === 'object' && collectionConfig.prefix) || '';
      const { sanitizedDocPrefix, sanitizedFilename, storageFilePath } = buildUploadStoragePathData({
        collectionPrefix,
        docPrefix: body?.docPrefix,
        filename,
      });

      const { signedUrl } = await createSignedUploadURL({ bucket, serviceRoleKey, storageFilePath, supabaseUrl });

      return Response.json({
        filename: sanitizedFilename,
        prefix: sanitizedDocPrefix,
        uploadUrl: signedUrl,
      });
    } catch (error) {
      if (error instanceof APIError || error instanceof Forbidden) {
        throw error;
      }
      req.payload.logger.error(error);
      throw new APIError('Supabase client upload route error');
    }
  };
