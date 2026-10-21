"use client";

import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import VatNote from '@/components/common/VatNote';

import { useSiteData } from '@/components/providers/SiteDataProvider';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import type { HomePage } from '@/payload-types';

export type PackagesData = NonNullable<HomePage['packages']>;

export type PackagesProps = {
    data: PackagesData;
    /** Offers category `reformer`, `visibility.showOnHome: true` (§5.2 `getOffers`). */
    reformerOffers: OfferLike[];
    /** Offers category `breathing-room`, `visibility.showOnHome: true`. */
    breathingOffers: OfferLike[];
};

export default function Packages({ data, reformerOffers, breathingOffers }: PackagesProps) {
    const { settings } = useSiteData();
    const priceCards = settings.priceCards ?? [];
    const reformerCard = priceCards.find((card) => card.category === 'reformer');
    const breathingCard = priceCards.find((card) => card.category === 'breathing-room');

    return (
        <section id="packages" className="py-20 bg-accent/5 border-y border-accent/20">
            <div className="container mx-auto px-4">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center mb-14">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            {data.eyebrow}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                            {data.heading}
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            {data.intro}
                        </p>
                        {data.showVatNote !== false && (
                            <VatNote className="text-sm text-foreground/60 max-w-2xl mx-auto mt-2" />
                        )}
                    </div>
                </MotionWrapper>

                <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Reformer */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                            <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
                                <h3 className="font-headline text-2xl mb-1">{reformerCard?.title}</h3>
                                <p className="text-sm text-primary-foreground/70">{reformerCard?.subtitle}</p>
                            </div>
                            <div className="p-6 flex flex-col gap-4 flex-grow">
                                {reformerOffers.map((offer, i) => {
                                    const row = offerRow(offer, 'homeReformer');
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-grow">
                                                <p className="font-semibold text-primary">{row.name}</p>
                                                <p className="text-sm text-foreground/60 mt-1">{row.description}</p>
                                                {row.bonus && (
                                                    <p className="text-xs text-accent font-medium mt-1.5">{row.bonus}</p>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-headline text-xl text-accent">{row.price}</p>
                                                <p className="text-xs text-foreground/50">AED</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="px-6 pb-6 mt-auto">
                                <Link
                                    href={reformerCard?.ctaHref || '/schedule'}
                                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                >
                                    {reformerCard?.ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Breathing Room */}
                    <MotionWrapper delay={0.15} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                            <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
                                <h3 className="font-headline text-2xl mb-1">{breathingCard?.title}</h3>
                                <p className="text-sm text-primary-foreground/70">{breathingCard?.subtitle}</p>
                            </div>
                            <div className="p-6 flex flex-col gap-4 flex-grow">
                                {breathingOffers.map((offer, i) => {
                                    const row = offerRow(offer, 'homeBreathing');
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-grow">
                                                <p className="font-semibold text-primary">{row.name}</p>
                                                <p className="text-sm text-foreground/60 mt-1">{row.description}</p>
                                                {row.validityLine && (
                                                    <p className="text-xs text-foreground/50 mt-1">{row.validityLine}</p>
                                                )}
                                                {row.note && (
                                                    <p className="text-xs text-foreground/40 mt-1">{row.note}</p>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-headline text-xl text-accent">{row.price}</p>
                                                <p className="text-xs text-foreground/50 whitespace-nowrap">
                                                    {row.period ? `AED / ${row.period}` : 'AED'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="px-6 pb-6 mt-auto">
                                <Link
                                    href={breathingCard?.ctaHref || '/schedule'}
                                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                >
                                    {breathingCard?.ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
