"use client";

import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

const reformerPackages = [
    {
        name: 'Drop-In',
        price: '160',
        description: 'Single reformer session. VAT included.',
        validity: '',
        bonus: '',
    },
    {
        name: '8-Class Pack',
        price: '1,260',
        description: 'Valid 45 days.',
        validity: '45 days',
        bonus: 'Includes 1 complimentary Contrast Therapy session',
    },
    {
        name: '10-Class Pack',
        price: '1,420',
        description: 'Valid 60 days.',
        validity: '60 days',
        bonus: 'Includes 2 complimentary Contrast Therapy sessions',
    },
    {
        name: '16-Class Pack',
        price: '2,020',
        description: 'Valid 75 days.',
        validity: '75 days',
        bonus: 'Includes 2 complimentary Contrast Therapy sessions',
    },
];

const breathingPackages = [
    {
        name: 'Drop-In',
        price: '120',
        period: '',
        description: 'Single session valid for any class (Mat Pilates, Mobility, Yoga, Breathwork, Yin).',
        validity: '',
        note: 'Non-transferable & non-refundable',
    },
    {
        name: '5-Class Pack',
        price: '550',
        period: '',
        description: 'Perfect for weekly consistency.',
        validity: '30 days from first use',
        note: '',
    },
    {
        name: '10-Class Pack',
        price: '1,020',
        period: '',
        description: 'Ideal for deeper practice.',
        validity: '45 days from first use',
        note: '',
    },
    {
        name: 'Unlimited 3-Month Membership',
        price: '800',
        period: 'month',
        description: 'Unlimited access to all Breathing Room classes. AED 2,400 paid upfront for a 3-month commitment.',
        validity: '3 consecutive months',
        note: 'Non-transferable \u00b7 Non-refundable \u00b7 No rollovers',
    },
];

export default function Packages() {
    return (
        <section id="packages" className="py-20 bg-accent/5 border-y border-accent/20">
            <div className="container mx-auto px-4">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center mb-14">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            Pricing
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                            Choose Your Practice
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            All prices include VAT. More services coming soon.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Reformer */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                            <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
                                <h3 className="font-headline text-2xl mb-1">Reformer</h3>
                                <p className="text-sm text-primary-foreground/70">Small-group reformer classes</p>
                            </div>
                            <div className="p-6 flex flex-col gap-4 flex-grow">
                                {reformerPackages.map((pkg, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-grow">
                                            <p className="font-semibold text-primary">{pkg.name}</p>
                                            <p className="text-sm text-foreground/60 mt-1">{pkg.description}</p>
                                            {pkg.bonus && (
                                                <p className="text-xs text-accent font-medium mt-1.5">{pkg.bonus}</p>
                                            )}
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">{pkg.price}</p>
                                            <p className="text-xs text-foreground/50">AED</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 pb-6 mt-auto">
                                <Link
                                    href="/schedule"
                                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                >
                                    Book Reformer
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Breathing Room */}
                    <MotionWrapper delay={0.15} direction="up">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                            <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
                                <h3 className="font-headline text-2xl mb-1">Breathing Room</h3>
                                <p className="text-sm text-primary-foreground/70">Mat Pilates, Mobility, Yoga, Breathwork, Yin</p>
                            </div>
                            <div className="p-6 flex flex-col gap-4 flex-grow">
                                {breathingPackages.map((pkg, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-grow">
                                            <p className="font-semibold text-primary">{pkg.name}</p>
                                            <p className="text-sm text-foreground/60 mt-1">{pkg.description}</p>
                                            {pkg.validity && (
                                                <p className="text-xs text-foreground/50 mt-1">Valid {pkg.validity}</p>
                                            )}
                                            {pkg.note && (
                                                <p className="text-xs text-foreground/40 mt-1">{pkg.note}</p>
                                            )}
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-headline text-xl text-accent">{pkg.price}</p>
                                            <p className="text-xs text-foreground/50 whitespace-nowrap">
                                                {pkg.period ? `AED / ${pkg.period}` : 'AED'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 pb-6 mt-auto">
                                <Link
                                    href="/schedule"
                                    className="flex items-center justify-center w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                >
                                    Book Breathing Room
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
