/** biome-ignore-all lint/performance/noJsxPropsBind: project index handlers close over selection */
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { type MouseEvent, useState } from "react";

import { projects } from "./content";

export function Projects() {
	const [current, setCurrent] = useState(0);
	const project = projects[current] ?? projects[0];

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
					<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
						{project.slug ? (
							<Link
								className={buttonVariants({ variant: "outline" })}
								params={{ slug: project.slug }}
								to="/projects/$slug"
							>
								View project
							</Link>
						) : (
							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/projects"
							>
								View projects
							</Link>
						)}
						<a
							className="inline-flex min-h-11 items-center text-[0.8125rem] underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							href="#fk-enquiry"
						>
							Discuss a similar project
						</a>
					</div>
				</div>
			</article>
			<span aria-live="polite" className="sr-only">
				Selected {project.type.toLowerCase()} project.
			</span>
		</section>
	);
}
