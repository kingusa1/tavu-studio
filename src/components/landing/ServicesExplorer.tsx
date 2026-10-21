"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MotionWrapper from '@/components/common/MotionWrapper';

import { resolveImage } from '@/lib/cms/media';
import type { HomePage } from '@/payload-types';

export type ServicesExplorerData = NonNullable<HomePage['servicesExplorer']>;

export type ServicesExplorerProps = {
    data: ServicesExplorerData;
};

// `imagePosition` select keys mapped to literal Tailwind classes (R4) — replaces the pre-CMS
// `active.id === 'reformer-pilates'` hack (ServicesExplorer.tsx:138, §1.4).
const IMAGE_POSITION_CLASS: Record<string, string> = {
    center: 'object-cover',
    'center-40': 'object-cover object-[center_40%]',
};

export default function ServicesExplorer({ data }: ServicesExplorerProps) {
    const services = data.items ?? [];
    const serviceCount = services.length || 1;

    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const active = services[activeIndex];

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (paused || services.length === 0) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % serviceCount);
        }, 5000);
        return () => clearInterval(timer);
    }, [paused, serviceCount, services.length]);

    const handleTabClick = useCallback((index: number) => {
        setActiveIndex(index);
        setPaused(true);
        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setPaused(false), 10000);
    }, []);

    if (!active) return null;

    const resolvedImage = resolveImage(active.image);
    const imageClass = IMAGE_POSITION_CLASS[active.imagePosition ?? 'center'] ?? IMAGE_POSITION_CLASS.center;

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center mb-14">
                        <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
                            {data.eyebrow}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">
                            {data.heading}
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
                            {data.intro}
                        </p>
                    </div>
                </MotionWrapper>

                {/* Service Tabs */}
                <MotionWrapper delay={0.1} direction="up">
                    <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <button
                                key={service.id ?? index}
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

                {/* Warm the cache with every service photo so switching tabs never shows an empty box */}
                <div className="hidden relative" aria-hidden="true">
                    {services.map((service) => {
                        const preloadImage = resolveImage(service.image);
                        if (!preloadImage) return null;
                        return (
                            <Image key={service.id} src={preloadImage.src} alt="" fill loading="eager" sizes="(max-width: 768px) 100vw, 50vw" />
                        );
                    })}
                </div>

                {/* Service Detail */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id ?? activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="grid md:grid-cols-2 gap-10 items-center"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-primary/10">
                                {resolvedImage && (
                                    <Image
                                        src={resolvedImage.src}
                                        alt={resolvedImage.alt || active.name}
                                        fill
                                        className={imageClass}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
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
                                    {(active.highlights ?? []).map((item, i) => (
                                        <div key={item.id ?? i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <span className="text-sm text-foreground/70">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={active.href}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-medium transition-all hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                                >
                                    {data.ctaLabel}
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
