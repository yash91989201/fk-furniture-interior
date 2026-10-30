export function SiteFooter() {
	return (
		<footer className="home-footer">
			<p className="home-footer-wordmark">FK Furniture & Interior</p>
			<div className="home-footer-grid">
				<div>
					<p>[Final logo placeholder]</p>
					<p className="home-muted">
						Interior design, bespoke furniture and turnkey execution from design
						through installation.
					</p>
					<p className="home-muted">[Social links]</p>
				</div>
				<div>
					<p>Explore</p>
					<p className="home-muted">
						<a href="#fk-hero">Home</a>
						{" · "}
						<a href="#fk-about">About</a>
						{" · "}
						<a href="#fk-services">Services</a>
						<br />
						<a href="#fk-projects">Projects</a>
						{" · "}
						<a href="#fk-craft">Gallery</a>
						{" · "}
						<a href="#fk-enquiry">Contact</a>
						{" · "}
						FAQ
					</p>
				</div>
				<div>
					<p>Contact & downloads</p>
					<p className="home-muted">
						Gurgaon and Goa offices
						<br />
						[Phone / email]
						<br />
						[Company profile / catalogue]
					</p>
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
