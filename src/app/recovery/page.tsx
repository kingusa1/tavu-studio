
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

export default function RecoveryPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            <main className="flex-grow pt-32 pb-16 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <MotionWrapper delay={0} direction="up">
                            <div className="text-center mb-14">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-primary">Recovery</h1>
                                <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                                    Restore, recover, and rejuvenate with our range of recovery services.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-3 gap-8">
                            <MotionWrapper delay={0.1} direction="up">
                                <Link href="/services/contrast-therapy" className="block bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-accent/30 transition-all h-full">
                                    <h2 className="font-headline text-2xl text-primary mb-3">Contrast Therapy</h2>
                                    <p className="text-foreground/70 text-sm mb-4">Sauna + Ice Bath sessions. Shared and private suites available.</p>
                                    <span className="text-accent font-medium text-sm">From 220 AED →</span>
                                </Link>
                            </MotionWrapper>
                            <MotionWrapper delay={0.15} direction="up">
                                <Link href="/services/compression-therapy" className="block bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-accent/30 transition-all h-full">
                                    <h2 className="font-headline text-2xl text-primary mb-3">Compression Therapy</h2>
                                    <p className="text-foreground/70 text-sm mb-4">NormaTec pulsing compression for faster muscle recovery.</p>
                                    <span className="text-accent font-medium text-sm">From 160 AED →</span>
                                </Link>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="up">
                                <Link href="/services/massage" className="block bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-accent/30 transition-all h-full">
                                    <h2 className="font-headline text-2xl text-primary mb-3">Massage</h2>
                                    <p className="text-foreground/70 text-sm mb-4">Ladies only. Destress, Relaxing, Deep Tissue, and more.</p>
                                    <span className="text-accent font-medium text-sm">From 180 AED →</span>
                                </Link>
                            </MotionWrapper>
                        </div>

                        <MotionWrapper delay={0.25} direction="up">
                            <div className="text-center mt-14">
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    View All Pricing
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
