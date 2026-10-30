/** biome-ignore-all lint/performance/noJsxPropsBind: project index handlers close over selection */
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { type MouseEvent, useState } from "react";

import { projects } from "./content";

export function Projects() {
	const [current, setCurrent] = useState(0);
	const project = projects[current];

	function select(index: number) {
		if (index === current) {
			return;
		}
		setCurrent(index);
	}

	function handleProjectClick(event: MouseEvent<HTMLButtonElement>) {
		select(Number(event.currentTarget.dataset.project));
	}

	return (
		<section className="home-section home-projects-mosaic" id="fk-projects">
			<div className="home-mosaic-head">
				<h2>Selected projects</h2>
				<span className="home-kicker-link">All projects →</span>
			</div>
			<nav aria-label="Select a project" className="home-mosaic-mosaic">
				{projects.map((item, index) => (
					<button
						aria-pressed={index === current}
						data-project={String(index)}
						key={item.id}
						onClick={handleProjectClick}
						type="button"
					>
						<span className="home-mosaic-media">
							<img
								alt=""
								height={400}
								loading="lazy"
								src={item.image.src}
								width={600}
							/>
						</span>
						<span>
							<strong className="home-mosaic-name">{item.name}</strong>
							<small className="home-mosaic-label">
								{item.location} · {item.type}
							</small>
						</span>
					</button>
				))}
			</nav>
			<article
				aria-label="Selected project preview"
				className="home-mosaic-caption"
			>
				<div>
					<h3 className="home-mosaic-title">{project.name}</h3>
					<p className="home-mosaic-meta">
						{project.location} · {project.type}
					</p>
				</div>
				<div className="home-mosaic-copy">
					<p>{project.scope}</p>
					<p className="home-mosaic-placeholder">
						[Case-study destination will be connected to the project detail
						template.]
					</p>
					<a
						className={buttonVariants({ variant: "outline" })}
						href="#fk-enquiry"
					>
						Discuss a similar project
					</a>
				</div>
			</article>
			<span aria-live="polite" className="sr-only">
				Selected {project.type.toLowerCase()} project.
			</span>
		</section>
	);
}
