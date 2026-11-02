import type { Project } from "@/components/projects/content";
import {
	projectsBody,
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "@/components/projects/content";

export function ProjectOverview({ project }: { project: Project }) {
	return (
		<section
			aria-labelledby="project-overview-title"
			className={`${projectsSection} border-border border-b bg-card`}
			id="project-overview"
		>
			<div className="grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
				<div>
					<p className={projectsLabel}>Project overview</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem] max-w-[18ch]`}
						id="project-overview-title"
					>
						The engagement.
					</h2>
					<p className={`${projectsBody} mt-[1.25rem] max-w-[62ch]`}>
						{project.overview}
					</p>
				</div>
				<dl className="m-0 self-start border-border border-t">
					{project.facts.map((fact) => (
						<div
							className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.85rem]"
							key={fact.label}
						>
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								{fact.label}
							</dt>
							<dd className="m-0 text-[0.8125rem] leading-[1.55]">
								{fact.value}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
