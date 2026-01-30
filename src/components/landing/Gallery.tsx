"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/pillar-movement.png",
    alt: "Reformer Pilates Session",
    title: "Movement",
    subtitle: "Reformer Pilates",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/mood-balanced.png",
    alt: "Balanced Wellness",
    title: "Balance",
    subtitle: "Find Your Center",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/pillar-breath.png",
    alt: "Breathwork Practice",
    title: "Breath",
    subtitle: "Breathwork Rituals",
    span: "col-span-1 row-span-2"
  },
  {
    src: "/mood-stressed.png",
    alt: "Stress Relief",
    title: "Release",
    subtitle: "Let Go of Tension",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/pillar-breath.png",
    alt: "Breathing Room",
    title: "Stillness",
    subtitle: "Find Your Calm",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/mood-low-energy.png",
    alt: "Energy Restoration",
    title: "Restore",
    subtitle: "Renew Your Energy",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/mood-stiff.png",
    alt: "Flexibility Training",
    title: "Flexibility",
    subtitle: "Move Freely",
    span: "col-span-2 row-span-1"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-primary/4 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <MotionWrapper delay={0} direction="up">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              Experience TAVÚ
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-medium text-primary mb-6">
              Our <em className="italic font-light text-primary/75">Studio</em>
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Step inside a sanctuary designed for transformation. Every corner tells a story of wellness.
            </p>
          </div>
        </MotionWrapper>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <MotionWrapper
              key={index}
              delay={0.1 * index}
              direction="up"
              className={image.span}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-accent text-sm font-medium mb-1">{image.subtitle}</span>
                  <h3 className="text-white text-2xl font-headline font-semibold">{image.title}</h3>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-accent transition-all duration-500 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-accent transition-all duration-500 rounded-bl-lg" />
              </motion.div>
            </MotionWrapper>
          ))}
        </div>

        {/* View All Button */}
        <MotionWrapper delay={0.5} direction="up">
          <div className="mt-12 text-center">
            <motion.a
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span className="border-b border-primary/30 pb-1 group-hover:border-accent">Explore Our Space</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          </div>
        </MotionWrapper>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              className="relative w-full max-w-5xl aspect-[4/3] rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-accent text-sm font-medium mb-2 block">{selectedImage.subtitle}</span>
                <h3 className="text-white text-3xl md:text-4xl font-headline font-semibold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
