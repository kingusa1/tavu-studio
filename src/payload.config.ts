import { timingSafeEqual } from 'node:crypto';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
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

// Falls back to the production hostname so a missing env var fails safe to a known-good
// origin rather than to an empty string (which would make csrf/serverURL permissive).
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://tavustudio.com';
const csrfOrigins = [serverURL];
if (process.env.NODE_ENV !== 'production') {
  csrfOrigins.push('http://localhost:3000');
}

// SEC-01: the pooler's TLS chain is self-signed at its root (Supabase Root 2021 CA /
// Supabase Intermediate 2021 CA — observed via `openssl s_client -starttls postgres`), so
// `rejectUnauthorized: true` requires this exact CA or every connection fails closed. When the
// integrator hasn't set SUPABASE_DB_CA_CERT yet (e.g. a fresh local checkout), fail open with a
// loud warning rather than crash the whole app — still opportunistically encrypted, just
// unverified, matching the task's documented fallback for "verification cannot be made to work."
const supabaseDbCaCert = process.env.SUPABASE_DB_CA_CERT;
const poolSsl = supabaseDbCaCert
  ? { ca: supabaseDbCaCert, rejectUnauthorized: true }
  : (() => {
      console.warn(
        '[payload.config] SUPABASE_DB_CA_CERT is not set — falling back to ssl.rejectUnauthorized: false. ' +
          'Set SUPABASE_DB_CA_CERT (see tmp/secrets/supabase-ca.pem) to verify the database TLS certificate.',
      );
      return { rejectUnauthorized: false };
    })();

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
  // Default editor (fields without their own): internal links may only point at blog posts, so an
  // editor cannot pull a private document (contact message, user) into a public page.
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((feature) => feature.key !== 'link'),
      LinkFeature({ enabledCollections: ['posts'] }),
    ],
  }),
  // Admin emails (password reset, user invitations) and every website email go through Resend
  // from the verified tavustudio.com domain. Without a key (local dev) Payload logs emails instead.
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'connect@tavustudio.com',
          defaultFromName: process.env.EMAIL_FROM_NAME || 'TAVÚ Wellness Studio',
        }),
      }
    : {}),
  secret: payloadSecret,
  serverURL,
  csrf: csrfOrigins,
  graphQL: { disable: true },
  // Scheduled publishing (Posts: drafts.schedulePublish) queues jobs; Vercel Cron runs them via
  // GET /api/payload-jobs/run every 15 minutes (vercel.json), authorised with CRON_SECRET.
  jobs: {
    access: {
      run: ({ req }) => {
        if (req.user?.role === 'admin') return true;
        const secret = process.env.CRON_SECRET;
        const given = Buffer.from(req.headers.get('authorization') ?? '');
        const expected = Buffer.from(`Bearer ${secret ?? ''}`);
        return Boolean(secret) && given.length === expected.length && timingSafeEqual(given, expected);
      },
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
      ssl: poolSsl,
      // Serverless defaults (Vercel functions); seed/migrate scripts may raise them via env.
      max: Number(process.env.PAYLOAD_DB_POOL_MAX) || 3,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: Number(process.env.PAYLOAD_DB_CONNECT_TIMEOUT_MS) || 10_000,
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
