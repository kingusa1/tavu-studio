'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';

import type { OfferLike } from '@/lib/cms/offerText';
import type { HomePage, Testimonial } from '@/payload-types';

// Below-the-fold sections are dynamically imported to cut initial JS bundle size
// (framer-motion, heavy section components) — same 6 `dynamic()` imports with the same
// `loading` placeholders as the pre-CMS app/page.tsx (§5.3 R3). Testimonials is a 7th,
// new section, off by default, so it follows the same code-splitting pattern.
const Packages = dynamic(() => import('@/components/landing/Packages'), {
  loading: () => <div className="py-20" />,
});
const ServicesExplorer = dynamic(() => import('@/components/landing/ServicesExplorer'), {
  loading: () => <div className="py-20" />,
});
const About = dynamic(() => import('@/components/landing/About'), {
  loading: () => <div className="py-20" />,
});
const Method = dynamic(() => import('@/components/landing/Method'), {
  loading: () => <div className="py-20" />,
});
const SocialFeed = dynamic(() => import('@/components/landing/SocialFeed'), {
  loading: () => <div className="py-20" />,
});
const Contact = dynamic(() => import('@/components/landing/Contact'), {
  loading: () => <div className="py-20" />,
});
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), {
  loading: () => <div className="py-20" />,
});

export type HomeViewData = {
  home: HomePage;
  reformerOffers: OfferLike[];
  breathingOffers: OfferLike[];
  testimonials: Testimonial[];
};

export type HomeViewProps = {
  data: HomeViewData;
};

/**
 * Client shell for the home page (§5.3): the pre-CMS `app/page.tsx` was `'use client'` with a
 * hash-reset `useEffect` and 6 `next/dynamic` sections. The server `page.tsx` now fetches
 * `home-page` + home offers + testimonials and renders this component with the data as props.
 */
export default function HomeView({ data }: HomeViewProps) {
  const { home, reformerOffers, breathingOffers, testimonials } = data;

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow">
        {home.hero && <Hero data={home.hero} />}
        {home.packages && home.packages.enabled !== false && (
          <Packages data={home.packages} reformerOffers={reformerOffers} breathingOffers={breathingOffers} />
        )}
        {home.servicesExplorer && home.servicesExplorer.enabled !== false && <ServicesExplorer data={home.servicesExplorer} />}
        {home.about && home.about.enabled !== false && <About data={home.about} />}
        {home.method && home.method.enabled !== false && <Method data={home.method} />}
        {home.socialFeed && home.socialFeed.enabled !== false && <SocialFeed data={home.socialFeed} />}
        {home.testimonials && home.testimonials.enabled && testimonials.length > 0 && (
          <Testimonials data={home.testimonials} items={testimonials} />
        )}
        {home.contact && home.contact.enabled !== false && <Contact data={home.contact} />}
      </main>
      <Footer />
    </div>
  );
}
