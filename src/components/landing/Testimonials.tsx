"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Al-Rashid",
    role: "Wellness Enthusiast",
    location: "Abu Dhabi",
    image: "/service-mat-stretch.webp",
    quote: "TAVÚ has completely transformed my relationship with my body. The combination of Pilates and breathwork has given me a sense of calm I never knew was possible.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Entrepreneur",
    location: "Al Raha",
    image: "/service-ice-bath.webp",
    quote: "As someone who sits at a desk all day, the reformer sessions have been life-changing. My back pain is gone and I feel more energized than ever.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatima Hassan",
    role: "Yoga Instructor",
    location: "Dubai",
    image: "/service-ice-hands.webp",
    quote: "I've practiced wellness for years, but TAVÚ's approach is unique. The integration of movement and breath creates a holistic experience I haven't found anywhere else.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Safety guard: ensure currentIndex is within bounds
  const safeIndex = currentIndex >= testimonials.length ? 0 : currentIndex;

  useEffect(() => {
    // Reset index if out of bounds (can happen during hot reload)
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-primary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-accent/10"
          animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Quote size={120} />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-accent/10 rotate-180"
          animate={{ rotate: [180, 170, 180], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Quote size={120} />
        </motion.div>
        <motion.div
          className="absolute top-[30%] left-[5%] w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-primary/5 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <MotionWrapper delay={0} direction="up">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-headline font-medium text-primary mb-6">
              What Our <em className="italic font-light text-primary/75">Members</em> Say
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Hear from our community who have experienced the transformative power of the TAVÚ method.
            </p>
          </div>
        </MotionWrapper>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-background rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/5 border border-accent/10"
              >
                <div className="grid md:grid-cols-[250px_1fr] gap-8 items-center">
                  {/* Image */}
                  <motion.div
                    className="relative aspect-square rounded-2xl overflow-hidden mx-auto md:mx-0 w-48 md:w-full shadow-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={testimonials[safeIndex].image}
                      alt={testimonials[safeIndex].name}
                      fill
                      className="object-cover"
                      sizes="250px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

                    {/* Decorative corner */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
                  </motion.div>

                  {/* Content */}
                  <div>
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[safeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-accent text-accent" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8 font-light italic">
                      "{testimonials[safeIndex].quote}"
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="text-lg font-headline font-semibold text-primary">
                        {testimonials[safeIndex].name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {testimonials[safeIndex].role} • {testimonials[safeIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 md:-mx-16">
              <motion.button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-background shadow-lg flex items-center justify-center text-primary hover:text-accent hover:bg-accent/10 transition-colors pointer-events-auto border border-accent/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-background shadow-lg flex items-center justify-center text-primary hover:text-accent hover:bg-accent/10 transition-colors pointer-events-auto border border-accent/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-accent"
                    : "w-2 bg-primary/20 hover:bg-primary/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-foreground/40 hover:text-accent transition-colors"
            >
              {isAutoPlaying ? "Auto-playing" : "Paused"} • Click to {isAutoPlaying ? "pause" : "resume"}
            </button>
          </div>
        </div>

        {/* Thumbnail Preview */}
        <MotionWrapper delay={0.3} direction="up">
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                aria-label={`View testimonial from ${testimonial.name}`}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                  currentIndex === index
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
                    : "opacity-50 hover:opacity-80"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.button>
            ))}
          </div>
        </MotionWrapper>

        {/* CTA Section */}
        <MotionWrapper delay={0.5} direction="up">
          <div className="text-center mt-16 bg-background/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl max-w-3xl mx-auto border border-accent/10">
            <h3 className="text-2xl md:text-3xl font-headline font-semibold mb-4 text-primary">
              Join Our Growing Community
            </h3>
            <p className="text-lg text-foreground/70 mb-6 font-light">
              Be part of a community dedicated to mindful movement, breath, and holistic wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/schedule"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Class
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
