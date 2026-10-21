import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import VatNote from '@/components/common/VatNote';

import { FeaturedOfferCard } from '@/components/pricing/FeaturedOfferCard';
import { getOffers } from '@/lib/cms/offers';
import { getRituals } from '@/lib/cms/massageRituals';
import { offerRow, pricingRitualRow } from '@/lib/cms/offerText';
import type { OfferLike, RitualLike } from '@/lib/cms/offerText';
import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import type { PricingPage as PricingPageData } from '@/payload-types';
import type { GlobalSlug } from 'payload';

function PriceRow({
  name,
  price,
  description,
  note,
  bonus,
  duration,
  period,
}: {
  name: string;
  price: string;
  description?: string;
  note?: string;
  bonus?: string;
  duration?: string;
  period?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex-grow">
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-sm text-foreground/60 mt-1">
          {duration && <span className="text-foreground/50">({duration}) </span>}
          {description}
        </p>
        {bonus && <p className="text-xs text-accent font-medium mt-1.5">{bonus}</p>}
        {note && <p className="text-xs text-foreground/40 mt-1">{note}</p>}
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-headline text-xl text-accent">{price}</p>
        <p className="text-xs text-foreground/50 whitespace-nowrap">{period ? `AED / ${period}` : 'AED'}</p>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  children,
  bookLabel,
  bookHref,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bookLabel: string;
  bookHref: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
        <h2 className="font-headline text-2xl mb-0.5">{title}</h2>
        {subtitle && <p className="text-sm text-primary-foreground/70">{subtitle}</p>}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-grow">{children}</div>
      <div className="px-5 pb-5 mt-auto">
        <Link
          href={bookHref}
          className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
        >
          {bookLabel}
        </Link>
      </div>
    </div>
  );
}

