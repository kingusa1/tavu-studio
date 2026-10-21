import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import MindbodyLoginWidget from '@/components/account/MindbodyLoginWidget';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { getIcon } from '@/components/icons/cmsIcons';
import { getGlobal } from '@/lib/cms/globals';
import type { SeoFieldValue } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { LinkValue } from '@/lib/cms/site';

export type AccountPageData = {
  hero: { eyebrow?: string | null; headingLead?: string | null; headingEmphasis?: string | null; intro?: string | null };
  loginCard: {
    heading?: string | null;
    subheading?: string | null;
    signInLabel?: string | null;
    widgetInnerText?: string | null;
    dividerLabel?: string | null;
    createAccount?: LinkValue;
    helpPrefix?: string | null;
    helpLink?: LinkValue;
  };
  features: {
    heading?: string | null;
    intro?: string | null;
    items?: Array<{ icon?: string | null; title?: string | null; description?: string | null }> | null;
  };
  quickActions: {
    enabled?: boolean | null;
    heading?: string | null;
    text?: string | null;
    buttons?: Array<{ link?: LinkValue; icon?: string | null }> | null;
  };
  trustBadges: { items?: Array<{ icon?: string | null; label?: string | null }> | null };
  seo: SeoFieldValue;
};

/**
 * `cmsIcons.tsx`'s shared `feature` set is empty (F0 stub; also needed by package C) — these
 * local icons mirror today's hard-coded JSX (src/app/(frontend)/account/page.tsx) and are
 * keyed to match `AccountPage.ts`'s manual `icon` select options.
 */
const FEATURE_ICONS: Record<string, ReactNode> = {
  'book-classes': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'view-history': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  'manage-packages': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  'book-recovery': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

const QUICK_ACTION_ICONS: Record<string, ReactNode> = {
  calendar: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  currency: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default async function AccountPage() {
  const [data, { settings }] = await Promise.all([getGlobal<AccountPageData>('account-page'), getSiteData()]);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <main className="flex-grow pt-32 pb-20 px-4 container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <MotionWrapper delay={0} direction="up">
            <div className="text-center mb-12">
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{data.hero.eyebrow}</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-primary mb-6">
                {data.hero.headingLead} <em className="italic font-light text-primary/75">{data.hero.headingEmphasis}</em>
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">{data.hero.intro}</p>
            </div>
          </MotionWrapper>

          {/* Main Login Card */}
          <MotionWrapper delay={0.1} direction="up">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg mx-auto mb-16">
              {/* Card Header */}
              <div className="tone-dark bg-gradient-to-r from-primary to-primary/80 px-8 py-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-headline text-white mb-2">{data.loginCard.heading}</h2>
                <p className="text-white/80 text-sm">{data.loginCard.subheading}</p>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Mindbody Login Widget */}
                <MindbodyLoginWidget
                  siteId={settings.mindbody.loginSiteId ?? ''}
                  mbSiteId={settings.mindbody.loginMbSiteId ?? ''}
                  innerText={data.loginCard.widgetInnerText ?? 'Sign In'}
                  label={data.loginCard.signInLabel ?? ''}
                />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">{data.loginCard.dividerLabel}</span>
                  </div>
                </div>

                {/* Register Link */}
                <Link
                  href={data.loginCard.createAccount?.href || '/register'}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 border-2 border-primary/20 text-primary font-semibold rounded-full hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  {data.loginCard.createAccount?.label}
                </Link>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-500 mt-6">
                  {data.loginCard.helpPrefix}{' '}
                  <Link href={data.loginCard.helpLink?.href || '/contact'} className="text-accent hover:underline">
                    {data.loginCard.helpLink?.label}
                  </Link>
                </p>
              </div>
            </div>
          </MotionWrapper>

          {/* Features Section */}
          <MotionWrapper delay={0.2} direction="up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-headline text-primary mb-2">{data.features.heading}</h3>
              <p className="text-foreground/60">{data.features.intro}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(data.features.items ?? []).map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent">
                    {feature.icon ? FEATURE_ICONS[feature.icon] : null}
                  </div>
                  <h4 className="font-semibold text-primary mb-2">{feature.title}</h4>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </MotionWrapper>

          {/* Quick Actions */}
          {data.quickActions.enabled && (
            <MotionWrapper delay={0.3} direction="up">
              <div className="mt-16 glass p-8 md:p-10 rounded-3xl text-center">
                <h3 className="text-2xl font-headline text-primary mb-4">{data.quickActions.heading}</h3>
                <p className="text-foreground/70 mb-8 max-w-xl mx-auto">{data.quickActions.text}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(data.quickActions.buttons ?? []).map((button, index) => (
                    <Link
                      key={index}
                      href={button.link?.href || '#'}
                      className={
                        index === 0
                          ? 'inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105'
                          : 'inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300'
                      }
                    >
                      {button.icon ? QUICK_ACTION_ICONS[button.icon] : null}
                      {button.link?.label}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          )}

          {/* Trust Indicators */}
          <MotionWrapper delay={0.4} direction="up">
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-foreground/50">
              {(data.trustBadges.items ?? []).map((badge, index) => {
                const Icon = badge.icon ? getIcon('trust', badge.icon) : undefined;
                return (
                  <div key={index} className="flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </MotionWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}
