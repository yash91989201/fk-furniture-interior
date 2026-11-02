import { buttonVariants } from "@fk-furniture-interior/ui/components/button";

import {
	galleryBody,
	galleryLabel,
	galleryLead,
	galleryWorks,
} from "./content";

const entryFields = [
	{
		index: "01",
		label: "Space",
		note: "The room the work was made for.",
	},
	{
		index: "02",
		label: "Scope",
		note: "The agreed extent of the fit-out.",
	},
	{
		index: "03",
		label: "Specification",
		note: "Confirmed material, finish and hardware.",
	},
	{
		index: "04",
		label: "Reference",
		note: "A stable record for project enquiries.",
	},
] as const;

export function GalleryHero() {
	return (
		<section
			aria-labelledby="gallery-title"
			className="border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(3rem,7vw,6rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(3rem,6vw,5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<div className="grid items-end gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
				<div>
					<p className={galleryLabel}>Gallery</p>
					<h1
						className="m-0 mt-[clamp(1rem,2vw,1.5rem)] max-w-[13ch] text-balance font-heading font-medium text-[clamp(2.75rem,1.6rem+5vw,5.75rem)] leading-[0.98] tracking-[-0.035em] [animation:home-rise_0.9s_var(--home-ease)_backwards] motion-reduce:[animation:none]"
						id="gallery-title"
					>
						A record of <em className="font-normal italic">finished rooms.</em>
					</h1>
					<p className={`${galleryLead} mt-[clamp(1.5rem,3vw,2.25rem)]`}>
						Bespoke furniture and interior work for hotels, restaurants,
						workplaces and homes, arranged by the space it was made for.
					</p>
					<p className={`${galleryBody} mt-[1.25rem] max-w-[52ch]`}>
						Each published entry carries the agreed scope and only the material,
						finish and hardware details confirmed for that space.
					</p>
					<div className="mt-[clamp(1.75rem,3vw,2.5rem)] flex flex-wrap items-center gap-x-6 gap-y-3">
						<a
							className={buttonVariants({ className: "h-11" })}
							href="#gallery-work"
						>
							Browse the work
						</a>
						<a
							className="inline-flex min-h-11 items-center font-medium text-[0.8125rem] underline decoration-1 underline-offset-4 transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							href="#gallery-enquiry"
						>
							Send a brief
						</a>
					</div>
				</div>
				<aside className="border-border border-t pt-[1.5rem] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[clamp(1.5rem,3vw,2.75rem)]">
					<p className="flex items-center gap-2 font-sans font-semibold text-[0.6875rem] uppercase tracking-[0.16em]">
						<span aria-hidden="true" className="size-2 bg-primary" />
						{galleryWorks.length === 0
							? "Portfolio in preparation"
							: `${galleryWorks.length} published ${galleryWorks.length === 1 ? "work" : "works"}`}
					</p>
					<p className={`${galleryLabel} mt-[1.75rem]`}>In every entry</p>
					<ol className="m-0 mt-[0.75rem] grid list-none p-0">
						{entryFields.map((field) => (
							<li
								className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-[0.75rem] border-border border-t py-[0.9rem]"
								key={field.label}
							>
								<span
									aria-hidden="true"
									className="pt-[0.15rem] font-sans text-[0.6875rem] text-muted-foreground tabular-nums"
								>
									{field.index}
								</span>
								<span>
									<span className="block font-heading text-[1.15rem] leading-[1.2]">
										{field.label}
									</span>
									<span className="mt-[0.2rem] block max-w-[30ch] text-[0.8125rem] text-muted-foreground leading-[1.5]">
										{field.note}
									</span>
								</span>
							</li>
						))}
					</ol>
					<p className="mt-[1.25rem] max-w-[34ch] text-[0.75rem] text-muted-foreground leading-[1.55]">
						Photographs are published only with project permission. Empty
						categories stay visible until approved work is ready.
					</p>
				</aside>
			</div>
		</section>
	);
}
