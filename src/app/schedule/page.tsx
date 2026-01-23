
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';

export default function SchedulePage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto">
                <div className="max-w-5xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-headline mb-6 text-primary">Schedule</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Book your next session. Browse our class schedule and reserve your spot.
                            </p>
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-white rounded-2xl p-4 min-h-[700px] shadow-sm">
                            {/* Schedule Widget from Mindbody - User ID: dc43537beda */}
                            <MindbodyWidget widgetType="Schedules" widgetId="dc43537beda" />
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.2} direction="up">
                        <div className="mt-12 bg-card border border-border p-6 rounded-2xl">
                            <h3 className="text-lg font-semibold text-primary mb-4">Booking Information</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>First time?</strong> Create an account to book your classes</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>Cancellation:</strong> 12 hours for classes, 6 hours for recovery</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>Arrival:</strong> Please arrive 10 minutes before your session</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>What to bring:</strong> Comfortable workout attire and water</span>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </main>

            <Footer />
        </div>
    );
}
