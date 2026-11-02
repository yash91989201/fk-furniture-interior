import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
	categoryLabel,
	type Project,
	projectsBody,
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "@/components/projects/content";

export function ProjectNavigation({ related }: { related?: Project }) {
	return (
		<section
			aria-labelledby="project-navigation-title"
			className={`${projectsSection} bg-background`}
			id="project-enquiry"
		>
			<div className="grid gap-[clamp(2rem,5vw,5rem)] border-border border-t pt-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
				<div>
					<Link
						className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-muted-foreground underline decoration-1 underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						to="/projects"
					>
						<ArrowLeft aria-hidden="true" size={15} />
						All projects
					</Link>
					<h2
						className={`${projectsTitle} mt-[1.25rem] max-w-[18ch]`}
						id="project-navigation-title"
					>
						Discuss a similar project.
					</h2>
					<p className={`${projectsBody} mt-[1rem] max-w-[48ch]`}>
						Share the location, the spaces involved and any drawings or BOQ you
						hold. The studio will review them and reply with the next practical
						step.
					</p>
					<div className="mt-[clamp(1.5rem,3vw,2rem)] flex flex-wrap items-center gap-x-5 gap-y-3">
						<Link
							className={buttonVariants({ className: "min-h-11" })}
							to="/contact"
						>
							Start a project enquiry
							<ArrowUpRight aria-hidden="true" size={16} />
						</Link>
						<Link
							className="inline-flex min-h-11 items-center text-[0.8125rem] underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							to="/projects"
						>
							View the full portfolio
						</Link>
					</div>
				</div>
				{related ? (
					<Link
						className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						params={{ slug: related.slug }}
						to="/projects/$slug"
					>
						<span className="block overflow-hidden bg-muted">
							<img
								alt={related.image.alt}
								className="block aspect-[16/10] w-full object-cover transition-transform duration-[0.7s] ease-[var(--home-ease)] group-hover:scale-[1.02] motion-reduce:transition-none"
								decoding="async"
								height={related.image.height}
								loading="lazy"
								sizes="(max-width: 63.99rem) 100vw, 40vw"
								src={related.image.src}
								srcSet={related.image.srcSet}
								width={related.image.width}
							/>
						</span>
						<span className="flex flex-1 flex-col gap-[0.4rem] p-[clamp(1rem,2vw,1.5rem)]">
							<span className={`${projectsLabel} text-[0.6875rem]`}>
								Another project
							</span>
							<span className="flex items-start justify-between gap-4">
								<span className="min-w-0 break-words font-heading font-medium text-[clamp(1.25rem,1.05rem+0.6vw,1.65rem)] leading-[1.15] tracking-[-0.015em]">
									{related.name}
								</span>
								<ArrowUpRight
									aria-hidden="true"
									className="mt-[0.2rem] shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none"
									size={17}
								/>
							</span>
							<span className="font-sans text-[0.75rem] text-muted-foreground leading-[1.5]">
								{categoryLabel(related.category)}
							</span>
						</span>
					</Link>
				) : null}
			</div>
		</section>
	);
}
