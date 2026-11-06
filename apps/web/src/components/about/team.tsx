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
} from "./content";

// Team steps one size above the shared heading ladder, with tighter leading.
const teamTitle =
	"m-0 text-[clamp(2.2rem,1.5rem+2.8vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.028em] text-balance";

export function Team() {
	return (
		<section
			aria-labelledby="about-team-title"
			className={`${sectionFrame} grid grid-cols-[minmax(0,1fr)_30%] items-start gap-[clamp(1.75rem,4vw,4.5rem)] max-lg:grid-cols-[minmax(0,1fr)]`}
			id="fk-team"
		>
			<div>
				<h2 className={`${teamTitle} max-w-[18ch]`} id="about-team-title">
					The people behind the finish.
				</h2>
				<p
					className={`${bodyCopy} mt-[clamp(0.8rem,1.2vw,1.0625rem)] max-w-[52ch]`}
				>
					Carpenters, CAD draftsmen and finishing specialists work in house. The
					same team follows a piece from drawing to installation.
				</p>
				<dl className="m-0 mt-[clamp(1.75rem,3vw,2.4rem)] max-w-[52ch] border-border border-b">
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
			<figure className="group m-0 max-lg:order-first">
				<img
					alt={photos.guestRoom.alt}
					className="block aspect-[3/4] w-full object-cover max-lg:aspect-[16/11]"
					decoding="async"
					height={1333}
					loading="lazy"
					sizes="(max-width: 64rem) 100vw, 30vw"
					src={photos.guestRoom.src}
					srcSet={bandSrcSet(photos.guestRoom.src)}
					width={2000}
				/>
				<figcaption className={figureCaption}>
					Bed, desk and storage made for a completed guest room
				</figcaption>
			</figure>
		</section>
	);
}
