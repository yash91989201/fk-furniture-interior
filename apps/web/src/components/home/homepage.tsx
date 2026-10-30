/** biome-ignore-all lint/performance/noJsxPropsBind: homepage wires section callbacks */
import { useState } from "react";

import { About } from "./about";
import { Craft } from "./craft";
import { Enquiry } from "./enquiry";
import { Furniture } from "./furniture";
import { Hero } from "./hero";
import { Process } from "./process";
import { Projects } from "./projects";
import { Services } from "./services";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Testimonials } from "./testimonials";

export function Homepage() {
	const [presetCategory, setPresetCategory] = useState("");
	const [presetRequirement, setPresetRequirement] = useState("");

	function handleEnquire(category: string, requirement: string) {
		setPresetCategory(category);
		setPresetRequirement(requirement);
	}

	return (
		<div className="home-page">
			<a className="home-skip" href="#fk-projects">
				Skip to selected projects
			</a>
			<SiteNav />
			<main>
				<Hero />
				<Projects />
				<About />
				<Services />
				<Furniture onEnquire={handleEnquire} />
				<Craft />
				<Process />
				<Testimonials />
				<Enquiry
					key={`${presetCategory}-${presetRequirement}`}
					presetCategory={presetCategory}
					presetRequirement={presetRequirement}
				/>
			</main>
			<SiteFooter />
		</div>
	);
}
