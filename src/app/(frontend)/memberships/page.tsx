import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import PlusVat from '@/components/common/PlusVat';
import Link from 'next/link';
import Image from 'next/image';
import VatNote from '@/components/common/VatNote';
import type { GlobalSlug } from 'payload';

import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getSiteData } from '@/lib/cms/site';
import type { MembershipsPage as MembershipsPageData } from '@/payload-types';

export default async function MembershipsPage() {
  const [data, offers, { settings }] = await Promise.all([
    getGlobal<MembershipsPageData>('memberships-page' as GlobalSlug),
    getOffers({ category: 'membership', surface: 'pricing' }),
    getSiteData(),
  ]);

  const image = resolveImage(data.hero?.image);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="tone-dark relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
        <div className="absolute inset-0">
          <Image src={image?.src ?? '/gallery-sauna-salt.webp'} alt={image?.alt ?? 'TAVÚ Memberships'} fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <MotionWrapper delay={0} direction="up" immediate>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{data.hero?.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{data.hero?.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        {/* Membership Tiers */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'Memberships', path: '/memberships' }]} />
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.tiers?.eyebrow}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">{data.tiers?.heading}</h2>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {offers.map((offer, index) => {
                const row = offerRow(offer as unknown as OfferLike, 'membership');
                const popular = Boolean(row.highlight?.enabled);
                return (
                  <MotionWrapper key={offer.id} delay={0.1 + index * 0.1} direction="up">
                    <div className={`bg-card border ${popular ? 'border-accent ring-2 ring-accent' : 'border-border'} p-8 rounded-2xl h-full flex flex-col`}>
                      {popular && (
                        <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start">
                          {row.highlight?.label}
                        </span>
                      )}
                      <h3 className="text-2xl font-headline text-primary mb-2">{row.name}</h3>
                      <div className="mb-4">
                        <span className="text-sm text-foreground/60">AED </span>
                        <span className="text-4xl font-headline text-accent">{row.price}</span> <PlusVat className="text-sm text-foreground/60" />
                        <span className="text-sm text-foreground/60 ml-2">| {row.validityLine}</span>
                      </div>
                      <p className="text-foreground/70 mb-6">{row.description}</p>
                      <ul className="space-y-3 mt-auto">
                        {(row.includes ?? []).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-foreground/70">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
            {data.tiers?.showVatNote && <VatNote className="text-sm text-foreground/60 text-center mt-8" />}
          </div>
        </section>

        {/* CTA */}
        {data.cta?.enabled && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">{data.cta.heading}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(data.cta.buttons ?? []).map((button) => (
                    <Link
                      key={button.id ?? button.link.href}
                      href={button.link.href}
                      className={
                        button.style === 'outline'
                          ? 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg'
                          : 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg'
                      }
                    >
                      {button.link.label}
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
