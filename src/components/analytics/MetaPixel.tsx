'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        fbq: (...args: unknown[]) => void;
        _fbq: unknown;
    }
}

export default function MetaPixel() {
    useEffect(() => {
        // Initialize Meta Pixel
        const fbq = function (...args: unknown[]) {
            if ((fbq as unknown as { callMethod?: (...args: unknown[]) => void }).callMethod) {
                (fbq as unknown as { callMethod: (...args: unknown[]) => void }).callMethod(...args);
            } else {
                (fbq as unknown as { queue: unknown[] }).queue.push(args);
            }
        };

        window.fbq = fbq;

        if (!window._fbq) {
            window._fbq = fbq;
        }

        (fbq as unknown as { push: typeof fbq }).push = fbq;
        (fbq as unknown as { loaded: boolean }).loaded = true;
        (fbq as unknown as { version: string }).version = '2.0';
        (fbq as unknown as { queue: unknown[] }).queue = [];

        // Load the Facebook pixel script
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        script.async = true;
        document.head.appendChild(script);

        // Initialize the pixel with your ID
        window.fbq('init', '1164915742135661');
        window.fbq('track', 'PageView');

        // Cleanup
        return () => {
            const existingScript = document.querySelector('script[src="https://connect.facebook.net/en_US/fbevents.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src="https://www.facebook.com/tr?id=1164915742135661&ev=PageView&noscript=1"
                alt=""
            />
        </noscript>
    );
}
