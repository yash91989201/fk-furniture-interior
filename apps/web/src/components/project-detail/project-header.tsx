import { Link } from "@tanstack/react-router";

import { categoryLabel, type Project } from "@/components/projects/content";

export function ProjectHeader({ project }: { project: Project }) {
	return (
		<section
			aria-labelledby="project-title"
			className="border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(1.5rem,4vw,3rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2.5rem,5vw,4.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<nav aria-label="Breadcrumb">
				<ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[0.75rem] text-muted-foreground">
					<li>
						<Link
							className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							to="/projects"
						>
							Projects
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li aria-current="page" className="text-foreground">
						{project.name}
					</li>
				</ol>
			</nav>
			<div className="mt-[clamp(1rem,2vw,2rem)] grid items-end gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
				<h1
					className="m-0 max-w-[16ch] text-balance break-words font-medium text-[clamp(2.5rem,1.5rem+3.6vw,5rem)] leading-[1.02] tracking-[-0.03em]"
					id="project-title"
				>
					{project.name}
				</h1>
				<div className="max-w-[46ch]">
					<p className="m-0 font-sans font-semibold text-[0.75rem] text-muted-foreground tracking-[0.09em]">
						{categoryLabel(project.category)}
						{project.location ? ` · ${project.location}` : ""}
					</p>
					<p className="m-0 mt-[0.9rem] text-pretty text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] text-muted-foreground leading-[1.6]">
						{project.intro}
					</p>
				</div>
			</div>
			<figure className="m-0 mt-[clamp(2rem,4vw,3.5rem)]">
				<div className="overflow-hidden bg-muted">
					<img
						alt={project.image.alt}
						className="block aspect-[16/9] w-full object-cover object-center"
						decoding="async"
						fetchPriority="high"
						height={project.image.height}
						sizes="(max-width: 63.99rem) 100vw, 92vw"
						src={project.image.src}
						srcSet={project.image.srcSet}
						width={project.image.width}
					/>
				</div>
				{project.image.caption ? (
					<figcaption className="pt-[0.6rem] text-[0.75rem] text-muted-foreground leading-[1.45]">
						{project.image.caption}
					</figcaption>
				) : null}
			</figure>
		</section>
	);
}
