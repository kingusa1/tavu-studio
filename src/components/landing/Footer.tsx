
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  explore: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/classes', label: 'Classes' },
  ],
  connect: [
    { href: '/memberships', label: 'Memberships' },
    { href: '/events', label: 'Events' },
    { href: '/partnerships', label: 'Partnerships' },
    { href: '/contact', label: 'Contact' },
  ],
  book: [
    { href: '/schedule', label: 'Book a Class' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/register', label: 'Register' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ]
};

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 mb-20">

          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="TAVÚ Wellness"
                width={140}
                height={46}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm opacity-70 mb-2 max-w-xs leading-relaxed">
              TA grounds the body. VU lifts the spirit.
            </p>
            <p className="text-sm opacity-70 mb-6 max-w-xs leading-relaxed">
              TAVÚ is the space where both are practiced as one.
            </p>
            <div className="flex gap-5">
              <a href="https://instagram.com/tavustudio.ad" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@tavustudio" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/people/TAV%C3%9A-Wellness/61580985467215/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://wa.me/971522755551" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-50">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-50">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us Column */}
          <div>
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-50">Visit Us</h4>
            <a
              href="https://share.google/H65MSpZCTdk6RSqrH"
              target="_blank"
              rel="noopener noreferrer"
              className="not-italic text-sm opacity-70 leading-relaxed mb-4 block hover:opacity-100 transition-opacity"
            >
              Shop 1, Crescent Residence<br />
              Plot 12, Sector RBW4, Shatie Al Raha<br />
              Abu Dhabi, UAE
            </a>
            <a
              href="tel:+971522755551"
              className="text-sm opacity-70 mb-2 block hover:opacity-100 transition-opacity"
            >
              +971 52 275 5551
            </a>
            <p className="text-sm opacity-70 mb-2">
              connect@tavustudio.com
            </p>
            <p className="text-sm opacity-70">
              Weekdays: 8am - 9pm<br />
              Weekends: 9am - 6pm
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-40">
            {new Date().getFullYear()} TAVÚ Wellness Studio. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="text-xs opacity-40 hover:opacity-80 transition-opacity">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
