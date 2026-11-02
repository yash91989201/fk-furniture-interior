import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
	{ hash: undefined, label: "About", to: "/about" },
	{ hash: undefined, label: "Services", to: "/services" },
	{ hash: undefined, label: "Projects", to: "/projects" },
	{ hash: undefined, label: "Gallery", to: "/gallery" },
	{ hash: undefined, label: "FAQ", to: "/faq" },
	{ hash: undefined, label: "Contact", to: "/contact" },
] as const;

// Ticker lines stay inside the company profile's record: the 1986 family craft
// start, in-house manufacturing, and turnkey design-to-installation scope.
const slogans = [
	"Designing Spaces, Creating Life.",
	"Drawn by us, built by us.",
	"Made to measure, made in house.",
	"One team, from drawing to installation.",
	"Craft in the family since 1986.",
] as const;

// Hide only after sustained scrolling; show again once scrolling settles.
const SCROLL_HIDE_DELAY_MS = 150;
const SCROLL_ACTIVE_MS = 40;
const SCROLL_IDLE_MS = 260;

export function SiteNav({ compactStart = false }: { compactStart?: boolean }) {
	const [compact, setCompact] = useState(compactStart);
	const [covered, setCovered] = useState(false);
	// Pages without a full-bleed hero start past it so the ticker stays closed.
	const [pastHero, setPastHero] = useState(compactStart);
	const [scrolling, setScrolling] = useState(false);
	const menuRef = useRef<HTMLDetailsElement>(null);
	const hidden = covered || scrolling;
	const closeMenu = useCallback(() => {
		menuRef.current?.removeAttribute("open");
	}, []);

	useEffect(() => {
		// Any .home-page [data-hide-nav] section hides this bar while it covers the
		// top edge or most of the viewport.
		const targets = document.querySelectorAll(".home-page [data-hide-nav]");
		const hero = document.querySelector(".home-hero");
		const menu = document.querySelector(".home-menu");
		let frame = 0;
		let hide = 0;
		let idle = 0;
		let lastEventAt = 0;
		const update = () => {
			frame = 0;
			setCompact(compactStart || window.scrollY > 64);
			if (hero) {
				const past = hero.getBoundingClientRect().bottom <= 0;
				setPastHero((current) => (current === past ? current : past));
			}
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
		// In-page jumps land on a hash; close the mobile menu with them.
		const onHashChange = () => menu?.removeAttribute("open");
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("hashchange", onHashChange);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("hashchange", onHashChange);
			clearTimeout(hide);
			clearTimeout(idle);
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, [compactStart]);

	return (
		<div className="home-nav-slot">
			<header
				className={[
					"home-nav",
					compact && "is-compact",
					pastHero && "is-past-hero",
					hidden && "is-hidden",
				]
					.filter(Boolean)
					.join(" ")}
				inert={hidden}
			>
				<div aria-hidden="true" className="home-nav-ticker">
					<div className="home-nav-track">
						{[0, 1].map((group) => (
							<div className="home-nav-group" key={group}>
								{[0, 1].map((copy) =>
									slogans.map((slogan) => (
										<span key={`${copy}-${slogan}`}>{slogan}</span>
									))
								)}
							</div>
						))}
					</div>
				</div>
				<div className="home-nav-row">
					<nav aria-label="Primary" className="home-nav-links">
						{links.map((link) => (
							<Link
								activeProps={{ "aria-current": "page" }}
								className="aria-[current=page]:underline aria-[current=page]:underline-offset-[0.35em]"
								hash={link.hash}
								key={`nav-${link.label}`}
								onClick={closeMenu}
								to={link.to}
							>
								{link.label}
							</Link>
						))}
					</nav>
					<Link className="home-brand" to="/">
						<span className="home-brand-mark">FK</span>
						<span className="home-brand-name">Furniture &amp; Interior</span>
					</Link>
					<Link className="home-nav-cta" to="/contact">
						Discuss your project
						<ArrowUpRight aria-hidden="true" size={15} />
					</Link>
					<details className="home-menu" ref={menuRef}>
						<summary>
							<svg
								aria-hidden="true"
								className="home-menu-arrow"
								viewBox="0 0 12 12"
							>
								<path d="M3.4 1.9 10.1 5.4a.7.7 0 0 1 0 1.2L3.4 10.1a.7.7 0 0 1-1-.6V2.5a.7.7 0 0 1 1-.6Z" />
							</svg>
							Menu
						</summary>
						<div className="home-menu-panel">
							{links.map((link) => (
								<Link
									hash={link.hash}
									key={`menu-${link.label}`}
									onClick={closeMenu}
									to={link.to}
								>
									{link.label}
								</Link>
							))}
							<Link
								className="home-nav-cta home-menu-cta"
								onClick={closeMenu}
								to="/contact"
							>
								Discuss your project
								<ArrowUpRight aria-hidden="true" size={15} />
							</Link>
						</div>
					</details>
				</div>
			</header>
		</div>
	);
}