export default async function PricingPage() {
  const [data, { settings }, reformerOffers, breathingOffers, contrastOffers, compressionOffers, bundleOffers, membershipOffers, rituals] =
    await Promise.all([
      getGlobal<PricingPageData>('pricing-page' as GlobalSlug),
      getSiteData(),
      getOffers({ category: 'reformer', surface: 'pricing' }),
      getOffers({ category: 'breathing-room', surface: 'pricing' }),
      getOffers({ category: 'contrast', surface: 'pricing' }),
      getOffers({ category: 'compression', surface: 'pricing' }),
      getOffers({ category: 'bundle', surface: 'pricing' }),
      getOffers({ category: 'membership', surface: 'pricing' }),
      getRituals(),
    ]);

  const priceCard = (category: string) => settings.priceCards?.find((card) => card.category === category);
  const reformerCard = priceCard('reformer');
  const breathingCard = priceCard('breathing-room');
  const contrastCard = priceCard('contrast');
  const compressionCard = priceCard('compression');
  const massageCard = priceCard('massage');
  const bundleCard = priceCard('bundle');
  const membershipCard = priceCard('membership');

  const compressionIndividual = compressionOffers.find((offer) => offer.slug === 'compression-individual');
  const featuredBreathing = breathingOffers.find((offer) => offer.featureCard?.enabled);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <MotionWrapper delay={0} direction="up">
            <div className="text-center mb-14">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-primary">{data.header?.title}</h1>
              {data.header?.showVatNote && <VatNote className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" />}
            </div>
          </MotionWrapper>

          {/* Reformer & Breathing Room */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <MotionWrapper delay={0.1} direction="up">
              <PricingCard
                title={reformerCard?.title ?? ''}
                subtitle={reformerCard?.subtitle ?? undefined}
                bookLabel={reformerCard?.ctaLabel ?? ''}
                bookHref={reformerCard?.ctaHref ?? '#'}
              >
                {reformerOffers.map((offer) => (
                  <PriceRow key={offer.id} {...offerRow(offer as unknown as OfferLike, 'pricing')} />
                ))}
              </PricingCard>
            </MotionWrapper>
            <MotionWrapper delay={0.15} direction="up">
              <PricingCard
                title={breathingCard?.title ?? ''}
                subtitle={breathingCard?.subtitle ?? undefined}
                bookLabel={breathingCard?.ctaLabel ?? ''}
                bookHref={breathingCard?.ctaHref ?? '#'}
              >
                {breathingOffers
                  .filter((offer) => !offer.featureCard?.enabled)
                  .map((offer) => (
                    <PriceRow key={offer.id} {...offerRow(offer as unknown as OfferLike, 'pricing')} />
                  ))}
              </PricingCard>
            </MotionWrapper>
          </div>

          {/* Featured offers (e.g. the Unlimited 3-Month Membership, when active) */}
          {featuredBreathing?.featureCard && (
            <MotionWrapper delay={0.1} direction="up">
              <FeaturedOfferCard offer={{ ...featuredBreathing, featureCard: featuredBreathing.featureCard }} />
            </MotionWrapper>
          )}

          {/* Contrast Therapy & Compression */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <MotionWrapper delay={0.1} direction="up">
              <PricingCard
                title={contrastCard?.title ?? ''}
                subtitle={contrastCard?.subtitle ?? undefined}
                bookLabel={contrastCard?.ctaLabel ?? ''}
                bookHref={contrastCard?.ctaHref ?? '#'}
              >
                {contrastOffers.map((offer) => (
                  <PriceRow key={offer.id} {...offerRow(offer as unknown as OfferLike, 'pricing')} />
                ))}
              </PricingCard>
            </MotionWrapper>
            <MotionWrapper delay={0.15} direction="up">
              <PricingCard
                title={compressionCard?.title ?? ''}
                subtitle={compressionCard?.subtitle ?? undefined}
                bookLabel={compressionCard?.ctaLabel ?? ''}
                bookHref={compressionCard?.ctaHref ?? '#'}
              >
                {compressionOffers.map((offer) => (
                  <PriceRow key={offer.id} {...offerRow(offer as unknown as OfferLike, 'pricing')} />
                ))}
                {compressionIndividual?.benefits && compressionIndividual.benefits.length > 0 && (
                  <div className="p-4 rounded-xl bg-muted/20">
                    <p className="text-sm font-medium text-primary mb-2">{data.cards?.compressionBenefitsHeading}</p>
                    <ul className="space-y-1 text-sm text-foreground/60">
                      {compressionIndividual.benefits.map((item) => (
                        <li key={item.id}>{`- ${item.text}`}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {compressionIndividual?.recommendedFor && compressionIndividual.recommendedFor.length > 0 && (
                  <div className="p-4 rounded-xl bg-muted/20">
                    <p className="text-sm font-medium text-primary mb-2">{data.cards?.compressionRecommendedHeading}</p>
                    <ul className="space-y-1 text-sm text-foreground/60">
                      {compressionIndividual.recommendedFor.map((item) => (
                        <li key={item.id}>{`- ${item.text}`}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </PricingCard>
            </MotionWrapper>
          </div>

          {/* Massage & Bundles */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <MotionWrapper delay={0.1} direction="up">
              <PricingCard
                title={massageCard?.title ?? ''}
                subtitle={massageCard?.subtitle ?? undefined}
                bookLabel={massageCard?.ctaLabel ?? ''}
                bookHref={massageCard?.ctaHref ?? '#'}
              >
                {rituals.map((ritual) => {
                  const row = pricingRitualRow(ritual as unknown as RitualLike);
                  return <PriceRow key={ritual.id} name={ritual.name} price={String(ritual.price)} {...row} />;
                })}
              </PricingCard>
            </MotionWrapper>
            <MotionWrapper delay={0.15} direction="up">
              <PricingCard
                title={bundleCard?.title ?? ''}
                subtitle={bundleCard?.subtitle ?? undefined}
                bookLabel={bundleCard?.ctaLabel ?? ''}
                bookHref={bundleCard?.ctaHref ?? '#'}
              >
                {bundleOffers.map((offer) => (
                  <PriceRow key={offer.id} {...offerRow(offer as unknown as OfferLike, 'pricing')} />
                ))}
              </PricingCard>
            </MotionWrapper>
          </div>

          {/* Memberships */}
          {data.memberships?.enabled && (
            <MotionWrapper delay={0.1} direction="up">
              <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
                <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
                  <h2 className="font-headline text-2xl mb-0.5">{data.memberships.heading}</h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {membershipOffers.map((offer) => {
                      const row = offerRow(offer as unknown as OfferLike, 'membership');
                      return (
                        <div key={offer.id} className="p-5 rounded-xl bg-muted/30 flex flex-col">
                          <p className="font-semibold text-primary text-lg mb-1">{row.name}</p>
                          <p className="mb-3">
                            <span className="text-xs text-foreground/50 mr-1">AED</span>
                            <span className="font-headline text-3xl text-accent">{row.price}</span>
                            <span className="text-xs text-foreground/50 ml-2">| {row.validityLine}</span>
                          </p>
                          <p className="text-sm text-foreground/70 mb-4">{row.description}</p>
                          <ul className="space-y-2">
                            {(row.includes ?? []).map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                                <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      href={membershipCard?.ctaHref ?? '/contact'}
                      className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                    >
                      {membershipCard?.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          )}

          {/* CTA */}
          {data.cta?.enabled && (
            <MotionWrapper delay={0.2} direction="up">
              <div className="text-center p-10 glass rounded-3xl">
                <h3 className="text-2xl md:text-3xl font-headline mb-4 text-primary">{data.cta.heading}</h3>
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(data.cta.buttons ?? []).map((button) => (
                    <Link
                      key={button.id ?? button.link.href}
                      href={button.link.href}
                      className={
                        button.style === 'outline'
                          ? 'inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-lg'
                          : 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg'
                      }
                    >
                      {button.link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
