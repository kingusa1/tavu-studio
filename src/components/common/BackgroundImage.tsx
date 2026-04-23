'use client';

import Image from 'next/image';

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Background decorative image — deliberately NOT priority, so it
          doesn't compete with the hero's LCP image for initial bandwidth. */}
      <Image
        src="/background.webp"
        alt=""
        fill
        className="object-cover opacity-40"
        quality={70}
        loading="lazy"
        sizes="100vw"
      />
      {/* Softer overlay for better background visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
    </div>
  );
}

