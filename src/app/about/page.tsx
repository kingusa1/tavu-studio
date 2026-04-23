"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

const gallery = [
    { src: '/about-reception.webp', alt: 'TAVÚ stone reception desk' },
    { src: '/service-reformer-logo.webp', alt: 'Reformer studio with TAVÚ branded wall' },
    { src: '/service-sauna.webp', alt: 'Himalayan salt sauna interior' },
    { src: '/hero-ice-baths.webp', alt: 'Contrast Therapy ice baths at TAVÚ' },
    { src: '/about-lounge.webp', alt: 'TAVÚ arched stone lounge' },
    { src: '/service-breathing-shelf.webp', alt: 'Breathing Room equipment shelf' },
    { src: '/amenity-bathroom.webp', alt: 'TAVÚ facilities — organic stone basins' },
    { src: '/about-brand.webp', alt: 'TAVÚ branded amenities tray' },
    { src: '/amenity-cafe.webp', alt: 'TAVÚ café bar' },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/about-exterior.webp"
                        alt="TAVÚ Studio exterior"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">About TAVÚ</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            TA grounds the body. VU lifts the spirit.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* TA vs VU split */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0} direction="up">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                    The Philosophy
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                                    Two halves, one whole
                                </h2>
                                <p className="text-lg text-foreground/70">
                                    TAVÚ is built on a simple duality — a grounded body and an elevated spirit.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* TA — grounds the body */}
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="group relative rounded-3xl overflow-hidden h-[520px] shadow-2xl">
                                    <Image
                                        src="/service-reformer-mirror.webp"
                                        alt="TA — Reformer Pilates grounding the body"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <span className="font-headline text-8xl md:text-9xl leading-none mb-2 text-accent">TA</span>
                                        <h3 className="text-2xl md:text-3xl font-headline mb-3">Grounds the body.</h3>
                                        <p className="text-white/80 text-base leading-relaxed max-w-md">
                                            Strength, stability, presence. Built through Reformer Pilates,
                                            mat work, mobility and the rituals of recovery. Slow, intentional,
                                            repeated until it becomes part of you.
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>

                            {/* VU — lifts the spirit */}
                            <MotionWrapper delay={0.15} direction="right">
                                <div className="group relative rounded-3xl overflow-hidden h-[520px] shadow-2xl">
                                    <Image
                                        src="/hero-entrance-sign.webp"
                                        alt="VU — evening sky lifting the spirit at TAVÚ"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <span className="font-headline text-8xl md:text-9xl leading-none mb-2 text-accent">VU</span>
                                        <h3 className="text-2xl md:text-3xl font-headline mb-3">Lifts the spirit.</h3>
                                        <p className="text-white/80 text-base leading-relaxed max-w-md">
                                            Breath, heat, cold, stillness. The practices that open space — breathwork,
                                            yoga, sauna, ice bath. What you carry out, lighter than what you brought in.
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-xl">
                                    <Image
                                        src="/about-reception.webp"
                                        alt="TAVÚ Studio reception"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Our Story</span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-6">The TAVÚ Journey</h2>
                                    <div className="space-y-4 text-lg text-foreground/70">
                                        <p>
                                            TAVÚ was created from a simple belief: balance is not found in extremes, but in integration.
                                        </p>
                                        <p className="font-medium text-foreground/80">
                                            <span className="text-accent">TA</span> — grounding, strength, presence.<br />
                                            <span className="text-accent">VU</span> — elevation, flow, expansion.
                                        </p>
                                        <p>
                                            Together, they form TAVÚ: a space where the body is supported, the breath is honored,
                                            and practice becomes ritual.
                                        </p>
                                        <p>
                                            Rooted in Abu Dhabi, we bring Reformer Pilates, breath-led practices, and recovery
                                            into one considered experience. Every class is designed with intention —
                                            to build strength without force, to restore without escape, and to reconnect you to
                                            yourself through consistency, not urgency.
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

                {/* Studio Gallery */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0} direction="up">
                            <div className="text-center max-w-2xl mx-auto mb-14">
                                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                    The Space
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                                    Designed as a sanctuary
                                </h2>
                                <p className="text-lg text-foreground/70">
                                    Natural stone, warm light, small groups. Every detail tuned so your body and mind can settle.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
                            {gallery.map((img, i) => (
                                <MotionWrapper key={i} delay={0.05 * i} direction="up">
                                    <div className="relative aspect-square overflow-hidden rounded-2xl group">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </MotionWrapper>
                            ))}
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
                                    View Schedule &amp; Book
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
