'use client';

import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';

export type NewsletterTexts = {
  eyebrow: string;
  heading: string;
  text: string;
  consent: string;
  success: string;
};

type Props = { source: string; variant?: 'card' | 'inline'; texts: NewsletterTexts };

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done' } | { kind: 'error'; message: string };

export default function NewsletterSignupForm({ source, variant = 'card', texts }: Props) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState({ kind: 'sending' });
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(form.get('email') ?? ''),
          firstName: String(form.get('firstName') ?? '') || undefined,
          consent: form.get('consent') === 'on',
          source,
          website: String(form.get('website') ?? '') || undefined,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && result.ok) setState({ kind: 'done' });
      else setState({ kind: 'error', message: result.error || 'Something went wrong. Please try again.' });
    } catch {
      setState({ kind: 'error', message: 'Could not reach the server. Please check your connection and try again.' });
    }
  }

  const wrapper =
    variant === 'card'
      ? 'bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10 max-w-3xl mx-auto'
      : 'max-w-3xl mx-auto';

  return (
    <section aria-labelledby={`${id}-heading`} className={wrapper}>
      <div className="text-center mb-6">
        <p className="text-accent uppercase tracking-[0.25em] text-xs font-semibold mb-3">{texts.eyebrow}</p>
        <h2 id={`${id}-heading`} className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-3">
          {texts.heading}
        </h2>
        <p className="text-foreground/70 max-w-xl mx-auto leading-relaxed">{texts.text}</p>
      </div>

      {state.kind === 'done' ? (
        <p role="status" className="flex items-center justify-center gap-3 rounded-xl bg-muted/60 px-5 py-4 text-center text-primary">
          <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
          {texts.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="relative space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
            <label className="sr-only" htmlFor={`${id}-name`}>
              First name (optional)
            </label>
            <input
              id={`${id}-name`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              maxLength={60}
              placeholder="First name (optional)"
              className="h-12 w-full rounded-full border border-border bg-background/80 px-5 text-base text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <label className="sr-only" htmlFor={`${id}-email`}>
              Email address
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="Your email address"
              className="h-12 w-full rounded-full border border-border bg-background/80 px-5 text-base text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <button
              type="submit"
              disabled={state.kind === 'sending'}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-70"
            >
              {state.kind === 'sending' && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
              Subscribe
            </button>
          </div>

          {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label htmlFor={`${id}-consent`} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
            <input
              id={`${id}-consent`}
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-primary"
            />
            <span>
              {texts.consent}{' '}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </Link>
            </span>
          </label>

          <p aria-live="polite" className="min-h-[1.25rem] text-sm text-red-700">
            {state.kind === 'error' ? state.message : ''}
          </p>
        </form>
      )}
    </section>
  );
}
