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
  description: 'TAVÚ — Abu Dhabi\'s first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, mat classes, breathwork, sauna + ice bath, NormaTec compression & massage in Al Raha.',
  keywords: [
    'Reformer Pilates Abu Dhabi',
    'Contrast Therapy Abu Dhabi',
    'Ice Bath Abu Dhabi',
    'Sauna Abu Dhabi',
    'Pilates Al Raha',
    'Wellness Studio Abu Dhabi',
    'NormaTec Abu Dhabi',
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
              description: 'Abu Dhabi\'s first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, breathwork, sauna + ice bath, NormaTec compression and massage.',
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
              email: 'connect@tavustudio.com',
              priceRange: '120 AED - 2,400 AED',
              currenciesAccepted: 'AED',
              paymentAccepted: 'Credit Card, Debit Card',
              areaServed: {
                '@type': 'City',
                name: 'Abu Dhabi',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '21:00',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'TAVÚ Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    price: '160',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Reformer Pilates — Drop-In',
                      description: 'Small-group reformer class, limited to 8 participants. 50 minutes.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '120',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Breathing Room — Drop-In',
                      description: 'Mat Pilates, Yoga, Mobility, Breathwork or Yin class.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '2400',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Unlimited 3-Month Membership',
                      description: 'Unlimited access to all Breathing Room classes. AED 2,400 paid upfront for a 3-month commitment (AED 800/month value). Valid for 3 consecutive months, non-transferable, non-refundable, no rollovers.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '275',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Contrast Therapy — Individual Drop-In',
                      description: 'A 60-minute Contrast Therapy session for one, private or shared, combining sauna heat and a 5–8°C cold plunge.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '456',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Contrast Therapy — Couple',
                      description: 'A 60-minute Contrast Therapy session for two, private or shared.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '600',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Contrast Therapy — Trio',
                      description: 'A 60-minute Contrast Therapy session for three, private or shared.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '1050',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Contrast Therapy — Group (up to 6 guests)',
                      description: 'A 60-minute Contrast Therapy experience for groups of up to six, private or shared.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '160',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'NormaTec Compression Therapy — Individual Session',
                      description: 'A 45-minute Compression Therapy session designed to support circulation, reduce muscle fatigue, and promote recovery through targeted compression. Valid for 7 days.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    price: '660',
                    priceCurrency: 'AED',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'NormaTec Recovery Pack (5+1)',
                      description: 'A recovery pack for consistent care, including five 45-minute Compression Therapy sessions plus one complimentary session. Six sessions total, valid for 45 days. Non-transferable and non-refundable.',
                    },
                  },
                  {
                    '@type': 'AggregateOffer',
                    lowPrice: '300',
                    highPrice: '800',
                    priceCurrency: 'AED',
                    offerCount: '11',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Massage (Ladies Only)',
                      description: 'FLOW Relaxation, RELEASE Deep Tissue, RECOVER Sports and DRAIN Lymphatic full-body rituals (60 or 90 minutes), targeted recovery rituals, ROOTED foot reflexology and the 3-hour Recovery Escape. Ritual Packs 5 + 1 included.',
                    },
                  },
                  {
                    '@type': 'AggregateOffer',
                    lowPrice: '820',
                    highPrice: '1390',
                    priceCurrency: 'AED',
                    offerCount: '2',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Recovery Memberships (Reset & Ritual Unlimited)',
                      description: 'Reset Membership AED 820 (valid 30 days): 4 Contrast Therapy sessions, 1 Compression Therapy session, a complimentary chair massage. Ritual Unlimited Membership AED 1,390 (valid 45 days): Contrast Therapy with 2 Compression Therapy sessions and 2 complimentary chair massages. Choice of Main or Private Contrast.',
                    },
                  },
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
