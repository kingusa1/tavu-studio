import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import ScrollProgress from '@/components/common/ScrollProgress';

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
  metadataBase: new URL('https://tavustudio.com'), // Replace with your actual domain
  title: 'TAVÚ — Enter the Stillness | Waitlist (Abu Dhabi)',
  description: 'Enter the stillness — TAVÚ opens soon in Al Raha, Abu Dhabi. Join the waitlist for founders’ perks, early booking and a welcome gift. Reformer Pilates, Breathwork and Contrast Therapy blended as ritual.',
  openGraph: {
    title: 'TAVÚ — Enter the Stillness',
    description: 'A sanctuary for presence, breath and ritual. Join the waitlist for early access to TAVÚ studio in Abu Dhabi.',
    images: [{
      url: 'https://picsum.photos/1200/630',
      width: 1200,
      height: 630,
      alt: 'Soft morning light across linen textures in the TAVÚ studio.',
    }]
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
      </head>
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable)} suppressHydrationWarning>
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
