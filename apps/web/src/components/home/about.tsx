import { photos } from "./content";

export function About() {
	return (
		<section className="home-section" id="fk-about">
			<div className="home-about-grid">
				<div className="home-photo-frame">
					<img
						alt={photos.building.alt}
						className="home-photo"
						decoding="async"
						height={896}
						src={photos.building.src}
						width={1600}
					/>
				</div>
				<div>
					<h2>From the first idea to the final detail.</h2>
					<p>
						FK Furniture & Interior is a Gurgaon-based interior design and
						bespoke furniture business with its own manufacturing setup. Work
						runs from listening and design through making, finishing and
						installation, for homes, workplaces and hospitality spaces. The
						family craft began in Gurgaon in 1986; offices are in Gurgaon and
						Goa.
					</p>
					<a className="home-kicker-link" href="#fk-enquiry">
						About FK →
					</a>
				</div>
			</div>
			<div className="home-trust">
				<div>
					<p>[Experience fact]</p>
					<span>Client confirmation needed</span>
				</div>
				<div>
					<p>[Manufacturing capability]</p>
					<span>Client confirmation needed</span>
				</div>
				<div>
					<p>[Locations / delivery reach]</p>
					<span>Client confirmation needed</span>
				</div>
			</div>
		</section>
	);
}
