'use client';

import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Packages from '@/components/landing/Packages';
import ServicesExplorer from '@/components/landing/ServicesExplorer';
import About from '@/components/landing/About';
import Method from '@/components/landing/Method';
import Testimonials from '@/components/landing/Testimonials';
import SocialFeed from '@/components/landing/SocialFeed';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';

export default function Home() {
  useEffect(() => {
    // Ensure page starts at top - fallback for client-side hash clearing
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
        <Testimonials />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
