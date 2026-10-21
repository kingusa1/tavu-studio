import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import BackgroundImage from '@/components/common/BackgroundImage';
import LegalRichText from '@/components/legal/LegalRichText';
import type { LegalRichTextProps } from '@/components/legal/LegalRichText';
import { format } from 'date-fns';

import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getLegalPage } from '@/lib/cms/legal';
import { getSiteData } from '@/lib/cms/site';

// Metadata lives in ./layout.tsx so the root title template applies exactly once.

export default async function PrivacyPolicy() {
  const [page, { settings }] = await Promise.all([getLegalPage('privacy-policy'), getSiteData()]);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="bg-card/80 backdrop-blur-sm p-8 md:p-16 rounded-2xl shadow-2xl border border-white/10 max-w-4xl mx-auto">
            <Breadcrumbs
              siteUrl={settings.brand.siteUrl ?? 'https://tavustudio.com'}
              items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">{page?.title}</h1>
            {page?.lastUpdated && (
              <p className="text-sm text-muted-foreground mb-8">{`Last Updated: ${format(new Date(page.lastUpdated), 'MMMM yyyy')}`}</p>
            )}

            <LegalRichText
              data={page?.body as unknown as LegalRichTextProps['data']}
              contactCard={
                page?.contactCard
                  ? {
                      ...page.contactCard,
                      email: settings.contact.email,
                      whatsappDisplay: settings.contact.phoneDisplay,
                      whatsappHref: `https://wa.me/${settings.contact.whatsappNumber ?? ''}`,
                    }
                  : null
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
