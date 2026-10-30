import { AboutDrawing } from "./about-drawing";

export function About() {
	return (
		<section className="home-section home-about about-quiet" id="fk-about">
			<div aria-hidden="true" className="home-about-backdrop">
				<AboutDrawing />
			</div>
			<div className="about-quiet-inner">
				<h2>
					From the first idea{" "}
					<span className="home-about-heading-end">
						to the <em>final detail.</em>
					</span>
				</h2>
				<p className="home-about-intro">
					FK Furniture & Interior is a Gurgaon-based interior design and bespoke
					furniture business with its own manufacturing setup. Work runs from
					listening and design through making, finishing and installation, for
					homes, workplaces and hospitality spaces.
				</p>
				<p className="home-about-history">
					The family craft began in Gurgaon in 1986; offices are in Gurgaon and
					Goa.
				</p>
				<a className="home-kicker-link" href="#fk-enquiry">
					About FK →
				</a>
			</div>
		</section>
	);
}
