
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

                    <MotionWrapper delay={0.15} direction="up">
                        <div className="mt-12">
                            <h2 className="text-2xl font-headline text-primary mb-6 text-center">Appointment Packages</h2>
                            <div className="bg-card border border-accent/30 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
                                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                                    <div>
                                        <h3 className="font-headline text-2xl text-primary">Nomadic Recovery Pack (5+1)</h3>
                                        <p className="text-sm text-foreground/60 mt-1">Compression Therapy</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-headline text-3xl text-accent">660</p>
                                        <p className="text-xs text-foreground/50">AED</p>
                                    </div>
                                </div>

                                <p className="text-sm text-foreground/70 mb-6">
                                    Recover, recharge, and keep your body performing at its best with our Nomadic
                                    Recovery Pack. Each 45-minute Compression Therapy session helps improve circulation,
                                    reduce muscle soreness and swelling, and support faster recovery.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Package Includes</p>
                                        <ul className="space-y-2">
                                            {[
                                                '5 × 45-minute Nomadic Compression Therapy Sessions',
                                                '1 Complimentary 45-minute Compression Therapy Session',
                                                'Total: 6 Sessions',
                                                'Valid for 45 days',
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                    <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-5 rounded-xl bg-muted/30">
                                        <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Please Note</p>
                                        <ul className="space-y-2">
                                            {['Non-transferable', 'Non-refundable'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                    <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0 mt-2" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
