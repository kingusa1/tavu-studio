"use client";

import WaitlistForm from './WaitlistForm';
import MotionWrapper from '@/components/common/MotionWrapper';

export default function WaitlistSection() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Ambient background glows for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-96 h-96 bg-accent/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center text-center space-y-10">

          <MotionWrapper delay={0} direction="up">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary">
                Join Our Community
              </h2>
              <p className="text-lg md:text-xl font-body text-foreground/70 max-w-2xl mx-auto">
                Experience the TAVÚ method. Connect with us and start your wellness journey today.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2} direction="up" className="w-full">
            <div className="glass rounded-3xl p-1 border border-accent/20 shadow-2xl">
              <WaitlistForm />
            </div>
          </MotionWrapper>

        </div>
      </div>
    </section>
  );
}


