import { ArrowUpRight } from "lucide-react";

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

export function SiteFooter() {
	return (
		<footer className="home-footer">
			<div aria-hidden="true" className="home-footer-backdrop">
				<FooterDrawing />
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
