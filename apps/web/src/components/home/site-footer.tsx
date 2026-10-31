import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { projects } from "./content";
import { FooterDrawing } from "./footer-drawing";

const [leadProject] = projects;

const exploreLinks = [
	{ href: "#fk-hero", label: "Home" },
	{ href: "#fk-about", label: "About" },
	{ href: "#fk-services", label: "Services" },
	{ href: "#fk-projects", label: "Projects" },
	{ href: "#fk-craft", label: "Gallery" },
	{ href: "#fk-enquiry", label: "Contact" },
] as const;

// Drafting reveals nudge within these bounds; anything larger stops reading as a plan on a table.
const PARALLAX_PX = 4;
const DAMPING_MS = 120;
const GOLD_BOOST = 1.6;
const COURTYARD = { x: 982, y: 546, width: 1440, height: 960, radius: 120 };

export function SiteFooter() {
	const footerRef = useRef<HTMLElement>(null);
	const planRef = useRef<HTMLDivElement>(null);
	const crosshairRef = useRef<HTMLDivElement>(null);
	const coordsRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const footer = footerRef.current;
		const plan = planRef.current;
		const crosshair = crosshairRef.current;
		const coords = coordsRef.current;
		if (!(footer && plan && crosshair && coords)) {
			return;
		}

		const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
		const still = window.matchMedia("(prefers-reduced-motion: reduce)");
		const gold = [...footer.querySelectorAll(".home-footer-gold > *")].flatMap(
			(node) => node.getAnimations()
		);

		let frame = 0;
		let last = 0;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;

		const pad = (value: number) => String(Math.round(value)).padStart(3, "0");

		const stop = () => {
			if (frame !== 0) {
				cancelAnimationFrame(frame);
			}
			frame = 0;
			last = 0;
		};

		const settle = () => {
			currentX = 0;
			currentY = 0;
			plan.style.transform = "";
		};

		const step = (time: number) => {
			const delta = last === 0 ? 16 : Math.min(time - last, 64);
			last = time;
			const k = 1 - Math.exp(-delta / DAMPING_MS);
			currentX += (targetX - currentX) * k;
			currentY += (targetY - currentY) * k;
			const settled =
				Math.abs(targetX - currentX) < 0.002 &&
				Math.abs(targetY - currentY) < 0.002;
			if (settled) {
				stop();
				// Hold the resting pose while the pointer is inside; only a leave returns to zero.
				if (targetX === 0 && targetY === 0) {
					settle();
					return;
				}
				currentX = targetX;
				currentY = targetY;
			}
			plan.style.transform = `translate3d(${(currentX * PARALLAX_PX).toFixed(2)}px, ${(currentY * PARALLAX_PX).toFixed(2)}px, 0)`;
			if (settled) {
				return;
			}
			frame = requestAnimationFrame(step);
		};

		const wake = () => {
			if (frame === 0) {
				last = 0;
				frame = requestAnimationFrame(step);
			}
		};

		const handleMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") {
				return;
			}
			const rect = footer.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			targetX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
			targetY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));
			crosshair.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			crosshair.style.opacity = "1";
			coords.textContent = `X ${pad((x / rect.width) * 1000)} · Y ${pad((y / rect.height) * 1000)}`;

			const planRect = plan.getBoundingClientRect();
			const courtyardX =
				planRect.left + (COURTYARD.x / COURTYARD.width) * planRect.width;
			const courtyardY =
				planRect.top + (COURTYARD.y / COURTYARD.height) * planRect.height;
			const near =
				Math.hypot(event.clientX - courtyardX, event.clientY - courtyardY) <
				COURTYARD.radius;
			for (const animation of gold) {
				animation.playbackRate = near ? GOLD_BOOST : 1;
			}
			wake();
		};

		const handleLeave = () => {
			targetX = 0;
			targetY = 0;
			crosshair.style.opacity = "0";
			for (const animation of gold) {
				animation.playbackRate = 1;
			}
			wake();
		};

		const disable = () => {
			footer.removeEventListener("pointermove", handleMove);
			footer.removeEventListener("pointerleave", handleLeave);
			stop();
			targetX = 0;
			targetY = 0;
			crosshair.style.opacity = "0";
			for (const animation of gold) {
				animation.playbackRate = 1;
			}
			settle();
		};

		const enable = () => {
			footer.addEventListener("pointermove", handleMove);
			footer.addEventListener("pointerleave", handleLeave);
		};

		const sync = () => {
			if (fine.matches && !still.matches) {
				enable();
				return;
			}
			disable();
		};

		sync();
		fine.addEventListener("change", sync);
		still.addEventListener("change", sync);

		return () => {
			fine.removeEventListener("change", sync);
			still.removeEventListener("change", sync);
			disable();
		};
	}, []);

	return (
		<footer className="home-footer" ref={footerRef}>
			<div aria-hidden="true" className="home-footer-backdrop">
				<div className="home-footer-plan" ref={planRef}>
					<FooterDrawing />
				</div>
			</div>
			<div
				aria-hidden="true"
				className="home-footer-crosshair"
				ref={crosshairRef}
			>
				<span className="home-footer-coords" ref={coordsRef}>
					X 000 · Y 000
				</span>
			</div>
			<div className="home-footer-proof">
				<div className="home-footer-identity">
					<p className="home-footer-wordmark">FK Furniture & Interior</p>
					<p className="home-footer-blurb">
						Interior design, bespoke furniture and turnkey execution from design
						through installation.
					</p>
					<p className="home-footer-note">[Final logo placeholder]</p>
				</div>
				<a className="home-footer-proof-copy" href="#fk-projects">
					<div className="home-footer-proof-head">
						<h2 className="home-footer-proof-title">{leadProject.name}</h2>
						<span className="home-footer-place">
							{leadProject.location} · {leadProject.type}
						</span>
					</div>
					<span className="home-footer-scope">{leadProject.scope}</span>
				</a>
			</div>
			<div className="home-footer-grid">
				<nav aria-labelledby="footer-explore">
					<p className="home-footer-label" id="footer-explore">
						Explore
					</p>
					<ul className="home-footer-links">
						{exploreLinks.map((link) => (
							<li key={link.href}>
								<a href={link.href}>{link.label}</a>
							</li>
						))}
					</ul>
				</nav>
				<div>
					<p className="home-footer-label" id="footer-contact">
						Contact
					</p>
					<ul aria-labelledby="footer-contact" className="home-footer-facts">
						<li>Gurgaon office</li>
						<li>Goa office</li>
						<li>[Phone]</li>
						<li>[Email]</li>
						<li>[Company profile / catalogue]</li>
					</ul>
					<a className="home-footer-action" href="#fk-enquiry">
						Discuss your project
						<ArrowUpRight aria-hidden="true" size={18} />
					</a>
				</div>
				<div>
					<p className="home-footer-label" id="footer-socials">
						Socials
					</p>
					<p className="home-footer-note">[Social links]</p>
				</div>
			</div>
			<div className="home-legal">
				<span>[Copyright]</span>
				<span>Privacy policy</span>
				<span>Terms & conditions</span>
			</div>
		</footer>
	);
}
