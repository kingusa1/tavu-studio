#!/usr/bin/env node
// One-off bootstrap: creates the first CMS admin user via the Local API (overrideAccess, so
// Users' "only admins may create users" access control doesn't block the very first one) and
// writes the generated credentials to a file — never to stdout/stderr. Run with:
//   npm run payload -- run scripts/create-first-admin.mjs
import { randomInt } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPayload } from 'payload';

import config from '../src/payload.config.ts';

const ADMIN_EMAIL = 'mohamedhisham735@gmail.com';
const ADMIN_NAME = 'Mohamed Hisham';
// Resolved from this file's own location (not process.cwd()) so it works regardless of where
// `payload run` is invoked from: scripts/ -> payload project root -> tmp/ -> tmp/secrets/.
const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CREDENTIALS_FILE = path.resolve(projectRoot, '../../secrets/cms-admin.txt');

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+?';
const ALL = LOWER + UPPER + DIGITS + SYMBOLS;

function pick(charset) {
  return charset[randomInt(charset.length)];
}

function shuffle(chars) {
  const arr = [...chars];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function generatePassword(length = 20) {
  // Guarantee at least one of each category, then fill the rest randomly, then shuffle —
  // avoids the (tiny but real) chance a purely random draw skips a whole category.
  const required = [pick(LOWER), pick(UPPER), pick(DIGITS), pick(SYMBOLS)];
  const rest = Array.from({ length: length - required.length }, () => pick(ALL));
  return shuffle([...required, ...rest]);
}

async function main() {
  const password = generatePassword(20);
  const payload = await getPayload({ config });

  await payload.create({
    collection: 'users',
    overrideAccess: true,
    data: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: 'admin',
      password,
    },
  });

  await mkdir(path.dirname(CREDENTIALS_FILE), { recursive: true });
  await writeFile(
    CREDENTIALS_FILE,
    `TAVU CMS first admin — generated ${new Date().toISOString()}\nEmail: ${ADMIN_EMAIL}\nPassword: ${password}\n`,
    { mode: 0o600 },
  );

  payload.logger.info(`Admin user created. Credentials written to ${CREDENTIALS_FILE}.`);
}

await main();
