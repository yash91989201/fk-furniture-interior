import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import "@/styles/project-list.css";

import { categoryLabel, projects } from "./content";

export function ProjectGrid() {
	return (
		<section
			aria-labelledby="project-list-title"
			className="project-list-section"
			id="project-list"
		>
			<h2 className="project-list-title" id="project-list-title">
				Featured project
			</h2>
			<ul className="project-list">
				{projects.map((project) => (
					<li key={project.slug}>
						<Link
							className="project-list-link"
							params={{ slug: project.slug }}
							to="/projects/$slug/"
						>
							<div className="project-list-copy">
								<h3 className="project-list-name">{project.name}</h3>
								<dl className="project-list-meta">
									<div>
										<dt>Type</dt>
										<dd>{categoryLabel(project.category)}</dd>
									</div>
									<div>
										<dt>Location</dt>
										<dd>{project.location}</dd>
									</div>
								</dl>
								<span className="project-list-summary">{project.summary}</span>
								<span className="project-list-cta">
									View project
									<ArrowUpRight aria-hidden="true" size={14} />
								</span>
							</div>
							<div className="project-list-media">
								<img
									alt={project.image.alt}
									decoding="async"
									fetchPriority="low"
									height={project.image.height}
									loading="lazy"
									sizes="(max-width: 63.99rem) 100vw, 58vw"
									src={project.image.src}
									srcSet={project.image.srcSet}
									width={project.image.width}
								/>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
