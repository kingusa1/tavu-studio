
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

const membershipTiers = [
    {
        name: 'Essential',
        price: 'Coming Soon',
        description: 'Perfect for those beginning their wellness journey',
        features: [
            'Access to Breathing Room classes',
            'Standard Contrast Therapy sessions',
            'Member-only pricing on packages',
            'Priority booking access'
        ]
    },
    {
        name: 'Premium',
        price: 'Coming Soon',
        description: 'Our most popular membership for dedicated practitioners',
        features: [
            'Everything in Essential',
            'Unlimited Reformer Room access',
            'Private Infrared Contrast sessions',
            'Complimentary guest passes',
            'Exclusive member events'
        ],
        popular: true
    },
    {
        name: 'Elite',
        price: 'Coming Soon',
        description: 'The ultimate TAVU experience for complete wellness',
        features: [
            'Everything in Premium',
            'Monthly massage credits',
            'Personal wellness consultations',
            'Recovery bundle discounts',
            'VIP event access',
            'Dedicated concierge service'
        ]
    }
];

const memberBenefits = [
    {
        title: 'Priority Booking',
        description: 'Get first access to classes and appointments before they open to the public'
    },
    {
        title: 'Exclusive Events',
        description: 'Access to member-only workshops, retreats, and wellness seminars'
    },
    {
        title: 'Flexible Credits',
        description: 'Use your membership credits across all TAVU services and offerings'
    },
    {
        title: 'Personal Support',
        description: 'Dedicated wellness guidance to help you achieve your goals'
    }
];

export default function MembershipsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0 bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Hero Image: Add your membership hero image here</p>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Memberships</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Join our community and unlock exclusive benefits for your wellness journey
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Coming Soon Notice */}
                <section className="py-16 bg-accent/10">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-4">
                                <span className="font-medium">Coming Soon</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                                Membership Program Launching Soon
                            </h2>
                            <p className="text-foreground/70 max-w-2xl mx-auto">
                                We're putting the finishing touches on our membership tiers.
                                Register below to be notified when memberships become available and receive exclusive founding member pricing.
                            </p>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Membership Tiers Preview */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Tiers</span>
                                <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2">Membership Options</h2>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {membershipTiers.map((tier, index) => (
                                <MotionWrapper key={tier.name} delay={0.1 + index * 0.1} direction="up">
                                    <div className={`bg-card border ${tier.popular ? 'border-accent ring-2 ring-accent' : 'border-border'} p-8 rounded-2xl h-full flex flex-col`}>
                                        {tier.popular && (
                                            <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start">
                                                Most Popular
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-headline text-primary mb-2">{tier.name}</h3>
                                        <p className="text-3xl font-bold text-accent mb-4">{tier.price}</p>
                                        <p className="text-foreground/70 mb-6">{tier.description}</p>
                                        <ul className="space-y-3 flex-grow">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-foreground/70 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Member Benefits */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Benefits</span>
                                <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2">Member Perks</h2>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {memberBenefits.map((benefit, index) => (
                                <MotionWrapper key={benefit.title} delay={0.1 + index * 0.05} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl text-center h-full">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-foreground/70">{benefit.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-4xl md:text-5xl font-headline mb-6">Stay Informed</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Register your interest and be the first to know when memberships launch with exclusive founding member pricing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Register Interest
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
