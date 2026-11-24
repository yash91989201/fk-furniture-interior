import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";

import { bandSrcSet, projects } from "./content";

export function Projects() {
	const [project] = projects;

	return (
		<section className="home-section home-projects-cinema" id="fk-projects">
			<div className="home-cinema-cover">
				<img
					alt={`${project.name}, ${project.location}`}
					className="home-cinema-img"
					fetchPriority="low"
					height={1333}
					loading="lazy"
					sizes="100vw"
					src={project.image.src}
					srcSet={bandSrcSet(project.image.src)}
					width={2000}
				/>
				<div className="home-cinema-caption">
					<h2>Selected project</h2>
					<h3 className="home-cinema-title">{project.name}</h3>
					<p className="home-cinema-meta">
						{project.location} · {project.type}
					</p>
				</div>
			</div>
			<div className="home-cinema-foot">
				<p className="home-cinema-scope">{project.scope}</p>
				<div className="home-cinema-actions">
					<Link
						className={buttonVariants()}
						params={{ slug: project.slug }}
						to="/projects/$slug/"
					>
						View project
					</Link>
					<a className="home-cinema-alt" href="#fk-enquiry">
						Discuss a similar project
					</a>
				</div>
			</div>
			<span aria-live="polite" className="sr-only">
				Selected {project.type.toLowerCase()} project.
			</span>
		</section>
	);
}
