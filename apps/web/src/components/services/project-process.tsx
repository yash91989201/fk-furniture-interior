import { bodyCopy, processSteps, sectionFrame, sectionTitle } from "./content";

export function ProjectProcess() {
	return (
		<section
			aria-labelledby="services-process-title"
			className={`${sectionFrame} bg-background`}
			id="fk-process"
		>
			<h2 className={sectionTitle} id="services-process-title">
				From brief to installation.
			</h2>
			<p className={`${bodyCopy} mt-[1.15rem] max-w-[52ch]`}>
				The steps below describe the usual path. The actual sequence and
				responsibilities depend on the project and the agreed scope.
			</p>
			<ol className="m-0 mt-[clamp(2rem,4vw,3.25rem)] grid list-none gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[2rem] p-0 sm:grid-cols-2 lg:grid-cols-4">
				{processSteps.map((step, index) => (
					<li className="border-border border-t pt-[1rem]" key={step.title}>
						<span className="font-sans font-semibold text-[0.75rem] text-primary tabular-nums tracking-[0.09em]">
							{String(index + 1).padStart(2, "0")}
						</span>
						<h3 className="m-0 mt-[0.75rem] font-heading font-medium text-[clamp(1.3rem,1.15rem+0.6vw,1.6rem)] leading-[1.2] tracking-[-0.01em]">
							{step.title}
						</h3>
						<p className="m-0 mt-[0.4rem] max-w-[34ch] text-[0.9375rem] text-muted-foreground leading-[1.6]">
							{step.text}
						</p>
					</li>
				))}
			</ol>
			<p className="mt-[clamp(2rem,4vw,3rem)] max-w-[62ch] border-border border-t pt-[1rem] text-[0.875rem] text-muted-foreground leading-[1.6]">
				Not every project needs a mock-up, and delivery or installation scope
				varies by site. Steps and responsibilities are confirmed in the
				quotation and project schedule.
			</p>
		</section>
	);
}
