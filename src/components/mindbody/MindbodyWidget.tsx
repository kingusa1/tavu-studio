"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface MindbodyWidgetProps {
  widgetType?: string;
  widgetId: string;
}

const HEALCODE_SRC = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
const BRANDED_WEB_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

const MindbodyWidget = ({ widgetType = "Schedules", widgetId }: MindbodyWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const isHealCode = widgetType.toLowerCase() === "registrations";
  const scriptSrc = isHealCode ? HEALCODE_SRC : BRANDED_WEB_SRC;

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      const msg = event.message || "";
      const file = event.filename || "";
      if (
        msg.includes("healcode") ||
        msg.includes("mindbody") ||
        file.includes("healcode") ||
        file.includes("mindbody")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("error", handleGlobalError);

    // If script was already loaded on a previous page, it won't auto-scan our new div.
    // Remove the cached script so next/script reloads it, which triggers a fresh DOM scan.
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing && existing.getAttribute("data-rescan-done") === "true") {
      existing.remove();
    }

    const readyTimer = setTimeout(() => setStatus("ready"), 1500);

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener("error", handleGlobalError);
    };
  }, [scriptSrc]);

  if (!widgetId) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
        <h3 className="text-xl font-headline mb-4 opacity-80">Mindbody {widgetType} Widget</h3>
        <p className="text-muted-foreground text-sm max-w-sm">A Widget ID is required.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Booking Temporarily Unavailable</h3>
        <p className="text-gray-600 text-sm max-w-sm mb-6">
          We&apos;re having trouble loading the booking widget. Please try again or contact us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            aria-label="Reload page"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="https://wa.me/971522755551"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact TAVÚ on WhatsApp"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-50 transition-colors"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const widgetTitle = `Mindbody ${widgetType} booking widget`;

  return (
    <div
      role="region"
      aria-label={widgetTitle}
      className={`relative w-full min-h-[600px] flex justify-center bg-transparent overflow-hidden ${isHealCode ? "healcode-container" : ""}`}
      ref={containerRef}
    >
      {isHealCode ? (
        // HealCode custom element — the script upgrades this tag into the widget
        <div
          dangerouslySetInnerHTML={{
            __html: `<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="${widgetId}" data-widget-version="0"></healcode-widget>`,
          }}
          className="w-full"
        />
      ) : (
        // Branded Web widget — the script scans the DOM for this div
        <div
          className="mindbody-widget w-full"
          data-widget-type={widgetType}
          data-widget-id={widgetId}
        />
      )}

      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        onLoad={() => {
          const el = document.querySelector(`script[src="${scriptSrc}"]`);
          if (el) el.setAttribute("data-rescan-done", "true");
          setStatus("ready");
        }}
        onError={() => setStatus("error")}
      />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 text-foreground/40">
            <div
              className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"
              role="status"
              aria-label="Loading booking widget"
            />
            <span className="text-sm">Loading booking widget…</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindbodyWidget;
