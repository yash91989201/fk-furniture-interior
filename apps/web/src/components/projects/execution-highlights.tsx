import {
	projectsBody,
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "./content";

const highlights = [
	{
		title: "Sample and mock-up approval",
		body: "Where a project calls for it, a sample or mock-up room is reviewed with the client before bulk production begins.",
	},
	{
		title: "Installation coordination",
		body: "Factory-made pieces are packed and scheduled for delivery, then installed with the site team so fitted work meets the room as drawn.",
	},
	{
		title: "Delivery planning",
		body: "Production and dispatch are planned against the agreed project schedule. Dates are confirmed for each project rather than promised as a standard.",
	},
] as const;

export function ExecutionHighlights() {
	return (
		<section
			aria-labelledby="execution-title"
			className={`${projectsSection} border-border border-b bg-muted/40`}
			id="project-execution"
		>
			<div className="grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div>
					<p className={projectsLabel}>Execution</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem] max-w-[14ch]`}
						id="execution-title"
					>
						The delivery standard.
					</h2>
					<p className={`${projectsBody} mt-[1rem] max-w-[38ch]`}>
						The same team follows the work from approved drawings through
						production, delivery and installation.
					</p>
				</div>
				<ul className="m-0 grid list-none gap-0 p-0">
					{highlights.map((item) => (
						<li
							className="grid gap-[0.5rem] border-border border-t py-[clamp(1.1rem,2vw,1.5rem)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-6"
							key={item.title}
						>
							<h3 className="m-0 font-heading font-medium text-[clamp(1.15rem,1rem+0.55vw,1.5rem)] leading-[1.2] tracking-[-0.015em]">
								{item.title}
							</h3>
							<p className="m-0 text-pretty text-[0.9375rem] text-muted-foreground leading-[1.65]">
								{item.body}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
