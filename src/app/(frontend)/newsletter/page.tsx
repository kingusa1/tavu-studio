import type { Metadata } from 'next';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import { getPayloadClient } from '@/lib/cms/payload';
import { loadEmailContext } from '@/lib/email/context';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to the TAVÚ newsletter for new articles, studio news and upcoming events from our Abu Dhabi studio.',
  alternates: { canonical: '/newsletter' },
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ status?: string; e?: string; s?: string; token?: string }>;

export default async function NewsletterPage({ searchParams }: { searchParams: SearchParams }) {
  const { status, e, s, token } = await searchParams;
  const { settings } = await loadEmailContext(await getPayloadClient());
  const nl = settings.newsletter;

  const messages: Record<string, { heading: string; text: string }> = {
    confirmed: { heading: nl.confirmedPageHeading, text: nl.confirmedPageText },
    unsubscribed: { heading: nl.unsubscribedPageHeading, text: nl.unsubscribedPageText },
    invalid: { heading: nl.invalidPageHeading, text: nl.invalidPageText },
    error: { heading: 'Something went wrong', text: 'We could not complete that just now. Please try again in a few minutes.' },
  };
  const message = status ? messages[status] : undefined;

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-36 pb-24">
        {status === 'confirm' && token ? (
          <section className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10 max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-headline text-primary mb-4">Confirm your subscription</h1>
            <p className="text-foreground/70 mb-8">One click and you are on the TAVÚ newsletter.</p>
            <form method="post" action="/api/newsletter/confirm">
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Confirm subscription
              </button>
            </form>
          </section>
        ) : status === 'unsubscribe' && e && s ? (
          <section className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10 max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-headline text-primary mb-4">Unsubscribe from the newsletter?</h1>
            <p className="text-foreground/70 mb-8 break-words">
              <span className="font-medium text-primary">{e}</span> will no longer receive the TAVÚ newsletter.
            </p>
            <form method="post" action="/api/newsletter/unsubscribe">
              <input type="hidden" name="e" value={e} />
              <input type="hidden" name="s" value={s} />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Unsubscribe
              </button>
            </form>
          </section>
        ) : message ? (
          <section className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10 max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-headline text-primary mb-4">{message.heading}</h1>
            <p className="text-foreground/70 leading-relaxed mb-8">{message.text}</p>
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Go to the blog
            </Link>
          </section>
        ) : (
          <>
            <h1 className="sr-only">TAVÚ newsletter</h1>
            <NewsletterSignup source="newsletter-page" />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
