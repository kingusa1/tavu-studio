"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import HealCodePricingWidget from '@/components/mindbody/HealCodePricingWidget';

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-5xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-7xl font-headline mb-6 text-primary">Pricing</h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Invest in your wellness with our pre-opening packages.
                            </p>
                        </div>
                    </MotionWrapper>

                    {/* Pre-Opening Packages */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="text-center mb-10">
                            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                Pre-Opening Offer
                            </span>
                            <h2 className="text-3xl md:text-4xl font-headline text-primary">TAVÚ Pre-Opening — Limited Access</h2>
                        </div>
                    </MotionWrapper>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
                        {/* TAVÚ FORM - Reformer */}
                        <MotionWrapper delay={0.15} direction="up">
                            <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-xl transition-shadow h-full flex flex-col">
                                <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FORM</h3>
                                <p className="text-sm text-accent font-medium mb-2">Reformer Focus</p>
                                <p className="text-sm text-foreground/70 mb-6">Focused. Structured. Reformer-only.</p>
                                <p className="text-5xl font-headline text-accent mb-2">999</p>
                                <p className="text-sm text-foreground/60 mb-1">AED</p>
                                <p className="text-sm text-foreground/60 mb-6">Validity: 60 days</p>
                                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                                    <p className="text-sm font-medium text-primary">Includes:</p>
                                    <p className="text-sm text-foreground/70">10 Reformer Pilates classes</p>
                                </div>
                                <div className="mt-auto">
                                    <HealCodePricingWidget
                                        serviceId="100073"
                                        linkType="pricing-link"
                                        buttonText="Get Your Pass"
                                    />
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* TAVÚ FOUNDATION - Mat */}
                        <MotionWrapper delay={0.2} direction="up">
                            <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-xl transition-shadow h-full flex flex-col">
                                <h3 className="font-headline text-2xl text-primary mb-2">TAVÚ FOUNDATION</h3>
                                <p className="text-sm text-accent font-medium mb-2">Mat Series</p>
                                <p className="text-sm text-foreground/70 mb-6">A softer entry into the TAVÚ method.</p>
                                <p className="text-5xl font-headline text-accent mb-2">599</p>
                                <p className="text-sm text-foreground/60 mb-1">AED</p>
                                <p className="text-sm text-foreground/60 mb-6">Validity: 45 days</p>
                                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                                    <p className="text-sm font-medium text-primary">Includes:</p>
                                    <p className="text-sm text-foreground/70">8 Mat Pilates / Yoga / Mobility classes</p>
                                </div>
                                <div className="mt-auto">
                                    <HealCodePricingWidget
                                        serviceId="100075"
                                        linkType="pricing-link"
                                        buttonText="Get Your Pass"
                                    />
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>

                    {/* CTA */}
                    <MotionWrapper delay={0.3} direction="up">
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
                    <MotionWrapper delay={0.35} direction="up">
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
