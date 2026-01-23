
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0 bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Hero Image: Add your TAVU studio/team hero image here</p>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">About TAVU</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Where stillness becomes movement, and movement becomes ritual.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Our Story */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">About Image: Add your studio interior or founder image here</p>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Our Story</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-6">The TAVU Journey</h2>
                                    <div className="space-y-4 text-lg text-foreground/70">
                                        <p>
                                            TAVU was born from a vision to create a sanctuary where wellness is not just a practice,
                                            but a way of life. Our name embodies the balance between grounding (TA) and flow (VU)
                                            that defines our approach.
                                        </p>
                                        <p>
                                            Located in Abu Dhabi, we've created a space where movement, breath, and recovery
                                            come together in perfect harmony. Every class, every session, every moment at TAVU
                                            is designed to help you reconnect with yourself.
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Our Philosophy */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Philosophy</span>
                                <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2">The Three Pillars</h2>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-3 gap-8">
                            <MotionWrapper delay={0.15} direction="up">
                                <div className="bg-card border border-border p-8 rounded-2xl text-center h-full">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-headline text-primary mb-4">Movement</h3>
                                    <p className="text-foreground/70">
                                        Intentional, mindful movement that strengthens the body while honoring its natural rhythms.
                                        From reformer to mat, every motion has purpose.
                                    </p>
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2} direction="up">
                                <div className="bg-card border border-border p-8 rounded-2xl text-center h-full">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-headline text-primary mb-4">Breath</h3>
                                    <p className="text-foreground/70">
                                        The bridge between body and mind. Our breath-led practices cultivate awareness,
                                        reduce stress, and unlock your body's natural healing capacity.
                                    </p>
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.25} direction="up">
                                <div className="bg-card border border-border p-8 rounded-2xl text-center h-full">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-headline text-primary mb-4">Recovery</h3>
                                    <p className="text-foreground/70">
                                        True transformation happens in the restoration. Our contrast therapy and massage services
                                        accelerate healing and enhance your overall wellbeing.
                                    </p>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Our Space */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <MotionWrapper delay={0.1} direction="left">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Our Space</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-6">A Sanctuary for Wellness</h2>
                                    <div className="space-y-4 text-lg text-foreground/70">
                                        <p>
                                            Step into TAVU and leave the outside world behind. Our thoughtfully designed space
                                            features state-of-the-art equipment, serene treatment rooms, and an atmosphere
                                            that nurtures both body and soul.
                                        </p>
                                        <p>
                                            From the moment you enter, you'll feel the difference. Natural materials,
                                            calming aesthetics, and attention to every detail create an environment
                                            where transformation is inevitable.
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                        >
                                            Explore Our Services
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center">
                                            <p className="text-xs">Studio Image 1</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center">
                                            <p className="text-xs">Studio Image 2</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center">
                                            <p className="text-xs">Studio Image 3</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center">
                                            <p className="text-xs">Studio Image 4</p>
                                        </div>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-4xl md:text-5xl font-headline mb-6">Begin Your Journey</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Join the TAVU community and discover what it means to truly invest in yourself.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/schedule"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Book Your First Session
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
