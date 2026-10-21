import Link from 'next/link';

import { RichText } from '@/components/cms/RichText';
import type { Offer } from '@/payload-types';

export type FeaturedOfferCardProps = {
  offer: Pick<Offer, 'name' | 'includesHeading' | 'includes'> & { featureCard: NonNullable<Offer['featureCard']> };
};

/**
 * Full-width card for an offer with `featureCard.enabled` (CMS-Content-Model.md §2.3) — e.g.
 * the Unlimited 3-Month Membership. Markup recovered verbatim from
 * `git show 1d256b0^:src/app/pricing/page.tsx` L172-216. Rendered on pricing, classes and
 * service pages instead of a plain row (package B owns this component; A and C import it).
 * `includesHeading`/`includes` are the offer's own top-level fields (shared with memberships,
 * §2.3) — `featureCard` carries only the subtitle, body, policy and CTA.
 */
export function FeaturedOfferCard({ offer }: FeaturedOfferCardProps) {
  const { name, includesHeading, includes, featureCard } = offer;
  const items = includes ?? [];

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
      <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
        <h2 className="font-headline text-2xl mb-0.5">{name}</h2>
        {featureCard.subtitle && <p className="text-sm text-primary-foreground/70">{featureCard.subtitle}</p>}
      </div>
      <div className="p-6 md:p-8">
        {featureCard.body && (
          <RichText data={featureCard.body} preset="inline" className="text-base text-foreground/80 leading-relaxed mb-8 [&>p]:mb-4 last:[&>p]:mb-0" />
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {includesHeading && <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{includesHeading}</p>}
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={item.id ?? i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          {featureCard.policyText && (
            <div className="p-5 rounded-xl bg-muted/30">
              {featureCard.policyHeading && (
                <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{featureCard.policyHeading}</p>
              )}
              <p className="text-sm text-foreground/70 leading-relaxed">{featureCard.policyText}</p>
            </div>
          )}
        </div>

        {featureCard.cta?.href && (
          <div className="mt-8 text-center">
            <Link
              href={featureCard.cta.href}
              className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              {featureCard.cta.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
