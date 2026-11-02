import { bandSrcSet } from "@/components/home/content";

import {
	bodyCopy,
	factTerm,
	factText,
	figureCaption,
	leadCopy,
	offerings,
	sectionFrame,
	sectionTitle,
} from "./content";

export function ServiceOfferings() {
	return (
		<section
			aria-labelledby="services-offerings-title"
			className={`${sectionFrame} bg-background`}
			id="fk-offerings"
		>
			<h2 className={sectionTitle} id="services-offerings-title">
				What we make
			</h2>
			<p className={`${bodyCopy} mt-[1.15rem] max-w-[52ch]`}>
				Each scope below is a possible starting point rather than a fixed
				catalogue. The final schedule of items follows the drawings, the BOQ and
				the approved samples for the project.
			</p>
			<div className="mt-[clamp(2rem,4vw,3.25rem)]">
				{offerings.map((offering, index) => (
					<article
						className="border-border border-t py-[clamp(1.75rem,3vw,2.5rem)] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)] lg:grid lg:grid-cols-12 lg:gap-x-[clamp(1.75rem,4vw,4rem)]"
						id={offering.anchor}
						key={offering.anchor}
					>
						<div
							className={`min-w-0 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
						>
							<h3 className="m-0 font-heading font-medium text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.12] tracking-tight">
								{offering.title}
							</h3>
							<p className={`${leadCopy} mt-[0.9rem] max-w-[44ch]`}>
								{offering.lead}
							</p>
							<ul className="m-0 mt-[1.5rem] grid list-none gap-x-[clamp(1.5rem,3vw,2.5rem)] p-0 sm:grid-cols-2">
								{offering.scopes.map((scope) => (
									<li
										className="border-border border-t py-[0.6rem] text-[0.9375rem] leading-[1.5]"
										key={scope}
									>
										{scope}
									</li>
								))}
							</ul>
						</div>
						<div
							className={`mt-[1.75rem] min-w-0 lg:col-span-5 lg:mt-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}
						>
							{offering.image ? (
								<figure className="group m-0">
									<img
										alt={offering.image.alt}
										className="block aspect-[4/5] w-full object-cover transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.02] motion-reduce:transition-none"
										decoding="async"
										height={1333}
										loading="lazy"
										sizes="(max-width: 63.99rem) 100vw, 40vw"
										src={offering.image.src}
										srcSet={bandSrcSet(offering.image.src)}
										width={2000}
									/>
									<figcaption className={figureCaption}>
										{offering.image.caption}
									</figcaption>
								</figure>
							) : (
								offering.note && (
									<aside className="border-border border-t pt-[1rem]">
										{offering.anchor === "contract-manufacturing" && (
											<p className={leadCopy}>{offering.summary}</p>
										)}
										<h4
											className={`${factTerm} ${offering.anchor === "contract-manufacturing" ? "mt-[1.5rem]" : ""}`}
										>
											{offering.note.title}
										</h4>
										<p className={`${factText} text-muted-foreground`}>
											{offering.note.text}
										</p>
									</aside>
								)
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
