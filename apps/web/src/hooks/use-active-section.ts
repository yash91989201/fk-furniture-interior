import { useEffect, useState } from "react";

// A section becomes current once its heading passes just under the compact nav.
const ACTIVE_LINE = 120;

// Picks the section a reader has scrolled into: the last one whose top has
// passed the sticky bar, with the final section winning at the page bottom.
export function useActiveSection(ids: readonly string[], offset = ACTIVE_LINE) {
	const [active, setActive] = useState<string | null>(ids[0] ?? null);

	useEffect(() => {
		let frame = 0;

		const measure = () => {
			frame = 0;
			let current: string | null = ids[0] ?? null;
			for (const id of ids) {
				const element = document.getElementById(id);
				if (element && element.getBoundingClientRect().top <= offset) {
					current = id;
				}
			}
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) {
				current = ids.at(-1) ?? current;
			}
			setActive((previous) => (previous === current ? previous : current));
		};

		const schedule = () => {
			if (frame === 0) {
				frame = requestAnimationFrame(measure);
			}
		};

		measure();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
		};
	}, [ids, offset]);

	return active;
}
