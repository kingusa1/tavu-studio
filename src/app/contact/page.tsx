import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-headline mb-8 text-primary">Contact Us</h1>
                        <p className="text-lg mb-6">
                            We’d love to hear from you. Whether you have a question about our classes,
                            pricing, or just want to say hello.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg">Location</h3>
                                <a
                                    href="https://maps.google.com/?q=CHXW%2BC3R+Abu+Dhabi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-accent transition-colors"
                                >
                                    Al Raha Blvd, Al Seef, Abu Dhabi
                                </a>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <a
                                    href="mailto:connect@tavustudio.com"
                                    className="text-muted-foreground hover:text-accent transition-colors"
                                >
                                    connect@tavustudio.com
                                </a>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">WhatsApp</h3>
                                <a
                                    href="https://wa.me/971522755551"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-green-500 transition-colors"
                                >
                                    +971 52 275 5551
                                </a>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Social</h3>
                                <a
                                    href="https://instagram.com/tavustudio.ad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-accent transition-colors"
                                >
                                    @tavustudio.ad
                                </a>
                            </div>
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}
