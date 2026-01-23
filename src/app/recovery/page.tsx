
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';
import Link from 'next/link';
import Image from 'next/image';

const standardContrastPricing = [
    { name: 'Drop-In', price: '220 AED', validity: '60 min session' },
    { name: '5-Pack', price: '990 AED', validity: '30 days' },
    { name: '10-Pack', price: '1,850 AED', validity: '60 days' }
];

const privateInfraredPricing = [
    { name: 'Drop-In', price: '275 AED', validity: '60 min session' },
    { name: '5-Pack', price: '1,250 AED', validity: '30 days' },
    { name: '10-Pack', price: '2,300 AED', validity: '45 days' }
];

const taMassages = [
    { name: 'TA | Destress Massage', duration: '60 min', price: '300 AED', description: 'Relaxation-focused massage to melt away stress' },
    { name: 'TA | Relaxing Massage', duration: '60 min', price: '300 AED', description: 'Gentle, soothing massage for complete relaxation' },
    { name: 'TA | Express Head, Neck & Shoulder', duration: '45 min', price: '220 AED', description: 'Targeted relief for tension-prone areas' },
    { name: 'TA | Foot Ritual Massage', duration: '30 min', price: '180 AED', description: 'Reflexology-inspired foot therapy' }
];

const vuMassages = [
    { name: 'VU | Deep Tissue Massage', duration: '60 min', price: '300 AED', description: 'Intensive therapeutic work for deep muscle release' }
];

const bundles = [
    {
        name: 'TA RESET BUNDLE',
        price: '480 AED',
        validity: '14 days',
        includes: ['60-min Standard Contrast Therapy', '30-min TA Express Head, Neck & Shoulder Massage']
    },
    {
        name: 'TA DEEP CALM BUNDLE',
        price: '520 AED',
        validity: '14 days',
        includes: ['60-min Standard Contrast Therapy', '60-min TA Relaxing Massage']
    },
    {
        name: 'VU ATHLETE BUNDLE',
        price: '560 AED',
        validity: '14 days',
        includes: ['60-min Standard Contrast Therapy', '60-min VU Deep Tissue Massage']
    },
    {
        name: 'VU MOBILITY FLOW BUNDLE',
        price: '580 AED',
        validity: '14 days',
        includes: ['60-min Standard Contrast Therapy', 'Mobility-focused recovery experience']
    }
];

const couplesPricing = [
    {
        name: 'Couples Contrast Therapy',
        price: '400 AED',
        description: '60-min shared session for 2 people',
        addOn: 'Optional: Compression Boots (40 AED per person, 20 mins)'
    },
    {
        name: 'Couples Reset Bundle',
        price: '620 AED',
        description: '60-min Contrast Therapy (shared) + 2x TA Express Massage (30 mins each, back-to-back)'
    }
];

const groupPricing = [
    {
        name: 'Group Contrast Ritual',
        price: '1,050 AED',
        perPerson: '175 AED',
        capacity: '4-6 people',
        description: '60-min shared session',
        note: 'Requires manual reception approval'
    },
    {
        name: 'Group Recovery Experience',
        price: '1,250 AED',
        capacity: 'Up to 6 people',
        description: '60-min Group Contrast + Compression in rotations',
        note: 'Compression credits valid 7 days'
    }
];

