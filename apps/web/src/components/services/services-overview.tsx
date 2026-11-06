import { bodyCopy, offerings, sectionFrame, sectionTitle } from "./content";

// Four-up strip, accepted in live mode: 1 -> 2 -> 4 columns, closing bottom rule.
const listFrame =
	"m-0 mt-[clamp(2.19rem,4.38vw,3.75rem)] grid list-none grid-cols-1 gap-x-[clamp(1rem,2vw,2.25rem)] p-0 border-border border-b sm:grid-cols-2 xl:grid-cols-4";

const itemFrame =
	"relative border-border border-t py-[clamp(1.44rem,2.5vw,2rem)]";

const itemTitle =
	"m-0 font-heading font-medium text-[clamp(1.25rem,1.05rem+0.7vw,1.5rem)] leading-[1.2] tracking-[-0.015em]";

const itemSummary =
	"m-0 mt-[0.6rem] text-pretty text-base text-muted-foreground leading-[1.6]";

// The anchor's overlay makes the whole row the touch target.
const itemLink =
	"inline-block py-[0.35rem] underline decoration-1 decoration-primary underline-offset-[0.25em] transition-colors duration-300 ease-[var(--home-ease)] hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 motion-reduce:transition-none after:absolute after:inset-0 after:content-['']";

const shell = `${sectionFrame} bg-card max-sm:py-[clamp(3rem,7vw,6.5rem)]`;

const head =
	"grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(0.75rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end";

export function ServicesOverview() {
	return (
		<section
			aria-labelledby="services-overview-title"
			className={shell}
			id="fk-overview"
		>
			<div className={head}>
				<h2 className={sectionTitle} id="services-overview-title">
					Four ways to start.
				</h2>
				<p className={`${bodyCopy} max-w-[52ch] lg:justify-self-end`}>
					A project may need one of these or all four. Each scope is confirmed
					against the drawings, specification and budget before production
					starts.
				</p>
			</div>
			<ol className={listFrame}>
				{offerings.map((offering) => (
					<li className={itemFrame} key={offering.anchor}>
						<h3 className={itemTitle}>
							<a className={itemLink} href={`#${offering.anchor}`}>
								{offering.title}
							</a>
						</h3>
						<p className={itemSummary}>{offering.summary}</p>
					</li>
				))}
			</ol>
		</section>
	);
}
