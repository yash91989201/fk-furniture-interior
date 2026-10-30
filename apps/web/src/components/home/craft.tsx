import { ArrowUpRight } from "lucide-react";

import { CraftIllustration } from "./craft-illustration";
import "./craft.css";

export function Craft() {
	return (
		<section className="craft-section" id="fk-craft">
			<h2>Considered in every detail.</h2>
			<p className="craft-introduction">
				Materials, finishes and craftsmanship come together to shape the
				finished space.
			</p>
			<div className="craft-preview-target">
				<CraftIllustration kind="interior" />
			</div>
			<div className="craft-section-footer">
				<ul>
					<li>Material options</li>
					<li>Custom finishes</li>
					<li>Quality checks</li>
					<li>Installation support</li>
				</ul>
				<a href="#fk-enquiry">
					Discuss a custom requirement
					<ArrowUpRight aria-hidden="true" size={18} />
				</a>
			</div>
		</section>
	);
}
