import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import BackgroundImage from '@/components/common/BackgroundImage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | TAVU Wellness Studio',
  description: 'Terms of Service for TAVU Wellness Studio - Read our terms and conditions for using our wellness services.',
};

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="bg-card/80 backdrop-blur-sm p-8 md:p-16 rounded-2xl shadow-2xl border border-white/10 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: January 2025</p>

            <div className="space-y-8 text-primary/90">

              {/* Agreement to Terms */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">1. Agreement to Terms</h2>
                <p className="leading-relaxed">
                  Welcome to TAVU Wellness Studio. These Terms of Service ("Terms") constitute a legally binding agreement between you and TAVU Wellness Studio ("TAVU," "we," "us," or "our"), governing your access to and use of our website (tavustudio.com), our wellness studio located in Abu Dhabi, UAE, and all related services including but not limited to Pilates classes, recovery treatments, massage therapy, and online booking services.
                </p>
                <p className="leading-relaxed mt-4">
                  By accessing our website, creating an account, booking a class, or using any of our services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our services.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">2. Definitions</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>"Services"</strong> means all wellness services offered by TAVU, including Reformer Pilates classes, breathwork sessions, contrast therapy, massage treatments, and any other services we may offer</li>
                  <li><strong>"Client," "you," or "your"</strong> refers to any individual who accesses our website or uses our Services</li>
                  <li><strong>"Booking"</strong> means any reservation made for a class, session, or treatment</li>
                  <li><strong>"Membership"</strong> means any class package, subscription, or membership plan purchased</li>
                  <li><strong>"Studio"</strong> means our physical premises located at Al Raha Blvd, Al Seef, Abu Dhabi</li>
                </ul>
              </section>

              {/* Eligibility */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">3. Eligibility</h2>
                <p className="leading-relaxed mb-4">To use our Services, you must:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Be at least 18 years of age (or have parental/guardian consent for clients aged 16-17)</li>
                  <li>Have the legal capacity to enter into a binding agreement</li>
                  <li>Provide accurate and complete information when creating an account or making bookings</li>
                  <li>Not have any medical conditions that would make physical exercise or treatments unsafe without clearance from a healthcare provider</li>
                </ul>
              </section>

              {/* Account Registration */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">4. Account Registration</h2>
                <p className="leading-relaxed mb-4">
                  To book classes and access certain features, you may need to create an account through our booking partner, Mindbody. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password confidential and secure</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We reserve the right to suspend or terminate accounts that violate these Terms or contain false information.
                </p>
              </section>

              {/* Bookings and Cancellations */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">5. Bookings, Cancellations, and No-Shows</h2>

                <h3 className="text-lg font-semibold mt-4 mb-2">5.1 Class Bookings</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>All bookings are subject to availability</li>
                  <li>Bookings can be made through our website, Mindbody app, or by contacting us directly</li>
                  <li>Please arrive at least 10 minutes before your scheduled class</li>
                  <li>Late arrivals may not be permitted to join the class for safety reasons, and this will be treated as a no-show</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">5.2 Cancellation Policy</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Classes:</strong> Cancellations must be made at least 12 hours before the scheduled class time to avoid penalty</li>
                  <li><strong>Recovery Treatments:</strong> Cancellations must be made at least 24 hours before the scheduled appointment</li>
                  <li><strong>Late Cancellations:</strong> Cancellations made after the deadline will result in the class/session being deducted from your package or charged in full</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">5.3 No-Show Policy</h3>
                <p className="leading-relaxed">
                  Failure to attend a booked class or appointment without cancellation will be treated as a no-show. No-shows will result in the full deduction of the class/session from your package or full charge.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">5.4 Studio Cancellations</h3>
                <p className="leading-relaxed">
                  We reserve the right to cancel or reschedule classes due to instructor illness, low enrollment, or unforeseen circumstances. In such cases, you will be notified as soon as possible and your class credit will be restored or rescheduled.
                </p>
              </section>

              {/* Pricing and Payment */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">6. Pricing and Payment</h2>

                <h3 className="text-lg font-semibold mt-4 mb-2">6.1 Pricing</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>All prices are listed in UAE Dirhams (AED) and are inclusive of VAT where applicable</li>
                  <li>We reserve the right to modify prices at any time, but changes will not affect existing confirmed bookings or active memberships</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">6.2 Payment</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Payment is required at the time of booking unless otherwise agreed</li>
                  <li>We accept major credit cards, debit cards, and other payment methods as indicated on our website</li>
                  <li>All payments are processed securely through our payment partners</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">6.3 Refunds</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Class packages and memberships are generally non-refundable</li>
                  <li>Refund requests for exceptional circumstances will be reviewed on a case-by-case basis</li>
                  <li>Approved refunds will be processed within 14 business days</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">6.4 Package Expiry</h3>
                <p className="leading-relaxed">
                  Class packages have an expiration period as specified at the time of purchase. Unused classes will expire at the end of the validity period and cannot be refunded, extended, or transferred unless otherwise stated.
                </p>
              </section>

              {/* Health and Safety */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">7. Health and Safety</h2>

                <h3 className="text-lg font-semibold mt-4 mb-2">7.1 Health Declaration</h3>
                <p className="leading-relaxed mb-4">
                  By participating in our Services, you confirm that:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You are in good physical health and have no medical conditions that would prevent safe participation</li>
                  <li>You have consulted with a healthcare provider if you have any health concerns</li>
                  <li>You will inform our staff of any injuries, health conditions, or pregnancy before each session</li>
                  <li>You understand that physical activity carries inherent risks</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">7.2 Assumption of Risk</h3>
                <p className="leading-relaxed">
                  You acknowledge that participation in physical activities, including Pilates, breathwork, contrast therapy, and massage, involves inherent risks of injury. By using our Services, you voluntarily assume all risks associated with such activities.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">7.3 Studio Rules</h3>
                <p className="leading-relaxed mb-4">While at our Studio, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Follow all instructions from our instructors and staff</li>
                  <li>Use equipment properly and only as instructed</li>
                  <li>Maintain personal hygiene and wear appropriate workout attire</li>
                  <li>Respect other clients and maintain a peaceful environment</li>
                  <li>Not attend if you are feeling unwell or have contagious symptoms</li>
                  <li>Keep mobile phones on silent and refrain from calls during sessions</li>
                </ul>
              </section>

              {/* Liability */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">8. Limitation of Liability</h2>
                <p className="leading-relaxed mb-4">
                  To the fullest extent permitted by UAE law:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>TAVU shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services</li>
                  <li>TAVU shall not be liable for any injury, loss, or damage to personal property unless caused by our gross negligence</li>
                  <li>Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim</li>
                  <li>TAVU is not responsible for any valuables left unattended at the Studio</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  These limitations do not exclude liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under UAE law.
                </p>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">9. Intellectual Property</h2>
                <p className="leading-relaxed mb-4">
                  All content on our website and materials used in our Services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>The TAVU name, logo, and branding</li>
                  <li>Website design, text, graphics, images, and videos</li>
                  <li>Class content, routines, and methodologies</li>
                  <li>Software, source code, and functionality</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  are owned by or licensed to TAVU and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                </p>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">10. Prohibited Conduct</h2>
                <p className="leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Use our Services for any unlawful purpose</li>
                  <li>Harass, intimidate, or behave inappropriately toward staff or other clients</li>
                  <li>Record or photograph sessions without permission</li>
                  <li>Bring outside food, beverages, or prohibited items into the Studio</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Use our website in any way that could damage, disable, or impair the site</li>
                  <li>Resell or transfer your class packages or membership without authorization</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Violation of these rules may result in immediate termination of your membership without refund.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">11. Termination</h2>
                <p className="leading-relaxed mb-4">
                  We may suspend or terminate your access to our Services at any time if:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You breach any provision of these Terms</li>
                  <li>You engage in conduct that we deem harmful to other clients, staff, or our business</li>
                  <li>We are required to do so by law</li>
                  <li>We decide to discontinue providing Services</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Upon termination, any unused classes or credits may be forfeited depending on the circumstances.
                </p>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">12. Privacy</h2>
                <p className="leading-relaxed">
                  Your use of our Services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our Services, you consent to the practices described in our Privacy Policy.
                </p>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">13. Modifications to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be posted on our website with an updated "Last Updated" date. Your continued use of our Services after any changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">14. Governing Law and Dispute Resolution</h2>
                <p className="leading-relaxed mb-4">
                  These Terms are governed by and construed in accordance with the laws of the Emirate of Abu Dhabi and the applicable federal laws of the United Arab Emirates.
                </p>
                <p className="leading-relaxed">
                  Any disputes arising from these Terms or your use of our Services shall first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached, disputes shall be submitted to the competent courts of Abu Dhabi, UAE.
                </p>
              </section>

              {/* Force Majeure */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">15. Force Majeure</h2>
                <p className="leading-relaxed">
                  TAVU shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, civil unrest, power failures, or telecommunications failures.
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">16. Severability</h2>
                <p className="leading-relaxed">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </section>

              {/* Entire Agreement */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">17. Entire Agreement</h2>
                <p className="leading-relaxed">
                  These Terms, together with our Privacy Policy and any additional terms for specific services, constitute the entire agreement between you and TAVU regarding your use of our Services and supersede all prior agreements and understandings.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">18. Contact Us</h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about these Terms or our Services, please contact us:
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
                  <p className="mt-4 text-sm text-muted-foreground">
                    Operating Hours: Daily 7:00 AM - 9:00 PM
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
