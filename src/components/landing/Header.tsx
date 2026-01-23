
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Navigation structure with dropdowns
const navigation = {
  services: {
    label: 'Services',
    items: [
      {
        title: 'Classes',
        description: 'Reformer Pilates & Breathing Room',
        href: '/classes',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        )
      },
      {
        title: 'Recovery',
        description: 'Contrast Therapy & Massage',
        href: '/recovery',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      },
      {
        title: 'Schedule',
        description: 'View & book upcoming sessions',
        href: '/schedule',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: 'Pricing',
        description: 'Packages, memberships & bundles',
        href: '/pricing',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ]
  },
  about: {
    label: 'About',
    items: [
      {
        title: 'Our Story',
        description: 'The TAVU philosophy & vision',
        href: '/about',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
      {
        title: 'Our Team',
        description: 'Meet our expert instructors',
        href: '/team',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: 'Contact',
        description: 'Get in touch with us',
        href: '/contact',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
    ]
  },
  community: {
    label: 'Community',
    items: [
      {
        title: 'Events',
        description: 'Workshops, retreats & special sessions',
        href: '/events',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: 'Memberships',
        description: 'Exclusive member benefits',
        href: '/memberships',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      },
      {
        title: 'Partnerships',
        description: 'Corporate & brand collaborations',
        href: '/partnerships',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
    ]
  }
};

// Dropdown Component
interface DropdownProps {
  label: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }>;
  isScrolled: boolean;
}

function NavDropdown({ label, items, isScrolled }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300",
          isScrolled
            ? "text-foreground/80 hover:text-accent"
            : "text-white/90 hover:text-accent drop-shadow-sm"
        )}
      >
        {label}
        <ChevronDownIcon className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          "absolute top-full left-0 pt-2 transition-all duration-200",
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[280px]">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile Menu Accordion
interface MobileAccordionProps {
  label: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }>;
  onClose: () => void;
}

function MobileAccordion({ label, items, onClose }: MobileAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 px-4 text-left font-medium text-foreground hover:text-accent transition-colors"
      >
        {label}
        <ChevronDownIcon className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-2" : "max-h-0"
      )}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 py-3 px-6 text-sm text-foreground/70 hover:text-accent hover:bg-gray-50 transition-colors"
          >
            <span className="text-accent">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-lg shadow-black/5 py-3"
          : "bg-black/20 backdrop-blur-sm py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left Section - Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="TAVU Wellness"
              width={120}
              height={40}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "h-8 w-auto" : "h-10 w-auto",
                !isScrolled && "brightness-0 invert drop-shadow-md"
              )}
              priority
            />
          </Link>

          {/* Center Section - Navigation */}
          <nav className="flex items-center gap-1">
            <NavDropdown
              label={navigation.services.label}
              items={navigation.services.items}
              isScrolled={isScrolled}
            />
            <NavDropdown
              label={navigation.about.label}
              items={navigation.about.items}
              isScrolled={isScrolled}
            />
            <NavDropdown
              label={navigation.community.label}
              items={navigation.community.items}
              isScrolled={isScrolled}
            />
          </nav>

          {/* Right Section - Auth & CTA */}
          <div className="flex items-center gap-3">
            {/* Login Link */}
            <Link
              href="/account"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                isScrolled
                  ? "text-foreground/80 hover:bg-gray-100 hover:text-accent"
                  : "text-white/90 hover:text-accent drop-shadow-sm"
              )}
            >
              <UserIcon className="w-4 h-4" />
              <span>Login</span>
            </Link>

            {/* Register Link */}
            <Link
              href="/register"
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                isScrolled
                  ? "border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5"
                  : "border-2 border-white/40 text-white hover:border-white hover:bg-white/10"
              )}
            >
              Register
            </Link>

            {/* Book CTA */}
            <Button
              asChild
              className={cn(
                "rounded-full font-semibold transition-all duration-300",
                "bg-accent text-accent-foreground hover:bg-accent/90",
                "shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40",
                "px-6 py-2.5 text-sm"
              )}
            >
              <Link href="/schedule">Book Now</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="TAVU Wellness"
              width={100}
              height={32}
              className={cn(
                "h-7 w-auto transition-all duration-300",
                !isScrolled && "brightness-0 invert drop-shadow-md"
              )}
              priority
            />
          </Link>

          {/* Right Side - Auth Icons & Menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              className={cn(
                "p-2 transition-colors",
                isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/90 hover:text-accent"
              )}
            >
              <UserIcon className="w-5 h-5" />
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className={cn(
                  "p-2 transition-colors",
                  isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/90 hover:text-accent"
                )}>
                  <MenuIcon className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-gray-100 w-[320px] sm:w-[380px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Image
                        src="/logo.png"
                        alt="TAVU Wellness"
                        width={100}
                        height={32}
                        className="h-7 w-auto"
                      />
                    </Link>
                  </div>

                  {/* Mobile Nav */}
                  <div className="flex-1 overflow-y-auto">
                    <MobileAccordion
                      label={navigation.services.label}
                      items={navigation.services.items}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                    <MobileAccordion
                      label={navigation.about.label}
                      items={navigation.about.items}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                    <MobileAccordion
                      label={navigation.community.label}
                      items={navigation.community.items}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-gray-100 space-y-3">
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-foreground border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Login to Account
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-3 text-sm font-medium text-primary border-2 border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
                    >
                      Create Account
                    </Link>
                    <Button
                      asChild
                      className="w-full rounded-full py-6 text-base bg-accent text-accent-foreground shadow-lg"
                    >
                      <Link href="/schedule" onClick={() => setMobileMenuOpen(false)}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
