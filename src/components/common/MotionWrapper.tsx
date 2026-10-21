"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    viewport?: UseInViewOptions;
    /**
     * First-screen content (page heroes): animate with CSS keyframes instead of framer-motion, so the
     * text is painted on the first render and not hidden until JavaScript hydrates (that delay made the
     * hero heading the slow Largest Contentful Paint on phones). Reduced-motion users get no animation.
     */
    immediate?: boolean;
}

const IMMEDIATE_CLASS = {
    up: "motion-safe:animate-enter-up",
    down: "motion-safe:animate-enter-down",
    left: "motion-safe:animate-enter-left",
    right: "motion-safe:animate-enter-right",
    none: "motion-safe:animate-enter-fade",
} as const;

export default function MotionWrapper({
    children,
    className,
    delay = 0,
    direction = "up",
    viewport = { once: true, margin: "-100px" },
    immediate = false,
}: MotionWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, viewport);
    // Server HTML renders every wrapper visible, so first-screen content paints without waiting for
    // JavaScript. After hydration (before the browser paints) only wrappers that start below the fold
    // are hidden, and they reveal on scroll exactly as before.
    const [startsBelowFold, setStartsBelowFold] = useState(false);
    useLayoutEffect(() => {
        const element = ref.current;
        if (!immediate && element && element.getBoundingClientRect().top > window.innerHeight) {
            setStartsBelowFold(true);
        }
    }, [immediate]);

    if (immediate) {
        return (
            <div
                className={className ? `${IMMEDIATE_CLASS[direction]} ${className}` : IMMEDIATE_CLASS[direction]}
                style={delay ? { animationDelay: `${delay}s` } : undefined}
            >
                {children}
            </div>
        );
    }

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            transition: { duration: 0 },
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const, // Custom cubic-bezier for "alive" feel
                delay: delay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={startsBelowFold && !isInView ? "hidden" : "visible"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
