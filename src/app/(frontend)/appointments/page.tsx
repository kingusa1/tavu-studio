import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import PriceStack from '@/components/common/PriceStack';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getGlobal } from '@/lib/cms/globals';
import { getOffers } from '@/lib/cms/offers';
import { offerRow } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getPolicies } from '@/lib/cms/policies';
import { getSiteData } from '@/lib/cms/site';
import type { AppointmentsPage as AppointmentsPageData } from '@/payload-types';

// `getOffers()` is still a package B stub returning `[]`, typed against the stub Offers
// collection (§6) — `offerRow()` expects the real Offer shape that B's merge provides. Same
// bridge as `src/lib/cms/globals.ts` uses for tokens; a no-op once B merges.
function asOfferLike(offer: unknown): OfferLike {
  return offer as OfferLike;
}

// Same bridge for the package B Policies stub (§2.6) — real `label`/`text` fields land when B merges.
type PolicyLike = { id: number; label?: string | null; text?: string | null };
function asPolicyLike(policy: unknown): PolicyLike {
  return policy as PolicyLike;
}

export default async function AppointmentsPage() {
  const [data, packages, policies, { settings }] = await Promise.all([
    getGlobal<AppointmentsPageData>('appointments-page'),
    getOffers({ surface: 'appointments' }),
    getPolicies('appointments'),
    getSiteData(),
  ]);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <main className="flex-grow pt-32 pb-16 px-4 container mx-auto">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            siteUrl={settings.brand.siteUrl ?? 'https://tavustudio.com'}
            items={[{ name: 'Home', path: '/' }, { name: 'Appointments', path: '/appointments' }]}
          />
          <MotionWrapper delay={0} direction="up" immediate>
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-6 text-primary">{data.title}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{data.intro}</p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1} direction="up">
            <div className="bg-white rounded-2xl p-4 min-h-[700px] shadow-sm">
              <MindbodyWidget key="appointments-widget" widgetType="Appointments" widgetId={settings.mindbody.appointmentsWidgetId ?? ''} />
            </div>
          </MotionWrapper>

          {packages.length > 0 && (
            <MotionWrapper delay={0.15} direction="up">
              <div className="mt-12">
                <h2 className="text-2xl font-headline text-primary mb-6 text-center">{data.packagesHeading}</h2>
                {packages.map((offer) => {
                  const row = offerRow(asOfferLike(offer), 'bigCard');
                  return (
                    <div key={offer.id} className="bg-card border border-accent/30 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
                      <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                        <div>
                          <h3 className="font-headline text-2xl text-primary">{row.name}</h3>
                          {row.subtitle && <p className="text-sm text-foreground/60 mt-1">{row.subtitle}</p>}
                        </div>
                        <PriceStack price={row.price} priceClassName="text-3xl" />
                      </div>

                      {row.description && <p className="text-sm text-foreground/70 mb-6">{row.description}</p>}

                      <div className="grid md:grid-cols-2 gap-6">
                        {row.includes && row.includes.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{row.includesHeading}</p>
                            <ul className="space-y-2">
                              {row.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                  <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                  {item.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {row.notes && row.notes.length > 0 && (
                          <div className="p-5 rounded-xl bg-muted/30">
                            <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">{row.notesHeading}</p>
                            <ul className="space-y-2">
                              {row.notes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                  <span className="w-1 h-1 bg-foreground/60 rounded-full flex-shrink-0 mt-2" />
                                  {item.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </MotionWrapper>
          )}

          <MotionWrapper delay={0.2} direction="up">
            <div className="mt-12 bg-card border border-border p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-primary mb-4">{data.info?.heading}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                {policies.map((policy) => {
                  const p = asPolicyLike(policy);
                  return (
                    <div key={p.id} className="flex items-start gap-2">
                      <span className="text-accent font-bold">-</span>
                      <span>
                        <strong>{p.label}</strong> {p.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}
