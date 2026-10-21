import Image from 'next/image';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import VatNote from '@/components/common/VatNote';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import type { CompressionTherapyPage as CompressionTherapyPageData } from '@/payload-types';

// `getOffers()` is still a package B stub returning `[]`, typed against the stub Offers
// collection (§6) — `offerRow()` expects the real Offer shape that B's merge provides. Same
// bridge as `src/lib/cms/globals.ts` uses for tokens; a no-op once B merges.
function asOfferLike(offer: unknown): OfferLike {
  return offer as OfferLike;
}

export default async function CompressionTherapyPage() {
  const [data, packages] = await Promise.all([
    getGlobal<CompressionTherapyPageData>('compression-therapy-page'),
    getOffers({ category: 'compression', surface: 'servicePage' }),
  ]);

  const heroImage = resolveImage(data.hero?.image);
  const cardImage = resolveImage(data.overview?.card?.image);
  const [individual, pack] = packages;
  const individualRow = individual ? offerRow(asOfferLike(individual), 'bigCard') : undefined;
  const packRow = pack ? offerRow(asOfferLike(pack), 'bigCard') : undefined;

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="tone-dark relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className={`object-cover ${data.hero?.imagePosition === 'center-40' ? 'object-[center_40%]' : ''}`}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <MotionWrapper delay={0} direction="up">
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{data.hero?.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{data.hero?.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">{data.hero?.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        {/* Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <MotionWrapper delay={0.1} direction="left">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">{data.overview?.heading}</h2>
                  {data.overview?.paragraphs?.map((p, i) => (
                    <p key={i} className="text-lg text-foreground/70 mb-6 leading-relaxed last:mb-8">
                      {p.text}
                    </p>
                  ))}
                  <Link
                    href={data.overview?.cta?.href || '/appointments'}
                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                  >
                    {data.overview?.cta?.label}
                  </Link>
                </div>
              </MotionWrapper>
              <MotionWrapper delay={0.2} direction="right">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  {cardImage && <Image src={cardImage.src} alt={cardImage.alt} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="tone-dark absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">{data.overview?.card?.eyebrow}</p>
                    <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">{data.overview?.card?.titleLine1}</h3>
                    <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">{data.overview?.card?.titleLine2}</h3>
                    <ul className="space-y-1.5">
                      {data.overview?.card?.bullets?.map((bullet, i) => (
                        <li key={i} className="text-white/80 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                          {bullet.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.pricing?.heading}</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.pricing?.intro}</p>
              </div>
            </MotionWrapper>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
              {individualRow && (
                <MotionWrapper delay={0.2} direction="up">
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-xl h-full">
                    <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                      <div>
                        <h3 className="font-headline text-2xl text-primary">{individualRow.name}</h3>
                        {individualRow.subtitle && <p className="text-sm text-foreground/60 mt-1">{individualRow.subtitle}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-headline text-3xl text-accent">{individualRow.price}</p>
                        <p className="text-xs text-foreground/50">AED</p>
                      </div>
                    </div>

                    {individualRow.description && <p className="text-sm text-foreground/70 mb-6">{individualRow.description}</p>}

                    {individualRow.benefits && individualRow.benefits.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{data.pricing?.benefitsHeading}</p>
                        <ul className="space-y-2">
                          {individualRow.benefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0" />
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {individualRow.recommendedFor && individualRow.recommendedFor.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{data.pricing?.recommendedHeading}</p>
                        <ul className="space-y-2">
                          {individualRow.recommendedFor.map((r, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0" />
                              {r.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={data.pricing?.ctaHref || '/appointments'}
                      className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                    >
                      {data.pricing?.individualCtaLabel}
                    </Link>
                  </div>
                </MotionWrapper>
              )}

              {/* NormaTec Recovery Pack */}
              {packRow && (
                <MotionWrapper delay={0.3} direction="up">
                  <div className="bg-card border border-accent/30 rounded-2xl p-8 shadow-xl h-full">
                    <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                      <div>
                        <h3 className="font-headline text-2xl text-primary">{packRow.name}</h3>
                        {packRow.subtitle && <p className="text-sm text-foreground/60 mt-1">{packRow.subtitle}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-headline text-3xl text-accent">{packRow.price}</p>
                        <p className="text-xs text-foreground/50">AED</p>
                      </div>
                    </div>

                    {packRow.description && <p className="text-sm text-foreground/70 mb-6">{packRow.description}</p>}

                    {packRow.includes && packRow.includes.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{packRow.includesHeading}</p>
                        <ul className="space-y-2">
                          {packRow.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {packRow.notes && packRow.notes.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{packRow.notesHeading}</p>
                        <ul className="space-y-2">
                          {packRow.notes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0 mt-2" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={data.pricing?.ctaHref || '/appointments'}
                      className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                    >
                      {data.pricing?.packCtaLabel}
                    </Link>
                  </div>
                </MotionWrapper>
              )}
            </div>
            {data.pricing?.showVatNote && <VatNote className="text-sm text-foreground/60 text-center mt-8" />}
          </div>
        </section>

        {/* Pair With Contrast Therapy */}
        {data.pairWith && (
          <section className="py-16 bg-accent/5">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h3 className="text-2xl md:text-3xl font-headline text-primary mb-4">{data.pairWith.heading}</h3>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">{data.pairWith.text}</p>
                <Link
                  href={data.pairWith.link?.href || '/services/contrast-therapy'}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-primary/40 text-primary font-semibold hover:bg-primary/5 transition-all"
                >
                  {data.pairWith.link?.label}
                </Link>
              </MotionWrapper>
            </div>
          </section>
        )}

        {/* CTA */}
        {data.cta?.enabled && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">{data.cta.heading}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                {data.cta.buttons?.map((button, index) => (
                  <Link
                    key={index}
                    href={button.link.href}
                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                  >
                    {button.link.label}
                  </Link>
                ))}
              </MotionWrapper>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
