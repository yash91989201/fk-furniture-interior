import "@/styles/materials.css";

import { materials } from "./content";

export function MaterialsAndFinishes() {
	return (
		<section
			aria-labelledby="services-materials-title"
			className="materials-section"
			id="fk-materials"
		>
			<div className="materials-head">
				<h2 className="materials-title" id="services-materials-title">
					Materials we work in.
				</h2>
				<p className="materials-intro">
					We choose each material against your specification and budget, then
					confirm it in the BOQ.
				</p>
			</div>
			<dl className="materials-list">
				{materials.map((material) => (
					<div className="materials-row" key={material.term}>
						<dt className="materials-term">{material.term}</dt>
						<dd className="materials-detail">
							<p className="materials-options">{material.options}</p>
							<p className="materials-text">{material.text}</p>
						</dd>
					</div>
				))}
			</dl>
			<div className="materials-note">
				<p>
					Fire-retardant options are available on request for boards, laminates,
					foams and fabrics.
				</p>
				<p>
					Final material selection is confirmed in the approved specification
					and BOQ.
				</p>
			</div>
		</section>
	);
}
