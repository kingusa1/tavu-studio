"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import HealCodePricingWidget from '@/components/mindbody/HealCodePricingWidget';

const reformerClasses = [
    {
        name: 'TA FORM',
        tagline: 'Foundational Reformer Class',
        description: 'Focused on alignment, breath, and grounding control. The perfect starting point for your reformer journey.',
        level: 'Foundation'
    },
    {
        name: 'TA FLOW',
        tagline: 'Breath-Led Reformer Flow',
        description: 'Gentle, breath-led reformer flow rising from foundational movement. Smooth transitions meet mindful breathing.',
        level: 'Foundation'
    },
    {
        name: 'VU ALIGN',
        tagline: 'Precision & Alignment',
        description: 'Stronger reformer sequencing focused on precision, alignment, and fluid strength. Build power with intention.',
        level: 'Intermediate'
    },
    {
        name: 'VU ELEVATE',
        tagline: 'Dynamic Flow',
        description: 'Dynamic reformer flow with expressive transitions and elevated strength. Push your limits with grace.',
        level: 'Intermediate'
    },
    {
        name: 'PEAK VU',
        tagline: 'Advanced Reformer Ritual',
        description: 'Advanced reformer ritual with seamless transitions and refined control. The ultimate expression of mastery.',
        level: 'Advanced'
    }
];

const breathingClasses = [
    {
        name: 'TAVÚ FLOW',
        tagline: 'Yin-to-Yang Yoga Ritual',
        description: 'Blending deep grounding with gentle, breath-led flow. Find balance between stillness and movement.',
        level: 'All Levels'
    },
    {
        name: 'TAVÚ RELEASE',
        tagline: 'Myofascial & Yin Mobility',
        description: 'Myofascial softening combined with Yin mobility to unwind tension and reset the body completely.',
        level: 'All Levels'
    },
    {
        name: 'TAVÚ CORE',
        tagline: 'Mat Pilates Ritual',
        description: 'Mat Pilates ritual mixing grounding alignment with dynamic core strength. Build your center.',
        level: 'All Levels'
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

export default function ClassesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section with Image */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/pillar-movement.png"
                        alt="TAVÚ Movement Classes"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Our Classes</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                            Experience the TAVÚ method through intentionally designed classes that blend movement and breath.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Pre-Opening Packages Section - Moved to Top */}
                <section className="py-16 bg-accent/5 border-b border-accent/20">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-10">
                                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                    Pre-Opening Offer
                                </span>
                                <h2 className="text-3xl md:text-4xl font-headline text-primary">TAVÚ Pre-Opening — Limited Access</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {/* TAVÚ FORM - Reformer */}
                                <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                                    <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FORM</h3>
                                    <p className="text-sm text-accent font-medium mb-4">Reformer Focus</p>
                                    <p className="text-sm text-foreground/70 mb-4">Focused. Structured. Reformer-only.</p>
                                    <p className="text-4xl font-headline text-accent mb-2">999 AED</p>
                                    <p className="text-sm text-foreground/60 mb-2">Validity: 60 days</p>
                                    <p className="text-sm text-foreground/70 mb-6">10 Reformer Pilates classes</p>
                                    <HealCodePricingWidget
                                        serviceId="100073"
                                        linkType="pricing-link"
                                        buttonText="Get Your Pass"
                                    />
                                </div>

                                {/* TAVÚ FOUNDATION - Mat */}
                                <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                                    <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FOUNDATION</h3>
                                    <p className="text-sm text-accent font-medium mb-4">Mat Series</p>
                                    <p className="text-sm text-foreground/70 mb-4">A softer entry into the TAVÚ method.</p>
                                    <p className="text-4xl font-headline text-accent mb-2">599 AED</p>
                                    <p className="text-sm text-foreground/60 mb-2">Validity: 45 days</p>
                                    <p className="text-sm text-foreground/70 mb-6">8 Mat Pilates / Yoga / Mobility classes</p>
                                    <HealCodePricingWidget
                                        serviceId="100075"
                                        linkType="pricing-link"
                                        buttonText="Get Your Pass"
                                    />
                                </div>

                                {/* TAVÚ FLOW - Combined */}
                                <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-lg transition-shadow ring-2 ring-accent">
                                    <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                        Best Value
                                    </span>
                                    <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FLOW</h3>
                                    <p className="text-sm text-accent font-medium mb-4">Reformer + Mat</p>
                                    <p className="text-sm text-foreground/70 mb-4">Balanced movement with flexibility.</p>
                                    <p className="text-4xl font-headline text-accent mb-2">1,049 AED</p>
                                    <p className="text-sm text-foreground/60 mb-2">Validity: 60 days</p>
                                    <p className="text-sm text-foreground/70 mb-6">6 Reformer + 4 Mat classes</p>
                                    <HealCodePricingWidget
                                        serviceId="119"
                                        linkType="contract-link"
                                        buttonText="Get Your Pass"
                                    />
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Reformer Room Section */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/pillar-movement.png"
                                        alt="Reformer Pilates Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Movement</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Reformer Room</h2>
                                    <p className="text-lg text-foreground/80 mb-2 font-medium">
                                        Small-group reformer classes, limited to 8 participants.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                                        A 50-minute, low-impact practice on the reformer—designed to build strength, control, mobility, and alignment. Adaptable, precise, and quietly challenging.
                                    </p>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                    >
                                        Book Your Reformer
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Class Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {reformerClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{cls.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-3 uppercase tracking-wide text-xs">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70 leading-relaxed flex-grow">{cls.description}</p>
                                        <Link
                                            href="/schedule"
                                            className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-full border border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all text-sm"
                                        >
                                            Reserve Your Place
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
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Breath</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Breathing Room</h2>
                                    <p className="text-lg text-foreground/80 mb-2 font-medium">
                                        A space dedicated to slowing down.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                                        Breath-led practices designed to restore balance, release tension, and reconnect you to your body. Sessions range from 45–60 minutes, inviting softness, presence, and quiet strength.
                                    </p>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                    >
                                        Book Your Class
                                    </Link>
                                </div>
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                                    <Image
                                        src="/pillar-breath.png"
                                        alt="Yoga and Breathing Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Class Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {breathingClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-lg text-primary group-hover:text-accent transition-colors">{cls.name}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-2">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70 flex-grow">{cls.description}</p>
                                        <Link
                                            href="/schedule"
                                            className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-full border border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all text-sm"
                                        >
                                            Reserve Your Place
                                        </Link>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Begin When Ready</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Explore the schedule and book your class.
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
