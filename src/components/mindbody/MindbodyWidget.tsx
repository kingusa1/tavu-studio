"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface MindbodyWidgetProps {
  widgetType?: string;
  widgetId: string;
}

const HEALCODE_SRC = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
const BRANDED_WEB_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

const MindbodyWidget = ({ widgetType = "Schedules", widgetId }: MindbodyWidgetProps) => {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const pathname = usePathname();
  const isHealCode = widgetType.toLowerCase() === "registrations";
  const scriptSrc = isHealCode ? HEALCODE_SRC : BRANDED_WEB_SRC;

  useEffect(() => {
    if (!widgetId) return;

    // Swallow non-fatal Mindbody JSON parse errors
    const handleGlobalError = (event: ErrorEvent) => {
      const msg = event.message || "";
      const file = event.filename || "";
      if (
        msg.includes("healcode") ||
        msg.includes("mindbody") ||
        msg.includes("is not valid JSON") ||
        file.includes("healcode") ||
        file.includes("mindbody")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("error", handleGlobalError);

    // Give the browser one paint cycle so the widget <div> / <healcode-widget>
    // rendered by React is actually committed before Mindbody's script scans.
    let script: HTMLScriptElement | null = null;
    const rafId = requestAnimationFrame(() => {
      // Remove any cached Mindbody script — cache-buster alone isn't enough
      // because the prior script's init state lingers on window.
      document
        .querySelectorAll(`script[src^="${scriptSrc}"]`)
        .forEach((el) => el.remove());

      script = document.createElement("script");
      script.src = `${scriptSrc}?v=${Date.now()}`;
      script.async = true;
      script.type = "text/javascript";
      script.onload = () => setStatus("ready");
      script.onerror = () => setStatus("error");
      document.body.appendChild(script);
    });

    // Safety fallback: hide the spinner even if onload never fires
    const readyFallback = setTimeout(() => setStatus("ready"), 4000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(readyFallback);
      window.removeEventListener("error", handleGlobalError);
      if (script) script.remove();
    };
    // pathname in deps forces a fresh script load on client-side navigation
  }, [widgetId, scriptSrc, pathname]);

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
  // Keyed on pathname + widgetId so React fully unmounts and remounts the
  // widget container whenever the user navigates between pages, preventing
  // stale widget state from carrying over.
  const reactKey = `${pathname}-${widgetId}`;

  return (
    <div
      role="region"
      aria-label={widgetTitle}
      className={`relative w-full min-h-[600px] flex justify-center bg-transparent overflow-hidden ${isHealCode ? "healcode-container" : ""}`}
    >
      {isHealCode ? (
        <div
          key={reactKey}
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: `<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="${widgetId}" data-widget-version="0"></healcode-widget>`,
          }}
        />
      ) : (
        <div
          key={reactKey}
          className="mindbody-widget w-full"
          data-widget-type={widgetType}
          data-widget-id={widgetId}
        />
      )}

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
