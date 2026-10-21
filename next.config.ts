import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  experimental: {
    // The app now has two parallel root layouts — (frontend) and (payload) —
    // so there is no single root layout for Next to compose a root
    // not-found.tsx through. global-not-found.tsx (src/app/global-not-found.tsx)
    // covers any URL that matches neither route group at all.
    globalNotFound: true,
  },
  // IV Therapy was removed from the service menu (client feedback, Oct 2026) — keep old links working.
  async redirects() {
    return [
      { source: '/services/iv-therapy', destination: '/services', permanent: true },
    ];
  },
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // EGR-03: placehold.co, picsum.photos, cdninstagram.com and fbcdn.net were unused —
    // verified by reading SocialFeed.tsx (the only place that could render them): the
    // Instagram/Behold feed always renders with `unoptimized={isConnected}` (next/image's
    // optimizer, where remotePatterns is enforced, is never invoked for unoptimized images —
    // confirmed in node_modules/next/dist/server/image-optimizer.js), and nothing else in src/
    // references those hostnames. Only the Supabase Storage bucket actually goes through
    // next/image, narrowed from the whole public object tree to the real bucket name.
    remotePatterns: [
      // Supabase Storage public bucket — Payload Media `url` values are
      // direct Supabase public-object URLs (see src/payload/storage/supabase.ts).
      { protocol: 'https', hostname: 'armumywprajdpyyfpvoz.supabase.co', port: '', pathname: '/storage/v1/object/public/media/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
