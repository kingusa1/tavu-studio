"use client";

import { useEffect, useRef } from "react";

interface HealCodePricingWidgetProps {
    /**
     * The service/product ID from Mindbody
     */
    serviceId: string;
    /**
     * Type of link: "pricing-link" for pricing options, "contract-link" for contracts
     */
    linkType: "pricing-link" | "contract-link";
    /**
     * Text to display on the button
     */
    buttonText?: string;
}

const HealCodePricingWidget = ({
    serviceId,
    linkType,
    buttonText = "Get Your Pass"
}: HealCodePricingWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load HealCode script only once globally
        const scriptSrc = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = scriptSrc;
            script.type = "text/javascript";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current || !serviceId) return;

        const linkClass = linkType === "contract-link"
            ? "healcode-contract-text-link"
            : "healcode-pricing-option-text-link";

        // Set the widget HTML
        containerRef.current.innerHTML = `
            <healcode-widget
                data-version="0.2"
                data-link-class="${linkClass}"
                data-site-id="130043"
                data-mb-site-id="5748977"
                data-bw-identity-site="true"
                data-type="${linkType}"
                data-service-id="${serviceId}"
                data-inner-html="${buttonText}"
            ></healcode-widget>
        `;
    }, [serviceId, linkType, buttonText]);

    return (
        <div className="relative w-full h-14 rounded-full bg-accent hover:bg-accent/90 transition-all cursor-pointer">
            {/* Visible button text */}
            <span className="absolute inset-0 flex items-center justify-center text-accent-foreground font-semibold text-lg pointer-events-none">
                {buttonText}
            </span>
            {/* HealCode widget overlay - invisible but clickable */}
            <div
                ref={containerRef}
                className="absolute inset-0 flex items-center justify-center [&_a]:absolute [&_a]:inset-0 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:text-transparent [&_a]:no-underline"
            />
        </div>
    );
};

export default HealCodePricingWidget;
