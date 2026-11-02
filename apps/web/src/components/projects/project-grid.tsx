import { ArrowUpRight } from "lucide-react";

import {
	filterProjects,
	type ProjectCategoryId,
	projectCategories,
	projectsBody,
	projectsSection,
	projectsTitle,
} from "./content";
import { ProjectCard } from "./project-card";

const variation = ["standard", "tall", "standard", "wide", "standard"] as const;

export function ProjectGrid({ active }: { active: ProjectCategoryId }) {
	const visible = filterProjects(active);
	const activeCategory = projectCategories.find(
		(category) => category.id === active
	);

	return (
		<section
			aria-labelledby="project-list-title"
			className={`${projectsSection} bg-background`}
			id="project-list"
		>
			<div className="flex flex-col gap-3 border-border border-b pb-[1.25rem] sm:flex-row sm:items-end sm:justify-between">
				<h2 className={projectsTitle} id="project-list-title">
					Project index
				</h2>
				<p className="m-0 max-w-[40ch] text-[0.8125rem] text-muted-foreground leading-[1.55] sm:text-right">
					{activeCategory?.label ?? "All Projects"} · {visible.length}{" "}
					{visible.length === 1 ? "project" : "projects"}
				</p>
			</div>
			{visible.length === 0 ? (
				<div className="border-border border-b py-[clamp(3rem,7vw,6rem)]">
					<p className={projectsTitle}>No projects in this sector yet.</p>
					<p className={`${projectsBody} mt-[0.9rem] max-w-[52ch]`}>
						Choose another sector, or send a brief if you would like to discuss
						a similar project.
					</p>
					<a
						className="mt-[1.5rem] inline-flex min-h-11 items-center gap-2 border border-border px-4 font-medium text-[0.8125rem] transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						href="#projects-enquiry"
					>
						Send a project brief
						<ArrowUpRight aria-hidden="true" size={16} />
					</a>
				</div>
			) : (
				<ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 pt-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 xl:grid-cols-3">
					{visible.map((project, index) => {
						const emphasis = project.featured
							? "feature"
							: variation[index % variation.length];

						return (
							<li
								className={
									project.featured ? "sm:col-span-2 xl:col-span-2" : undefined
								}
								key={project.slug}
							>
								<ProjectCard emphasis={emphasis} project={project} />
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
