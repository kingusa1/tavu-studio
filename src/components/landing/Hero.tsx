"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const slides = [
  {
    image: "/hero-yoga-pose.png",
    title: "Movement",
    subtitle: "Reformer Pilates",
    description: "Strengthen your body with precision and grace",
    accent: "from-blue-500/30",
  },
  {
    image: "/service-singing-bowl.png",
    title: "Breath",
    subtitle: "Breathwork Rituals",
    description: "Find clarity through the power of breath",
    accent: "from-emerald-500/30",
  },
  {
    image: "/hero-water-float.png",
    title: "Balance",
    subtitle: "Mind & Body",
    description: "Achieve harmony in every aspect of life",
    accent: "from-purple-500/30",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgress(0);
  }, [currentSlide]);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 1.2, ease: "easeOut" as const },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const kenBurnsVariants = {
    animate: {
      scale: [1, 1.15],
      transition: {
        scale: {
          duration: 10,
          ease: "linear" as const,
        },
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Image with Ken Burns effect */}
            <motion.div
              className="absolute inset-0"
              variants={kenBurnsVariants}
              animate="animate"
              key={`ken-${currentSlide}`}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </motion.div>

            {/* Dynamic gradient overlay based on slide */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].accent} to-transparent opacity-60`} />
          </motion.div>
        </AnimatePresence>

        {/* Static overlays - stronger for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />

        {/* Animated particles */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const left = ((i * 31 + 17) % 100);
            const delay = (i % 15) * 0.4;
            const duration = 4 + (i % 6) * 0.8;
            const size = 2 + (i % 4);
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-accent/30"
                style={{
                  left: `${left}%`,
                  bottom: "-10px",
                  width: size,
                  height: size,
                }}
                animate={{
                  y: [0, -800],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 50],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          <motion.div
            className="absolute top-[20%] left-[10%] w-32 h-32 border border-accent/20 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[60%] right-[15%] w-24 h-24 border border-accent/15 rotate-45"
            animate={{ rotate: [45, 405], scale: [1, 0.9, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[20%] w-16 h-16 bg-accent/10 rounded-full blur-sm"
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Slide indicator - current pillar */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 z-30 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10"
          >
            <div className="w-1 h-12 bg-accent rounded-full" />
            <div>
              <p className="text-accent text-xs uppercase tracking-[0.3em] font-semibold drop-shadow">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-white/80 text-sm font-light mt-1 drop-shadow max-w-[200px]">
                {slides[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-20 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <MotionWrapper delay={0.1} direction="up">
            <span className="inline-block text-accent uppercase tracking-[0.4em] text-xs font-semibold mb-6 bg-background/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-accent/20">
              Abu Dhabi&apos;s Wellness Sanctuary
            </span>
          </MotionWrapper>

          {/* Animated Headline */}
          <MotionWrapper delay={0.2} direction="up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-semibold tracking-tight mb-6 leading-[1.05] drop-shadow-lg">
              <span className="text-white">Wellness</span>
              <br />
              <AnimatePresence mode="wait">
                <motion.em
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="italic font-light text-white/90"
                >
                  {slides[currentSlide].title}
                </motion.em>
              </AnimatePresence>
            </h1>
          </MotionWrapper>

          {/* Decorative line with progress */}
          <MotionWrapper delay={0.3} direction="up">
            <div className="relative h-[2px] w-32 bg-white/20 mx-auto my-8 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </MotionWrapper>

          {/* Subheadline */}
          <MotionWrapper delay={0.4} direction="up">
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              A sanctuary in Abu Dhabi where movement and breath converge.
            </p>
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-24">
              <motion.a
                href="/schedule"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 font-medium text-accent-foreground transition-all duration-300 hover:bg-accent/90 shadow-lg hover:shadow-xl hover:shadow-accent/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Class
              </motion.a>
              <motion.a
                href="#packages"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-10 font-medium text-white transition-all duration-300 hover:bg-white/20 hover:border-accent hover:text-accent"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Check Our Packages
              </motion.a>
            </div>
          </MotionWrapper>

          {/* Navigation Controls - inline with content */}
          <MotionWrapper delay={0.6} direction="up">
            <div className="flex flex-col items-center gap-4">
              {/* Control buttons - centered */}
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <motion.button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent/50 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                </motion.button>

                {/* Prev */}
                <motion.button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent/50 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={16} />
                </motion.button>

                {/* Next */}
                <motion.button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent/50 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>

              {/* Slide dots with progress - centered below */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                  >
                    <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-accent" : "bg-white/30 group-hover:bg-white/50"
                    }`}>
                      {index === currentSlide && (
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-accent/50 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </motion.div>

      {/* Side navigation hints */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-24 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        whileHover={{ x: -5 }}
      >
        <ChevronLeft size={32} className="text-white/70 drop-shadow-lg" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-24 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        whileHover={{ x: 5 }}
      >
        <ChevronRight size={32} className="text-white/70 drop-shadow-lg" />
      </motion.button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent pointer-events-none z-10" />
    </section>
  );
}
