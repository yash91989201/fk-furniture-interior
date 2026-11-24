import "@/styles/purpose.css";

import { values } from "./content";

export function Purpose() {
	return (
		<section
			aria-labelledby="about-purpose-title"
			className="purpose-section"
			id="fk-purpose"
		>
			<div className="purpose-rail">
				<h2 className="purpose-title" id="about-purpose-title">
					What we are working towards.
				</h2>
				<div className="purpose-vision">
					<h3 className="purpose-label">Vision</h3>
					<p className="purpose-vision-text">
						A fit-out partner that hotels, resorts, designers and homeowners
						return to, project after project.
					</p>
				</div>
			</div>
			<div>
				<p className="purpose-statement">
					To turn a client’s design intent into furniture that <em>lasts</em>,
					made in our own factory to the specification signed off.
				</p>
				<h3 className="purpose-label purpose-values-label">How we work</h3>
				<ul className="purpose-values">
					{values.map((value) => (
						<li key={value.label}>
							<p className="purpose-value-label">{value.label}</p>
							<p className="purpose-value-text">{value.text}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
