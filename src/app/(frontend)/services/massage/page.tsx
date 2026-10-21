import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';
import VatNote from '@/components/common/VatNote';
import type { GlobalSlug } from 'payload';

import { getRituals, getPackageSummary } from '@/lib/cms/massageRituals';
import { massagePageRitualRow } from '@/lib/cms/offerText';
import type { RitualLike } from '@/lib/cms/offerText';
import { formatAed } from '@/lib/cms/format';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import type { MassagePage as MassagePageData } from '@/payload-types';

export default async function MassagePage() {
  const [data, allRituals, packageSummary] = await Promise.all([
    getGlobal<MassagePageData>('massage-page' as GlobalSlug),
    getRituals(),
    getPackageSummary(),
  ]);

  const fullBodyRituals = allRituals.filter((r) => r.group === 'full-body');
  const targetedRituals = allRituals.filter((r) => r.group === 'targeted');
  const rooted = allRituals.find((r) => r.group === 'signature-foot');
  const escape = allRituals.find((r) => r.group === 'escape');

  const heroImage = resolveImage(data.hero?.image);
  const cardImage = resolveImage(data.overview?.card?.image);

  const rootedPackPrice = rooted?.packPrice != null ? formatAed(rooted.packPrice) : undefined;
  const rootedSixValue =
    rooted?.packPrice != null && rooted?.packSessions != null ? formatAed(rooted.price * rooted.packSessions) : undefined;
  const escapeRow = escape ? massagePageRitualRow(escape as unknown as RitualLike) : undefined;

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="tone-dark relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={heroImage?.src ?? '/gallery-sauna-salt.webp'} alt={heroImage?.alt ?? 'TAVÚ spa facilities'} fill className="object-cover" priority />
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
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <MotionWrapper delay={0.1} direction="left">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">{data.overview?.heading}</h2>
                  {(data.overview?.paragraphs ?? []).map((paragraph, index) => (
                    <p key={paragraph.id ?? index} className="text-lg text-foreground/70 mb-6 leading-relaxed">
                      {paragraph.text}
                    </p>
                  ))}
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full mb-8">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">{data.overview?.badge}</span>
                  </div>
                  <div className="block">
                    <Link
                      href={data.overview?.cta?.href ?? '/appointments'}
                      className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                    >
                      {data.overview?.cta?.label}
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
              <MotionWrapper delay={0.2} direction="right">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={cardImage?.src ?? '/service-massage-towels.webp'} alt={cardImage?.alt ?? 'Massage Room'} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="tone-dark absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">{data.overview?.card?.eyebrow}</p>
                    <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">{data.overview?.card?.titleLine1}</h3>
                    <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">{data.overview?.card?.titleLine2}</h3>
                    <ul className="space-y-1.5">
                      {(data.overview?.card?.bullets ?? []).map((bullet, index) => (
                        <li key={bullet.id ?? index} className="text-white/80 text-sm flex items-center gap-2">
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

        {/* Full-Body Massage Rituals */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.fullBody?.heading}</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.fullBody?.intro}</p>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {fullBodyRituals.map((ritual, index) => {
                const row = massagePageRitualRow(ritual as unknown as RitualLike);
                return (
                  <MotionWrapper key={ritual.id} delay={0.1 * (index + 1)} direction="up">
                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-xl transition-all h-full flex flex-col">
                      <h3 className="font-headline text-xl text-primary mb-2">{ritual.name}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{ritual.description}</p>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {(ritual.benefits ?? []).map((benefit, benefitIndex) => (
                          <li key={benefit.id ?? benefitIndex} className="flex items-center gap-2 text-sm text-foreground/70">
                            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit.text}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-foreground/60">{ritual.durationLong}</p>
                              <p className="font-semibold text-accent text-lg">{row.price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground/60">{ritual.duration90Long}</p>
                              <p className="font-semibold text-accent text-lg">{row.price90}</p>
                            </div>
                          </div>
                          <Link href={data.fullBody?.bookHref ?? '/appointments'} className="text-accent font-medium text-sm hover:underline">
                            {data.fullBody?.bookLabel}
                          </Link>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/40">
                          <p className="text-sm font-medium text-primary">{row.packLine}</p>
                          <p className="text-xs text-foreground/50 mt-0.5">{row.packNote}</p>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Targeted Recovery Rituals */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.targeted?.heading}</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.targeted?.intro}</p>
              </div>
            </MotionWrapper>

            <div className="max-w-5xl mx-auto space-y-4">
              {targetedRituals.map((ritual, index) => {
                const row = massagePageRitualRow(ritual as unknown as RitualLike);
                return (
                  <MotionWrapper key={ritual.id} delay={0.05 * (index + 1)} direction="up">
                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all">
                      <h3 className="font-headline text-xl text-primary mb-1">{ritual.name}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{ritual.description}</p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-muted/30">
                          <p className="text-xs text-foreground/50 uppercase tracking-wide">{data.targeted?.addOnLabel}</p>
                          <p className="font-headline text-lg text-accent">
                            {row.addOn} <span className="text-xs text-foreground/50">AED</span>
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <p className="text-xs text-foreground/50 uppercase tracking-wide">{data.targeted?.ritualLabel}</p>
                          <p className="font-headline text-lg text-accent">
                            {row.ritual} <span className="text-xs text-foreground/50">AED</span>
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <p className="text-xs text-foreground/50 uppercase tracking-wide">{data.targeted?.packLabel}</p>
                          <p className="font-headline text-lg text-accent">
                            {row.pack} <span className="text-xs text-foreground/50">AED</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* ROOTED Exclusive Foot Ritual */}
        {rooted && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <MotionWrapper delay={0.1} direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.rooted?.heading}</h2>
                  <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.rooted?.intro}</p>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.15} direction="up">
                <div className="max-w-5xl mx-auto bg-card border border-accent/30 rounded-2xl overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-6 py-5 text-center">
                    <h3 className="font-headline text-2xl">{rooted.cardTitle || rooted.name}</h3>
                    <p className="text-sm text-primary-foreground/70 mt-1">{`${rooted.durationLong} · ${formatAed(rooted.price)} AED`}</p>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">{rooted.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{rooted.includesHeading}</p>
                        <ul className="space-y-2">
                          {(rooted.includes ?? []).map((item, index) => (
                            <li key={item.id ?? index} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl bg-muted/30">
                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{data.rooted?.packHeading}</p>
                        <p className="font-headline text-2xl text-accent mb-1">
                          {rootedPackPrice} <span className="text-xs text-foreground/50">AED</span>
                        </p>
                        <p className="text-sm text-foreground/70">{`Ritual Pack | ${rooted.packFormula} Included`}</p>
                        <p className="text-xs text-foreground/50 mt-1">{`Six-session value ${rootedSixValue} AED · Valid for ${rooted.packValidity}`}</p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{rooted.saltBlendsHeading}</p>
                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                      {(rooted.saltBlends ?? []).map((blend, index) => (
                        <div key={blend.id ?? index} className="p-4 rounded-xl bg-muted/30">
                          <p className="font-semibold text-primary text-sm mb-1">{blend.name}</p>
                          <p className="text-xs text-foreground/60">{blend.description}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-foreground/50">{rooted.saltBlendsFootnote}</p>

                    <div className="mt-6">
                      <Link
                        href="/appointments"
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                      >
                        {rooted.bookLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </section>
        )}

        {/* Recovery Escape */}
        {escape && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <MotionWrapper delay={0.1} direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.escape?.heading}</h2>
                  <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{data.escape?.intro}</p>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.15} direction="up">
                <div className="max-w-5xl mx-auto bg-card border border-accent/30 rounded-2xl overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-6 py-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-headline text-2xl">{escape.cardTitle || escape.name}</h3>
                      <p className="text-sm text-primary-foreground/70">{`${data.escape?.durationPrefix} ${escape.durationLong}`}</p>
                    </div>
                    <p className="font-headline text-3xl text-accent">
                      {formatAed(escape.price)} <span className="text-sm text-primary-foreground/60">AED</span>
                    </p>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">{escape.description}</p>
                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{escape.includesHeading}</p>
                    <ul className="grid md:grid-cols-2 gap-2 mb-6">
                      {(escape.includes ?? []).map((item, index) => (
                        <li key={item.id ?? index} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                    {escapeRow?.note && <p className="text-xs text-foreground/50 italic mb-6">{escapeRow.note}</p>}
                    <Link
                      href="/appointments"
                      className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                    >
                      {escape.bookLabel}
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </section>
        )}

        {/* Package Pricing Summary */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-headline text-primary mb-6 text-center">{data.summary?.heading}</h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="text-left font-semibold px-4 py-3">{data.summary?.columnLabels?.ritual}</th>
                        <th className="text-left font-semibold px-4 py-3">{data.summary?.columnLabels?.value}</th>
                        <th className="text-left font-semibold px-4 py-3">{data.summary?.columnLabels?.pack}</th>
                        <th className="text-left font-semibold px-4 py-3">{data.summary?.columnLabels?.saving}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageSummary.map((row) => (
                        <tr key={row.ritualPrice} className="border-t border-border">
                          <td className="px-4 py-3 text-foreground/70">AED {formatAed(row.ritualPrice)}</td>
                          <td className="px-4 py-3 text-foreground/70">AED {formatAed(row.sixSessionValue)}</td>
                          <td className="px-4 py-3 font-semibold text-accent">AED {formatAed(row.packagePrice)}</td>
                          <td className="px-4 py-3 text-foreground/70">AED {formatAed(row.saving)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-foreground/50 mt-3 text-center">{data.summary?.footnote}</p>
                {data.summary?.showVatNote && <VatNote className="text-xs text-foreground/50 mt-1 text-center" />}
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* CTA Section */}
        {data.cta?.enabled && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">{data.cta.heading}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                {(data.cta.buttons ?? []).map((button) => (
                  <Link
                    key={button.id ?? button.link.href}
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
