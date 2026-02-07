"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const services = [
    {
        name: 'Standard Contrast Therapy',
        description: 'Himalayan Salt Sauna + Ice Bath. Alternating hot and cold to activate your body\'s natural healing response.',
        duration: '60 min',
        price: '220 AED',
        features: ['Himalayan Salt Sauna', 'Ice Bath', 'Towels & amenities included']
    },
    {
        name: 'Private Contrast Infrared',
        description: 'Infrared Sauna + Ice Bath in a private suite. Premium recovery experience with deeper heat penetration.',
        duration: '60 min',
        price: '275 AED',
        features: ['Private Infrared Sauna', 'Private Ice Bath', 'Premium amenities']
    },
    {
        name: 'NormaTec Compression',
        description: 'Advanced compression therapy for athletes, runners, and post-training recovery. Accelerate muscle recovery.',
        duration: '45 min',
        price: '160 AED',
        features: ['Full leg compression', 'Customizable pressure', 'Perfect post-workout']
    }
];

const benefits = [
    {
        title: 'Accelerated Recovery',
        description: 'Reduce muscle soreness and speed up recovery after intense workouts.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: 'Reduced Inflammation',
        description: 'Cold therapy helps reduce inflammation and joint pain naturally.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    },
    {
        title: 'Improved Circulation',
        description: 'Hot-cold contrast boosts blood flow and cardiovascular health.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        )
    },
    {
        title: 'Mental Clarity',
        description: 'Cold exposure releases endorphins and improves mental focus.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    }
];

export default function CompressionTherapyPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service-ice-bath.png"
                        alt="Compression Therapy"
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
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Compression Therapy</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            Contrast therapy combining hot and cold to activate your body's natural healing response.
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
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary mb-6">The Power of Contrast</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        Our contrast therapy sessions combine the ancient wisdom of hot and cold therapy with modern recovery science.
                                        Experience the healing power of our Himalayan Salt Sauna, Infrared Sauna, and Ice Bath facilities.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                        Whether you're an athlete seeking faster recovery or simply looking to boost your wellness routine,
                                        our contrast therapy will leave you feeling refreshed, rejuvenated, and ready to take on anything.
                                    </p>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                    >
                                        Book a Session
                                    </Link>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/service-ice-hands.png"
                                        alt="Contrast Therapy"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">Standard</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Contrast Therapy</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Himalayan Salt Sauna + Ice Bath
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Single sessions and multi-session packs
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Optional add-on: Compression Flush
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">Why Choose Us</span>
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Benefits</h2>
                                <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
                                    Experience the transformative power of contrast therapy.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <MotionWrapper key={index} delay={0.08 * (index + 1)} direction="up">
                                    <div className="group bg-white border border-border/50 p-8 rounded-3xl text-center hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-300 h-full">
                                        <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform duration-300">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="font-semibold text-primary text-lg mb-3">{benefit.title}</h3>
                                        <p className="text-sm text-foreground/60 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Our Services</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Choose the contrast therapy experience that's right for you.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {services.map((service, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl transition-all h-full flex flex-col">
                                        <h3 className="font-headline text-xl text-primary mb-2">{service.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4 flex-grow">{service.description}</p>
                                        <ul className="space-y-2 mb-6">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center justify-between pt-4 border-t border-border">
                                            <div>
                                                <p className="text-sm text-foreground/60">{service.duration}</p>
                                                <p className="font-semibold text-accent">{service.price}</p>
                                            </div>
                                            <Link href="/schedule" className="text-accent font-medium text-sm hover:underline">
                                                Book →
                                            </Link>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Ready to Recover?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your contrast therapy session and feel the difference.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                Book a Session
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
