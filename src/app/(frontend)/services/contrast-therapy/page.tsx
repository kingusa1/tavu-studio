import Image from 'next/image';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import VatNote from '@/components/common/VatNote';
import { getIcon } from '@/components/icons/cmsIcons';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import ServiceFaqSection from '@/components/services/ServiceFaqSection';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getGlobal } from '@/lib/cms/globals';
import { buildServiceJsonLd } from '@/lib/cms/jsonLd';
import { resolveImage } from '@/lib/cms/media';
import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getSiteData } from '@/lib/cms/site';
import type { ContrastTherapyPage as ContrastTherapyPageData } from '@/payload-types';

// `getOffers()` is still a package B stub returning `[]`, typed against the stub Offers
// collection (§6) — `offerRow()` expects the real Offer shape that B's merge provides. Same
// bridge as `src/lib/cms/globals.ts` uses for tokens; a no-op once B merges.
function asOfferLike(offer: unknown): OfferLike {
  return offer as OfferLike;
}

export default async function ContrastTherapyPage() {
  const [data, sessions, { settings }] = await Promise.all([
    getGlobal<ContrastTherapyPageData>('contrast-therapy-page'),
    getOffers({ category: 'contrast', surface: 'servicePage' }),
    getSiteData(),
  ]);

  const heroImage = resolveImage(data.hero?.image);
  const cardImage = resolveImage(data.overview?.card?.image);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <JsonLd
        data={buildServiceJsonLd({
          siteUrl,
          name: 'Contrast Therapy',
          description: data.seo?.description,
          areaServed: settings.structuredData.areaServed,
          offers: sessions.map((offer) => ({ name: offerRow(asOfferLike(offer), 'contrastPage').name, price: (offer as { price: number }).price })),
        })}
      />

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
          <MotionWrapper delay={0} direction="up" immediate>
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
            <Breadcrumbs
              siteUrl={siteUrl}
              items={[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Contrast Therapy', path: '/services/contrast-therapy' },
              ]}
            />
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

        {/* Benefits */}
        <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">{data.benefits?.eyebrow}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.benefits?.heading}</h2>
                <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">{data.benefits?.intro}</p>
              </div>
            </MotionWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {data.benefits?.items?.map((benefit, index) => {
                const Icon = benefit.icon ? getIcon('feature', benefit.icon) : undefined;
                return (
                  <MotionWrapper key={index} delay={0.08 * (index + 1)} direction="up">
                    <div className="group bg-white border border-border/50 p-8 rounded-3xl text-center hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-300 h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform duration-300">
                        {Icon && <Icon className="w-8 h-8" />}
                      </div>
                      <h3 className="font-semibold text-primary text-lg mb-3">{benefit.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{benefit.description}</p>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing - Sessions */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.sessions?.heading}</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.sessions?.intro}</p>
                {data.sessions?.showVatNote && <VatNote className="text-sm text-foreground/60 max-w-2xl mx-auto mt-2" />}
              </div>
            </MotionWrapper>

            <div className="max-w-2xl mx-auto">
              <MotionWrapper delay={0.2} direction="up">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="flex flex-col gap-4 p-6">
                    {sessions.map((offer) => {
                      const row = offerRow(asOfferLike(offer), 'contrastPage');
                      return (
                        <div key={offer.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-primary">{row.name}</p>
                              {row.duration && <span className="text-xs text-foreground/50">{row.duration}</span>}
                              {row.badge && <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{row.badge}</span>}
                            </div>
                            {row.description && <p className="text-sm text-foreground/60 mt-1">{row.description}</p>}
                            {row.note && <p className="text-xs text-accent font-medium mt-1.5">{row.note}</p>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-headline text-xl text-accent">{row.price}</p>
                            <p className="text-xs text-foreground/50">AED</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-6 pb-6">
                    <Link
                      href="/appointments"
                      className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                    >
                      Book Contrast Therapy
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
              {data.membershipsNote && (
                <MotionWrapper delay={0.25} direction="up">
                  <p className="text-center text-sm text-foreground/60 mt-6">
                    {data.membershipsNote.prefix}{' '}
                    <Link href={data.membershipsNote.link?.href || '/memberships'} className="text-accent font-medium hover:underline">
                      {data.membershipsNote.link?.label}
                    </Link>
                    {data.membershipsNote.suffix}
                  </p>
                </MotionWrapper>
              )}
            </div>
          </div>
        </section>

        <ServiceFaqSection topic="contrast-therapy" categorySlug="recovery" categoryLabel="Recovery" />

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
