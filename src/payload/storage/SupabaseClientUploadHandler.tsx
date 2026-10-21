'use client';

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client';
import { formatAdminURL } from 'payload/shared';

/**
 * Registered into the admin import map (via initClientUploads, see supabase.ts) so the
 * upload UI PUTs large files directly to Supabase Storage, bypassing Vercel's 4.5 MB request
 * body limit on this server's upload route. The service-role key never reaches the browser:
 * supabaseClientUploadRoute.ts does the authorization + signing, this component only receives
 * back a short-lived signed URL.
 */
export const SupabaseClientUploadHandler = createClientUploadHandler({
  handler: async ({ apiRoute, collectionSlug, docPrefix, file, serverHandlerPath, serverURL, updateFilename }) => {
    const endpointRoute = formatAdminURL({ apiRoute, path: serverHandlerPath, serverURL });

    const issued = await fetch(endpointRoute, {
      body: JSON.stringify({
        collectionSlug,
        docPrefix,
        filename: file.name,
        filesize: file.size,
        mimeType: file.type,
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (!issued.ok) {
      throw new Error('Failed to initialize Supabase client upload');
    }
    const { filename, prefix, uploadUrl } = (await issued.json()) as {
      filename: string;
      prefix?: string;
      uploadUrl: string;
    };
    updateFilename(filename);

    // The anon key is Supabase's public, RLS-scoped key — safe in client code. It satisfies
    // Supabase's API-gateway requirement for an `apikey` header; the signed token in `uploadUrl`
    // is what actually authorizes writing to this exact object path.
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const putResponse = await fetch(uploadUrl, {
      body: file,
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        ...(anonKey ? { apikey: anonKey } : {}),
      },
      method: 'PUT',
    });
    if (!putResponse.ok) {
      throw new Error('Supabase upload failed');
    }

    return { prefix };
  },
});
