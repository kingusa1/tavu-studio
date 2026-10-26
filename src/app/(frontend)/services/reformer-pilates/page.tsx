import Image from 'next/image';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import PlusVat from '@/components/common/PlusVat';
import VatNote from '@/components/common/VatNote';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import ServiceFaqSection from '@/components/services/ServiceFaqSection';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getClasses } from '@/lib/cms/classes';
import { getGlobal } from '@/lib/cms/globals';
import { buildServiceJsonLd } from '@/lib/cms/jsonLd';
import { resolveImage } from '@/lib/cms/media';
import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getSiteData } from '@/lib/cms/site';
import type { Class, ReformerPilatesPage as ReformerPilatesPageData } from '@/payload-types';

// `getOffers()` is still a package B stub returning `[]`, typed against the stub Offers
// collection (§6) — `offerRow()` expects the real Offer shape that B's merge provides. Same
// bridge as `src/lib/cms/globals.ts` uses for tokens; a no-op once B merges.
function asOfferLike(offer: unknown): OfferLike {
  return offer as OfferLike;
}

const LEVEL_LABELS: Record<string, string> = {
  foundation: 'Foundation',
  'all-levels': 'All Levels',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

function getLevelColor(level?: string | null) {
  switch (level) {
    case 'foundation':
    case 'all-levels':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'intermediate':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'advanced':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-sky-50 text-sky-700 border-sky-200';
  }
}

export default async function ReformerPilatesPage() {
  const [data, classes, offers, { settings }] = await Promise.all([
    getGlobal<ReformerPilatesPageData>('reformer-pilates-page'),
    getClasses('reformer'),
    getOffers({ category: 'reformer', surface: 'servicePage' }),
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
          name: 'Reformer Pilates',
          description: data.seo?.description,
          areaServed: settings.structuredData.areaServed,
          offers: offers.map((offer) => ({ name: offerRow(asOfferLike(offer), 'servicePage').name, price: (offer as { price: number }).price })),
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
        {/* Overview Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              siteUrl={siteUrl}
              items={[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Reformer Pilates', path: '/services/reformer-pilates' },
              ]}
            />
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <MotionWrapper delay={0.1} direction="left">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">{data.overview?.heading}</h2>
                  {data.overview?.paragraphs?.map((p, i) => (
                    <p key={i} className="text-lg text-foreground/70 mb-6 leading-relaxed">
                      {p.text}
                    </p>
                  ))}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {data.overview?.stats?.map((stat, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-5 text-center shadow-sm">
                        <p className="text-4xl font-headline text-accent leading-tight mb-1">{stat.value}</p>
                        <p className="text-sm font-medium text-foreground/70">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={data.overview?.cta?.href || '/schedule'}
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

        {/* Classes Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.classes?.heading}</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.classes?.intro}</p>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {classes.map((cls: Class, index: number) => (
                <MotionWrapper key={cls.id} delay={0.1 * (index + 1)} direction="up">
                  <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-headline text-xl text-primary">{cls.name}</h3>
                      {cls.level && (
                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                          {LEVEL_LABELS[cls.level] ?? cls.level}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 flex-grow">{cls.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-sm text-foreground/60">{cls.durationLabel}</span>
                      <Link href="/schedule" className="text-accent font-medium text-sm hover:underline">
                        Book Now →
                      </Link>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Package Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.packages?.heading}</h2>
                {data.packages?.showVatNote && <VatNote className="text-lg text-foreground/70 max-w-2xl mx-auto" />}
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2} direction="up">
              <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="flex flex-col gap-4 p-6">
                  {offers.map((offer) => {
                    const row = offerRow(asOfferLike(offer), 'servicePage');
                    return (
                      <div key={offer.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30">
                        <div>
                          <p className="font-semibold text-primary">{row.name}</p>
                          {row.description && <p className="text-sm text-foreground/60 mt-1">{row.description}</p>}
                          {row.bonus && <p className="text-xs text-accent font-medium mt-1.5">{row.bonus}</p>}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-headline text-xl text-accent">{row.price}</p>
                          <p className="text-xs text-foreground/50 whitespace-nowrap">AED <PlusVat /></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href="/schedule"
                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                  >
                    Book Reformer
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        <ServiceFaqSection topic="reformer-pilates" categorySlug="reformer-pilates" categoryLabel="Reformer Pilates" />

        {/* CTA Section */}
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
