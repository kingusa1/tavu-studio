"use client";

import { useEffect, useRef, useState } from "react";

interface MindbodyWidgetProps {
  /**
   * The type of widget to display - "Schedules", "Appointments", "registrations"
   */
  widgetType?: string;
  /**
   * The specific Mindbody widget ID.
   */
  widgetId: string;
}

const MindbodyWidget = ({ widgetType = "Schedules", widgetId }: MindbodyWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine if this is a HealCode widget (registrations) or Branded Web widget
  const isHealCodeWidget = widgetType.toLowerCase() === "registrations";

  // Add global error handler for external script errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if error is related to Mindbody/HealCode widget
      if (
        event.message?.includes("is not valid JSON") ||
        event.message?.includes("healcode") ||
        event.message?.includes("mindbody") ||
        event.filename?.includes("healcode") ||
        event.filename?.includes("mindbody")
      ) {
        event.preventDefault();
        console.warn("Mindbody widget encountered an error:", event.message);
        setHasError(true);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  useEffect(() => {
    if (!widgetId) return;

    if (isHealCodeWidget) {
      // HealCode widget for registrations
      const healcodeScriptSrc = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
      const existingScript = document.querySelector(`script[src="${healcodeScriptSrc}"]`);

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = healcodeScriptSrc;
        script.type = "text/javascript";
        script.async = true;

        script.onload = () => {
          setScriptLoaded(true);
        };

        script.onerror = () => {
          console.error("Failed to load HealCode widget script.");
          setHasError(true);
        };

        document.body.appendChild(script);
      } else {
        setScriptLoaded(true);
      }
    } else {
      // Branded Web widget for Schedules/Appointments
      const brandedWebScriptSrc = "https://brandedweb.mindbodyonline.com/embed/widget.js";
      const existingScript = document.querySelector(`script[src="${brandedWebScriptSrc}"]`);

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = brandedWebScriptSrc;
        script.async = true;

        script.onload = () => {
          setScriptLoaded(true);
        };

        script.onerror = () => {
          console.error("Failed to load Mindbody Branded Web widget script.");
          setHasError(true);
        };

        document.body.appendChild(script);
      } else {
        setScriptLoaded(true);
      }
    }
  }, [widgetId, isHealCodeWidget]);

  // For HealCode widgets, inject the HTML after script loads
  useEffect(() => {
    if (isHealCodeWidget && containerRef.current && widgetId) {
      // Use innerHTML to ensure proper HTML element creation for the custom element
      containerRef.current.innerHTML = `
        <healcode-widget
          data-type="registrations"
          data-widget-partner="object"
          data-widget-id="${widgetId}"
          data-widget-version="0"
        ></healcode-widget>
      `;
    }
  }, [isHealCodeWidget, widgetId, scriptLoaded]);

  if (!widgetId) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
        <h3 className="text-xl font-headline mb-4 opacity-80">Mindbody {widgetType} Widget</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          A Widget ID is required to display this component. Please provide the ID from your Mindbody Branded Web Manager.
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Registration Temporarily Unavailable
        </h3>
        <p className="text-gray-600 text-sm max-w-sm mb-6">
          We're having trouble loading the registration form. Please try again or contact us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="https://wa.me/971522755551"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Render HealCode widget for registrations - use div that will be populated via innerHTML
  if (isHealCodeWidget) {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-[600px] flex justify-center bg-transparent overflow-hidden healcode-container"
      />
    );
  }

  // Render Branded Web widget for Schedules/Appointments
  return (
    <div ref={containerRef} className="w-full min-h-[600px] flex justify-center bg-transparent overflow-hidden">
      <div
        className="mindbody-widget w-full"
        data-widget-type={widgetType}
        data-widget-id={widgetId}
      ></div>
    </div>
  );
};

export default MindbodyWidget;
