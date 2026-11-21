import { ArrowUpRight } from "lucide-react";

import { CraftIllustration } from "./craft-illustration";
import "./craft.css";

export function Craft() {
	return (
		<section className="craft-section" id="fk-craft">
			<h2>Materials and finishing.</h2>
			<p className="craft-introduction">
				Commercial-grade BWP marine plywood, high-density HDHMR,
				moisture-resistant MDF, and kiln-seasoned teak, ash and oak. Timber is
				treated against termites and borers. Fire-retardant options are
				available on request for boards, laminates, foams and fabrics.
			</p>
			<div className="craft-preview-target">
				<CraftIllustration kind="interior" />
			</div>
			<div className="craft-section-footer">
				<ul>
					<li>Marine ply, HDHMR and MDF</li>
					<li>PU and veneer finishes</li>
					<li>Fire-retardant options on request</li>
					<li>Pan-India installation</li>
				</ul>
				<a href="#fk-enquiry">
					Ask about materials and finishes
					<ArrowUpRight aria-hidden="true" size={18} />
				</a>
			</div>
		</section>
	);
}
