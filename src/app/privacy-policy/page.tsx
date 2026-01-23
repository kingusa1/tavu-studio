import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import BackgroundImage from '@/components/common/BackgroundImage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TAVU Wellness Studio',
  description: 'Privacy Policy for TAVU Wellness Studio - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="bg-card/80 backdrop-blur-sm p-8 md:p-16 rounded-2xl shadow-2xl border border-white/10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: January 2025</p>

            <div className="space-y-8 text-primary/90">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">1. Introduction</h2>
                <p className="leading-relaxed">
                  Welcome to TAVU Wellness Studio ("TAVU," "we," "us," or "our"). We are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (tavustudio.com), use our services, book classes, or interact with us through any channel including WhatsApp.
                </p>
                <p className="leading-relaxed mt-4">
                  TAVU Wellness Studio is located in Abu Dhabi, United Arab Emirates, and we comply with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data and all applicable data protection regulations.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">2. Information We Collect</h2>
                <p className="leading-relaxed mb-4">We may collect the following types of information:</p>

                <h3 className="text-lg font-semibold mt-4 mb-2">2.1 Personal Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Identity Data:</strong> Full name, date of birth, gender</li>
                  <li><strong>Contact Data:</strong> Email address, phone number, WhatsApp number, postal address</li>
                  <li><strong>Account Data:</strong> Username, password, account preferences</li>
                  <li><strong>Health Data:</strong> Medical conditions, injuries, or health information you voluntarily provide for safety during classes and treatments</li>
                  <li><strong>Transaction Data:</strong> Payment information, booking history, class attendance records</li>
                  <li><strong>Communication Data:</strong> Messages sent via our contact form, WhatsApp, email, or other channels</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">2.2 Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Device Data:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs</li>
                  <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                  <li><strong>Cookies and Tracking:</strong> Information collected through cookies, pixels, and similar technologies</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">2.3 Information from Third Parties</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Booking Platform:</strong> Information from Mindbody, our booking and scheduling partner</li>
                  <li><strong>Social Media:</strong> Information from Instagram, Facebook, or TikTok if you interact with us through these platforms</li>
                  <li><strong>Payment Processors:</strong> Transaction confirmations from payment service providers</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">3. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">We use your personal information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Service Delivery:</strong> To process bookings, manage your account, and provide our wellness services including Pilates classes, recovery treatments, and massage therapy</li>
                  <li><strong>Safety:</strong> To ensure your safety during physical activities by understanding relevant health conditions</li>
                  <li><strong>Communication:</strong> To respond to inquiries, send booking confirmations, class reminders, and important service updates</li>
                  <li><strong>Marketing:</strong> To send promotional offers, newsletters, and information about new classes or services (with your consent)</li>
                  <li><strong>Improvement:</strong> To analyze usage patterns and improve our website, services, and customer experience</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                  <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other security threats</li>
                </ul>
              </section>

              {/* Legal Basis for Processing */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">4. Legal Basis for Processing</h2>
                <p className="leading-relaxed mb-4">We process your personal data based on the following legal grounds:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Contract Performance:</strong> Processing necessary to fulfill our service agreement with you</li>
                  <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities</li>
                  <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate business interests</li>
                  <li><strong>Legal Obligation:</strong> Where processing is required by UAE law or regulation</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">5. Data Sharing and Disclosure</h2>
                <p className="leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Service Providers:</strong> Mindbody (booking platform), payment processors, email service providers, and hosting services</li>
                  <li><strong>Professional Advisors:</strong> Lawyers, accountants, and auditors where necessary</li>
                  <li><strong>Legal Authorities:</strong> Government bodies, law enforcement, or regulators when required by law</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  <strong>We do not sell your personal information to third parties.</strong>
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">6. Data Retention</h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Typically:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                  <li>Account and booking data: Duration of your membership plus 7 years</li>
                  <li>Marketing preferences: Until you withdraw consent</li>
                  <li>Communication records: 3 years from last interaction</li>
                  <li>Financial records: As required by UAE law (typically 5-7 years)</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">7. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                  <li>Encryption of data in transit (SSL/TLS)</li>
                  <li>Secure data storage with access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Staff training on data protection</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">8. Your Rights</h2>
                <p className="leading-relaxed mb-4">Under UAE data protection law, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data in certain circumstances</li>
                  <li><strong>Restriction:</strong> Request limitation of processing</li>
                  <li><strong>Data Portability:</strong> Request transfer of your data in a structured format</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise any of these rights, please contact us at <a href="mailto:connect@tavustudio.com" className="underline hover:text-accent transition-colors">connect@tavustudio.com</a>.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience. These include:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You can manage cookie preferences through your browser settings.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">10. Third-Party Links</h2>
                <p className="leading-relaxed">
                  Our website may contain links to third-party websites (such as Mindbody for bookings, Instagram, Facebook, TikTok, and WhatsApp). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">11. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">12. International Data Transfers</h2>
                <p className="leading-relaxed">
                  Some of our service providers may be located outside the UAE. When we transfer your data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with UAE data protection requirements.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">13. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">14. Contact Us</h2>
                <p className="leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-xl">
                  <p className="font-semibold">TAVU Wellness Studio</p>
                  <p className="mt-2">Al Raha Blvd, Al Seef</p>
                  <p>Abu Dhabi, United Arab Emirates</p>
                  <p className="mt-4">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:connect@tavustudio.com" className="underline hover:text-accent transition-colors">
                      connect@tavustudio.com
                    </a>
                  </p>
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a href="https://wa.me/971522755551" className="underline hover:text-accent transition-colors">
                      +971 52 275 5551
                    </a>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
