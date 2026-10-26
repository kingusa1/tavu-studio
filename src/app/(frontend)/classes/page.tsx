import Image from 'next/image';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import PlusVat from '@/components/common/PlusVat';
import VatNote from '@/components/common/VatNote';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getClasses } from '@/lib/cms/classes';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getPolicies } from '@/lib/cms/policies';
import { getSiteData } from '@/lib/cms/site';
import type { Class, ClassesPage as ClassesPageData } from '@/payload-types';

// `getOffers()` is still a package B stub returning `[]`, typed against the stub Offers
// collection (title + slug only, §6). `offerRow()` expects the real Offer shape (`OfferLike`,
// src/lib/cms/offerText.ts) that package B's merge will provide — this cast is the same
// bridge `src/lib/cms/globals.ts` uses for tokens, and becomes a no-op once B merges.
function asOfferLike(offer: unknown): OfferLike {
  return offer as OfferLike;
}

// Same bridge for the package B Policies stub (§2.6) — real `label`/`text` fields land when B merges.
type PolicyLike = { id: number; label?: string | null; text?: string | null };
function asPolicyLike(policy: unknown): PolicyLike {
  return policy as PolicyLike;
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

export default async function ClassesPage() {
  const [data, reformerOffers, breathingOffers, reformerClasses, breathingClasses, policies, { settings }] = await Promise.all([
    getGlobal<ClassesPageData>('classes-page'),
    getOffers({ category: 'reformer', surface: 'classes' }),
    getOffers({ category: 'breathing-room', surface: 'classes' }),
    getClasses('reformer'),
    getClasses('breathing-room'),
    getPolicies('classes'),
    getSiteData(),
  ]);

  const hero = resolveImage(data.hero?.image);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section with Image */}
      <section className="tone-dark relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 z-10" />
        <div className="absolute inset-0">
          {hero && <Image src={hero.src} alt={hero.alt} fill className="object-cover opacity-60" priority />}
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <MotionWrapper delay={0} direction="up" immediate>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{data.hero?.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">{data.hero?.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        {/* Pricing Section */}
        <section className="py-16 bg-accent/5 border-b border-accent/20">
          <div className="container mx-auto px-4">
            <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'Classes', path: '/classes' }]} />
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-10">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">{data.packages?.eyebrow}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary">{data.packages?.heading}</h2>
                {data.packages?.showVatNote && <VatNote className="text-foreground/60 mt-2" />}
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Reformer Pricing */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
                    <h3 className="font-headline text-xl">Reformer</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {reformerOffers.map((offer) => {
                      const row = offerRow(asOfferLike(offer), 'classes');
                      return (
                        <div key={offer.id} className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-semibold text-primary text-sm">{row.name}</p>
                            {row.description && <p className="text-xs text-foreground/60 mt-0.5">{row.description}</p>}
                            {row.bonus && <p className="text-xs text-accent mt-0.5">{row.bonus}</p>}
                          </div>
                          <p className="font-headline text-lg text-accent">
                            {row.price} <span className="text-xs text-foreground/50">AED <PlusVat /></span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 pb-5">
                    <Link
                      href="/schedule"
                      className="flex items-center justify-center w-full h-11 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-sm"
                    >
                      Book Reformer
                    </Link>
                  </div>
                </div>

                {/* Breathing Room Pricing */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
                    <h3 className="font-headline text-xl">Breathing Room</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {breathingOffers.map((offer) => {
                      const row = offerRow(asOfferLike(offer), 'classes');
                      return (
                        <div key={offer.id} className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-semibold text-primary text-sm">{row.name}</p>
                            {row.description && <p className="text-xs text-foreground/60 mt-0.5">{row.description}</p>}
                            {row.bonus && <p className="text-xs text-accent mt-0.5">{row.bonus}</p>}
                          </div>
                          <p className="font-headline text-lg text-accent">
                            {row.price} <span className="text-xs text-foreground/50">AED <PlusVat /></span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 pb-5">
                    <Link
                      href="/schedule"
                      className="flex items-center justify-center w-full h-11 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-sm"
                    >
                      Book Your Mat
                    </Link>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Class Policies */}
            {data.policies?.enabled && (
              <MotionWrapper delay={0.2} direction="up">
                <div className="max-w-5xl mx-auto mt-8 bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">{data.policies.heading}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                    {policies.map((policy) => {
                      const p = asPolicyLike(policy);
                      return (
                        <div key={p.id} className="flex items-start gap-2">
                          <span className="text-accent font-bold">•</span>
                          <span>
                            <strong>{p.label}</strong> {p.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </MotionWrapper>
            )}
          </div>
        </section>

        {/* Reformer Room Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  {(() => {
                    const img = resolveImage(data.reformerRoom?.image);
                    return img ? <Image src={img.src} alt={img.alt} fill className="object-cover" /> : null;
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div>
                  <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.reformerRoom?.eyebrow}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">{data.reformerRoom?.heading}</h2>
                  <p className="text-lg text-foreground/80 mb-2 font-medium">{data.reformerRoom?.lead}</p>
                  <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">{data.reformerRoom?.body}</p>
                  <Link
                    href={data.reformerRoom?.cta?.href || '/schedule'}
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                  >
                    {data.reformerRoom?.cta?.label}
                  </Link>
                </div>
              </div>
            </MotionWrapper>

            {/* Class Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {reformerClasses.map((cls: Class, index: number) => (
                <MotionWrapper key={cls.id} delay={0.05 * (index + 1)} direction="up">
                  <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{cls.name}</h3>
                      {cls.level && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                          {LEVEL_LABELS[cls.level] ?? cls.level}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed flex-grow">{cls.description}</p>
                    <Link
                      href={data.reformerRoom?.cardCtaHref || '/schedule'}
                      className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-full border border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all text-sm"
                    >
                      {data.reformerRoom?.cardCtaLabel}
                    </Link>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Breathing Room Section */}
        <section className="py-20 lg:py-28 bg-muted/5 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <MotionWrapper delay={0.1} direction="up">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="order-2 lg:order-1">
                  <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.breathingRoom?.eyebrow}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">{data.breathingRoom?.heading}</h2>
                  <p className="text-lg text-foreground/80 mb-2 font-medium">{data.breathingRoom?.lead}</p>
                  <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">{data.breathingRoom?.body}</p>
                  <Link
                    href={data.breathingRoom?.cta?.href || '/schedule'}
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                  >
                    {data.breathingRoom?.cta?.label}
                  </Link>
                </div>
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                  {(() => {
                    const img = resolveImage(data.breathingRoom?.image);
                    return img ? <Image src={img.src} alt={img.alt} fill className="object-cover" /> : null;
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </MotionWrapper>

            {/* Class Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {breathingClasses.map((cls: Class, index: number) => (
                <MotionWrapper key={cls.id} delay={0.05 * (index + 1)} direction="up">
                  <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-primary group-hover:text-accent transition-colors">{cls.name}</h3>
                      {cls.level && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                          {LEVEL_LABELS[cls.level] ?? cls.level}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-accent mb-2 uppercase tracking-wide text-xs">
                      {cls.family === 'tavu-mat' ? 'TAVÚ MAT' : cls.family === 'tavu-release' ? 'TAVÚ RELEASE' : cls.family === 'tavu-stretch' ? 'TAVÚ STRETCH' : ''}
                    </p>
                    <p className="text-sm text-foreground/70 flex-grow">{cls.description}</p>
                    <Link
                      href={data.breathingRoom?.cardCtaHref || '/schedule'}
                      className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-full border border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all text-sm"
                    >
                      {data.breathingRoom?.cardCtaLabel}
                    </Link>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {data.cta?.enabled && (
          <section className="py-16 bg-primary text-primary-foreground">
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
