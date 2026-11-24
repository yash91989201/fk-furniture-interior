import { Link } from "@tanstack/react-router";

import "@/styles/why-fk.css";

import { distinctions } from "./content";

export function WhyFk() {
	return (
		<section
			aria-labelledby="services-why-title"
			className="why-fk-section"
			id="fk-why"
		>
			<div className="why-fk-rail">
				<h2 className="why-fk-title" id="services-why-title">
					Why work with FK
				</h2>
				<p className="why-fk-intro">
					Forty years in hospitality interiors, and one team from specification
					to installation.
				</p>
				<Link className="why-fk-link" to="/about">
					Read the company story
				</Link>
			</div>
			<dl className="why-fk-list">
				{distinctions.map((distinction) => (
					<div className="why-fk-row" key={distinction.term}>
						<dt className="why-fk-term">{distinction.term}</dt>
						<dd className="why-fk-text">{distinction.text}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
