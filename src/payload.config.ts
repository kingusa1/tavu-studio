import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { collections } from './payload/collections';
import { globals } from './payload/globals';
import { supabaseStorage } from './payload/storage/supabase';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Fail fast with a clear message rather than booting with a half-configured CMS. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable ${name}. Set it in .env.local (see .env.example).`);
  }
  return value;
}

const databaseUri = requireEnv('DATABASE_URI');
const payloadSecret = requireEnv('PAYLOAD_SECRET');
const supabaseUrl = requireEnv('SUPABASE_URL');
const supabaseServiceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const supabaseBucket = requireEnv('SUPABASE_BUCKET');
// Optional sub-folder for the media collection's objects — empty in production (bucket
// root), set per dev worktree (e.g. dev-f0) so seed/test uploads never land in the
// production root (step 1 of the F0 brief).
const supabaseStoragePrefix = process.env.SUPABASE_STORAGE_PREFIX || undefined;

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' — TAVÚ CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
      max: 5,
    },
    schemaName: process.env.PAYLOAD_DB_SCHEMA || 'payload',
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    supabaseStorage({
      bucket: supabaseBucket,
      supabaseUrl,
      serviceRoleKey: supabaseServiceRoleKey,
      // Vercel Functions cap request bodies at 4.5 MB; client uploads let the admin UI PUT
      // large media (phone photos, video) straight to Supabase, bypassing that limit.
      clientUploads: true,
      collections: {
        media: { disablePayloadAccessControl: true, prefix: supabaseStoragePrefix },
      },
    }),
  ],
});