export default function RecoveryPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section with Image */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/30 z-10" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-20" />
                    <Image
                        src="/pillar-recovery.png" // Use recovery image for hero
                        alt="Restorative Recovery"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                </div>
                <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Recovery Services</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                            Restore your body and mind with our comprehensive recovery offerings.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Contrast Therapy Section */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/pillar-recovery.png" // Reuse recovery image
                                        alt="Contrast Therapy Sauna and Ice Bath"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Recovery</span>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Contrast Therapy</h2>
                                    <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                                        Hot sauna alternating with cold plunge for ultimate recovery. Activate your body's natural healing response, boost circulation, and enhance mental resilience.
                                    </p>
                                </div>
                            </div>
                        </MotionWrapper>

                        <div className="grid lg:grid-cols-2 gap-6 mb-8">
                            {/* Standard Contrast */}
                            <MotionWrapper delay={0.15} direction="up">
                                <div className="bg-card border border-border p-6 rounded-2xl h-full">
                                    <h3 className="text-xl font-semibold text-primary mb-2">Standard Contrast</h3>
                                    <p className="text-sm text-foreground/70 mb-4">Himalayan Salt Sauna + Ice Bath</p>
                                    <div className="space-y-3">
                                        {standardContrastPricing.map((tier, index) => (
                                            <div key={index} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                                                <div>
                                                    <span className="font-medium text-primary">{tier.name}</span>
                                                    <span className="text-sm text-foreground/60 ml-2">({tier.validity})</span>
                                                </div>
                                                <span className="font-bold text-accent">{tier.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MotionWrapper>

                            {/* Private Infrared */}
                            <MotionWrapper delay={0.2} direction="up">
                                <div className="bg-card border border-border p-6 rounded-2xl h-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-semibold text-primary">Private Contrast Infrared</h3>
                                        <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium border border-purple-200">Private Suite</span>
                                    </div>
                                    <p className="text-sm text-foreground/70 mb-4">Infrared Sauna + Ice Bath</p>
                                    <div className="space-y-3">
                                        {privateInfraredPricing.map((tier, index) => (
                                            <div key={index} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                                                <div>
                                                    <span className="font-medium text-primary">{tier.name}</span>
                                                    <span className="text-sm text-foreground/60 ml-2">({tier.validity})</span>
                                                </div>
                                                <span className="font-bold text-accent">{tier.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        {/* Add-Ons */}
                        <MotionWrapper delay={0.25} direction="up">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-accent/5 border border-accent/20 p-5 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-primary">Compression Flush Add-On</h4>
                                            <p className="text-sm text-foreground/70">20 mins | Must be booked with Contrast Therapy</p>
                                        </div>
                                        <span className="font-bold text-accent text-xl">50 AED</span>
                                    </div>
                                </div>
                                <div className="bg-accent/5 border border-accent/20 p-5 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-primary">NormaTec Compression</h4>
                                            <p className="text-sm text-foreground/70">45 mins | For athletes & post-training recovery</p>
                                        </div>
                                        <span className="font-bold text-accent text-xl">160 AED</span>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Booking Widget - Prominently placed after pricing */}
                        <MotionWrapper delay={0.3} direction="up">
                            <div className="mt-12 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-3xl p-6 md:p-8">
                                <div className="text-center mb-6">
                                    <span className="inline-block bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                                        Book Now
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-headline text-primary mb-2">Book Your Recovery Session</h3>
                                    <p className="text-foreground/70">Select your preferred service and time below</p>
                                </div>
                                <div className="bg-white rounded-2xl p-4 min-h-[500px] shadow-lg">
                                    {/* Appointments Widget from Mindbody */}
                                    <MindbodyWidget widgetType="Appointments" widgetId="dc46585beda" />
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Massage Services */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                                <div className="order-2 lg:order-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-accent font-medium text-sm tracking-wider uppercase">Wellness</span>
                                        <span className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full font-medium border border-pink-200">Ladies Only</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2 mb-4">Massage Services</h2>
                                    <p className="text-lg text-foreground/70 mb-6">
                                        Therapeutic and relaxation massage by certified therapists. From stress relief to deep tissue work.
                                    </p>
                                </div>
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden order-1 lg:order-2">
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                                        <p className="text-sm">Massage Image: Add your massage/spa room image here</p>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* TA Category */}
                            <MotionWrapper delay={0.15} direction="up">
                                <div className="bg-card border border-border p-6 rounded-2xl">
                                    <h3 className="text-xl font-semibold text-primary mb-1">TA Category</h3>
                                    <p className="text-sm text-accent mb-4">Relaxation-focused</p>
                                    <div className="space-y-3">
                                        {taMassages.map((massage, index) => (
                                            <div key={index} className="bg-muted/50 p-4 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-medium text-primary">{massage.name}</h4>
                                                    <span className="font-bold text-accent">{massage.price}</span>
                                                </div>
                                                <p className="text-sm text-foreground/60">{massage.duration} | {massage.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MotionWrapper>

                            {/* VU Category */}
                            <MotionWrapper delay={0.2} direction="up">
                                <div className="bg-card border border-border p-6 rounded-2xl">
                                    <h3 className="text-xl font-semibold text-primary mb-1">VU Category</h3>
                                    <p className="text-sm text-accent mb-4">Deep therapeutic work</p>
                                    <div className="space-y-3">
                                        {vuMassages.map((massage, index) => (
                                            <div key={index} className="bg-muted/50 p-4 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-medium text-primary">{massage.name}</h4>
                                                    <span className="font-bold text-accent">{massage.price}</span>
                                                </div>
                                                <p className="text-sm text-foreground/60">{massage.duration} | {massage.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-foreground/50 mt-4">6-hour strict cancellation policy for all massage services</p>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Bundles */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Packages</span>
                                    <span className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full font-medium border border-pink-200">Ladies Only</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-headline text-primary">Recovery + Massage Bundles</h2>
                                <p className="text-lg text-foreground/70 mt-4">Combine contrast therapy with massage for the ultimate reset</p>
                            </div>
                        </MotionWrapper>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {bundles.map((bundle, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow h-full flex flex-col">
                                        <h3 className="font-semibold text-primary mb-1">{bundle.name}</h3>
                                        <p className="text-2xl font-bold text-accent mb-2">{bundle.price}</p>
                                        <p className="text-xs text-foreground/60 mb-3">{bundle.validity} validity</p>
                                        <ul className="space-y-1 flex-grow">
                                            {bundle.includes.map((item, i) => (
                                                <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                                                    <span className="text-accent font-bold">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Couples & Groups */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Couples */}
                            <MotionWrapper delay={0.1} direction="up">
                                <div className="bg-card border border-border p-8 rounded-2xl h-full">
                                    <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Couples Pricing</h2>
                                    <div className="space-y-4">
                                        {couplesPricing.map((item, index) => (
                                            <div key={index} className="bg-muted/50 p-5 rounded-xl">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-primary">{item.name}</h3>
                                                    <span className="font-bold text-accent">{item.price}</span>
                                                </div>
                                                <p className="text-sm text-foreground/70">{item.description}</p>
                                                {item.addOn && (
                                                    <p className="text-xs text-accent mt-2">{item.addOn}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-foreground/50 mt-4">6-hour strict cancellation policy</p>
                                </div>
                            </MotionWrapper>

                            {/* Groups */}
                            <MotionWrapper delay={0.15} direction="up">
                                <div className="bg-card border border-border p-8 rounded-2xl h-full">
                                    <div className="flex items-center gap-2 mb-6">
                                        <h2 className="text-2xl md:text-3xl font-headline text-primary">Group Pricing</h2>
                                        <span className="text-sm text-foreground/60">(4-6 People)</span>
                                    </div>
                                    <div className="space-y-4">
                                        {groupPricing.map((item, index) => (
                                            <div key={index} className="bg-muted/50 p-5 rounded-xl">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-primary">{item.name}</h3>
                                                    <div className="text-right">
                                                        <span className="font-bold text-accent">{item.price}</span>
                                                        {item.perPerson && (
                                                            <p className="text-xs text-foreground/60">{item.perPerson}/person</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-foreground/70">{item.capacity} | {item.description}</p>
                                                <p className="text-xs text-amber-600 mt-2">{item.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 p-3 rounded-lg mt-4">
                                        <p className="text-sm"><strong>Group + Express Massage Add-On:</strong> 100 AED per person (30 min, co-ed allowed)</p>
                                    </div>
                                    <p className="text-xs text-foreground/50 mt-4">24-hour cancellation | Manual reception approval required</p>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Policies */}
                <section className="py-12 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="bg-card border border-border p-6 md:p-8 rounded-2xl max-w-4xl mx-auto">
                                <h3 className="text-xl font-semibold text-primary mb-6">Important Policies</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-primary mb-3">Gender Policies</h4>
                                        <ul className="space-y-2 text-sm text-foreground/70">
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span>Mixed couples/groups only on mixed-gender days</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span>Ladies-only days strictly ladies-only</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span>Massage & compression add-ons: Ladies-only</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-primary mb-3">Cancellation Policies</h4>
                                        <ul className="space-y-2 text-sm text-foreground/70">
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span><strong>Contrast Therapy:</strong> 6-hour cancellation</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span><strong>Massage:</strong> 6-hour cancellation</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent font-bold">•</span>
                                                <span><strong>Groups:</strong> 24-hour cancellation</span>
                                            </li>
                                        </ul>
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
                            <h2 className="text-3xl md:text-4xl font-headline mb-4">Questions About Our Services?</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Contact us to learn more or customize a package for your needs.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                Get In Touch
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
