"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const articles = [
    {
        id: 1,
        title: "TAVÚ x YSL Beauty: The Fragrance of Wellness",
        excerpt: "Blurring the lines between sensory luxury and physical practice. A new partnership that redefines the scent of recovery.",
        image: "/pillar-recovery.png",
        category: "Partnership",
        readTime: "5 min",
        date: "Jan 2026",
        href: "#"
    },
    {
        id: 2,
        title: "Abu Dhabi's First Social Wellness Club",
        excerpt: "It's time to hit your peak. TAVÚ opens its doors in Al Zeina, combining holistic health with meaningful social connection.",
        image: "/pillar-movement.png",
        category: "News",
        readTime: "4 min",
        date: "Jan 2026",
        href: "#"
    },
    {
        id: 3,
        title: "The Science of Contrast Therapy",
        excerpt: "Why alternating extreme temperatures is the key to longevity, reduced inflammation, and mental resilience.",
        image: "/pillar-breath.png",
        category: "Wellness",
        readTime: "7 min",
        date: "Dec 2025",
        href: "#"
    },
    {
        id: 4,
        title: "Defining 'Ritual' in a Modern World",
        excerpt: "In a city that never stops, we explore what it means to create sacred pauses in your daily routine.",
        image: "/mood-stressed.png",
        category: "Lifestyle",
        readTime: "6 min",
        date: "Dec 2025",
        href: "#"
    }
];

export default function Articles() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <MotionWrapper delay={0.1} direction="up">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                        <div>
                            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                                Journal
                            </span>
                            <h2 className="text-4xl md:text-5xl font-headline font-medium text-primary">
                                Latest <em className="italic font-light text-primary/75">Articles</em>
                            </h2>
                        </div>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="mt-6 md:mt-0"
                        >
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-foreground/70 hover:text-accent transition-colors group"
                            >
                                View All
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </MotionWrapper>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {articles.map((article, index) => (
                        <MotionWrapper key={article.id} delay={0.1 + index * 0.1} direction="up">
                            <Link
                                href={article.href}
                                className="group block h-full"
                                onMouseEnter={() => setHoveredId(article.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <motion.article
                                    className="flex flex-col h-full"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Image with reveal animation */}
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                                        {/* Clip-path reveal animation */}
                                        <motion.div
                                            className="absolute inset-0 z-10 bg-accent"
                                            initial={{ clipPath: "inset(0 0 0 0)" }}
                                            animate={isInView ? { clipPath: "inset(0 0 100% 0)" } : {}}
                                            transition={{ delay: 0.3 + index * 0.15, duration: 0.8, ease: "easeInOut" }}
                                        />

                                        <motion.div
                                            className="relative w-full h-full"
                                            animate={hoveredId === article.id ? { scale: 1.1 } : { scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </motion.div>

                                        {/* Overlay on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredId === article.id ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Category tag */}
                                        <motion.span
                                            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={hoveredId === article.id ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {article.category}
                                        </motion.span>

                                        {/* Read more indicator */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={hoveredId === article.id ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="w-5 h-5 text-primary" />
                                        </motion.div>

                                        {/* Corner accents */}
                                        <motion.div
                                            className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/0 rounded-tr-lg"
                                            animate={hoveredId === article.id ? { borderColor: "rgba(255,255,255,0.5)" } : {}}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.div
                                            className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/0 rounded-bl-lg"
                                            animate={hoveredId === article.id ? { borderColor: "rgba(255,255,255,0.5)" } : {}}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow">
                                        {/* Meta info */}
                                        <div className="flex items-center gap-4 text-xs text-foreground/50 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {article.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {article.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-headline font-medium mb-3 text-primary group-hover:text-accent transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <motion.span
                                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-primary self-start group-hover:text-accent transition-colors"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read Article
                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                        </motion.span>
                                    </div>
                                </motion.article>
                            </Link>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
