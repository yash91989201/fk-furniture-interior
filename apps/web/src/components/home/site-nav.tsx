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

	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			setCompact(window.scrollY > 64);
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
			<header className={compact ? "home-nav is-compact" : "home-nav"}>
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
