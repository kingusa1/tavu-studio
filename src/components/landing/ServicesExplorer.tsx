"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MotionWrapper from '@/components/common/MotionWrapper';

const services = [
    {
        id: 'reformer-pilates',
        name: 'Reformer Pilates',
        tagline: 'Precision. Strength. Control.',
        description: 'Small-group reformer classes designed to sculpt, strengthen, and align your body with spring-loaded resistance and expert guidance.',
        image: '/service-reformer-mirror.webp',
        highlights: ['Max 12 per class', 'Spring-loaded resistance', 'Full-body sculpting', 'Expert instructors'],
        href: '/services/reformer-pilates',
    },
    {
        id: 'breathing-room',
        name: 'Breathing Room',
        tagline: 'Stillness. Depth. Release.',
        description: 'Yoga, mat pilates, and mobility sessions in a dedicated space for grounding breathwork and mindful movement.',
        image: '/service-breathing-props.webp',
        highlights: ['Yoga & mat pilates', 'Guided breathwork', 'Mobility sessions', 'Mindful movement'],
        href: '/services/breathing-room',
    },
    {
        id: 'contrast-therapy',
        name: 'Contrast Therapy',
        tagline: 'Heat. Cold. Renew.',
        description: 'Alternating sauna and ice bath sessions to activate your body’s natural healing response. Shared and private suites available.',
        image: '/service-sauna.webp',
        highlights: ['Sauna + Ice Bath', 'Shared & private suites', 'Boosts circulation', 'Accelerates recovery'],
        href: '/services/contrast-therapy',
    },
    {
        id: 'compression-therapy',
        name: 'Compression Therapy',
        tagline: 'Recover. Restore. Repeat.',
        description: 'NormaTec pulsing compression to stimulate circulation, flush lactic acid, and support faster muscle recovery.',
        image: '/service-recovery-equipment.webp',
        highlights: ['NormaTec compression', 'Post-training recovery', 'Reduces swelling', 'Speeds up recovery'],
        href: '/services/compression-therapy',
    },
    {
        id: 'iv-therapy',
        name: 'IV Therapy',
        tagline: 'Replenish. Recharge. Glow.',
        description: 'Vitamin and hydration infusions administered by licensed professionals to boost energy, immunity, and overall wellness.',
        image: '/about-lounge.webp',
        highlights: ['Vitamin infusions', 'Hydration therapy', 'Licensed professionals', 'Custom blends'],
        href: '/services/iv-therapy',
    },
    {
        id: 'massage',
        name: 'Massage',
        tagline: 'Unwind. Heal. Breathe.',
        description: 'Therapeutic and relaxation massage treatments tailored to release tension, improve circulation, and restore balance.',
        image: '/service-massage-towels.webp',
        highlights: ['Deep tissue', 'Sports recovery', 'Relaxation', 'Custom treatments'],
        href: '/services/massage',
    },
];

export default function ServicesExplorer() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const active = services[activeIndex];

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % services.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [paused]);

    const handleTabClick = useCallback((index: number) => {
        setActiveIndex(index);
        setPaused(true);
        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setPaused(false), 10000);
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center mb-14">
                        <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
                            What We Offer
                        </span>
                        <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">
                            Our Services
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
                            Select a service to learn more about what we provide.
                        </p>
                    </div>
                </MotionWrapper>

                {/* Service Tabs */}
                <MotionWrapper delay={0.1} direction="up">
                    <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <button
                                key={service.id}
                                onClick={() => handleTabClick(index)}
                                className={`
                                    relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                                    ${index === activeIndex
                                        ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/25'
                                        : 'bg-muted/50 text-foreground/60 hover:bg-muted hover:text-foreground'
                                    }
                                `}
                            >
                                {service.name}
                            </button>
                        ))}
                    </div>
                </MotionWrapper>

                {/* Service Detail */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="grid md:grid-cols-2 gap-10 items-center"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                                <Image
                                    src={active.image}
                                    alt={active.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-2">
                                    {active.name}
                                </h3>
                                <p className="text-accent font-medium text-sm tracking-wide uppercase mb-4">
                                    {active.tagline}
                                </p>
                                <p className="text-foreground/70 leading-relaxed mb-8">
                                    {active.description}
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    {active.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <span className="text-sm text-foreground/70">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={active.href}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-medium transition-all hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                                >
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
