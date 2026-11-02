import {
	bodyCopy,
	leadCopy,
	sectionFrame,
	sectionTitle,
	timeline,
} from "./content";

export function Story() {
	return (
		<section
			aria-labelledby="about-story-title"
			className={`${sectionFrame} grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-[clamp(2rem,5vw,5.5rem)] max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-[2rem]`}
			id="fk-story"
		>
			<div className="flex flex-col">
				<h2 className={`${sectionTitle} max-w-[15ch]`} id="about-story-title">
					It began with site work in 1986.
				</h2>
				<div className="relative mt-[clamp(1.75rem,3vw,2.5rem)] flex flex-1 flex-col">
					<span
						aria-hidden="true"
						className="absolute inset-y-0 left-0 w-px origin-top bg-primary [animation-range:entry_12%_cover_34%] [animation-timeline:view()] [animation:about-timeline-draw_linear_both] motion-reduce:[animation:none]"
					/>
					<ol className="flex flex-1 list-none flex-col justify-between gap-[1.5rem] border-border border-l p-0 pl-[1.15rem]">
						{timeline.map((entry) => (
							<li
								className="relative grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-x-[0.75rem] max-sm:grid-cols-[minmax(0,1fr)] max-sm:gap-y-[0.2rem]"
								key={entry.year}
							>
								<span
									aria-hidden="true"
									className="absolute top-[0.55rem] -left-[1.15rem] size-[5px] -translate-x-[2.5px] bg-primary"
								/>
								<span className="font-heading font-medium text-[1.25rem] leading-[1.2] tracking-[-0.01em]">
									{entry.year}
								</span>
								<p className="m-0 max-w-[34rem] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.55]">
									{entry.text}
								</p>
							</li>
						))}
					</ol>
				</div>
			</div>
			<div className="grid max-w-[34rem] content-start gap-[clamp(1.5rem,2.2vw,2.25rem)]">
				<p className={leadCopy}>
					The business grew out of site work, not a showroom. That start still
					shapes how projects run.
				</p>
				<div className="grid gap-[0.9rem]">
					<p className={bodyCopy}>
						The professional company was formalised later. It still runs from
						Gurgaon and Goa today, with design, material supply and execution
						under one team.
					</p>
					<p className={bodyCopy}>
						Interiors are designed and furniture is made for the way a room is
						actually used: hotel guest rooms and lobbies that take constant
						traffic, offices that have to work hard, and homes that need to
						remain comfortable years later.
					</p>
					<p className={bodyCopy}>
						Hospitality furniture carries heavier daily use than most
						residential pieces, so hardware, substrates and finishes are chosen
						for the room rather than for a catalogue photograph.
					</p>
				</div>
			</div>
		</section>
	);
}
