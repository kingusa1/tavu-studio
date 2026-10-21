"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";

import { accents } from "@/components/cms/accents";
import { getIcon } from "@/components/icons/cmsIcons";
import { resolveImage } from "@/lib/cms/media";
import type { HomePage } from "@/payload-types";

export type MethodData = NonNullable<HomePage["method"]>;

export type MethodProps = {
  data: MethodData;
};

export default function Method({ data }: MethodProps) {
  const pillars = data.pillars ?? [];
  const pillarCount = pillars.length || 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  // Auto-rotate pillars
  useEffect(() => {
    if (!isAutoPlaying || pillars.length === 0) {
      progressRef.current = 0;
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      progressRef.current += 2;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setActiveIndex((current) => (current + 1) % pillarCount);
      }

      setProgress(progressRef.current);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isAutoPlaying, pillarCount, pillars.length]);

  // Reset progress when slide changes manually
  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % pillarCount);
        setIsAutoPlaying(false);
        setProgress(0);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + pillarCount) % pillarCount);
        setIsAutoPlaying(false);
        setProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pillarCount]);

  const handlePillarClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const currentPillar = pillars[activeIndex];
  if (!currentPillar) return null;

  const colors = accents.pillar[currentPillar.accent ?? 'blue'] ?? accents.pillar.blue;
  const resolvedImage = resolveImage(currentPillar.image);
  const imageAlt = currentPillar.image?.alt || currentPillar.title || resolvedImage?.alt || '';

  return (
    <section
      id="method"
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-primary via-primary to-primary/95"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const left = ((i * 31 + 17) % 100);
          const top = ((i * 43 + 11) % 100);
          const size = 2 + (i % 3);
          const duration = 15 + (i % 10);
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <MotionWrapper delay={0} direction="up">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-flex items-center gap-3 text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              <span className="w-10 h-[1px] bg-accent/50" />
              {data.eyebrow}
              <span className="w-10 h-[1px] bg-accent/50" />
            </span>
            <h2 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-headline font-semibold text-white mb-4">
              {data.headingLead} <em className="italic font-light text-accent">{data.headingEmphasis}</em>
            </h2>
            <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto">
              {data.intro}
            </p>
          </div>
        </MotionWrapper>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Pillar Cards */}
          <div className="lg:col-span-4 space-y-3">
            {pillars.map((pillar, index) => {
              const pillarColors = accents.pillar[pillar.accent ?? 'blue'] ?? accents.pillar.blue;
              const isActive = activeIndex === index;
              const Icon = getIcon('pillar', pillar.icon ?? '');

              return (
                <motion.button
                  key={pillar.id ?? index}
                  onClick={() => handlePillarClick(index)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                    isActive
                      ? `bg-white/10 ${pillarColors.border} border-2`
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Progress bar for active item */}
                  {isActive && isAutoPlaying && (
                    <div
                      className={`absolute bottom-0 left-0 h-1 ${pillarColors.bg}`}
                      style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? `${pillarColors.bg} text-white` : "bg-white/10 text-white/60"
                    }`}>
                      {Icon && <Icon width={24} height={24} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${isActive ? pillarColors.text : "text-white/40"}`}>
                          {pillar.number}
                        </span>
                        <h3 className={`font-headline font-semibold text-lg ${isActive ? "text-white" : "text-white/70"}`}>
                          {pillar.title}
                        </h3>
                      </div>
                      <p className={`text-sm ${isActive ? "text-white/60" : "text-white/40"}`}>
                        {pillar.subtitle}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className={`mt-1 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                      animate={{ x: isActive ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isActive ? pillarColors.text : "text-white/40"}>
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}

            {/* Auto-play toggle */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-full flex items-center justify-center gap-2 py-3 text-white/40 hover:text-white/60 text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {isAutoPlaying ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  {data.autoPlayingLabel}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  {data.resumeLabel}
                </>
              )}
            </motion.button>
          </div>

          {/* Right Content - Image & Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id ?? activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Main Image Card */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                  {resolvedImage && (
                    <Image
                      src={resolvedImage.src}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <motion.span
                        className="text-[80px] lg:text-[120px] font-headline font-bold text-white/10 leading-none"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentPillar.number}
                      </motion.span>

                      {/* Stats badges */}
                      <div className="flex flex-wrap gap-2 justify-end">
                        {(currentPillar.stats ?? []).map((stat, i) => (
                          <motion.div
                            key={stat.id ?? i}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/80"
                          >
                            <span className="font-semibold">{stat.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom content */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className={`text-sm font-medium ${colors.text} uppercase tracking-wider`}>
                          {currentPillar.subtitle}
                        </span>
                        <h3 className="text-3xl lg:text-5xl font-headline font-semibold text-white mt-2 mb-4">
                          {currentPillar.title}
                        </h3>
                        <p className="text-white/70 text-base lg:text-lg max-w-lg leading-relaxed mb-6">
                          {currentPillar.description}
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(currentPillar.benefits ?? []).map((benefit, i) => (
                            <motion.span
                              key={benefit.id ?? i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className={`px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border ${colors.border}`}
                            >
                              {benefit.text}
                            </motion.span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.a
                          href={data.cta?.href || '/classes'}
                          className={`inline-flex items-center gap-2 h-12 px-6 rounded-full ${colors.bg} text-white font-medium transition-all hover:scale-105 shadow-lg ${colors.glow}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {data.cta?.label}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </motion.a>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative frame */}
                <motion.div
                  className={`absolute -inset-3 border ${colors.border} rounded-[2rem] -z-10`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center items-center gap-4 mt-10">
          {pillars.map((pillar, index) => {
            const dotColors = accents.pillar[pillar.accent ?? 'blue'] ?? accents.pillar.blue;
            return (
              <button
                key={pillar.id ?? index}
                onClick={() => handlePillarClick(index)}
                aria-label={`Go to ${pillar.title} pillar`}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? `${dotColors.bg} scale-125` : "bg-white/30 hover:bg-white/50"
                }`}
              >
                {activeIndex === index && (
                  <motion.span
                    className={`absolute inset-0 rounded-full ${dotColors.bg}`}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-white/30 text-xs mt-4 hidden lg:block">
          {data.keyboardHint}
        </p>
      </div>
    </section>
  );
}
