import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const services = [
    {
        name: 'Reformer Pilates',
        description: 'Small-group reformer classes, limited to 8 participants. A 50-minute, low-impact practice designed to build strength, control, mobility, and alignment.',
        image: '/service-pilates-stretch.png',
        link: '/services/reformer-pilates',
        features: ['8 max participants', '50 minutes', 'All levels welcome'],
        accent: 'from-blue-500/20'
    },
    {
        name: 'Breathing Room',
        description: 'Breath-led practices including yoga, mat pilates, and mobility sessions. Designed to restore balance, release tension, and reconnect you to your body.',
        image: '/service-yoga-mat.png',
        link: '/services/breathing-room',
        features: ['45-60 minutes', 'All levels', 'Mat-based practices'],
        accent: 'from-emerald-500/20'
    },
    {
        name: 'Compression Therapy',
        description: 'Contrast therapy combining Himalayan Salt Sauna or Infrared Sauna with Ice Bath. Activate your body\'s natural healing response and accelerate recovery.',
        image: '/service-ice-bath.png',
        link: '/services/compression-therapy',
        features: ['60 minutes', 'Hot & cold therapy', 'Private suites available'],
        accent: 'from-amber-500/20'
    },
    {
        name: 'IV Therapy',
        description: 'Intravenous vitamin and hydration therapy for optimal wellness. Boost energy, enhance recovery, and support your immune system.',
        image: '/service-ice-hands.png',
        link: '/services/iv-therapy',
        features: ['30-45 minutes', 'Custom formulations', 'Medical supervision'],
        accent: 'from-purple-500/20'
    },
    {
        name: 'Massage',
        description: 'Therapeutic and relaxation massage by certified therapists. From stress relief to deep tissue work, find the perfect treatment for your needs.',
        image: '/post-4.jpg',
        link: '/services/massage',
        features: ['45-60 minutes', 'Multiple styles', 'Ladies only'],
        accent: 'from-rose-500/20'
    }
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            What We Offer
                        </span>
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-primary">Our Services</h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                            Discover the complete TAVÚ experience — from reformer classes to recovery therapies,
                            everything you need for your wellness journey.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow pb-20">
                {/* Services Grid */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 max-w-6xl mx-auto">
                            {services.map((service, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <Link href={service.link} className="block group">
                                        <div className={`relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                                            index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                        }`}>
                                            <div className={`grid md:grid-cols-2 gap-0 ${index % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
                                                {/* Image */}
                                                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden">
                                                    <Image
                                                        src={service.image}
                                                        alt={service.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} to-transparent opacity-60`} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                </div>

                                                {/* Content */}
                                                <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                                                    <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
                                                        {index === 0 ? 'Movement' : index === 1 ? 'Breath' : 'Recovery'}
                                                    </span>
                                                    <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4 group-hover:text-accent transition-colors">
                                                        {service.name}
                                                    </h2>
                                                    <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                                                        {service.description}
                                                    </p>

                                                    {/* Features */}
                                                    <div className="flex flex-wrap gap-3 mb-6">
                                                        {service.features.map((feature, i) => (
                                                            <span key={i} className="text-sm bg-muted/50 text-foreground/70 px-4 py-2 rounded-full">
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                                                        <span>Learn More</span>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="max-w-4xl mx-auto text-center glass p-10 md:p-16 rounded-3xl">
                                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Ready to Begin?</h2>
                                <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                                    Start your wellness journey with our pre-opening packages. Limited spots available.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/pricing"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                    >
                                        View Packages
                                    </Link>
                                    <Link
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all text-lg"
                                    >
                                        Book a Class
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
