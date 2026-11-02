import {
	craftShots,
	craftStages,
	galleryBody,
	galleryLabel,
	gallerySection,
	galleryTitle,
} from "./content";

export function CraftStrip() {
	return (
		<section
			aria-labelledby="gallery-craft-title"
			className={`${gallerySection} bg-secondary text-secondary-foreground`}
			id="gallery-craft"
		>
			<div className="grid items-end gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
				<div>
					<p className={`${galleryLabel} text-secondary-foreground/70`}>
						Behind the craft
					</p>
					<h2
						className={`${galleryTitle} mt-[0.9rem] max-w-[16ch]`}
						id="gallery-craft-title"
					>
						The work before the room.
					</h2>
				</div>
				<p
					className={`${galleryBody} max-w-[42ch] text-secondary-foreground/80`}
				>
					Photographs from the workshop and site, captioned to what is visible
					in the frame. Production images are published only when they show
					actual FK work.
				</p>
			</div>
			{craftShots.length > 0 ? (
				<ul className="m-0 mt-[clamp(2rem,4vw,3rem)] grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
					{craftShots.map((shot) => (
						<li key={shot.src}>
							<figure className="m-0">
								<img
									alt={shot.alt}
									className="block aspect-[4/3] w-full object-cover"
									decoding="async"
									height={shot.height}
									loading="lazy"
									sizes={shot.sizes}
									src={shot.src}
									srcSet={shot.srcSet}
									width={shot.width}
								/>
								<figcaption className="mt-[0.65rem] text-[0.75rem] text-secondary-foreground/70 leading-[1.5]">
									<span className="block font-semibold text-secondary-foreground">
										{shot.stage}
									</span>
									{shot.caption}
								</figcaption>
							</figure>
						</li>
					))}
				</ul>
			) : (
				<div className="mt-[clamp(2rem,4vw,3rem)] border-secondary-foreground/25 border-t pt-[1.25rem]">
					<p className="m-0 max-w-[58ch] text-[0.8125rem] text-secondary-foreground/70 leading-[1.6]">
						Factory and execution photography is being cleared for publication.
						The strip will document these four stages with captioned images.
					</p>
					<ol className="m-0 mt-[1.5rem] grid list-none gap-x-6 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
						{craftStages.map((stage, index) => (
							<li
								className="border-secondary-foreground/25 border-t pt-[0.8rem]"
								key={stage.id}
							>
								<span
									aria-hidden="true"
									className="font-sans text-[0.625rem] text-secondary-foreground/60 tabular-nums"
								>
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="mt-[0.3rem] block font-heading text-[1.15rem] leading-[1.2]">
									{stage.label}
								</span>
							</li>
						))}
					</ol>
				</div>
			)}
		</section>
	);
}
