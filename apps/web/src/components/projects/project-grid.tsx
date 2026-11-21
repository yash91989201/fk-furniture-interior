import { projects, projectsSection, projectsTitle } from "./content";
import { ProjectCard } from "./project-card";

export function ProjectGrid() {
	return (
		<section
			aria-labelledby="project-list-title"
			className={`${projectsSection} bg-background`}
			id="project-list"
		>
			<div className="flex flex-col gap-3 border-border border-b pb-[1.25rem] sm:flex-row sm:items-end sm:justify-between">
				<h2 className={projectsTitle} id="project-list-title">
					Featured project
				</h2>
			</div>
			<ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 pt-[clamp(2rem,4vw,3rem)]">
				{projects.map((project) => (
					<li key={project.slug}>
						<ProjectCard emphasis="feature" project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}
