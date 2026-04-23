"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const benefits = [
    'Boosts circulation',
    'Flushes out lactic acid',
    'Reduces swelling',
    'Speeds up recovery',
];

const recommendedFor = [
    'After intense training',
    'Heavy or tight legs',
    'Injury recovery',
    'Swelling or fluid retention',
];

export default function CompressionTherapyPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service-recovery-equipment.webp"
                        alt="NormaTec Compression Therapy recovery equipment"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Recovery
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">Compression Therapy</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            NormaTec pulsing compression for faster muscle recovery and improved circulation.
                        </p>
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
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">NormaTec Recovery</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        A recovery-focused treatment using pulsing compression to stimulate circulation
                                        and support faster muscle recovery. Used by professional athletes worldwide.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                        Perfect as a standalone recovery session or as an add-on to your contrast therapy
                                        for maximum results.
                                    </p>
                                    <Link
                                        href="/appointments"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                    >
                                        Book a Session
                                    </Link>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/about-lounge.webp"
                                        alt="Recovery lounge at TAVÚ"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">NormaTec</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Compression</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                45-minute session
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Customizable pressure
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Add-on Compression Flush (20 min — 50 AED)
                                            </li>
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
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">NormaTec</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    One session, all the recovery benefits.
                                </p>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2} direction="up">
                            <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-8 shadow-xl">
                                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                                    <div>
                                        <h3 className="font-headline text-2xl text-primary">NormaTec</h3>
                                        <p className="text-sm text-foreground/60 mt-1">45 minutes</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-headline text-3xl text-accent">160</p>
                                        <p className="text-xs text-foreground/50">AED</p>
                                    </div>
                                </div>

                                <p className="text-sm text-foreground/70 mb-6">
                                    A recovery-focused treatment using pulsing compression to stimulate circulation
                                    and support faster muscle recovery.
                                </p>

                                <div className="mb-5">
                                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Benefits</p>
                                    <ul className="space-y-2">
                                        {benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Recommended for</p>
                                    <ul className="space-y-2">
                                        {recommendedFor.map((r, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0" />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/appointments"
                                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                >
                                    Book Compression Therapy
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Pair With Contrast Therapy */}
                <section className="py-16 bg-accent/5">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h3 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                                Pair with Contrast Therapy
                            </h3>
                            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
                                Add Compression Flush (20 min — 50 AED) to any Contrast Therapy session for the ultimate recovery combo.
                            </p>
                            <Link
                                href="/services/contrast-therapy"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-primary/40 text-primary font-semibold hover:bg-primary/5 transition-all"
                            >
                                Explore Contrast Therapy →
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">Ready to Recover?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your NormaTec session and feel the difference.
                            </p>
                            <Link
                                href="/appointments"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                Book a Session
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
