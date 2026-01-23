
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

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

const recoveryServices = [
    {
        name: 'Standard Contrast Therapy',
        description: 'Himalayan Salt Sauna + Ice Bath. Alternating hot and cold to activate your body\'s natural healing response.',
        duration: '60 min',
        startingPrice: '220 AED'
    },
    {
        name: 'Private Contrast Infrared',
        description: 'Infrared Sauna + Ice Bath in a private suite. Premium recovery experience with deeper heat penetration.',
        duration: '60 min',
        startingPrice: '275 AED'
    },
    {
        name: 'NormaTec Compression',
        description: 'Advanced compression therapy for athletes, runners, and post-training recovery. Accelerate muscle recovery.',
        duration: '45 min',
        startingPrice: '160 AED'
    }
];

const massageServices = [
    {
        name: 'TA | Destress Massage',
        description: 'Relaxation-focused massage to melt away stress and tension.',
        duration: '60 min',
        price: '300 AED'
    },
    {
        name: 'TA | Relaxing Massage',
        description: 'Gentle, soothing massage for complete relaxation and restoration.',
        duration: '60 min',
        price: '300 AED'
    },
    {
        name: 'TA | Express Head, Neck & Shoulder',
        description: 'Targeted relief for tension-prone areas. Perfect for busy schedules.',
        duration: '45 min',
        price: '220 AED'
    },
    {
        name: 'VU | Deep Tissue Massage',
        description: 'Intensive therapeutic work for deep muscle release and recovery.',
        duration: '60 min',
        price: '300 AED'
    }
];

function getLevelColor(level: string) {
    switch (level) {
        case 'Foundation': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Advanced': return 'bg-rose-50 text-rose-700 border-rose-200';
        default: return 'bg-sky-50 text-sky-700 border-sky-200';
    }
}

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section with Image */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                {/* Image Placeholder - Replace src with your image */}
                <div className="absolute inset-0 bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Hero Image: Add your TAVU services hero image here</p>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Our Services</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Discover the complete TAVU experience. From reformer classes to recovery therapies,
                            we offer everything you need for your wellness journey.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Reformer Room Section */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                                    {/* Image Placeholder */}
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">Reformer Room Image: Add your reformer studio image here</p>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Movement</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Reformer Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6">
                                        Small group classes with a maximum of 6 participants. Each 45-minute session is designed
                                        to challenge your body while maintaining alignment and connection to your breath.
                                    </p>
                                    <div className="flex gap-4">
                                        <Link
                                            href="/schedule"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                        >
                                            Book a Class
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reformerClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-lg text-primary">{cls.name}</h3>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-2">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70">{cls.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Breathing Room Section */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="order-2 lg:order-1">
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Breath</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Breathing Room</h2>
                                    <p className="text-lg text-foreground/70 mb-6">
                                        Yoga, Pilates, and movement classes designed to connect breath to body.
                                        Sessions range from 45-60 minutes, suitable for all levels.
                                    </p>
                                    <div className="flex gap-4">
                                        <Link
                                            href="/schedule"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                        >
                                            Book a Class
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden order-1 lg:order-2">
                                    {/* Image Placeholder */}
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">Breathing Room Image: Add your yoga/pilates studio image here</p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {breathingClasses.map((cls, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-lg text-primary">{cls.name}</h3>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getLevelColor(cls.level)}`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-accent mb-2">{cls.tagline}</p>
                                        <p className="text-sm text-foreground/70">{cls.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recovery Section */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                                    {/* Image Placeholder */}
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">Recovery Image: Add your contrast therapy/sauna image here</p>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Recovery</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Recovery Services</h2>
                                    <p className="text-lg text-foreground/70 mb-6">
                                        Restore your body with our contrast therapy and compression services.
                                        Experience the healing power of hot and cold therapy, designed to accelerate recovery and boost wellness.
                                    </p>
                                    <div className="flex gap-4">
                                        <Link
                                            href="/schedule"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                        >
                                            Book Recovery
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {recoveryServices.map((service, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-shadow h-full flex flex-col">
                                        <h3 className="font-semibold text-lg text-primary mb-2">{service.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4 flex-grow">{service.description}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-border">
                                            <span className="text-sm text-foreground/60">{service.duration}</span>
                                            <span className="font-semibold text-accent">From {service.startingPrice}</span>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Massage Section */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="order-2 lg:order-1">
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Wellness</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Massage Services</h2>
                                    <p className="text-lg text-foreground/70 mb-4">
                                        Therapeutic and relaxation massage by certified therapists.
                                        From stress relief to deep tissue work, find the perfect treatment for your needs.
                                    </p>
                                    <p className="text-sm text-pink-600 font-medium mb-6">Ladies Only</p>
                                    <div className="flex gap-4">
                                        <Link
                                            href="/schedule"
                                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
                                        >
                                            Book Massage
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden order-1 lg:order-2">
                                    {/* Image Placeholder */}
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">Massage Image: Add your massage/spa image here</p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {massageServices.map((service, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-shadow h-full flex flex-col">
                                        <h3 className="font-semibold text-primary mb-2">{service.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4 flex-grow">{service.description}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-border">
                                            <span className="text-sm text-foreground/60">{service.duration}</span>
                                            <span className="font-semibold text-accent">{service.price}</span>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-4xl md:text-5xl font-headline mb-6">Ready to Begin?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your first session today and experience the TAVU difference.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/schedule"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Book a Spot
                                </Link>
                                <Link
                                    href="/memberships"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg"
                                >
                                    View Memberships
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
