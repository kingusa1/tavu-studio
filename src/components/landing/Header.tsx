
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useSiteData } from '@/components/providers/SiteDataProvider';
import { getIcon } from '@/components/icons/cmsIcons';
import type { HeaderData } from '@/lib/cms/site';

// Icons (chrome, not CMS data — chevron/menu/user never change)
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

type DropdownItem = NonNullable<NonNullable<HeaderData['dropdowns']>[number]['items']>[number];

function renderNavIcon(key: string | null | undefined, className: string) {
  const Icon = key ? getIcon('nav', key) : undefined;
  return Icon ? <Icon className={className} /> : null;
}

// Dropdown Component
interface DropdownProps {
  label: string;
  items: DropdownItem[];
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
              href={item.href ?? '#'}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
                {renderNavIcon(item.icon, 'w-5 h-5')}
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
  items: DropdownItem[];
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
            href={item.href ?? '#'}
            onClick={onClose}
            className="flex items-center gap-3 py-3 px-6 text-sm text-foreground/70 hover:text-accent hover:bg-gray-50 transition-colors"
          >
            <span className="text-accent">{renderNavIcon(item.icon, 'w-5 h-5')}</span>
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
  const { header, settings } = useSiteData();
  const pathname = usePathname();

  // Logo: on the home page scroll smoothly back to the top; elsewhere Link navigates to "/" (opens at the top).
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdowns = header.dropdowns ?? [];
  const logo = settings.brand.logo;
  const logoSrc = logo && typeof logo === 'object' && logo.url ? logo.url : '/logo.png';
  const logoAlt = settings.brand.logoAlt || 'TAVÚ Wellness';

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-3"
          : "bg-black/50 backdrop-blur-md py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left Section - Logo */}
          <Link
            href="/"
            aria-label="TAVÚ — back to the top of the home page"
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}
              height={40}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "h-8 w-auto brightness-0" : "h-10 w-auto brightness-0 invert drop-shadow-md"
              )}
              priority
            />
          </Link>

          {/* Center Section - Navigation */}
          <nav className="flex items-center gap-1">
            {dropdowns.map((dropdown, index) => (
              <NavDropdown
                key={index}
                label={dropdown.label ?? ''}
                items={dropdown.items ?? []}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* Right Section - Auth & CTA */}
          <div className="flex items-center gap-3">
            {/* Login Link */}
            <Link
              href={header.login?.href ?? '/account'}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                isScrolled
                  ? "text-foreground/80 hover:bg-gray-100 hover:text-accent"
                  : "text-white/90 hover:text-accent drop-shadow-sm"
              )}
            >
              <UserIcon className="w-4 h-4" />
              <span>{header.login?.label}</span>
            </Link>

            {/* Register Link */}
            <Link
              href={header.register?.href ?? '/register'}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                isScrolled
                  ? "border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5"
                  : "border-2 border-white/40 text-white hover:border-white hover:bg-white/10"
              )}
            >
              {header.register?.label}
            </Link>

            {/* Classes CTA */}
            <Button
              asChild
              variant="outline"
              className={cn(
                "rounded-full font-semibold transition-all duration-300 px-5 py-2.5 text-sm",
                isScrolled
                  ? "border-2 border-primary/40 text-primary hover:bg-primary/5 bg-transparent"
                  : "border-2 border-white/50 text-white hover:bg-white/10 bg-transparent"
              )}
            >
              <Link href={header.secondaryCta?.href ?? '/schedule'}>{header.secondaryCta?.label}</Link>
            </Button>

            {/* Appointments CTA */}
            <Button
              asChild
              className={cn(
                "rounded-full font-semibold transition-all duration-300",
                "bg-accent text-accent-foreground hover:bg-accent/90",
                "shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40",
                "px-6 py-2.5 text-sm"
              )}
            >
              <Link href={header.primaryCta?.href ?? '/appointments'}>{header.primaryCta?.label}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="TAVÚ — back to the top of the home page"
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={100}
              height={32}
              className={cn(
                "h-7 w-auto transition-all duration-300",
                isScrolled ? "brightness-0" : "brightness-0 invert drop-shadow-md"
              )}
              priority
            />
          </Link>

          {/* Right Side - Auth Icons & Menu */}
          <div className="flex items-center gap-2">
            <Link
              href={header.login?.href ?? '/account'}
              aria-label={header.login?.ariaLabel ?? 'Login to account'}
              className={cn(
                "p-2 transition-colors",
                isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/90 hover:text-accent"
              )}
            >
              <UserIcon className="w-5 h-5" />
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open navigation menu"
                  className={cn(
                    "p-2 transition-colors",
                    isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/90 hover:text-accent"
                  )}>
                  <MenuIcon className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-gray-100 w-[320px] sm:w-[380px] p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <Link
                      href="/"
                      className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      onClick={handleLogoClick}
                    >
                      <Image
                        src={logoSrc}
                        alt={logoAlt}
                        width={100}
                        height={32}
                        className="h-7 w-auto"
                      />
                    </Link>
                  </div>

                  {/* Mobile Nav */}
                  <div className="flex-1 overflow-y-auto">
                    {dropdowns.map((dropdown, index) => (
                      <MobileAccordion
                        key={index}
                        label={dropdown.label ?? ''}
                        items={dropdown.items ?? []}
                        onClose={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-gray-100 space-y-3">
                    <Link
                      href={header.login?.href ?? '/account'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-foreground border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      {header.login?.mobileLabel}
                    </Link>
                    <Link
                      href={header.register?.href ?? '/register'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-3 text-sm font-medium text-primary border-2 border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
                    >
                      {header.register?.mobileLabel}
                    </Link>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full py-6 text-base border-2 border-primary/40 text-primary"
                    >
                      <Link href={header.secondaryCta?.href ?? '/schedule'} onClick={() => setMobileMenuOpen(false)}>
                        {header.secondaryCta?.label}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full rounded-full py-6 text-base bg-accent text-accent-foreground shadow-lg"
                    >
                      <Link href={header.primaryCta?.href ?? '/appointments'} onClick={() => setMobileMenuOpen(false)}>
                        {header.primaryCta?.label}
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
