import HomeView from '@/components/landing/HomeView';
import { getGlobal } from '@/lib/cms/globals';
import { getOffers } from '@/lib/cms/offers';
import { getTestimonials } from '@/lib/cms/testimonials';
import type { OfferLike } from '@/lib/cms/offerText';
import type { GlobalSlug } from 'payload';
import type { HomePage as HomePageData } from '@/payload-types';

// The home page has no route layout today (§3.5 home-page.seo) — metadata keeps falling back
// to the root `(frontend)/layout.tsx`'s `site-settings.seo` defaults, unchanged.

export default async function Home() {
  const [home, reformerOffers, breathingOffers, testimonials] = await Promise.all([
    getGlobal<HomePageData>('home-page' as GlobalSlug),
    getOffers({ category: 'reformer', surface: 'home' }),
    getOffers({ category: 'breathing-room', surface: 'home' }),
    getTestimonials(),
  ]);

  return (
    <HomeView
      data={{
        home,
        // `getOffers` is a package B stub returning `[]` until Offers is built (§6) — the
        // formatter-shaped cast is a no-op today and becomes exact once B's real Offer type
        // (a structural superset of `OfferLike`) lands.
        reformerOffers: reformerOffers as unknown as OfferLike[],
        breathingOffers: breathingOffers as unknown as OfferLike[],
        testimonials,
      }}
    />
  );
}
