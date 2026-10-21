// Next.js 16 global-not-found convention (experimental, enabled via
// next.config.ts `experimental.globalNotFound`). Required because this app
// now has TWO parallel root layouts — (frontend) and (payload) — so there is
// no single root layout Next.js can compose a root `not-found.tsx` through
// for a URL that matches neither route group at all (e.g. /this-does-not-exist).
// This file bypasses both route groups entirely, so it must provide its own
// <html>/<body> and import the globals it needs directly.
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
import type { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BackgroundImage from '@/components/common/BackgroundImage';
import './(frontend)/globals.css';

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
  title: 'Page Not Found | TAVÚ Studio',
  description: 'The path you are looking for has wandered off.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', fontHeadline.variable, fontBody.variable)} suppressHydrationWarning>
        <div className="flex flex-col min-h-dvh items-center justify-center bg-transparent text-foreground relative overflow-hidden">
          <BackgroundImage />
          <div className="relative z-10 text-center px-4">
            <p className="text-6xl md:text-8xl font-headline text-primary mb-2" aria-hidden="true">404</p>
            <h1 className="text-2xl md:text-3xl font-body text-primary mb-6">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-serif">
              The path you are looking for has wandered off. <br /> Let us guide you back to the center.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
