import { Link } from "@tanstack/react-router";

import {
	bodyCopy,
	distinctions,
	factRow,
	factTerm,
	factText,
	sectionFrame,
	sectionTitle,
} from "./content";

export function WhyFk() {
	return (
		<section
			aria-labelledby="services-why-title"
			className={`${sectionFrame} bg-muted/40`}
			id="fk-why"
		>
			<div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(2rem,4vw,3rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
				<div>
					<h2 className={sectionTitle} id="services-why-title">
						Why work with FK
					</h2>
					<p className={`${bodyCopy} mt-[1.25rem] max-w-[40ch]`}>
						The same team is accountable for what is specified, made and
						installed.
					</p>
					<Link
						className="text mt-[0.75rem] inline-flex min-h-11 items-center underline decoration-primary underline-offset-4 transition-colors duration-300 ease-[var(--home-ease)] hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 motion-reduce:transition-none"
						to="/about"
					>
						Read the company story
					</Link>
				</div>
				<dl className="m-0 grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(1.25rem,2.5vw,2rem)] p-0 sm:grid-cols-2">
					{distinctions.map((distinction) => (
						<div className={factRow} key={distinction.term}>
							<dt className={factTerm}>{distinction.term}</dt>
							<dd className={`${factText} text-muted-foreground`}>
								{distinction.text}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
