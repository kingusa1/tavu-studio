import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { ContactSubmissions } from './payload/collections/ContactSubmissions';
import { Media } from './payload/collections/Media';
import { Users } from './payload/collections/Users';
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

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — TAVÚ CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ContactSubmissions],
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
        media: { disablePayloadAccessControl: true },
      },
    }),
  ],
});
