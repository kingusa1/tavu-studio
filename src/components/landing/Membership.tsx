"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { Sparkles } from "lucide-react";

export default function Membership() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden"
        >
            {/* Parallax Background Layer */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                <Image
                    src="/pillar-movement.png"
                    alt="Wellness background"
                    fill
                    className="object-cover scale-110"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>

            {/* Floating particle effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => {
                    // Use deterministic positions based on index to avoid hydration mismatch
                    const left = ((i * 37 + 13) % 100);
                    const top = ((i * 53 + 7) % 100);
                    const duration = 3 + (i % 5) * 0.4;
                    const delay = (i % 10) * 0.3;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-accent/40 rounded-full"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                            }}
                            transition={{
                                duration,
                                repeat: Infinity,
                                delay,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}
            </div>

            {/* Foreground decorative images */}
            <motion.div
                className="absolute bottom-0 left-0 w-64 h-80 opacity-30 hidden lg:block"
                style={{ y: foregroundY }}
            >
                <Image
                    src="/mood-balanced.png"
                    alt="Decorative"
                    fill
                    className="object-cover rounded-tr-3xl"
                    sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </motion.div>

            <motion.div
                className="absolute top-20 right-0 w-48 h-64 opacity-25 hidden lg:block"
                style={{ y: foregroundY }}
            >
                <Image
                    src="/pillar-breath.png"
                    alt="Decorative"
                    fill
                    className="object-cover rounded-bl-3xl"
                    sizes="192px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="container mx-auto px-6 relative z-10 text-center text-white"
                style={{ y: textY, opacity }}
            >
                <MotionWrapper delay={0.1} direction="up">
                    <motion.div
                        className="inline-flex items-center gap-2 mb-8"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="w-5 h-5 text-accent" />
                        <span className="uppercase tracking-[0.4em] text-sm font-bold opacity-90">
                            Exclusive Access
                        </span>
                        <Sparkles className="w-5 h-5 text-accent" />
                    </motion.div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-medium mb-10 tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Join the{" "}
                        </motion.span>
                        <motion.em
                            className="italic font-light text-accent/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Membership
                        </motion.em>
                    </h2>

                    <motion.div
                        className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-10"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        Unlimited access to classes, priority booking, and exclusive member-only events.
                        Elevate your wellness journey.
                    </p>

                    {/* Feature pills */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {["Unlimited Classes", "Priority Booking", "Member Events", "Recovery Access"].map((feature, i) => (
                            <motion.span
                                key={feature}
                                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(218,165,32,0.2)" }}
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/30"
                            >
                                View Memberships
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-white/30 hover:bg-white/10 backdrop-blur-sm text-white font-medium transition-all duration-300"
                            >
                                Book a Class
                            </Link>
                        </motion.div>
                    </div>
                </MotionWrapper>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        </section>
    );
}
