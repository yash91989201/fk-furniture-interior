import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { categoryLabel, type Project } from "./content";

const aspects = {
	feature: "aspect-[16/10]",
	standard: "aspect-[4/3]",
	tall: "aspect-[3/4]",
	wide: "aspect-[16/10]",
} as const;

export function ProjectCard({
	project,
	emphasis = "standard",
}: {
	project: Project;
	emphasis?: keyof typeof aspects;
}) {
	const place = project.location
		? `${categoryLabel(project.category)} · ${project.location}`
		: categoryLabel(project.category);

	return (
		<Link
			className="group flex h-full min-w-0 flex-col border border-border bg-card transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
			params={{ slug: project.slug }}
			to="/projects/$slug"
		>
			<span className="block overflow-hidden bg-muted">
				<img
					alt={project.image.alt}
					className={`block w-full object-cover transition-transform duration-[0.7s] ease-[var(--home-ease)] group-hover:scale-[1.02] motion-reduce:transition-none ${aspects[emphasis]}`}
					decoding="async"
					height={project.image.height}
					loading="lazy"
					sizes={
						emphasis === "feature"
							? "(max-width: 47.99rem) 100vw, (max-width: 79.99rem) 100vw, 60vw"
							: "(max-width: 47.99rem) 100vw, (max-width: 79.99rem) 50vw, 33vw"
					}
					src={project.image.src}
					srcSet={project.image.srcSet}
					width={project.image.width}
				/>
			</span>
			<span className="flex flex-1 flex-col gap-[0.55rem] p-[clamp(1rem,2vw,1.5rem)]">
				<span className="flex items-start justify-between gap-4">
					<span className="min-w-0 break-words font-heading font-medium text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-[1.12] tracking-[-0.015em]">
						{project.name}
					</span>
					<ArrowUpRight
						aria-hidden="true"
						className="mt-[0.15rem] shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none"
						size={18}
					/>
				</span>
				<span className="font-sans text-[0.75rem] text-muted-foreground leading-[1.5]">
					{place}
				</span>
				<span className="text-[0.875rem] text-muted-foreground leading-[1.6]">
					{project.summary}
				</span>
				<span className="mt-auto inline-flex items-center gap-1.5 pt-[0.75rem] font-semibold text-[0.75rem] tracking-[0.04em]">
					View project
				</span>
			</span>
		</Link>
	);
}
