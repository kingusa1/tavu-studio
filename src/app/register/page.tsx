
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';

const benefits = [
    {
        title: 'Instant Booking',
        description: 'Reserve your spot in classes and recovery sessions with just a few taps',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: 'Track Your Journey',
        description: 'Monitor attendance, progress, and celebrate your wellness milestones',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: 'Manage Packages',
        description: 'View remaining classes, purchase new packs, and manage memberships',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    },
    {
        title: 'Exclusive Access',
        description: 'Get early access to events, workshops, and member-only promotions',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    }
];

const memberPerks = [
    'Priority booking for popular classes',
    'Personalized class recommendations',
    'Digital receipts and booking history',
    'Easy cancellation and rescheduling',
    'Earn rewards with every visit',
    'Birthday and anniversary specials'
];

export default function RegisterPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-[5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                Start Your Journey
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline mb-6 text-primary">
                                Join the TAVU Community
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Create your account to unlock a world of mindful movement, transformative breathwork,
                                and restorative recovery experiences.
                            </p>
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

                            {/* Left Column - Benefits */}
                            <div className="lg:col-span-2 order-2 lg:order-1">
                                <MotionWrapper delay={0.1} direction="up">
                                    <div className="sticky top-32">
                                        <h2 className="text-2xl font-headline text-primary mb-6">
                                            Why Join TAVU?
                                        </h2>

                                        {/* Benefits Grid */}
                                        <div className="space-y-4 mb-8">
                                            {benefits.map((benefit, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors"
                                                >
                                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 text-accent">
                                                        {benefit.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-primary mb-1">{benefit.title}</h3>
                                                        <p className="text-sm text-foreground/70">{benefit.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Member Perks */}
                                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
                                            <h3 className="font-headline text-primary mb-4 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                Member Perks
                                            </h3>
                                            <ul className="space-y-2">
                                                {memberPerks.map((perk, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                                                        <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {perk}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            </div>

                            {/* Right Column - Registration Form */}
                            <div className="lg:col-span-3 order-1 lg:order-2">
                                <MotionWrapper delay={0.15} direction="up">
                                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                                        {/* Form Header */}
                                        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-primary-foreground">
                                            <h2 className="text-2xl font-headline mb-2">Create Your Account</h2>
                                            <p className="text-primary-foreground/80 text-sm">
                                                Fill in your details below to get started. It only takes a minute.
                                            </p>
                                        </div>

                                        {/* Mindbody Widget */}
                                        <div className="p-4 md:p-6 bg-white min-h-[600px]">
                                            <MindbodyWidget widgetType="registrations" widgetId="dc166478beda" />
                                        </div>

                                        {/* Form Footer */}
                                        <div className="px-6 py-4 bg-muted/30 border-t border-border">
                                            <p className="text-center text-sm text-foreground/70">
                                                Already have an account?{' '}
                                                <a
                                                    href="/account"
                                                    className="text-accent font-semibold hover:underline"
                                                >
                                                    Sign in here
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </MotionWrapper>

                                {/* Trust Indicators */}
                                <MotionWrapper delay={0.2} direction="up">
                                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-foreground/60">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Secure & Encrypted</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span>Privacy Protected</span>
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
                        </div>

                        {/* Bottom CTA Section */}
                        <MotionWrapper delay={0.25} direction="up">
                            <div className="mt-20 text-center">
                                <div className="glass p-8 md:p-12 rounded-3xl max-w-4xl mx-auto">
                                    <h3 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                                        Ready to Transform Your Wellness?
                                    </h3>
                                    <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                                        Join hundreds of members who have discovered the TAVU difference.
                                        Your journey to balanced well-being starts with a single step.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="/classes"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                                        >
                                            Explore Classes
                                        </a>
                                        <a
                                            href="/pricing"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                        >
                                            View Pricing
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* FAQ Quick Links */}
                        <MotionWrapper delay={0.3} direction="up">
                            <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                <a href="/contact" className="group p-6 bg-card border border-border rounded-2xl hover:border-accent/30 transition-all text-center">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-primary mb-1">Have Questions?</h4>
                                    <p className="text-sm text-foreground/70">Contact our team</p>
                                </a>
                                <a href="/schedule" className="group p-6 bg-card border border-border rounded-2xl hover:border-accent/30 transition-all text-center">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-primary mb-1">View Schedule</h4>
                                    <p className="text-sm text-foreground/70">See upcoming classes</p>
                                </a>
                                <a href="/about" className="group p-6 bg-card border border-border rounded-2xl hover:border-accent/30 transition-all text-center">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-primary mb-1">Learn About Us</h4>
                                    <p className="text-sm text-foreground/70">Our story & values</p>
                                </a>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
