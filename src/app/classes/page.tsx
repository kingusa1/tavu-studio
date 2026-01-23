
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

const reformerClasses = [
    {
        name: 'TA FORM',
        tagline: 'Foundational Reformer Class',
        description: 'Focused on alignment, breath, and grounding control. The perfect starting point for your reformer journey.',
        level: 'Foundation'
    },
    {
        name: 'TA FLOW',
        tagline: 'Breath-Led Reformer Flow',
        description: 'Gentle, breath-led reformer flow rising from foundational movement. Smooth transitions meet mindful breathing.',
        level: 'Foundation'
    },
    {
        name: 'VU ALIGN',
        tagline: 'Precision & Alignment',
        description: 'Stronger reformer sequencing focused on precision, alignment, and fluid strength. Build power with intention.',
        level: 'Intermediate'
    },
    {
        name: 'VU ELEVATE',
        tagline: 'Dynamic Flow',
        description: 'Dynamic reformer flow with expressive transitions and elevated strength. Push your limits with grace.',
        level: 'Intermediate'
    },
    {
        name: 'PEAK VU',
        tagline: 'Advanced Reformer Ritual',
        description: 'Advanced reformer ritual with seamless transitions and refined control. The ultimate expression of mastery.',
        level: 'Advanced'
    }
];

const breathingClasses = [
    {
        name: 'TAVU FLOW',
        tagline: 'Yin-to-Yang Yoga Ritual',
        description: 'Blending deep grounding with gentle, breath-led flow. Find balance between stillness and movement.',
        level: 'All Levels'
    },
    {
        name: 'TAVU RELEASE',
        tagline: 'Myofascial & Yin Mobility',
        description: 'Myofascial softening combined with Yin mobility to unwind tension and reset the body completely.',
        level: 'All Levels'
    },
    {
        name: 'TAVU CORE',
        tagline: 'Mat Pilates Ritual',
        description: 'Mat Pilates ritual mixing grounding alignment with dynamic core strength. Build your center.',
        level: 'All Levels'
    },
    {
        name: 'TAVU MOBILITY',
        tagline: 'Mobility-Flow Ritual',
        description: 'Open joints, expand range, and connect breath to movement. Unlock your body\'s full potential.',
        level: 'All Levels'
    },
    {
        name: 'TAVU POWER',
        tagline: 'Sculpting & Barre-Inspired',
        description: 'Sculpting and barre-inspired ritual focused on heat, rhythm, and rising strength. Feel the burn.',
        level: 'All Levels'
    }
];

const reformerPricing = [
    { name: 'Drop-In', price: '160 AED', validity: 'Single class', bonus: null },
    { name: '8-Class Pack', price: '1,260 AED', validity: '45 days', bonus: '+ 1 Contrast Therapy' },
    { name: '10-Class Pack', price: '1,420 AED', validity: '60 days', bonus: '+ 2 Contrast Therapy', popular: true },
    { name: '16-Class Pack', price: '2,020 AED', validity: '75 days', bonus: '+ 2 Contrast Therapy' }
];

const breathingPricing = [
    { name: 'Drop-In', price: '120 AED', validity: 'Any Breathing Room class', bonus: null },
    { name: '5-Class Pack', price: '550 AED', validity: '30 days', bonus: null },
    { name: '10-Class Pack', price: '1,020 AED', validity: '45 days', bonus: null, popular: true },
    { name: 'Unlimited Monthly', price: '800 AED', validity: 'No rollovers', bonus: 'Auto-renew optional' }
];

function getLevelColor(level: string) {
    switch (level) {
        case 'Foundation': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Advanced': return 'bg-rose-50 text-rose-700 border-rose-200';
        default: return 'bg-sky-50 text-sky-700 border-sky-200';
    }
}

