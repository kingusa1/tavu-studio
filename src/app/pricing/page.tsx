
'use client';

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';

const tabs = [
    { id: 'classes', label: 'Classes' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'massage', label: 'Massage' },
    { id: 'bundles', label: 'Bundles & Groups' }
];

// Classes Pricing Data
const reformerPricing = [
    { name: 'Drop-In', price: '160 AED', validity: 'Single class', bonus: null },
    { name: '8-Class Pack', price: '1,260 AED', validity: '45 days', bonus: '+ 1 Contrast Therapy' },
    { name: '10-Class Pack', price: '1,420 AED', validity: '60 days', bonus: '+ 2 Contrast Therapy', popular: true },
    { name: '16-Class Pack', price: '2,020 AED', validity: '75 days', bonus: '+ 2 Contrast Therapy' }
];

const breathingPricing = [
    { name: 'Drop-In', price: '120 AED', validity: 'Any class', bonus: null },
    { name: '5-Class Pack', price: '550 AED', validity: '30 days', bonus: null },
    { name: '10-Class Pack', price: '1,020 AED', validity: '45 days', bonus: null, popular: true },
    { name: 'Unlimited Monthly', price: '800 AED', validity: 'No rollovers', bonus: null }
];

// Recovery Pricing Data
const standardContrastPricing = [
    { name: 'Drop-In', price: '220 AED', validity: '60 min' },
    { name: '5-Pack', price: '990 AED', validity: '30 days' },
    { name: '10-Pack', price: '1,850 AED', validity: '60 days' }
];

const privateInfraredPricing = [
    { name: 'Drop-In', price: '275 AED', validity: '60 min' },
    { name: '5-Pack', price: '1,250 AED', validity: '30 days' },
    { name: '10-Pack', price: '2,300 AED', validity: '45 days' }
];

// Massage Pricing Data
const massagePricing = [
    { name: 'TA | Destress Massage', duration: '60 min', price: '300 AED' },
    { name: 'TA | Relaxing Massage', duration: '60 min', price: '300 AED' },
    { name: 'TA | Express Head, Neck & Shoulder', duration: '45 min', price: '220 AED' },
    { name: 'TA | Foot Ritual Massage', duration: '30 min', price: '180 AED' },
    { name: 'VU | Deep Tissue Massage', duration: '60 min', price: '300 AED' }
];

// Bundles Pricing Data
const individualBundles = [
    { name: 'TA RESET BUNDLE', price: '480 AED', includes: 'Contrast + Express Massage' },
    { name: 'TA DEEP CALM BUNDLE', price: '520 AED', includes: 'Contrast + Relaxing Massage' },
    { name: 'VU ATHLETE BUNDLE', price: '560 AED', includes: 'Contrast + Deep Tissue' },
    { name: 'VU MOBILITY FLOW BUNDLE', price: '580 AED', includes: 'Contrast + Mobility' }
];

const couplesPricing = [
    { name: 'Couples Contrast Therapy', price: '400 AED', note: 'For 2 people' },
    { name: 'Couples Reset Bundle', price: '620 AED', note: 'Contrast + 2x Massage' }
];

const groupPricing = [
    { name: 'Group Contrast Ritual', price: '1,050 AED', note: '4-6 people (175/person)' },
    { name: 'Group Recovery Experience', price: '1,250 AED', note: 'Up to 6 people' }
];

