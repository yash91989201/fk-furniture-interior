import { ArrowUpRight } from "lucide-react";
import { type MouseEvent, useCallback } from "react";

import {
	type GalleryCategoryId,
	type GalleryWork,
	galleryCategories,
	gallerySection,
	galleryTitle,
	galleryWorks,
} from "./content";

const aspects = {
	standard: "aspect-[4/3]",
	tall: "aspect-[3/4]",
	wide: "aspect-[16/10]",
} as const;

export function GalleryGrid({
	active,
	onOpen,
}: {
	active: GalleryCategoryId;
	onOpen: (work: GalleryWork) => void;
}) {
	const works =
		active === "all"
			? galleryWorks
			: galleryWorks.filter((work) => work.category === active);
	const activeCategory = galleryCategories.find(
		(category) => category.id === active
	);

	const handleWorkClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const work = galleryWorks.find(
				(item) => item.reference === event.currentTarget.dataset.reference
			);
			if (work) {
				onOpen(work);
			}
		},
		[onOpen]
	);

	return (
		<section
			aria-labelledby="gallery-work-title"
			className={`${gallerySection} bg-background`}
			id="gallery-work"
		>
			<div className="flex flex-col gap-3 border-border border-b pb-[1.25rem] sm:flex-row sm:items-end sm:justify-between">
				<h2 className={galleryTitle} id="gallery-work-title">
					Selected work
				</h2>
				<p className="m-0 max-w-[36ch] text-[0.8125rem] text-muted-foreground leading-[1.55] sm:text-right">
					{activeCategory?.label ?? "All work"} · {works.length}{" "}
					{works.length === 1 ? "entry" : "entries"}
				</p>
			</div>
			{works.length === 0 ? (
				<div className="border-border border-b py-[clamp(3rem,7vw,6rem)]">
					<p className="m-0 font-heading font-medium text-[clamp(1.5rem,1.2rem+1.2vw,2.15rem)] leading-[1.2] tracking-[-0.02em]">
						{galleryWorks.length === 0
							? "Approved project photography is being prepared."
							: "No published work in this category yet."}
					</p>
					<p className="m-0 mt-[0.9rem] max-w-[52ch] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.65]">
						{galleryWorks.length === 0
							? "Entries are added only after the client clears the photograph, the scope of work and the specification record. The categories above stay visible so the collection can be browsed as it grows."
							: "Choose another category, or send a brief if you would like to discuss a similar space."}
					</p>
					<a
						className="mt-[1.5rem] inline-flex min-h-11 items-center gap-2 border border-border px-4 font-medium text-[0.8125rem] transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						href="#gallery-enquiry"
					>
						Send a project brief
						<ArrowUpRight aria-hidden="true" size={16} />
					</a>
				</div>
			) : (
				<ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 pt-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-3">
					{works.map((work) => (
						<li
							className={work.emphasis === "wide" ? "sm:col-span-2" : undefined}
							key={work.reference}
						>
							<button
								aria-label={`Open full view: ${work.space}`}
								className="group flex h-full w-full flex-col border border-border bg-card text-left transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
								data-reference={work.reference}
								onClick={handleWorkClick}
								type="button"
							>
								<span className="block overflow-hidden bg-muted">
									<img
										alt={work.image.alt}
										className={`block w-full object-cover transition-transform duration-[0.7s] ease-[var(--home-ease)] group-hover:scale-[1.02] motion-reduce:transition-none ${aspects[work.emphasis ?? "standard"]}`}
										decoding="async"
										height={work.image.height}
										loading="lazy"
										sizes={work.image.sizes}
										src={work.image.src}
										srcSet={work.image.srcSet}
										width={work.image.width}
									/>
								</span>
								<span className="flex flex-1 flex-col gap-[0.55rem] p-[clamp(1rem,2vw,1.5rem)]">
									<span className="flex items-start justify-between gap-4">
										<span className="font-heading font-medium text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)] leading-[1.15] tracking-[-0.01em]">
											{work.space}
										</span>
										<span className="shrink-0 pt-[0.2rem] font-sans text-[0.625rem] text-muted-foreground tracking-[0.12em]">
											{work.reference}
										</span>
									</span>
									<span className="text-[0.8125rem] text-muted-foreground leading-[1.55]">
										{work.scope}
									</span>
									{work.project ? (
										<span className="text-[0.75rem] text-muted-foreground leading-[1.5]">
											{work.project.name} · {work.project.location}
										</span>
									) : null}
									<span className="mt-auto inline-flex items-center gap-1.5 pt-[0.75rem] font-semibold text-[0.75rem] tracking-[0.04em]">
										View full detail
										<ArrowUpRight
											aria-hidden="true"
											className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
											size={15}
										/>
									</span>
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
