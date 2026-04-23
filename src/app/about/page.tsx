
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/about-exterior.webp"
                        alt="TAVU Wellness Studio Sign"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">About TAVU</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            TA grounds the body. VU lifts the spirit.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Our Story - The TAVU Journey */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                                    <Image
                                        src="/about-reception.webp"
                                        alt="TAVU Studio Interior"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Our Story</span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-6">The TAVU Journey</h2>
                                    <div className="space-y-4 text-lg text-foreground/70">
                                        <p>
                                            TAVU was created from a simple belief: that balance is not found in extremes, but in integration.
                                        </p>
                                        <p>
                                            Our name reflects this philosophy.
                                        </p>
                                        <p className="font-medium text-foreground/80">
                                            <span className="text-accent">TA</span> — grounding, strength, presence.<br />
                                            <span className="text-accent">VU</span> — elevation, flow, expansion.
                                        </p>
                                        <p>
                                            Together, they form TAVU: a space where the body is supported, the breath is honored, and practice becomes ritual.
                                        </p>
                                        <p>
                                            Rooted in Abu Dhabi, TAVU brings reformer Pilates, breath-led practices, and recovery into one considered experience. Every class is designed with intention — to build strength without force, to restore without escape, and to reconnect you to yourself through consistency, not urgency.
                                        </p>
                                        <p className="text-foreground/80 italic">
                                            This is not a place to rush through movement.<br />
                                            It is a place to arrive.
                                        </p>
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
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">Begin When Ready</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Explore the schedule and book your class.
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
