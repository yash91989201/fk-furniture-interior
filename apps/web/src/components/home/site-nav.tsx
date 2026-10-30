import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { useEffect, useState } from "react";

const links = [
	{ href: "#fk-about", label: "About" },
	{ href: "#fk-services", label: "Services" },
	{ href: "#fk-projects", label: "Projects" },
	{ href: "#fk-enquiry", label: "Contact" },
] as const;

export function SiteNav() {
	const [compact, setCompact] = useState(false);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		// Any .home-page [data-hide-nav] section hides this bar while it covers the top of the viewport.
		const targets = document.querySelectorAll(".home-page [data-hide-nav]");
		let frame = 0;
		const update = () => {
			frame = 0;
			setCompact(window.scrollY > 64);
			let nextHidden = false;
			for (const target of targets) {
				const { top, bottom } = target.getBoundingClientRect();
				if (top <= 0 && bottom > 0) {
					nextHidden = true;
					break;
				}
			}
			setHidden((current) => (current === nextHidden ? current : nextHidden));
		};
		const onScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(update);
			}
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
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
