"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";

const images = [
  { src: "/about-exterior.webp", alt: "TAVÚ lightbox sign on a wall" },
  { src: "/about-reception.webp", alt: "Woman sitting in studio" },
  { src: "/about-lounge.webp", alt: "Artistic arm reaching out" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <MotionWrapper delay={0.1} direction="up">
            <div className="max-w-xl">
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
                The Philosophy
              </span>
              <h2 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-headline font-medium leading-[1.1] text-primary mb-8">
                In a world that rushes, <br />
                take a <em className="italic font-light text-primary/70">pause</em>.
              </h2>
              <div className="space-y-5 text-lg text-foreground/65 leading-relaxed font-light">
                <p>
                  TAVÚ is more than a studio—it is a sanctuary. A place where movement meets stillness,
                  and where the noise of the outside world fades into a rhythm of your own making.
                </p>
                <p>
                  We believe that true power comes not just from exertion, but from recovery.
                  Our method intertwines the strength of <span className="text-primary font-medium">Reform</span>,
                  the clarity of <span className="text-primary font-medium">Breath</span>, and the healing of
                  <span className="text-primary font-medium"> Contrast</span> to build a resilient body and a calm mind.
                </p>
              </div>
              <div className="mt-10">
                <motion.a
                  href="/method"
                  className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span className="border-b border-primary/30 pb-1 group-hover:border-accent">Discover the Method</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
              </div>
            </div>
          </MotionWrapper>

          {/* Image Grid - Organized layout with effects */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 rounded-full blur-[100px] -z-10" />

            {/* Main large image - left side */}
            <MotionWrapper delay={0.2} direction="up">
              <motion.div
                className="absolute left-0 top-[10%] w-[55%] aspect-[3/4] group"
                style={{ y: y1 }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <NextImage
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 60vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
                {/* Decorative frame */}
                <div className="absolute -inset-3 border border-accent/30 rounded-2xl -z-10 group-hover:border-accent/50 transition-colors duration-500" />
              </motion.div>
            </MotionWrapper>

            {/* Top right image */}
            <MotionWrapper delay={0.3} direction="right">
              <motion.div
                className="absolute right-0 top-0 w-[50%] aspect-[4/3] group"
                style={{ y: y2 }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                  <NextImage
                    src={images[1].src}
                    alt={images[1].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
              </motion.div>
            </MotionWrapper>

            {/* Bottom right image */}
            <MotionWrapper delay={0.4} direction="up">
              <motion.div
                className="absolute right-[5%] bottom-[5%] w-[45%] aspect-square group"
                style={{ y: y3 }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                  <NextImage
                    src={images[2].src}
                    alt={images[2].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 45vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
                {/* Accent dot */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </MotionWrapper>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-[5%] right-[40%] w-16 h-16 border border-accent/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-[15%] left-[45%] w-2 h-2 bg-accent/60 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
