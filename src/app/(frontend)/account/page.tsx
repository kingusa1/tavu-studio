"use client";

import { useEffect, useRef } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

const accountFeatures = [
    {
        title: 'Book Classes',
        description: 'Reserve your spot in Reformer Pilates and Breathing Room sessions',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: 'View History',
        description: 'Track your attendance and see your wellness journey progress',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: 'Manage Packages',
        description: 'Check remaining classes and purchase new class packs',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    },
    {
        title: 'Book Recovery',
        description: 'Schedule Contrast Therapy and massage appointments',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    }
];

// Mindbody Login Widget Component - with visible text overlay
function MindbodyLoginWidget() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load HealCode script
        const scriptSrc = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = scriptSrc;
            script.type = "text/javascript";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = `
            <healcode-widget
                data-version="0.2"
                data-link-class="healcode-login-text-link"
                data-site-id="130043"
                data-mb-site-id="5748977"
                data-bw-identity-site="true"
                data-type="login-link"
                data-inner-html="Sign In"
            ></healcode-widget>
        `;
    }, []);

    return (
        <div className="relative w-full h-14 rounded-full bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-accent/25 cursor-pointer">
            {/* Visible button content */}
            <span className="absolute inset-0 flex items-center justify-center gap-3 text-accent-foreground font-semibold text-lg pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In to Your Account
            </span>
            {/* HealCode widget overlay - invisible but clickable */}
            <div
                ref={containerRef}
                className="absolute inset-0 flex items-center justify-center [&_a]:absolute [&_a]:inset-0 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:text-transparent [&_a]:no-underline"
            />
        </div>
    );
}

export default function AccountPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            <main className="flex-grow pt-32 pb-20 px-4 container mx-auto relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-12">
                            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                Member Portal
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-primary mb-6">
                                Your <em className="italic font-light text-primary/75">Account</em>
                            </h1>
                            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                                Access your bookings, manage packages, and track your wellness journey.
                            </p>
                        </div>
                    </MotionWrapper>

                    {/* Main Login Card */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg mx-auto mb-16">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-10 text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-headline text-white mb-2">Welcome Back</h2>
                                <p className="text-white/80 text-sm">Sign in to your TAVÚ account</p>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                {/* Mindbody Login Widget */}
                                <MindbodyLoginWidget />

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">or</span>
                                    </div>
                                </div>

                                {/* Register Link */}
                                <Link
                                    href="/register"
                                    className="flex items-center justify-center gap-2 w-full py-4 px-6 border-2 border-primary/20 text-primary font-semibold rounded-full hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Create New Account
                                </Link>

                                {/* Help Text */}
                                <p className="text-center text-sm text-gray-500 mt-6">
                                    Need help?{' '}
                                    <Link href="/contact" className="text-accent hover:underline">
                                        Contact us
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Features Section */}
                    <MotionWrapper delay={0.2} direction="up">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-headline text-primary mb-2">What You Can Do</h3>
                            <p className="text-foreground/60">Manage your entire wellness experience in one place</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {accountFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-semibold text-primary mb-2">{feature.title}</h4>
                                    <p className="text-sm text-foreground/60">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </MotionWrapper>

                    {/* Quick Actions */}
                    <MotionWrapper delay={0.3} direction="up">
                        <div className="mt-16 glass p-8 md:p-10 rounded-3xl text-center">
                            <h3 className="text-2xl font-headline text-primary mb-4">Ready to Book?</h3>
                            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
                                Browse our schedule and reserve your spot in a class or recovery session.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/schedule"
                                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    View Schedule
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    View Pricing
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Trust Indicators */}
                    <MotionWrapper delay={0.4} direction="up">
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-foreground/50">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Secure Login</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Data Protected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Powered by Mindbody</span>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </main>

            <Footer />
        </div>
    );
}
