
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';

export default function AppointmentsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto">
                <div className="max-w-5xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-6 text-primary">Appointments</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Book one-on-one sessions — Contrast Therapy, Compression, Massage, IV Therapy and private appointments.
                            </p>
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.1} direction="up">
                        <div className="bg-white rounded-2xl p-4 min-h-[700px] shadow-sm">
                            <MindbodyWidget key="appointments-widget" widgetType="Appointments" widgetId="dc53226beda" />
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.2} direction="up">
                        <div className="mt-12 bg-card border border-border p-6 rounded-2xl">
                            <h3 className="text-lg font-semibold text-primary mb-4">Appointment Information</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">-</span>
                                    <span><strong>First time?</strong> Create an account to book appointments</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">-</span>
                                    <span><strong>Cancellation:</strong> 6 hours notice required for appointments</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">-</span>
                                    <span><strong>Arrival:</strong> Please arrive 10 minutes before your session</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-accent font-bold">-</span>
                                    <span><strong>Need help?</strong> Contact us via WhatsApp or email</span>
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
