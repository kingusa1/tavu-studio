
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

            <main className="flex-grow flex items-center justify-center pt-32 pb-16 px-4">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center">
                        <MotionWrapper delay={0} direction="up">
                            <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                                Coming Soon
                            </span>
                            <h1 className="text-5xl md:text-6xl font-headline mb-6 text-primary">Recovery Services</h1>
                            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                                Our recovery services including contrast therapy, massage, and more are coming soon.
                            </p>
                            <p className="text-lg text-foreground/60 mb-12">
                                In the meantime, explore our classes and book your first session.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/classes"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Explore Classes
                                </Link>
                                <Link
                                    href="/schedule"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-lg"
                                >
                                    View Schedule
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
