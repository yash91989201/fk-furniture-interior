/** biome-ignore-all lint/performance/noJsxPropsBind: homepage wires section callbacks */
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
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
import { usePrefersReducedMotion } from "./use-media";

const SCROLL_OPTIONS = {
	allowNestedScroll: true,
	anchors: true,
	autoRaf: true,
	lerp: 0.1,
	syncTouch: false,
	wheelMultiplier: 0.75,
};

export function Homepage() {
	const reduced = usePrefersReducedMotion();
	const [presetCategory, setPresetCategory] = useState("");
	const [presetRequirement, setPresetRequirement] = useState("");

	function handleEnquire(category: string, requirement: string) {
		setPresetCategory(category);
		setPresetRequirement(requirement);
	}

	return (
		<div className="home-page">
			{reduced ? null : <ReactLenis options={SCROLL_OPTIONS} root />}
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
