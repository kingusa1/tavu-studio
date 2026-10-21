'use client';

import Image from 'next/image';

import { useSiteData } from '@/components/providers/SiteDataProvider';

export default function BackgroundImage() {
  const { settings } = useSiteData();
  const backgroundImage = settings.brand.backgroundImage;
  const src = backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url ? backgroundImage.url : '/background.webp';

  return (
    <div className="fixed inset-0 -z-10">
      {/* Background decorative image — deliberately NOT priority, so it
          doesn't compete with the hero's LCP image for initial bandwidth. */}
      <Image
        src={src}
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
