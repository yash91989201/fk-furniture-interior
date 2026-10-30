/* impeccable-live-tanstack-start */
import { useEffect } from 'react';

const LIVE_SRC = 'http://localhost:8400/live.js?token=d3d61d3b-1247-41e3-ace4-f7f8a62b6884';
const LIVE_SELECTOR = 'script[data-impeccable-live-tanstack]';

// Dev-only mount for Impeccable Live. TanStack Start server-renders the root
// document, so this appends the live-mode bundle from the client after
// hydration (mirrors the Nuxt/SvelteKit adapters). Renders nothing on the
// server, so there is no hydration mismatch.
export default function ImpeccableLiveRoot() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const expected = new URL(LIVE_SRC, window.location.href).href;
    let script = document.querySelector(LIVE_SELECTOR);
    if (script && script.src === expected) return;
    if (script) script.remove();

    script = document.createElement('script');
    script.src = LIVE_SRC;
    script.async = true;
    script.setAttribute('data-impeccable-live-tanstack', '');
    script.setAttribute('data-impeccable-live-script', 'true');
    document.head.appendChild(script);

    return () => {
      if (script && script.isConnected) script.remove();
    };
  }, []);

  return null;
}
