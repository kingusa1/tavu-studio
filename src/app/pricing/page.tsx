"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

const reformerPackages = [
    { name: 'Reformer Drop-In', price: '160', description: 'Single reformer session. VAT included.' },
    { name: '8-Class Pack', price: '1,260', description: 'Valid 45 days.', bonus: 'Includes 1 complimentary Contrast Therapy session' },
    { name: '10-Class Pack', price: '1,420', description: 'Valid 60 days.', bonus: 'Includes 2 complimentary Contrast Therapy sessions' },
    { name: '16-Class Pack', price: '2,020', description: 'Valid 75 days.', bonus: 'Includes 2 complimentary Contrast Therapy sessions' },
];

const breathingPackages = [
    { name: 'Drop-In', price: '120', description: 'Single session valid for any class (Mat Pilates, Mobility, Yoga, Breathwork, Yin).', note: 'Non-transferable & non-refundable' },
    { name: '5-Class Pack', price: '550', description: 'Valid 30 days from first use. Perfect for weekly consistency.' },
    { name: '10-Class Pack', price: '1,020', description: 'Valid 45 days from first use. Ideal for deeper practice.' },
    { name: 'Unlimited 3-Month Membership', price: '800', period: 'month', description: 'Unlimited access to all Breathing Room classes. AED 2,400 paid upfront for a 3-month commitment.', note: 'Valid for 3 consecutive months \u00b7 Non-transferable \u00b7 Non-refundable \u00b7 No rollovers' },
];

const unlimitedMembershipIncludes = [
    'Unlimited access to all Breathing Room classes',
    'AED 800/month value',
    '3-month commitment',
    'AED 2,400 paid upfront',
    'Valid for 3 consecutive months',
    'Non-transferable',
    'Non-refundable',
    'No rollovers',
];

const recoveryPackIncludes = [
    '5 × 45-minute Nomadic Compression Therapy Sessions',
    '1 Complimentary 45-minute Compression Therapy Session',
    'Total: 6 Sessions',
    'Valid for 45 days',
];

const contrastPackages = [
    { name: 'Drop-In', price: '220', description: '60-minute session (Sauna + Ice Bath). Towels & amenities.', note: 'Add-on: Compression Flush (20 min) — 50 AED' },
    { name: '5-Pack', price: '990', description: 'Valid 30 days from first use.' },
    { name: '10-Pack', price: '1,850', description: 'Valid 45 days from first use.' },
    { name: 'Private Contrast Drop-In', price: '275', description: 'Infrared Sauna + Ice Bath, private suite.' },
    { name: 'Private 5-Pack', price: '1,250', description: 'Valid 30 days.' },
    { name: 'Private 10-Pack', price: '2,300', description: 'Valid 45 days.' },
];

const massageServices = [
    { name: 'Destress Massage', price: '300', description: 'Perfect for reducing stress, improving sleep quality, and easing tension in the upper body.', duration: '60 min' },
    { name: 'Relaxing Massage', price: '300', description: 'Deep relaxation, helping to calm the nervous system and bring the body into a state of complete tranquility.', duration: '60 min' },
    { name: 'Express Head, Neck & Shoulder', price: '220', description: 'Focuses on relieving headaches and reducing stiffness in the neck and shoulders.', duration: '45 min' },
    { name: 'Foot Ritual Massage', price: '180', description: 'Designed to reduce swelling and boost circulation, leaving your feet feeling light and refreshed.', duration: '30 min' },
    { name: 'Deep Tissue Massage', price: '300', description: 'Targets deep muscles to release knots, improve mobility, and ease tension.', duration: '60 min' },
];

const bundles = [
    { name: 'TA Reset', price: '480', description: 'Contrast + Head/Neck/Shoulder Massage' },
    { name: 'TA Deep Calm', price: '520', description: 'Contrast + Relaxing Massage' },
    { name: 'VU Athlete', price: '560', description: 'Contrast + Deep Tissue' },
    { name: 'VU Mobility Flow', price: '580', description: 'Contrast + Mobility Massage' },
    { name: 'VIP Flow', price: '660', description: 'Private Contrast + Any Massage' },
    { name: 'Express Recovery', price: '420', description: 'Contrast + 30-min Massage' },
];

const memberships = [
    { name: '3 Months', price: '1,850', period: 'AED/month' },
    { name: '6 Months', price: '1,750', period: 'AED/month' },
    { name: '12 Months', price: '1,650', period: 'AED/month' },
];

