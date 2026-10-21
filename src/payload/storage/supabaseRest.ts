import { APIError } from 'payload';
import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';

/** Shared connection details every helper in this file needs. */
export type SupabaseStorageConnection = {
  bucket: string;
  serviceRoleKey: string;
  supabaseUrl: string;
};

/** The `adapter` key is injected by `supabaseStorage` itself — callers never set it. */
export type SupabaseCollectionOption = Omit<CollectionOptions, 'adapter'> | true;

/** `${SUPABASE_URL}/storage/v1` — the Supabase Storage REST API root. */
export function storageApiBaseUrl({ supabaseUrl }: Pick<SupabaseStorageConnection, 'supabaseUrl'>): string {
  return `${supabaseUrl.replace(/\/+$/, '')}/storage/v1`;
}

/** Percent-encodes each path segment individually so slashes stay as path separators. */
export function encodeObjectPath(storageFilePath: string): string {
  return storageFilePath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

/** Public URL for an object in a public bucket — never used for private buckets. */
export function buildPublicURL({
  bucket,
  storageFilePath,
  supabaseUrl,
}: Pick<SupabaseStorageConnection, 'bucket' | 'supabaseUrl'> & { storageFilePath: string }): string {
  return `${storageApiBaseUrl({ supabaseUrl })}/object/public/${bucket}/${encodeObjectPath(storageFilePath)}`;
}

/**
 * Uploads bytes straight to Supabase Storage with the service-role key.
 * Used for server-side uploads (small admin-panel uploads, seed scripts).
 */
export async function uploadObject({
  bucket,
  buffer,
  mimeType,
  serviceRoleKey,
  storageFilePath,
  supabaseUrl,
}: SupabaseStorageConnection & { buffer: Buffer; mimeType: string; storageFilePath: string }): Promise<void> {
  const res = await fetch(`${storageApiBaseUrl({ supabaseUrl })}/object/${bucket}/${encodeObjectPath(storageFilePath)}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': mimeType || 'application/octet-stream',
      'x-upsert': 'true',
    },
    // Buffer is a Uint8Array at runtime (valid BodyInit for Node's fetch); the mismatch is
    // TS's DOM lib typing of Buffer's generic form, not a real incompatibility.
    body: buffer as unknown as BodyInit,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new APIError(`Supabase Storage upload failed (${res.status}): ${text}`, res.status);
  }
}

/** Deletes a single object. Supabase's delete endpoint 404s silently for a missing object — treated as success. */
export async function deleteObject({
  bucket,
  serviceRoleKey,
  storageFilePath,
  supabaseUrl,
}: SupabaseStorageConnection & { storageFilePath: string }): Promise<void> {
  const res = await fetch(`${storageApiBaseUrl({ supabaseUrl })}/object/${bucket}/${encodeObjectPath(storageFilePath)}`, {
    method: 'DELETE',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });
  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => '');
    throw new APIError(`Supabase Storage delete failed (${res.status}): ${text}`, res.status);
  }
}

/**
 * Mints a signed upload URL + token via Supabase's
 * `POST /object/upload/sign/{bucket}/{path}` endpoint (observed in
 * supabase/storage-js's StorageFileApi.createSignedUploadUrl — the response's
 * relative `url` already carries the token as a query param).
 */
export async function createSignedUploadURL({
  bucket,
  serviceRoleKey,
  storageFilePath,
  supabaseUrl,
}: SupabaseStorageConnection & { storageFilePath: string }): Promise<{ signedUrl: string; token: string }> {
  const baseUrl = storageApiBaseUrl({ supabaseUrl });
  const res = await fetch(`${baseUrl}/object/upload/sign/${bucket}/${encodeObjectPath(storageFilePath)}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'x-upsert': 'true',
    },
    body: '{}',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new APIError(`Supabase Storage signed-upload-url request failed (${res.status}): ${text}`, res.status);
  }
  const data = (await res.json()) as { url?: string };
  if (!data.url) {
    throw new APIError('Supabase Storage did not return a signed upload URL', 500);
  }
  const signedUrl = `${baseUrl}${data.url}`;
  const token = new URL(signedUrl).searchParams.get('token');
  if (!token) {
    throw new APIError('Supabase Storage did not return an upload token', 500);
  }
  return { signedUrl, token };
}
