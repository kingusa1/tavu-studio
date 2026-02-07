"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const treatments = [
    {
        name: 'Hydration Boost',
        description: 'Essential hydration therapy to replenish fluids and electrolytes. Perfect for recovery from dehydration, jet lag, or intense workouts.',
        duration: '30 min',
        price: 'From 350 AED',
        benefits: ['Rapid rehydration', 'Electrolyte balance', 'Energy boost']
    },
    {
        name: 'Immunity Shield',
        description: 'High-dose Vitamin C and immune-boosting nutrients to strengthen your body\'s natural defenses.',
        duration: '45 min',
        price: 'From 450 AED',
        benefits: ['Immune support', 'Antioxidant protection', 'Faster recovery']
    },
    {
        name: 'Energy Revival',
        description: 'B-vitamins and essential nutrients to combat fatigue and restore your natural energy levels.',
        duration: '45 min',
        price: 'From 450 AED',
        benefits: ['Increased energy', 'Mental clarity', 'Reduced fatigue']
    },
    {
        name: 'Beauty Glow',
        description: 'Collagen-boosting vitamins and antioxidants for radiant skin, healthy hair, and strong nails.',
        duration: '45 min',
        price: 'From 500 AED',
        benefits: ['Skin radiance', 'Hair & nail health', 'Anti-aging support']
    },
    {
        name: 'Athletic Performance',
        description: 'Comprehensive blend of amino acids, vitamins, and minerals for peak athletic performance and recovery.',
        duration: '60 min',
        price: 'From 550 AED',
        benefits: ['Enhanced performance', 'Faster muscle recovery', 'Reduced inflammation']
    },
    {
        name: 'Custom Blend',
        description: 'Personalized IV therapy tailored to your specific health goals and needs. Consultation included.',
        duration: '45-60 min',
        price: 'From 600 AED',
        benefits: ['Personalized formula', 'Medical consultation', 'Targeted results']
    }
];

export default function IVTherapyPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service-ice-hands.png"
                        alt="IV Therapy"
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
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">IV Therapy</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            Intravenous vitamin and hydration therapy for optimal wellness, delivered directly to your bloodstream.
                        </p>
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
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary mb-6">Why IV Therapy?</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        IV therapy delivers essential vitamins, minerals, and hydration directly into your bloodstream,
                                        bypassing the digestive system for 100% absorption. This means faster, more effective results than oral supplements.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                        All treatments are administered by licensed medical professionals in a comfortable, spa-like setting.
                                        Whether you're recovering from illness, preparing for an event, or simply optimizing your health,
                                        we have a treatment for you.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="bg-muted/50 rounded-xl px-6 py-3 text-center">
                                            <p className="text-sm font-medium text-accent">100%</p>
                                            <p className="text-xs text-foreground/60">Absorption</p>
                                        </div>
                                        <div className="bg-muted/50 rounded-xl px-6 py-3 text-center">
                                            <p className="text-sm font-medium text-accent">Medical</p>
                                            <p className="text-xs text-foreground/60">Supervision</p>
                                        </div>
                                        <div className="bg-muted/50 rounded-xl px-6 py-3 text-center">
                                            <p className="text-sm font-medium text-accent">Custom</p>
                                            <p className="text-xs text-foreground/60">Formulations</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                    >
                                        Book a Treatment
                                    </Link>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/about-reach.png"
                                        alt="IV Therapy Suite"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">IV Therapy</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Treatments</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Hydration, Immunity, Energy, Beauty
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Medical supervision included
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Custom formulations available
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Treatments Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Our Treatments</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Choose from our range of IV therapy treatments, each designed for specific health goals.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {treatments.map((treatment, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-xl transition-all h-full flex flex-col">
                                        <h3 className="font-headline text-xl text-primary mb-2">{treatment.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4">{treatment.description}</p>
                                        <ul className="space-y-2 mb-6 flex-grow">
                                            {treatment.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center justify-between pt-4 border-t border-border">
                                            <div>
                                                <p className="text-sm text-foreground/60">{treatment.duration}</p>
                                                <p className="font-semibold text-accent">{treatment.price}</p>
                                            </div>
                                            <Link href="/schedule" className="text-accent font-medium text-sm hover:underline">
                                                Book →
                                            </Link>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Safety Note */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-foreground/70">
                                <strong className="text-primary">Medical Supervision:</strong> All IV therapy treatments are administered by licensed healthcare professionals.
                                A brief health assessment is required before your first treatment to ensure safety and optimal results.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Feel the Difference</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your IV therapy session and experience optimal wellness.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                Book a Treatment
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
