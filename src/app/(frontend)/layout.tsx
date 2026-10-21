import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import ScrollProgress from '@/components/common/ScrollProgress';
import MetaPixel from '@/components/analytics/MetaPixel';
import { SiteDataProvider } from '@/components/providers/SiteDataProvider';
import { getSiteData } from '@/lib/cms/site';
import { getOffers } from '@/lib/cms/offers';
import { getRituals } from '@/lib/cms/massageRituals';
import { buildJsonLd } from '@/lib/cms/jsonLd';
import type { JsonLdOffer, JsonLdRitual } from '@/lib/cms/jsonLd';
import { resolveImage } from '@/lib/cms/media';

const fontHeadline = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

/**
 * Everything here comes from `site-settings.seo` / `.structuredData` / `.brand` (§5.3) except
 * `icons`, `manifest`, `formatDetection`, `verification` and `robots`, which stay literal —
 * exactly as today.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  const { seo, brand } = settings;

  const resolvedOgImage = resolveImage({ media: seo.ogImage, alt: seo.ogImageAlt });
  const ogImage = resolvedOgImage
    ? { url: resolvedOgImage.src, width: resolvedOgImage.width ?? 1200, height: resolvedOgImage.height ?? 630, alt: resolvedOgImage.alt }
    : { url: '/opengraph-image.png', width: 1200, height: 630, alt: seo.ogImageAlt || 'TAVÚ Studio — Abu Dhabi' };

  return {
    metadataBase: new URL(brand.siteUrl || 'https://tavustudio.com'),
    title: {
      default: seo.titleDefault ?? '',
      template: seo.titleTemplate ?? '%s',
    },
    description: seo.description ?? undefined,
    keywords: seo.keywords && seo.keywords.length > 0 ? seo.keywords : undefined,
    authors: [{ name: brand.siteName ?? '' }],
    creator: brand.siteName ?? undefined,
    publisher: brand.siteName ?? undefined,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: seo.locale ?? 'en_AE',
      url: brand.siteUrl ?? undefined,
      siteName: brand.siteName ?? undefined,
      title: seo.ogTitle || seo.titleDefault || undefined,
      description: seo.ogDescription || seo.description || undefined,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.titleDefault || undefined,
      description: seo.twitterDescription || seo.description || undefined,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
        { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
    verification: {
      // Add Google Search Console verification when available
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteData();
  const [offers, rituals] = await Promise.all([getOffers(), getRituals()]);

  const jsonLd = buildJsonLd({
    settings: siteData.settings,
    offers: offers as unknown as JsonLdOffer[],
    rituals: rituals as unknown as JsonLdRitual[],
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect only to LCP-critical font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for non-critical third-party origins */}
        <link rel="dns-prefetch" href="https://widgets.mindbodyonline.com" />
        <link rel="dns-prefetch" href="https://brandedweb.mindbodyonline.com" />
        <link rel="dns-prefetch" href="https://behold.pictures" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hash) {
                history.scrollRestoration = 'manual';
                history.replaceState(null, '', window.location.pathname);
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable)} suppressHydrationWarning>
        {/* MetaPixel.tsx itself is not in F0's file list (§6) — it keeps its own hardcoded
            pixel ID for now; `settings.analytics.metaPixelId` is seeded and available for
            whichever later step wires it through. */}
        <MetaPixel />
        <ScrollProgress />
        <SiteDataProvider value={siteData}>
          {children}
        </SiteDataProvider>
        <Toaster />
      </body>
    </html>
  );
}
