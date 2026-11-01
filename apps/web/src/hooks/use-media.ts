import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	// Start false so the client's first render matches the server; the effect
	// applies the real value immediately after hydration.
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		const onChange = () => {
			setMatches(media.matches);
		};
		onChange();
		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [query]);

	return matches;
}

export function usePrefersReducedMotion(): boolean {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}
