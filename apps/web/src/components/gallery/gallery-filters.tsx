import { type MouseEvent, useCallback } from "react";

import {
	type GalleryCategoryId,
	galleryCategories,
	galleryWorks,
} from "./content";

export function GalleryFilters({
	active,
	onChange,
}: {
	active: GalleryCategoryId;
	onChange: (category: GalleryCategoryId) => void;
}) {
	const visible =
		active === "all"
			? galleryWorks.length
			: galleryWorks.filter((work) => work.category === active).length;
	const activeCategory = galleryCategories.find(
		(category) => category.id === active
	);
	const label = activeCategory?.label ?? "All work";

	const handleFilterClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const category = galleryCategories.find(
				(item) => item.id === event.currentTarget.dataset.category
			);
			if (category) {
				onChange(category.id);
			}
		},
		[onChange]
	);

	return (
		<section
			aria-labelledby="gallery-filter-title"
			className="border-border border-b bg-card py-[clamp(1.75rem,3vw,2.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
			id="gallery-filters"
		>
			<div className="flex flex-col gap-[1.25rem] lg:flex-row lg:items-end lg:justify-between lg:gap-8">
				<div>
					<h2
						className="m-0 font-heading font-medium text-[clamp(1.35rem,1.1rem+0.7vw,1.75rem)] leading-[1.2] tracking-[-0.015em]"
						id="gallery-filter-title"
					>
						Browse by space
					</h2>
					<p
						aria-live="polite"
						className="mt-[0.4rem] text-[0.8125rem] text-muted-foreground leading-[1.5]"
					>
						{label} · {visible} {visible === 1 ? "work" : "works"} published
					</p>
				</div>
				<fieldset className="flex flex-wrap gap-2 border-0 p-0">
					<legend className="sr-only">Filter gallery by space</legend>
					{galleryCategories.map((category) => {
						const selected = category.id === active;
						const count =
							category.id === "all"
								? galleryWorks.length
								: galleryWorks.filter((work) => work.category === category.id)
										.length;

						return (
							<button
								aria-pressed={selected}
								className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 text-left text-[0.8125rem] leading-[1.25] transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 ${
									selected
										? "border-secondary bg-secondary text-secondary-foreground"
										: "border-border bg-transparent text-muted-foreground hover:border-foreground/50 hover:text-foreground"
								}`}
								data-category={category.id}
								key={category.id}
								onClick={handleFilterClick}
								type="button"
							>
								<span>{category.label}</span>
								<span
									aria-hidden="true"
									className={`text-[0.6875rem] tabular-nums ${
										selected
											? "text-secondary-foreground/70"
											: "text-muted-foreground"
									}`}
								>
									{String(count).padStart(2, "0")}
								</span>
								<span className="sr-only">
									{count} {count === 1 ? "work" : "works"}
								</span>
							</button>
						);
					})}
				</fieldset>
			</div>
		</section>
	);
}
