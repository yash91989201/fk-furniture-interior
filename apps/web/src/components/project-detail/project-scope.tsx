import type { Project } from "@/components/projects/content";
import {
	draftScopeNote,
	projectsBody,
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "@/components/projects/content";

export function ProjectScope({ project }: { project: Project }) {
	return (
		<section
			aria-labelledby="project-scope-title"
			className={`${projectsSection} border-border border-b bg-background`}
			id="project-scope"
		>
			<div className="flex flex-col gap-3 border-border border-b pb-[1.25rem] sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className={projectsLabel}>Scope of work</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem]`}
						id="project-scope-title"
					>
						What the project covers.
					</h2>
				</div>
				{project.scopeStatus === "draft" ? (
					<p className="m-0 max-w-[38ch] text-[0.8125rem] text-muted-foreground leading-[1.55] sm:text-right">
						{draftScopeNote}
					</p>
				) : null}
			</div>
			<ul className="m-0 grid list-none grid-cols-1 items-start gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-[clamp(1.5rem,3vw,2.5rem)] p-0 pt-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-3">
				{project.scope.map((group) => (
					<li className="border-border border-t pt-[1rem]" key={group.title}>
						<h3 className="m-0 font-heading font-medium text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)] leading-[1.2] tracking-[-0.015em]">
							{group.title}
						</h3>
						<ul className="m-0 mt-[0.75rem] list-disc space-y-[0.4rem] pl-[1.1rem] text-[0.875rem] text-muted-foreground leading-[1.6]">
							{group.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			<p
				className={`${projectsBody} mt-[clamp(2rem,4vw,3rem)] max-w-[58ch] text-[0.875rem]`}
			>
				Every scope is set out against the approved drawings, samples and
				specification before production begins.
			</p>
		</section>
	);
}
