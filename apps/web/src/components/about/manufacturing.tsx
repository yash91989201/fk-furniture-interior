import { bandSrcSet } from "@/components/home/content";

import {
	bodyCopy,
	buildFacts,
	factRow,
	factTerm,
	factText,
	figureCaption,
	photos,
	sectionFrame,
	sectionTitle,
} from "./content";

export function Manufacturing() {
	return (
		<section
			aria-labelledby="about-manufacturing-title"
			className={`${sectionFrame} grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-[clamp(1.75rem,4vw,4rem)] bg-card max-xl:grid-cols-[minmax(0,1fr)] max-xl:gap-[2rem]`}
			id="fk-manufacturing"
		>
			<div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-end gap-[1rem] max-xl:order-2 max-[47.99rem]:grid-cols-[minmax(0,1fr)]">
				<figure className="group m-0 min-w-0">
					<img
						alt={photos.fitted.alt}
						className="block aspect-[4/5] w-full object-cover transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.025] motion-reduce:transition-none"
						decoding="async"
						height={1333}
						loading="lazy"
						sizes="(max-width: 47.99rem) 100vw, (max-width: 80rem) 57vw, 46vw"
						src={photos.fitted.src}
						srcSet={bandSrcSet(photos.fitted.src)}
						width={2000}
					/>
					<figcaption className={figureCaption}>
						Fitted wardrobe, tea station and bedside storage
					</figcaption>
				</figure>
				<figure className="group m-0 min-w-0">
					<img
						alt={photos.restaurant.alt}
						className="block aspect-[3/4] w-full object-cover transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.025] motion-reduce:transition-none max-[47.99rem]:aspect-[16/10]"
						decoding="async"
						height={1333}
						loading="lazy"
						sizes="(max-width: 47.99rem) 100vw, (max-width: 80rem) 42vw, 30vw"
						src={photos.restaurant.src}
						width={2000}
					/>
					<figcaption className={figureCaption}>
						Restaurant tables, seating and joinery
					</figcaption>
				</figure>
			</div>
			<div className="max-lg:order-1">
				<h2
					className={`${sectionTitle} max-w-[20ch]`}
					id="about-manufacturing-title"
				>
					Drawn by us, built by us.
				</h2>
				<p className={`${bodyCopy} mt-[1.15rem] max-w-[46ch]`}>
					Furniture is manufactured in our own setup rather than traded in.
					Custom specifications, finishes and BOQ compliance stay with one team
					from the first drawing to the last coat.
				</p>
				<dl className="m-0 mt-[clamp(1.75rem,3vw,2.4rem)] grid">
					{buildFacts.map((fact) => (
						<div className={`${factRow} last:border-b`} key={fact.term}>
							<dt className={factTerm}>{fact.term}</dt>
							<dd className={`${factText} text-muted-foreground`}>
								{fact.text}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
