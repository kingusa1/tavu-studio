#!/usr/bin/env node
// Vercel build command (see vercel.json's "buildCommand" and package.json's "ci" script).
//
// Preview deployments must NEVER run migrations against the production database — only
// VERCEL_ENV === 'production' runs `payload migrate`. Every other environment (local `npm run
// ci`, preview deploys, `vercel dev`) skips straight to `next build`.
import { spawn } from 'node:child_process';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });
}

async function main() {
  if (process.env.VERCEL_ENV === 'production') {
    console.log('[vercel-build] VERCEL_ENV=production — running payload migrate');
    await run('npm', ['run', 'payload', '--', 'migrate']);
  } else {
    console.log(`[vercel-build] VERCEL_ENV=${process.env.VERCEL_ENV ?? '(unset)'} — skipping payload migrate`);
  }

  console.log('[vercel-build] running next build');
  await run('npm', ['run', 'build']);
}

main().catch((error) => {
  console.error('[vercel-build] failed:', error.message);
  process.exit(1);
});
