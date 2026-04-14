"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
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
        description: 'Single session valid for any class (Mat Pilates, Mobility, Yoga, Breathwork, Yin).',
        validity: '',
        note: 'Non-transferable & non-refundable',
    },
    {
        name: '5-Class Pack',
        price: '550',
        description: 'Perfect for weekly consistency.',
        validity: '30 days from first use',
        note: '',
    },
    {
        name: '10-Class Pack',
        price: '1,020',
        description: 'Ideal for deeper practice.',
        validity: '45 days from first use',
        note: '',
    },
    {
        name: 'Unlimited Monthly',
        price: '800',
        description: 'Unlimited access for 30 days.',
        validity: '30 days',
        note: 'No rollovers \u00b7 Auto-renew optional \u00b7 Non-transferable & non-refundable',
    },
];

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-6xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-14">
                            <h1 className="text-5xl md:text-7xl font-headline mb-6 text-primary">Pricing</h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                All prices include VAT. More services coming soon.
                            </p>
                        </div>
                    </MotionWrapper>

                    <div className="grid lg:grid-cols-2 gap-10 mb-16">
                        {/* Reformer */}
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                                <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
                                    <h2 className="font-headline text-3xl mb-1">Reformer</h2>
                                    <p className="text-sm text-primary-foreground/70">Small-group reformer classes</p>
                                </div>
                                <div className="p-6 flex flex-col gap-4 flex-grow">
                                    {reformerPackages.map((pkg, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start justify-between gap-4 p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-grow">
                                                <p className="font-semibold text-primary text-lg">{pkg.name}</p>
                                                <p className="text-sm text-foreground/60 mt-1">{pkg.description}</p>
                                                {pkg.bonus && (
                                                    <p className="text-sm text-accent font-medium mt-2">{pkg.bonus}</p>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-headline text-2xl text-accent">{pkg.price}</p>
                                                <p className="text-xs text-foreground/50">AED</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-6 pb-6 mt-auto">
                                    <Link
                                        href="/schedule"
                                        className="flex items-center justify-center w-full h-14 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-lg"
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
                                    <h2 className="font-headline text-3xl mb-1">Breathing Room</h2>
                                    <p className="text-sm text-primary-foreground/70">Mat Pilates, Mobility, Yoga, Breathwork, Yin</p>
                                </div>
                                <div className="p-6 flex flex-col gap-4 flex-grow">
                                    {breathingPackages.map((pkg, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start justify-between gap-4 p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-grow">
                                                <p className="font-semibold text-primary text-lg">{pkg.name}</p>
                                                <p className="text-sm text-foreground/60 mt-1">{pkg.description}</p>
                                                {pkg.validity && (
                                                    <p className="text-xs text-foreground/50 mt-1">Valid {pkg.validity}</p>
                                                )}
                                                {pkg.note && (
                                                    <p className="text-xs text-foreground/40 mt-1.5">{pkg.note}</p>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-headline text-2xl text-accent">{pkg.price}</p>
                                                <p className="text-xs text-foreground/50">AED</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-6 pb-6 mt-auto">
                                    <Link
                                        href="/schedule"
                                        className="flex items-center justify-center w-full h-14 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-lg"
                                    >
                                        Book Breathing Room
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>

                    {/* CTA */}
                    <MotionWrapper delay={0.2} direction="up">
                        <div className="text-center p-10 glass rounded-3xl">
                            <h3 className="text-2xl md:text-3xl font-headline mb-4 text-primary">Begin When Ready</h3>
                            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                                Explore the schedule and book your class.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                View Schedule & Book
                            </Link>
                        </div>
                    </MotionWrapper>

                    {/* Contact Section */}
                    <MotionWrapper delay={0.25} direction="up">
                        <div className="text-center mt-12">
                            <p className="text-foreground/70">
                                Need help choosing the right package?{' '}
                                <Link href="/contact" className="text-accent hover:underline font-medium">
                                    Get in touch
                                </Link>
                            </p>
                        </div>
                    </MotionWrapper>
                </div>
            </main>
            <Footer />
        </div>
    );
}
