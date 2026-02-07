"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';
import HealCodePricingWidget from '@/components/mindbody/HealCodePricingWidget';

const classes = [
    {
        name: 'TA FORM',
        tagline: 'Foundational Reformer Class',
        description: 'Focused on alignment, breath, and grounding control. The perfect starting point for your reformer journey.',
        level: 'Foundation',
        duration: '50 min'
    },
    {
        name: 'TA FLOW',
        tagline: 'Breath-Led Reformer Flow',
        description: 'Gentle, breath-led reformer flow rising from foundational movement. Smooth transitions meet mindful breathing.',
        level: 'Foundation',
        duration: '50 min'
    },
    {
        name: 'VU ALIGN',
        tagline: 'Precision & Alignment',
        description: 'Stronger reformer sequencing focused on precision, alignment, and fluid strength. Build power with intention.',
        level: 'Intermediate',
        duration: '50 min'
    },
    {
        name: 'VU ELEVATE',
        tagline: 'Dynamic Flow',
        description: 'Dynamic reformer flow with expressive transitions and elevated strength. Push your limits with grace.',
        level: 'Intermediate',
        duration: '50 min'
    },
    {
        name: 'PEAK VU',
        tagline: 'Advanced Reformer Ritual',
        description: 'Advanced reformer ritual with seamless transitions and refined control. The ultimate expression of mastery.',
        level: 'Advanced',
        duration: '50 min'
    }
];

function getLevelColor(level: string) {
    switch (level) {
        case 'Foundation': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Advanced': return 'bg-rose-50 text-rose-700 border-rose-200';
        default: return 'bg-sky-50 text-sky-700 border-sky-200';
    }
}

export default function ReformerPilatesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service-pilates-stretch.png"
                        alt="Reformer Pilates"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Movement
                        </span>
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Reformer Pilates</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            Small-group reformer classes designed to build strength, control, mobility, and alignment.
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
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary mb-6">The Reformer Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        Our reformer room features state-of-the-art equipment in an intimate setting limited to 8 participants per class.
                                        Each 50-minute session is meticulously designed to challenge your body while maintaining alignment and connection to your breath.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-muted/50 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-headline text-accent">8</p>
                                            <p className="text-sm text-foreground/60">Max Participants</p>
                                        </div>
                                        <div className="bg-muted/50 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-headline text-accent">50</p>
                                            <p className="text-sm text-foreground/60">Minutes</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                    >
                                        Book a Class
                                    </Link>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/service-mat-stretch.png"
                                        alt="Reformer Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">Reformer</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Pilates Classes</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Single sessions and class packs
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Includes Ladies-Only class options
                                            </li>
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
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Our Classes</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    From foundation to advanced, find the class that matches your level.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {classes.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-headline text-xl text-primary">{cls.name}</h3>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-2">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70 flex-grow">{cls.description}</p>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                            <span className="text-sm text-foreground/60">{cls.duration}</span>
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
                                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                    Pre-Opening Offer
                                </span>
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Reformer Package</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Get started with our exclusive pre-opening package.
                                </p>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2} direction="up">
                            <div className="max-w-md mx-auto bg-card border border-border p-8 rounded-2xl text-center shadow-xl">
                                <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FORM</h3>
                                <p className="text-sm text-accent font-medium mb-2">Reformer Focus</p>
                                <p className="text-sm text-foreground/70 mb-6">10 Reformer Pilates classes</p>
                                <p className="text-5xl font-headline text-accent mb-2">999</p>
                                <p className="text-sm text-foreground/60 mb-6">AED • Validity: 60 days</p>
                                <HealCodePricingWidget
                                    serviceId="100073"
                                    linkType="pricing-link"
                                    buttonText="Get Your Pass"
                                />
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Ready to Begin?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your first reformer class and experience the TAVÚ difference.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                View Schedule & Book
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
