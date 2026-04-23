import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import ScrollProgress from '@/components/common/ScrollProgress';
import MetaPixel from '@/components/analytics/MetaPixel';

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


export const metadata: Metadata = {
  metadataBase: new URL('https://tavustudio.com'),
  title: {
    default: 'TAVÚ | Abu Dhabi\'s First Private Reformer Pilates & Contrast Therapy Studio',
    template: '%s | TAVÚ Studio',
  },
  description: 'TAVÚ — Abu Dhabi\'s first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, mat classes, breathwork, sauna + ice bath, NormaTec compression, massage & IV therapy in Al Raha.',
  keywords: [
    'Reformer Pilates Abu Dhabi',
    'Contrast Therapy Abu Dhabi',
    'Ice Bath Abu Dhabi',
    'Sauna Abu Dhabi',
    'Pilates Al Raha',
    'Wellness Studio Abu Dhabi',
    'NormaTec Abu Dhabi',
    'IV Therapy Abu Dhabi',
    'Massage Abu Dhabi',
    'Breathwork Abu Dhabi',
    'TAVU Studio',
  ],
  authors: [{ name: 'TAVÚ Studio' }],
  creator: 'TAVÚ Studio',
  publisher: 'TAVÚ Studio',
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
    locale: 'en_AE',
    url: 'https://tavustudio.com',
    siteName: 'TAVÚ Studio',
    title: 'TAVÚ | Abu Dhabi\'s First Private Reformer Pilates & Contrast Therapy Studio',
    description: 'Reformer Pilates paired with Contrast Therapy as part of the method. TA — stillness. VU — flow. The balance of both.',
    images: [{
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'TAVÚ Studio — Abu Dhabi',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAVÚ | Abu Dhabi\'s First Private Reformer Pilates & Contrast Therapy Studio',
    description: 'Reformer Pilates paired with Contrast Therapy as part of the method. Book your session at TAVÚ.',
    images: ['/opengraph-image.png'],
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
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    // Add Google Search Console verification when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthClub',
              name: 'TAVÚ Studio',
              alternateName: 'TAVU Studio',
              description: 'Abu Dhabi\'s first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, breathwork, sauna + ice bath, NormaTec compression, massage and IV therapy.',
              url: 'https://tavustudio.com',
              logo: 'https://tavustudio.com/logo.png',
              image: 'https://tavustudio.com/opengraph-image.png',
              telephone: '+971522755551',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Al Raha',
                addressRegion: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              sameAs: [
                'https://www.instagram.com/tavuwellness.studio',
                'https://www.tiktok.com/@tavuwellness.studio',
              ],
              priceRange: '120 AED - 2,300 AED',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '21:00',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'TAVÚ Services',
                itemListElement: [
                  { '@type': 'OfferCatalog', name: 'Reformer Pilates' },
                  { '@type': 'OfferCatalog', name: 'Breathing Room (Mat Pilates, Yoga, Breathwork, Mobility, Yin)' },
                  { '@type': 'OfferCatalog', name: 'Contrast Therapy (Sauna + Ice Bath)' },
                  { '@type': 'OfferCatalog', name: 'Compression Therapy (NormaTec)' },
                  { '@type': 'OfferCatalog', name: 'Massage (Ladies Only)' },
                  { '@type': 'OfferCatalog', name: 'IV Therapy' },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable)} suppressHydrationWarning>
        <MetaPixel />
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
