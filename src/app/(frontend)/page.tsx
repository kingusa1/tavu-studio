'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';

// Below-the-fold sections are dynamically imported to cut initial JS
// bundle size (framer-motion, heavy section components). They still
// render client-side; just deferred until the main bundle is parsed.
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

export default function Home() {
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
        <Hero />
        <Packages />
        <ServicesExplorer />
        <About />
        <Method />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
