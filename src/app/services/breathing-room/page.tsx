"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';


const classes = [
    {
        name: 'TAVÚ FLOW',
        tagline: 'Yin-to-Yang Yoga Ritual',
        description: 'Blending deep grounding with gentle, breath-led flow. Find balance between stillness and movement.',
        level: 'All Levels',
        duration: '60 min'
    },
    {
        name: 'TAVÚ RELEASE',
        tagline: 'Myofascial & Yin Mobility',
        description: 'Myofascial softening combined with Yin mobility to unwind tension and reset the body completely.',
        level: 'All Levels',
        duration: '60 min'
    },
    {
        name: 'TAVÚ CORE',
        tagline: 'Mat Pilates Ritual',
        description: 'Mat Pilates ritual mixing grounding alignment with dynamic core strength. Build your center.',
        level: 'All Levels',
        duration: '45 min'
    },
    {
        name: 'TAVÚ MOBILITY',
        tagline: 'Mobility-Flow Ritual',
        description: 'Open joints, expand range, and connect breath to movement. Unlock your body\'s full potential.',
        level: 'All Levels',
        duration: '45 min'
    },
    {
        name: 'TAVÚ POWER',
        tagline: 'Sculpting & Barre-Inspired',
        description: 'Sculpting and barre-inspired ritual focused on heat, rhythm, and rising strength. Feel the burn.',
        level: 'All Levels',
        duration: '45 min'
    }
];

export default function BreathingRoomPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service-breathing-props.webp"
                        alt="Breathing Room"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Breath
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">Breathing Room</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            A space dedicated to slowing down. Breath-led practices designed to restore balance and reconnect you to your body.
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
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">The Breathing Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        Our breathing room is a sanctuary for presence and breath. From yoga flows to mat pilates,
                                        each session is designed to help you release tension, build strength, and find inner calm.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-card border border-border rounded-xl p-5 text-center shadow-sm">
                                            <p className="text-4xl font-headline text-accent leading-tight mb-1">45-60</p>
                                            <p className="text-sm font-medium text-foreground/70">Minutes</p>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl p-5 text-center shadow-sm">
                                            <p className="text-4xl font-headline text-accent leading-tight mb-1">All</p>
                                            <p className="text-sm font-medium text-foreground/70">Levels Welcome</p>
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
                                        src="/service-breathing-shelf.webp"
                                        alt="Breathing Room Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">Breathing</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Room Classes</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Mat Pilates, Mobility, Yoga, Breathwork and Yin
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Drop-in sessions, class packs, and an unlimited 3-month membership
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
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">Our Classes</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Yoga, pilates, and mobility practices for every body.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {classes.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-headline text-xl text-primary">{cls.name}</h3>
                                            <span className="text-xs px-3 py-1 rounded-full font-medium border bg-sky-50 text-sky-700 border-sky-200">
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
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">Breathing Room Packages</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    All prices include VAT.
                                </p>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2} direction="up">
                            <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                                <div className="flex flex-col gap-4 p-6">
                                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="font-semibold text-primary">Drop-In</p>
                                            <p className="text-sm text-foreground/60 mt-1">Single session valid for any class (Mat Pilates, Mobility, Yoga, Breathwork, Yin).</p>
                                            <p className="text-xs text-foreground/40 mt-1">Non-transferable & non-refundable</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">120</p>
                                            <p className="text-xs text-foreground/50">AED</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="font-semibold text-primary">5-Class Pack</p>
                                            <p className="text-sm text-foreground/60 mt-1">Perfect for weekly consistency.</p>
                                            <p className="text-xs text-foreground/50 mt-1">Valid 30 days from first use</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">550</p>
                                            <p className="text-xs text-foreground/50">AED</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="font-semibold text-primary">10-Class Pack</p>
                                            <p className="text-sm text-foreground/60 mt-1">Ideal for deeper practice.</p>
                                            <p className="text-xs text-foreground/50 mt-1">Valid 45 days from first use</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">1,020</p>
                                            <p className="text-xs text-foreground/50">AED</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30">
                                        <div>
                                            <p className="font-semibold text-primary">Unlimited 3-Month Membership</p>
                                            <p className="text-sm text-foreground/60 mt-1">Unlimited access to all Breathing Room classes. AED 2,400 paid upfront for a 3-month commitment.</p>
                                            <p className="text-xs text-foreground/40 mt-1">Valid for 3 consecutive months · Non-transferable · Non-refundable · No rollovers</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">800</p>
                                            <p className="text-xs text-foreground/50 whitespace-nowrap">AED / month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <Link
                                        href="/schedule"
                                        className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                    >
                                        Book Breathing Room
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Unlimited 3-Month Membership — full terms */}
                        <MotionWrapper delay={0.25} direction="up">
                            <div className="max-w-lg mx-auto mt-8 bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
                                    <h3 className="font-headline text-xl">Unlimited 3-Month Membership</h3>
                                    <p className="text-sm text-primary-foreground/70">AED 800/month · 3-month commitment · AED 2,400 paid upfront</p>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                                        Enjoy unlimited access to all Breathing Room classes with a membership designed
                                        for consistency and long-term progress.
                                    </p>
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                                        Your membership is based on AED 800 per month for a 3-month commitment, with a
                                        single upfront payment of AED 2,400 at the time of purchase. There are no
                                        monthly recurring payments during the membership period.
                                    </p>

                                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Membership Includes</p>
                                    <ul className="space-y-2 mb-6">
                                        {[
                                            'Unlimited access to all Breathing Room classes',
                                            'AED 800/month value',
                                            '3-month commitment',
                                            'AED 2,400 paid upfront',
                                            'Valid for 3 consecutive months',
                                            'Non-transferable',
                                            'Non-refundable',
                                            'No rollovers',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="p-5 rounded-xl bg-muted/30">
                                        <p className="text-sm font-semibold text-primary mb-2 underline underline-offset-4">Booking Policy</p>
                                        <p className="text-sm text-foreground/70 leading-relaxed">
                                            To ensure fair access for all members, more than 3 late cancellations during
                                            the membership period will result in a 1-week booking suspension, during
                                            which new class bookings will not be permitted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">Ready to Begin?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your first breathing room class and find your calm.
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
