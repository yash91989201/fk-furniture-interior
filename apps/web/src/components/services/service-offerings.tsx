import { Plus } from "lucide-react";

import { bandSrcSet } from "@/components/home/content";
import "@/styles/service-offerings.css";

import { bodyCopy, offerings, sectionFrame, sectionTitle } from "./content";

export function ServiceOfferings() {
	return (
		<section
			aria-labelledby="services-offerings-title"
			className={`${sectionFrame} bg-background`}
			id="fk-offerings"
		>
			<h2 className={sectionTitle} id="services-offerings-title">
				What we make
			</h2>
			<p className={`${bodyCopy} mt-[1.15rem] max-w-[52ch]`}>
				Each scope below is a possible starting point rather than a fixed
				catalogue. The final schedule of items follows the drawings, the BOQ and
				the approved samples for the project.
			</p>
			<div className="offerings-list">
				{offerings.map((offering, index) => (
					<details
						className="offerings-item"
						id={offering.anchor}
						key={offering.anchor}
						name="fk-offering"
						open={index === 0}
					>
						<summary className="offerings-summary">
							<h3 className="offerings-title">{offering.title}</h3>
							<span className="offerings-blurb">{offering.summary}</span>
							<span className="offerings-meta">
								<span className="offerings-count">
									{offering.scopes.length} scopes
								</span>
								<Plus
									aria-hidden="true"
									className="offerings-icon"
									strokeWidth={1.5}
								/>
							</span>
						</summary>
						<div className="offerings-panel">
							{offering.image ? (
								<figure className="offerings-figure">
									<img
										alt={offering.image.alt}
										decoding="async"
										height={1333}
										loading="lazy"
										sizes="(max-width: 63.99rem) 100vw, 40vw"
										src={offering.image.src}
										srcSet={bandSrcSet(offering.image.src)}
										width={2000}
									/>
									<figcaption>{offering.image.caption}</figcaption>
								</figure>
							) : (
								offering.note && (
									<aside className="offerings-note">
										<h4>{offering.note.title}</h4>
										<p>{offering.note.text}</p>
									</aside>
								)
							)}
							<div>
								<p className="offerings-lead">{offering.lead}</p>
								<ul className="offerings-scopes">
									{offering.scopes.map((scope) => (
										<li key={scope}>{scope}</li>
									))}
								</ul>
							</div>
						</div>
					</details>
				))}
			</div>
		</section>
	);
}
