import { bandSrcSet } from "@/components/home/content";

import {
	bodyCopy,
	factRow,
	factTerm,
	factText,
	figureCaption,
	photos,
	roles,
	sectionFrame,
	sectionTitle,
} from "./content";

export function Team() {
	return (
		<section
			aria-labelledby="about-team-title"
			className={`${sectionFrame} grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-[clamp(1.75rem,5vw,5rem)] max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-[2rem]`}
			id="fk-team"
		>
			<figure className="group m-0">
				<img
					alt={photos.guestRoom.alt}
					className="block aspect-[4/5] w-full object-cover transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.025] motion-reduce:transition-none max-lg:aspect-[16/11]"
					decoding="async"
					height={1333}
					loading="lazy"
					sizes="(max-width: 64rem) 100vw, 36vw"
					src={photos.guestRoom.src}
					srcSet={bandSrcSet(photos.guestRoom.src)}
					width={2000}
				/>
				<figcaption className={figureCaption}>
					Bed, desk and storage made for a completed guest room
				</figcaption>
			</figure>
			<div>
				<h2 className={`${sectionTitle} max-w-[16ch]`} id="about-team-title">
					The people behind the finish.
				</h2>
				<p className={`${bodyCopy} mt-[1.15rem] max-w-[46ch]`}>
					Carpenters, CAD draftsmen and finishing specialists work in house. The
					same team follows a piece from drawing to installation.
				</p>
				<dl className="m-0 mt-[clamp(1.75rem,3vw,2.4rem)] grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-[clamp(1.25rem,3vw,2.5rem)] border-border border-b max-[47.99rem]:grid-cols-[minmax(0,1fr)]">
					{roles.map((role) => (
						<div className={factRow} key={role.term}>
							<dt className={factTerm}>{role.term}</dt>
							<dd className={`${factText} text-muted-foreground`}>
								{role.text}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
