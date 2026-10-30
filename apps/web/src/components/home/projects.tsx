/** biome-ignore-all lint/performance/noJsxPropsBind: project index handlers close over selection */
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { type MouseEvent, useRef, useState } from "react";

import { projects } from "./content";
import { usePrefersReducedMotion } from "./use-media";

export function Projects() {
	const reduced = usePrefersReducedMotion();
	const [current, setCurrent] = useState(0);
	const previewRef = useRef<HTMLDivElement>(null);
	const project = projects[current];

	function select(index: number) {
		if (index === current) {
			return;
		}
		setCurrent(index);
		const preview = previewRef.current;
		if (!(preview && reduced)) {
			preview?.animate(
				[
					{ clipPath: "inset(0 100% 0 0)", filter: "blur(4px)" },
					{ clipPath: "inset(0 0 0 0)", filter: "blur(0)" },
				],
				{ duration: 550, easing: "cubic-bezier(.16,1,.3,1)" }
			);
		}
	}

	function handleProjectClick(event: MouseEvent<HTMLButtonElement>) {
		select(Number(event.currentTarget.dataset.project));
	}

	return (
		<section className="home-section home-projects" id="fk-projects">
			<div className="home-section-head">
				<h2>Selected projects</h2>
				<span className="home-kicker-link">All projects →</span>
			</div>
			<div className="home-project-browser">
				<article
					aria-label="Selected project preview"
					className="home-project-feature"
				>
					<div className="home-project-preview" ref={previewRef}>
						<img
							alt={project.image.alt}
							className="home-photo"
							decoding="async"
							height={1333}
							src={project.image.src}
							width={2000}
						/>
					</div>
					<h3>{project.name}</h3>
					<p className="home-muted">
						{project.location} · {project.type}
					</p>
					<details>
						<summary>Explore case-study preview</summary>
						<p>{project.scope}</p>
						<p className="home-muted">
							[Case-study destination will be connected to the project detail
							template.]
						</p>
						<a
							className={buttonVariants({ variant: "outline" })}
							href="#fk-enquiry"
						>
							Discuss a similar project
						</a>
					</details>
					<span aria-live="polite" className="sr-only">
						Selected {project.type.toLowerCase()} project.
					</span>
				</article>
				<div>
					<nav aria-label="Select a project" className="home-project-index">
						{projects.map((item, index) => (
							<button
								aria-controls="fk-projects"
								aria-pressed={index === current}
								data-project={String(index)}
								key={item.id}
								onClick={handleProjectClick}
								type="button"
							>
								<span>
									<strong>{item.type}</strong>
									<small>
										{item.name} · {item.location}
									</small>
								</span>
								<span className="home-project-mark">View</span>
							</button>
						))}
					</nav>
					<p className="home-project-note">
						Choose a project to see its image and scope.
					</p>
				</div>
			</div>
		</section>
	);
}
