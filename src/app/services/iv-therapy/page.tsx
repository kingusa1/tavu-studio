"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

interface DripItem {
    name: string;
    subItems?: string[];
}

interface DripCategory {
    name: string;
    description: string;
    items: DripItem[];
}

const dripMenu: DripCategory[] = [
    {
        name: 'Hydration',
        description: 'Deep cellular hydration to restore balance and vitality.',
        items: [
            { name: 'Hydration 500 mL' },
            { name: 'Hydration 1,000 mL' },
        ],
    },
    {
        name: 'Energy & Performance',
        description: 'Designed to enhance physical performance, focus and endurance.',
        items: [
            { name: 'Energy Booster' },
            { name: 'Fitness Booster' },
            { name: 'IV – Men’s Performance' },
            { name: 'Weight Loss' },
        ],
    },
    {
        name: 'Glow & Beauty',
        description: 'Support skin radiance, hair health and antioxidant protection.',
        items: [
            { name: 'Skin Glow' },
            { name: 'Hair Growth' },
            { name: 'Vitamin C (2500 mg)' },
            { name: 'Vitamin C IV Drip (5000 mg)' },
            { name: 'Vitamin C + Glutathione (Summer Glow IV)' },
        ],
    },
    {
        name: 'Stress & Recovery',
        description: 'Calm the nervous system and accelerate recovery.',
        items: [
            { name: 'Stress Relief' },
            { name: 'After Party (IV Fatigue)' },
            { name: 'IV Magnesium – 1000 mg (Mini)' },
            { name: 'IV Magnesium – 2000 mg' },
        ],
    },
    {
        name: 'Gut & Detox',
        description: 'Support digestion, liver function and internal balance.',
        items: [
            { name: 'Liver Detox' },
            { name: 'IV Gut Drip' },
            { name: 'Hydration for Vomiting & Diarrhea' },
        ],
    },
    {
        name: 'NAD+ Longevity',
        description: 'Advanced cellular support for energy, focus and longevity.',
        items: [
            { name: 'NAD+ 250 mg' },
            { name: 'NAD+ 500 mg' },
            {
                name: 'NAD+ Programs',
                subItems: ['NAD+ 250 mg × 3', 'NAD+ 250 mg × 5', 'NAD+ 500 mg × 3', 'NAD+ 500 mg × 5'],
            },
        ],
    },
    {
        name: 'Mini Drips — 250 mL',
        description: 'Short, effective and perfect as an add-on.',
        items: [
            { name: 'NAD+ 100 mg' },
            { name: 'NAC 500' },
        ],
    },
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
                        src="/about-lounge.webp"
                        alt="IV Therapy private lounge at TAVÚ"
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
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">IV Therapy</h1>
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
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">Why IV Therapy?</h2>
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
                                        <div className="bg-card border border-border rounded-xl px-6 py-3 text-center shadow-sm">
                                            <p className="text-base font-semibold text-accent">100%</p>
                                            <p className="text-xs font-medium text-foreground/70">Absorption</p>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl px-6 py-3 text-center shadow-sm">
                                            <p className="text-base font-semibold text-accent">Medical</p>
                                            <p className="text-xs font-medium text-foreground/70">Supervision</p>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl px-6 py-3 text-center shadow-sm">
                                            <p className="text-base font-semibold text-accent">Custom</p>
                                            <p className="text-xs font-medium text-foreground/70">Formulations</p>
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
                                        src="/amenity-coffee.webp"
                                        alt="Wellness beverages at TAVÚ"
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

                {/* IV Drip Menu */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Menu</span>
                                <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">IV Drip Menu</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    A curated menu of IV drips and mini drips for hydration, performance, beauty, recovery, detox and longevity.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {dripMenu.map((category, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl transition-all h-full">
                                        <h3 className="font-headline text-2xl italic text-primary mb-1">{category.name}</h3>
                                        <p className="text-sm text-foreground/60 mb-5">{category.description}</p>
                                        <ul className="space-y-2.5">
                                            {category.items.map((item, i) => (
                                                <li key={i} className="border-b border-border/40 pb-2.5 last:border-b-0 last:pb-0">
                                                    <p className="text-sm text-foreground/80">{item.name}</p>
                                                    {item.subItems && (
                                                        <ul className="mt-2 ml-4 space-y-1">
                                                            {item.subItems.map((sub, j) => (
                                                                <li key={j} className="text-xs text-foreground/60">{sub}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </MotionWrapper>
                            ))}

                            <MotionWrapper delay={0.4} direction="up">
                                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 p-8 rounded-2xl h-full flex flex-col justify-center">
                                    <h3 className="font-headline text-2xl italic text-primary mb-3">TAVÚ Signature Booster</h3>
                                    <p className="text-sm text-foreground/70">
                                        Our exclusive formulation, designed to complement movement, recovery and presence.
                                    </p>
                                </div>
                            </MotionWrapper>
                        </div>

                        <MotionWrapper delay={0.5} direction="up">
                            <div className="text-center mt-12">
                                <Link
                                    href="/appointments"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Book IV Therapy
                                </Link>
                            </div>
                        </MotionWrapper>
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
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">Feel the Difference</h2>
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
