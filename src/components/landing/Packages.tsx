"use client";

import MotionWrapper from '@/components/common/MotionWrapper';
import HealCodePricingWidget from '@/components/mindbody/HealCodePricingWidget';

export default function Packages() {
    return (
        <section id="packages" className="py-20 bg-accent/5 border-y border-accent/20">
            <div className="container mx-auto px-4">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                            Pre-Opening Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-headline text-primary mb-4">
                            TAVÚ Pre-Opening — Limited Access
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            Be among the first to experience TAVÚ. Exclusive packages available for a limited time.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Reformer Founder */}
                    <MotionWrapper delay={0.1} direction="up" className="h-full">
                        <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            <h3 className="font-headline text-2xl text-primary mb-2">Reformer Founder</h3>
                            <p className="text-sm text-accent font-medium mb-2">10 Reformer Classes</p>
                            <p className="text-sm text-foreground/70 mb-6">Supported movement. Intelligent progression.</p>
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

                    {/* Mat Founder */}
                    <MotionWrapper delay={0.15} direction="up" className="h-full">
                        <div className="bg-card border border-border p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            <h3 className="font-headline text-2xl text-primary mb-2">Mat Founder</h3>
                            <p className="text-sm text-accent font-medium mb-2">8 Mat Classes</p>
                            <p className="text-sm text-foreground/70 mb-6">Grounded strength. Slow beginnings.</p>
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

                    {/* Reformer + Mat Founder (Best Value) */}
                    <MotionWrapper delay={0.2} direction="up" className="h-full">
                        <div className="bg-card border-2 border-accent p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                Best Value
                            </span>
                            <h3 className="font-headline text-2xl text-primary mb-2 mt-2">Reformer + Mat Founder</h3>
                            <p className="text-sm text-accent font-medium mb-2">6 Reformer + 4 Mat Classes</p>
                            <p className="text-sm text-foreground/70 mb-6">A complete practice — from foundation to flow.</p>
                            <p className="text-5xl font-headline text-accent mb-2">1,049</p>
                            <p className="text-sm text-foreground/60 mb-1">AED</p>
                            <p className="text-sm text-foreground/60 mb-6">Validity: 60 days</p>
                            <div className="bg-accent/10 rounded-xl p-4 mb-6">
                                <p className="text-sm font-medium text-primary">Includes:</p>
                                <p className="text-sm text-foreground/70">6 Reformer Pilates classes</p>
                                <p className="text-sm text-foreground/70">4 Mat Pilates / Yoga / Mobility classes</p>
                            </div>
                            <div className="mt-auto">
                                <HealCodePricingWidget
                                    serviceId="119"
                                    linkType="contract-link"
                                    buttonText="Get Your Pass"
                                />
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