const membershipIncludes = [
    'Reformer (up to 4x/week)',
    'Unlimited mat classes',
    'Contrast (up to 3x/week)',
    '20% off add-ons',
    '1 VIP upgrade quarterly',
];

function PriceRow({ name, price, description, note, bonus, duration, period }: {
    name: string; price: string; description: string; note?: string; bonus?: string; duration?: string; period?: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex-grow">
                <p className="font-semibold text-primary">{name}</p>
                <p className="text-sm text-foreground/60 mt-1">
                    {duration && <span className="text-foreground/50">({duration}) </span>}
                    {description}
                </p>
                {bonus && <p className="text-xs text-accent font-medium mt-1.5">{bonus}</p>}
                {note && <p className="text-xs text-foreground/40 mt-1">{note}</p>}
            </div>
            <div className="text-right flex-shrink-0">
                <p className="font-headline text-xl text-accent">{price}</p>
                <p className="text-xs text-foreground/50 whitespace-nowrap">{period ? `AED / ${period}` : 'AED'}</p>
            </div>
        </div>
    );
}

function PricingCard({ title, subtitle, children, bookLabel, bookHref }: {
    title: string; subtitle?: string; children: React.ReactNode; bookLabel: string; bookHref: string;
}) {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
            <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
                <h2 className="font-headline text-2xl mb-0.5">{title}</h2>
                {subtitle && <p className="text-sm text-primary-foreground/70">{subtitle}</p>}
            </div>
            <div className="p-5 flex flex-col gap-3 flex-grow">
                {children}
            </div>
            <div className="px-5 pb-5 mt-auto">
                <Link
                    href={bookHref}
                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                >
                    {bookLabel}
                </Link>
            </div>
        </div>
    );
}

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-14">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-primary">Choose Your Rhythm</h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                All prices include VAT.
                            </p>
                        </div>
                    </MotionWrapper>

                    {/* Reformer & Breathing Room */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <MotionWrapper delay={0.1} direction="up">
                            <PricingCard title="Reformer" subtitle="Small-group reformer classes" bookLabel="Book Reformer" bookHref="/schedule">
                                {reformerPackages.map((pkg, i) => (
                                    <PriceRow key={i} {...pkg} />
                                ))}
                            </PricingCard>
                        </MotionWrapper>
                        <MotionWrapper delay={0.15} direction="up">
                            <PricingCard title="Breathing Room" subtitle="Mat Pilates, Mobility, Yoga, Breathwork, Yin" bookLabel="Book Breathing Room" bookHref="/schedule">
                                {breathingPackages.map((pkg, i) => (
                                    <PriceRow key={i} {...pkg} />
                                ))}
                            </PricingCard>
                        </MotionWrapper>
                    </div>

                    {/* Unlimited 3-Month Membership — full terms */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
                            <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
                                <h2 className="font-headline text-2xl mb-0.5">Unlimited 3-Month Membership</h2>
                                <p className="text-sm text-primary-foreground/70">AED 800/month · 3-month commitment · AED 2,400 paid upfront</p>
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="text-base text-foreground/80 leading-relaxed mb-4">
                                    Enjoy unlimited access to all Breathing Room classes with a membership designed
                                    for consistency and long-term progress.
                                </p>
                                <p className="text-base text-foreground/80 leading-relaxed mb-8">
                                    Your membership is based on AED 800 per month for a 3-month commitment, with a
                                    single upfront payment of AED 2,400 at the time of purchase. There are no monthly
                                    recurring payments during the membership period.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Membership Includes</p>
                                        <ul className="space-y-2">
                                            {unlimitedMembershipIncludes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-5 rounded-xl bg-muted/30">
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Booking Policy</p>
                                        <p className="text-sm text-foreground/70 leading-relaxed">
                                            To ensure fair access for all members, more than 3 late cancellations during
                                            the membership period will result in a 1-week booking suspension, during
                                            which new class bookings will not be permitted.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                    >
                                        Book Breathing Room
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Contrast Therapy & Compression */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <MotionWrapper delay={0.1} direction="up">
                            <PricingCard title="Contrast Therapy" subtitle="Sauna + Ice Bath" bookLabel="Book Contrast Therapy" bookHref="/appointments">
                                {contrastPackages.map((pkg, i) => (
                                    <PriceRow key={i} {...pkg} />
                                ))}
                            </PricingCard>
                        </MotionWrapper>
                        <MotionWrapper delay={0.15} direction="up">
                            <PricingCard title="Compression Therapy" subtitle="Normatec" bookLabel="Book Compression" bookHref="/appointments">
                                <PriceRow name="Normatec" price="160" description="A recovery-focused treatment using pulsing compression to stimulate circulation and support faster muscle recovery." duration="45 min" />
                                <PriceRow
                                    name="Nomadic Recovery Pack (5+1)"
                                    price="660"
                                    description="5 × 45-minute Nomadic Compression Therapy Sessions plus 1 complimentary 45-minute session."
                                    bonus="Total: 6 Sessions · Valid for 45 days"
                                    note="Non-transferable · Non-refundable"
                                />
                                <div className="p-4 rounded-xl bg-muted/20">
                                    <p className="text-sm font-medium text-primary mb-2">Benefits:</p>
                                    <ul className="space-y-1 text-sm text-foreground/60">
                                        <li>- Boosts circulation</li>
                                        <li>- Flushes out lactic acid</li>
                                        <li>- Reduces swelling</li>
                                        <li>- Speeds up recovery</li>
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/20">
                                    <p className="text-sm font-medium text-primary mb-2">Recommended for:</p>
                                    <ul className="space-y-1 text-sm text-foreground/60">
                                        <li>- After intense training</li>
                                        <li>- Heavy or tight legs</li>
                                        <li>- Injury recovery</li>
                                        <li>- Swelling or fluid retention</li>
                                    </ul>
                                </div>
                            </PricingCard>
                        </MotionWrapper>
                    </div>

                    {/* Nomadic Recovery Pack — full terms */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-card border border-accent/30 rounded-2xl overflow-hidden mb-12">
                            <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
                                <h2 className="font-headline text-2xl mb-0.5">Nomadic Recovery Pack (5+1)</h2>
                                <p className="text-sm text-primary-foreground/70">AED 660 · Compression Therapy</p>
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="text-base text-foreground/80 leading-relaxed mb-8">
                                    Recover, recharge, and keep your body performing at its best with our Nomadic
                                    Recovery Pack. Each 45-minute Compression Therapy session helps improve
                                    circulation, reduce muscle soreness and swelling, and support faster recovery.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Package Includes</p>
                                        <ul className="space-y-2">
                                            {recoveryPackIncludes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                    <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-5 rounded-xl bg-muted/30">
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Please Note</p>
                                        <ul className="space-y-2">
                                            {['Non-transferable', 'Non-refundable'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                    <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0 mt-2" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <Link
                                        href="/appointments"
                                        className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                    >
                                        Book Recovery Pack
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Massage & Bundles */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <MotionWrapper delay={0.1} direction="up">
                            <PricingCard title="Massage" subtitle="Ladies Only" bookLabel="Book Massage" bookHref="/appointments">
                                {massageServices.map((pkg, i) => (
                                    <PriceRow key={i} {...pkg} />
                                ))}
                            </PricingCard>
                        </MotionWrapper>
                        <MotionWrapper delay={0.15} direction="up">
                            <PricingCard title="Bundles" subtitle="Ladies Only" bookLabel="Book a Bundle" bookHref="/contact">
                                {bundles.map((pkg, i) => (
                                    <PriceRow key={i} {...pkg} />
                                ))}
                            </PricingCard>
                        </MotionWrapper>
                    </div>

                    {/* Memberships */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
                            <div className="bg-primary text-primary-foreground px-8 py-5 text-center">
                                <h2 className="font-headline text-2xl mb-0.5">Memberships</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    {memberships.map((tier, i) => (
                                        <div key={i} className="p-5 rounded-xl bg-muted/30 text-center">
                                            <p className="font-semibold text-primary text-lg mb-1">{tier.name}</p>
                                            <p className="font-headline text-3xl text-accent">{tier.price}</p>
                                            <p className="text-xs text-foreground/50">{tier.period}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="max-w-md mx-auto">
                                    <p className="text-sm font-medium text-primary mb-3 text-center">All Memberships Include:</p>
                                    <ul className="space-y-2">
                                        {membershipIncludes.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                    >
                                        Inquire About Memberships
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* CTA */}
                    <MotionWrapper delay={0.2} direction="up">
                        <div className="text-center p-10 glass rounded-3xl">
                            <h3 className="text-2xl md:text-3xl font-headline mb-4 text-primary">Start Your TAVU Experience</h3>
                            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                                Inquire via DM to reserve your access.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/schedule"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    View Schedule & Book
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-lg"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </main>
            <Footer />
        </div>
    );
}
