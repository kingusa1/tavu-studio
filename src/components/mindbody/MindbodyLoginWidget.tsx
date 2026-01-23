"use client";

import { useEffect, useRef } from "react";

interface MindbodyLoginWidgetProps {
    /**
     * The specific Mindbody widget ID for login.
     */
    widgetId: string;
    /**
     * Whether to show signup instead of login
     */
    isSignup?: boolean;
}

const MindbodyLoginWidget = ({ widgetId, isSignup = false }: MindbodyLoginWidgetProps) => {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (!widgetId || scriptLoaded.current) return;

        // Load Mindbody widget script
        const script = document.createElement("script");
        script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js";
        script.async = true;

        script.onload = () => {
            scriptLoaded.current = true;
        };

        script.onerror = () => {
            console.error("Failed to load Mindbody widget script.");
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                // Optionally remove script on unmount
            }
        };
    }, [widgetId]);

    if (!widgetId) {
        return (
            <div className="w-full min-h-[300px] flex flex-col justify-center items-center bg-muted/30 backdrop-blur-sm rounded-xl border border-accent/10 p-8 text-center">
                <h3 className="text-xl font-headline mb-4 text-primary">
                    {isSignup ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                    A Widget ID is required. Please configure your Mindbody Branded Web Manager.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[400px] flex justify-center bg-transparent overflow-hidden">
            <div
                className="mindbody-widget w-full"
                data-widget-type={isSignup ? "Signup" : "Login"}
                data-widget-id={widgetId}
            ></div>
        </div>
    );
};

export default MindbodyLoginWidget;
