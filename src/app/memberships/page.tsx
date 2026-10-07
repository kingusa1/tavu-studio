
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

const membershipTiers = [
    {
        name: 'Reset Membership',
        price: '820',
        validity: 'Valid for 30 days',
        description: 'Four Contrast Therapy sessions to use throughout the month whenever you need a reset.',
        includes: [
            '4 × Contrast Therapy sessions',
            'Choice of Main or Private Contrast',
            '1 × 30 minute Compression Therapy session',
            '1 × complimentary 15-minute Head, Neck & Shoulder Chair Massage (subject to therapist availability)',
            '10% off one Massage service',
            'Bring one friend for AED 95 once during the membership',
        ],
    },
    {
        name: 'Ritual Unlimited Membership',
        price: '1,390',
        validity: 'Valid for 45 days',
        description: 'Our most complete recovery membership, designed for those who want to make Contrast Therapy a consistent part of their routine.',
        includes: [
            '2 × 30 minute Compression Therapy sessions',
            'Choice of Main or Private Contrast',
            '10% off Massage services',
            '2 complimentary Head, Neck + Shoulder Chair Massage (30 minutes)',
            'Bring one friend for AED 95 once during the membership',
        ],
        popular: true,
    },
];

export default function MembershipsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/gallery-sauna-salt.webp"
                        alt="TAVÚ Memberships"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">Memberships</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Join our community and unlock exclusive benefits for your wellness journey
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Membership Tiers */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Tiers</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">Membership Options</h2>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {membershipTiers.map((tier, index) => (
                                <MotionWrapper key={tier.name} delay={0.1 + index * 0.1} direction="up">
                                    <div className={`bg-card border ${tier.popular ? 'border-accent ring-2 ring-accent' : 'border-border'} p-8 rounded-2xl h-full flex flex-col`}>
                                        {tier.popular && (
                                            <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start">
                                                Most Complete
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-headline text-primary mb-2">{tier.name}</h3>
                                        <div className="mb-4">
                                            <span className="text-sm text-foreground/60 mr-1">AED</span>
                                            <span className="text-4xl font-headline text-accent">{tier.price}</span>
                                            <span className="text-sm text-foreground/60 ml-2">| {tier.validity}</span>
                                        </div>
                                        <p className="text-foreground/70 mb-6">{tier.description}</p>
                                        <ul className="space-y-3 mt-auto">
                                            {tier.includes.map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-foreground/70">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
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
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">Start Your Membership</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Join the TAVU community and unlock your full wellness potential.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Inquire Now
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg"
                                >
                                    View All Pricing
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