// Soft Opening Specials
const softOpeningDeals = [
    { name: 'Reformer 10-Class Pack', original: '1,420 AED', sale: '1,250 AED', discount: '12%' },
    { name: 'Breathing 10-Class Pack', original: '1,020 AED', sale: '900 AED', discount: '12%' }
];

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState('classes');

    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-6xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-7xl font-headline mb-6 text-primary">Pricing</h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Invest in your wellness. Choose from our range of classes, recovery services, and packages.
                            </p>
                        </div>
                    </MotionWrapper>

                    {/* Soft Opening Banner */}
                    <MotionWrapper delay={0.05} direction="up">
                        <div className="glass p-6 md:p-8 rounded-3xl border-2 border-accent/30 bg-accent/5 mb-12">
                            <div className="text-center mb-6">
                                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-3">
                                    Founding Member Offer
                                </span>
                                <h2 className="text-2xl md:text-3xl font-headline text-primary">Soft Opening Special</h2>
                                <p className="text-foreground/70">Limited 45-day founding member access</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                                {softOpeningDeals.map((deal, index) => (
                                    <div key={index} className="bg-background/60 p-4 rounded-xl text-center">
                                        <h3 className="font-semibold text-primary text-sm mb-1">{deal.name}</h3>
                                        <p className="text-sm text-foreground/50 line-through">{deal.original}</p>
                                        <p className="text-2xl font-bold text-accent">{deal.sale}</p>
                                        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full mt-1 font-medium">
                                            Save {deal.discount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Tab Navigation */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-accent text-accent-foreground shadow-lg'
                                            : 'bg-background/50 text-foreground/70 hover:bg-background/80'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </MotionWrapper>

                    {/* Tab Content */}
                    <MotionWrapper delay={0.15} direction="up">
                        <div className="glass p-6 md:p-10 rounded-3xl mb-12">
                            {/* Classes Tab */}
                            {activeTab === 'classes' && (
                                <div className="space-y-8">
                                    {/* Reformer Room */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Reformer Room</h3>
                                        </div>
                                        <p className="text-sm text-foreground/70 mb-4">Small group classes (max 6) | 45-minute sessions</p>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {reformerPricing.map((tier, index) => (
                                                <div
                                                    key={index}
                                                    className={`bg-muted/50 p-4 rounded-xl ${tier.popular ? 'ring-2 ring-accent' : ''}`}
                                                >
                                                    {tier.popular && (
                                                        <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium mb-2 inline-block">
                                                            Popular
                                                        </span>
                                                    )}
                                                    <h4 className="font-semibold text-primary">{tier.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{tier.price}</p>
                                                    <p className="text-xs text-foreground/60">{tier.validity}</p>
                                                    {tier.bonus && (
                                                        <p className="text-xs text-emerald-600 mt-1 font-medium">{tier.bonus}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-accent/20" />

                                    {/* Breathing Room */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Breathing Room</h3>
                                        </div>
                                        <p className="text-sm text-foreground/70 mb-4">Yoga, Pilates & Movement | 45-60 minute sessions</p>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {breathingPricing.map((tier, index) => (
                                                <div
                                                    key={index}
                                                    className={`bg-muted/50 p-4 rounded-xl ${tier.popular ? 'ring-2 ring-accent' : ''}`}
                                                >
                                                    {tier.popular && (
                                                        <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium mb-2 inline-block">
                                                            Popular
                                                        </span>
                                                    )}
                                                    <h4 className="font-semibold text-primary">{tier.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{tier.price}</p>
                                                    <p className="text-xs text-foreground/60">{tier.validity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-xs text-foreground/50 text-center">12-hour strict cancellation policy for all classes</p>
                                </div>
                            )}

                            {/* Recovery Tab */}
                            {activeTab === 'recovery' && (
                                <div className="space-y-8">
                                    {/* Standard Contrast */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Standard Contrast Therapy</h3>
                                        </div>
                                        <p className="text-sm text-foreground/70 mb-4">Himalayan Salt Sauna + Ice Bath</p>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            {standardContrastPricing.map((tier, index) => (
                                                <div key={index} className="bg-muted/50 p-4 rounded-xl">
                                                    <h4 className="font-semibold text-primary">{tier.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{tier.price}</p>
                                                    <p className="text-xs text-foreground/60">{tier.validity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-accent/20" />

                                    {/* Private Infrared */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Private Contrast Infrared</h3>
                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-medium">Private Suite</span>
                                        </div>
                                        <p className="text-sm text-foreground/70 mb-4">Infrared Sauna + Ice Bath</p>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            {privateInfraredPricing.map((tier, index) => (
                                                <div key={index} className="bg-muted/50 p-4 rounded-xl">
                                                    <h4 className="font-semibold text-primary">{tier.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{tier.price}</p>
                                                    <p className="text-xs text-foreground/60">{tier.validity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-accent/20" />

                                    {/* Add-ons */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-accent/10 p-4 rounded-xl">
                                            <h4 className="font-semibold text-primary">Compression Flush Add-On</h4>
                                            <p className="text-xs text-foreground/60 mb-2">20 mins | With Contrast Therapy only</p>
                                            <p className="text-xl font-bold text-accent">50 AED</p>
                                        </div>
                                        <div className="bg-accent/10 p-4 rounded-xl">
                                            <h4 className="font-semibold text-primary">NormaTec Compression</h4>
                                            <p className="text-xs text-foreground/60 mb-2">45 mins | Standalone session</p>
                                            <p className="text-xl font-bold text-accent">160 AED</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-foreground/50 text-center">6-hour strict cancellation policy for all recovery services</p>
                                </div>
                            )}

                            {/* Massage Tab */}
                            {activeTab === 'massage' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-center gap-3 mb-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                                            Ladies Only
                                        </span>
                                    </div>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {massagePricing.map((massage, index) => (
                                            <div key={index} className="bg-muted/50 p-5 rounded-xl">
                                                <h4 className="font-semibold text-primary mb-1">{massage.name}</h4>
                                                <p className="text-sm text-foreground/60 mb-2">{massage.duration}</p>
                                                <p className="text-xl font-bold text-accent">{massage.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-foreground/50 text-center">6-hour strict cancellation policy for all massage services</p>
                                </div>
                            )}

                            {/* Bundles & Groups Tab */}
                            {activeTab === 'bundles' && (
                                <div className="space-y-8">
                                    {/* Individual Bundles */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Recovery + Massage Bundles</h3>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                                                Ladies Only
                                            </span>
                                        </div>
                                        <p className="text-sm text-foreground/70 mb-4">14-day validity | Combine services for best value</p>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {individualBundles.map((bundle, index) => (
                                                <div key={index} className="bg-muted/50 p-4 rounded-xl">
                                                    <h4 className="font-semibold text-primary text-sm">{bundle.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{bundle.price}</p>
                                                    <p className="text-xs text-foreground/60">{bundle.includes}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-accent/20" />

                                    {/* Couples */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Couples</h3>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {couplesPricing.map((item, index) => (
                                                <div key={index} className="bg-muted/50 p-4 rounded-xl">
                                                    <h4 className="font-semibold text-primary">{item.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{item.price}</p>
                                                    <p className="text-xs text-foreground/60">{item.note}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-foreground/50 mt-2">Optional: Compression Boots (40 AED/person, 20 mins)</p>
                                    </div>

                                    <hr className="border-accent/20" />

                                    {/* Groups */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-headline text-primary">Groups</h3>
                                            <span className="text-sm text-foreground/60">(4-6 people)</span>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {groupPricing.map((item, index) => (
                                                <div key={index} className="bg-muted/50 p-4 rounded-xl">
                                                    <h4 className="font-semibold text-primary">{item.name}</h4>
                                                    <p className="text-xl font-bold text-accent my-1">{item.price}</p>
                                                    <p className="text-xs text-foreground/60">{item.note}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-accent/10 p-3 rounded-lg mt-3">
                                            <p className="text-sm"><strong>Group + Express Massage Add-On:</strong> 100 AED per person (30 min, co-ed allowed)</p>
                                        </div>
                                        <p className="text-xs text-foreground/50 mt-2">24-hour cancellation | Manual reception approval required</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </MotionWrapper>

                    {/* Policies Summary */}
                    <MotionWrapper delay={0.2} direction="up">
                        <div className="glass p-6 rounded-3xl mb-12">
                            <h3 className="text-lg font-semibold text-primary mb-4">Cancellation Policies</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                    <p className="font-medium text-primary">Classes</p>
                                    <p className="text-foreground/70">12 hours</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-primary">Contrast & Massage</p>
                                    <p className="text-foreground/70">6 hours</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-primary">Couples</p>
                                    <p className="text-foreground/70">6 hours</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-primary">Groups</p>
                                    <p className="text-foreground/70">24 hours</p>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Mindbody Widget */}
                    <MotionWrapper delay={0.25} direction="up">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-headline text-primary mb-2">Purchase Packages</h2>
                            <p className="text-foreground/70">Select your package below to get started</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-md rounded-lg p-4 min-h-[600px]">
                            <MindbodyWidget widgetType="registrations" widgetId="dc166478beda" />
                        </div>
                    </MotionWrapper>

                    {/* CTA */}
                    <MotionWrapper delay={0.3} direction="up">
                        <div className="text-center p-8 glass rounded-3xl mt-12">
                            <h3 className="text-2xl md:text-3xl font-headline mb-4 text-primary">Need Help Choosing?</h3>
                            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
                                Contact us to find the perfect package for your wellness goals.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </MotionWrapper>
                </div>
            </main>
            <Footer />
        </div>
    );
}
