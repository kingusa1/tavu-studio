import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { initClientUploads } from '@payloadcms/plugin-cloud-storage/utilities';
import type { Config } from 'payload';
import type { ClientUploadsConfig, CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';

import { createSupabaseAdapter } from './adapter';
import { getSupabaseClientUploadRoute } from './supabaseClientUploadRoute';
import type { GetSupabaseClientUploadRouteArgs } from './supabaseClientUploadRoute';
import type { SupabaseCollectionOption } from './supabaseRest';

export type { SupabaseCollectionOption } from './supabaseRest';

export type SupabaseStorageOptions = {
  /** Keyed by collection slug — `true` for defaults, or `{ prefix }` for a sub-folder. */
  collections: Record<string, SupabaseCollectionOption>;
  bucket: string;
  /**
   * `true` enables client uploads with the default access check (an authenticated user with
   * create access on the collection); pass `{ access }` to customize it.
   */
  clientUploads?: ClientUploadsConfig;
  enabled?: boolean;
  serviceRoleKey: string;
  supabaseUrl: string;
};

/**
 * Supabase Storage adapter for @payloadcms/plugin-cloud-storage — same plugin shape as
 * @payloadcms/storage-vercel-blob (see tmp/pkg reference pack), built on the plain Supabase
 * Storage REST API (supabaseRest.ts) instead of a provider SDK.
 */
export const supabaseStorage = (options: SupabaseStorageOptions) =>
  (incomingConfig: Config): Config => {
    const { bucket, clientUploads, collections, enabled = true, serviceRoleKey, supabaseUrl } = options;

    if (!enabled) {
      return incomingConfig;
    }

    const clientUploadRouteArgs: GetSupabaseClientUploadRouteArgs = {
      bucket,
      collections,
      serviceRoleKey,
      supabaseUrl,
      ...(typeof clientUploads === 'object' ? { access: clientUploads.access } : {}),
    };

    initClientUploads({
      clientHandler: '@/payload/storage/SupabaseClientUploadHandler#SupabaseClientUploadHandler',
      collections,
      config: incomingConfig,
      enabled: Boolean(clientUploads),
      serverHandler: getSupabaseClientUploadRoute(clientUploadRouteArgs),
      serverHandlerPath: '/supabase-client-upload-route',
    });

    const adapter = createSupabaseAdapter({ bucket, clientUploads, serviceRoleKey, supabaseUrl });

    const collectionsWithAdapter = Object.entries(collections).reduce<Record<string, CollectionOptions>>(
      (acc, [slug, collectionOptions]) => ({
        ...acc,
        [slug]: {
          ...(collectionOptions === true ? {} : collectionOptions),
          adapter,
        },
      }),
      {},
    );

    return cloudStoragePlugin({ collections: collectionsWithAdapter })(incomingConfig);
  };
