"use client";

import { useEffect, useRef } from 'react';

/**
 * The HealCode "login-link" widget on `/account` (CMS-Content-Model.md §3.5 account-page,
 * §7 R11). Extracted from the page's original inline component so the page itself can become
 * an async server component — `siteId`/`mbSiteId` are server-provided props (from
 * `site-settings.mindbody`), never fetched client-side.
 */
export type MindbodyLoginWidgetProps = {
  siteId: string;
  mbSiteId: string;
  /** The HealCode link's own text (`data-inner-html`), e.g. "Sign In". */
  innerText: string;
  /** The visible button label overlaid on top of the (invisible) HealCode link. */
  label: string;
};

const HEALCODE_SRC = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';

export default function MindbodyLoginWidget({ siteId, mbSiteId, innerText, label }: MindbodyLoginWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load HealCode script
    const existingScript = document.querySelector(`script[src="${HEALCODE_SRC}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = HEALCODE_SRC;
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = `
            <healcode-widget
                data-version="0.2"
                data-link-class="healcode-login-text-link"
                data-site-id="${siteId}"
                data-mb-site-id="${mbSiteId}"
                data-bw-identity-site="true"
                data-type="login-link"
                data-inner-html="${innerText}"
            ></healcode-widget>
        `;
  }, [siteId, mbSiteId, innerText]);

  return (
    <div className="relative w-full h-14 rounded-full bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-accent/25 cursor-pointer">
      {/* Visible button content */}
      <span className="absolute inset-0 flex items-center justify-center gap-3 text-accent-foreground font-semibold text-lg pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        {label}
      </span>
      {/* HealCode widget overlay - invisible but clickable */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center [&_a]:absolute [&_a]:inset-0 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:text-transparent [&_a]:no-underline"
      />
    </div>
  );
}
