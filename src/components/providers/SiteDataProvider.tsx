'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import type { SiteData } from '@/lib/cms/site';

const SiteDataContext = createContext<SiteData | null>(null);

export type SiteDataProviderProps = {
  value: SiteData;
  children: ReactNode;
};

/**
 * Site-wide data (settings/header/footer/system-pages), fetched once in `(frontend)/layout.tsx`
 * via `getSiteData()` and made available to every client component below it — Header, Footer,
 * VatNote, BackgroundImage, MindbodyWidget — without per-component fetching or prop-drilling
 * (§5.2 D6).
 */
export function SiteDataProvider({ value, children }: SiteDataProviderProps) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
