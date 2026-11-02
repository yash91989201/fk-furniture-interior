import { bodyCopy, offerings, sectionFrame, sectionTitle } from "./content";

export function ServicesOverview() {
	return (
		<section
			aria-labelledby="services-overview-title"
			className={`${sectionFrame} bg-card`}
			id="fk-overview"
		>
			<div className="grid items-end gap-x-[clamp(2rem,5vw,5rem)] gap-y-[1.5rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
				<h2 className={sectionTitle} id="services-overview-title">
					Four ways to start.
				</h2>
				<p className={`${bodyCopy} max-w-[52ch] lg:justify-self-end`}>
					A project may need one of these or all four. Each scope is confirmed
					against the drawings, specification and budget before production
					starts.
				</p>
			</div>
			<ol className="m-0 mt-[clamp(2rem,4vw,3.25rem)] grid list-none gap-0 p-0 md:grid-cols-2">
				{offerings.map((offering) => (
					<li
						className="border-border border-t py-[clamp(1.35rem,2.5vw,2rem)] md:even:pl-[clamp(1.5rem,3vw,3rem)] md:odd:border-r md:odd:pr-[clamp(1.5rem,3vw,3rem)]"
						key={offering.anchor}
					>
						<h3 className="m-0 font-heading font-medium text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.15] tracking-[-0.02em]">
							<a
								className="underline decoration-1 decoration-primary underline-offset-[0.25em] transition-colors duration-300 ease-[var(--home-ease)] hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 motion-reduce:transition-none"
								href={`#${offering.anchor}`}
							>
								{offering.title}
							</a>
						</h3>
						<p className="m-0 mt-[0.6rem] max-w-[42ch] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.6]">
							{offering.summary}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
