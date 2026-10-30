import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { useEffect, useState } from "react";

const links = [
	{ href: "#fk-about", label: "About" },
	{ href: "#fk-services", label: "Services" },
	{ href: "#fk-projects", label: "Projects" },
	{ href: "#fk-enquiry", label: "Contact" },
] as const;

// Hide only after sustained scrolling; show again once scrolling settles.
const SCROLL_HIDE_DELAY_MS = 150;
const SCROLL_ACTIVE_MS = 40;
const SCROLL_IDLE_MS = 260;

export function SiteNav() {
	const [compact, setCompact] = useState(false);
	const [covered, setCovered] = useState(false);
	const [scrolling, setScrolling] = useState(false);
	const hidden = covered || scrolling;

	useEffect(() => {
		// Any .home-page [data-hide-nav] section hides this bar while it covers the
		// top edge or most of the viewport.
		const targets = document.querySelectorAll(".home-page [data-hide-nav]");
		let frame = 0;
		let hide = 0;
		let idle = 0;
		let lastEventAt = 0;
		const update = () => {
			frame = 0;
			setCompact(window.scrollY > 64);
			let nextCovered = false;
			const viewport = window.innerHeight;
			for (const target of targets) {
				const { top, bottom } = target.getBoundingClientRect();
				const visible = Math.min(bottom, viewport) - Math.max(top, 0);
				// Subpixel scroll positions can leave a section at a fraction above
				// zero; treat that as covering the top so the bar never overlaps it.
				if ((top <= 2 && bottom > 0) || visible > viewport * 0.5) {
					nextCovered = true;
					break;
				}
			}
			setCovered((current) =>
				current === nextCovered ? current : nextCovered
			);
		};
		const onScroll = () => {
			lastEventAt = performance.now();
			// Hide only once scrolling has actually lasted a moment, and only while
			// events keep arriving, so a single flick never flashes the bar away.
			if (!hide) {
				hide = window.setTimeout(() => {
					hide = 0;
					if (performance.now() - lastEventAt < SCROLL_ACTIVE_MS) {
						setScrolling(true);
					}
				}, SCROLL_HIDE_DELAY_MS);
			}
			clearTimeout(idle);
			idle = window.setTimeout(() => {
				clearTimeout(hide);
				hide = 0;
				setScrolling(false);
			}, SCROLL_IDLE_MS);
			if (!frame) {
				frame = requestAnimationFrame(update);
			}
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			clearTimeout(hide);
			clearTimeout(idle);
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, []);

	return (
		<div className="home-nav-slot">
			<header
				className={`home-nav${compact ? " is-compact" : ""}${hidden ? " is-hidden" : ""}`}
				inert={hidden}
			>
				<a className="home-brand" href="#fk-hero">
					FK / Logo placeholder
				</a>
				<nav aria-label="Primary" className="home-nav-links">
					{links.map((link) => (
						<a href={link.href} key={link.href}>
							{link.label}
						</a>
					))}
				</nav>
				<a
					className={buttonVariants({
						className: "home-nav-cta",
						size: compact ? "sm" : "default",
						variant: "secondary",
					})}
					href="#fk-enquiry"
				>
					Discuss your project
				</a>
				<details className="home-menu">
					<summary>Menu</summary>
					{links.map((link) => (
						<a href={link.href} key={`menu-${link.href}`}>
							{link.label}
						</a>
					))}
					<a href="#fk-enquiry">Discuss your project</a>
				</details>
			</header>
		</div>
	);
}