export default function ClassesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section with Image */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/pillar-movement.png"
                        alt="TAVU Movement Classes"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Our Classes</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                            Experience the TAVU method through intentionally designed classes that blend movement, breath, and recovery.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Reformer Room Section */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/pillar-movement.png"
                                        alt="Reformer Pilates Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Movement</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Reformer Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                                        Small group classes with a maximum of 6 participants. Each 45-minute session challenges your body while maintaining alignment and breath connection.
                                    </p>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Class Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                            {reformerClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{cls.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-3 uppercase tracking-wide text-xs">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70 leading-relaxed">{cls.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>

                        {/* Pricing Table */}
                        <MotionWrapper delay={0.3} direction="up">
                            <div className="glass p-8 rounded-3xl border border-white/10">
                                <h3 className="text-2xl font-headline text-primary mb-8 text-center">Reformer Pricing</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {reformerPricing.map((tier, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white/5 p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:bg-white/10 ${tier.popular ? 'ring-1 ring-accent/50 bg-accent/5' : ''}`}
                                        >
                                            {tier.popular && (
                                                <span className="text-[10px] uppercase tracking-widest bg-accent text-white px-2 py-1 rounded-full mb-3 inline-block">
                                                    Most Popular
                                                </span>
                                            )}
                                            <h4 className="font-medium text-primary mb-2">{tier.name}</h4>
                                            <p className="text-3xl font-headline text-accent mb-2">{tier.price}</p>
                                            <p className="text-xs text-foreground/50">{tier.validity}</p>
                                            {tier.bonus && (
                                                <p className="text-xs text-emerald-500 mt-2 font-medium">{tier.bonus}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Breathing Room Section */}
                <section className="py-20 lg:py-28 bg-muted/5 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                                <div className="order-2 lg:order-1">
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Breath</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Breathing Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                                        Yoga, Pilates, and movement classes. Sessions range from 45-60 minutes, designed to connect breath to body.
                                    </p>
                                </div>
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                                    <Image
                                        src="/pillar-breath.png"
                                        alt="Yoga and Breathing Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Class Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                            {breathingClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-lg text-primary">{cls.name}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-2">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70">{cls.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>

                        {/* Pricing Table */}
                        <MotionWrapper delay={0.3} direction="up">
                            <div className="bg-card border border-border p-6 md:p-8 rounded-2xl">
                                <h3 className="text-xl font-semibold text-primary mb-6">Breathing Room Pricing</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {breathingPricing.map((tier, index) => (
                                        <div
                                            key={index}
                                            className={`bg-muted/50 p-4 rounded-xl ${tier.popular ? 'ring-2 ring-accent' : ''}`}
                                        >
                                            {tier.popular && (
                                                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium mb-2 inline-block">
                                                    Most Popular
                                                </span>
                                            )}
                                            <h4 className="font-semibold text-primary">{tier.name}</h4>
                                            <p className="text-2xl font-bold text-accent my-1">{tier.price}</p>
                                            <p className="text-sm text-foreground/60">{tier.validity}</p>
                                            {tier.bonus && (
                                                <p className="text-xs text-emerald-600 mt-2 font-medium">{tier.bonus}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Soft Opening Special */}
                <section className="py-16 bg-accent/5 border-y border-accent/20">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-8">
                                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                    Founding Member Offer
                                </span>
                                <h2 className="text-3xl md:text-4xl font-headline text-primary">Soft Opening Special</h2>
                                <p className="text-foreground/70 mt-2">Limited 45-day founding member access</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <div className="bg-card border border-border p-6 rounded-xl text-center">
                                    <h3 className="font-semibold text-primary mb-2">Reformer 10-Class Pack</h3>
                                    <p className="text-sm text-foreground/50 line-through">1,420 AED</p>
                                    <p className="text-3xl font-bold text-accent">1,250 AED</p>
                                    <span className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full mt-2 font-medium border border-emerald-200">
                                        Save 12%
                                    </span>
                                </div>
                                <div className="bg-card border border-border p-6 rounded-xl text-center">
                                    <h3 className="font-semibold text-primary mb-2">Breathing 10-Class Pack</h3>
                                    <p className="text-sm text-foreground/50 line-through">1,020 AED</p>
                                    <p className="text-3xl font-bold text-accent">900 AED</p>
                                    <span className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full mt-2 font-medium border border-emerald-200">
                                        Save 12%
                                    </span>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Policies */}
                <section className="py-12 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="bg-card border border-border p-6 rounded-2xl max-w-4xl mx-auto">
                                <h3 className="text-lg font-semibold text-primary mb-4">Class Policies</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                                    <div className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        <span><strong>Cancellation:</strong> 12-hour strict cancellation policy</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        <span><strong>Minimum Attendance:</strong> 4 people or class may be cancelled</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        <span><strong>Late Arrival:</strong> 10+ mins late = cannot attend</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        <span><strong>Class Types:</strong> Ladies-only and mixed classes available</span>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Ready to Begin Your Journey?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your first class today and experience the transformative power of the TAVU method.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                View Schedule & Book
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
