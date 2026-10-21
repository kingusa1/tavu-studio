import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import type { ImageFieldValue } from '@/lib/cms/media';
import type { SeoFieldValue } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { LinkValue } from '@/lib/cms/site';

export type PartnershipsPageData = {
  hero: { image?: ImageFieldValue; title?: string | null; intro?: string | null };
  types: {
    eyebrow?: string | null;
    heading?: string | null;
    items?: Array<{
      icon?: string | null;
      title?: string | null;
      description?: string | null;
      features?: Array<{ text?: string | null }> | null;
    }> | null;
  };
  whyPartner: {
    image?: ImageFieldValue;
    eyebrow?: string | null;
    heading?: string | null;
    items?: Array<{ title?: string | null; description?: string | null }> | null;
  };
  cta: {
    enabled?: boolean | null;
    heading?: string | null;
    text?: string | null;
    buttons?: Array<{ link?: LinkValue; style?: 'primary' | 'outline' | null }> | null;
  };
  seo: SeoFieldValue;
};

/**
 * `cmsIcons.tsx`'s shared `feature` set is empty (F0 stub; also needed by package C) — these
 * local icons mirror today's hard-coded JSX (src/app/(frontend)/partnerships/page.tsx) and are
 * keyed to match `PartnershipsPage.ts`'s manual `icon` select options.
 */
const PARTNERSHIP_ICONS: Record<string, ReactNode> = {
  corporate: (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  sports: (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  hotels: (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  brand: (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

export default async function PartnershipsPage() {
  const [data, { settings }] = await Promise.all([getGlobal<PartnershipsPageData>('partnerships-page'), getSiteData()]);
  const heroImage = resolveImage(data.hero.image);
  const whyPartnerImage = resolveImage(data.whyPartner.image);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="tone-dark relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
        <div className="absolute inset-0">
          {heroImage && (
            <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover" priority sizes="100vw" />
          )}
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <MotionWrapper delay={0} direction="up" immediate>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{data.hero.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{data.hero.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        {/* Partnership Types */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'Partnerships', path: '/partnerships' }]} />
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.types.eyebrow}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">{data.types.heading}</h2>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {(data.types.items ?? []).map((type, index) => (
                <MotionWrapper key={`${type.title}-${index}`} delay={0.1 + index * 0.1} direction="up">
                  <div className="bg-card border border-border p-8 rounded-2xl h-full">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                      {type.icon ? PARTNERSHIP_ICONS[type.icon] : null}
                    </div>
                    <h3 className="text-2xl font-headline text-primary mb-4">{type.title}</h3>
                    <p className="text-foreground/70 mb-6">{type.description}</p>
                    <ul className="space-y-2">
                      {(type.features ?? []).map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-foreground/70">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <MotionWrapper delay={0.1} direction="left">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  {whyPartnerImage && (
                    <Image
                      src={whyPartnerImage.src}
                      alt={whyPartnerImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.2} direction="right">
                <div>
                  <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.whyPartner.eyebrow}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-8">{data.whyPartner.heading}</h2>

                  <div className="space-y-6">
                    {(data.whyPartner.items ?? []).map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                          <p className="text-foreground/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* CTA */}
        {data.cta.enabled && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">{data.cta.heading}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                <div className="flex justify-center">
                  {(data.cta.buttons ?? []).map((button, index) => (
                    <Link
                      key={index}
                      href={button.link?.href || '#'}
                      className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                    >
                      {button.link?.label}
                    </Link>
                  ))}
                </div>
              </MotionWrapper>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
