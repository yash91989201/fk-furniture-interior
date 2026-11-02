import { type MouseEvent, useCallback } from "react";

import {
	filterProjects,
	type ProjectCategoryId,
	projectCategories,
} from "./content";

export function ProjectFilters({
	active,
	onChange,
}: {
	active: ProjectCategoryId;
	onChange: (category: ProjectCategoryId) => void;
}) {
	const visible = filterProjects(active).length;
	const activeCategory = projectCategories.find(
		(category) => category.id === active
	);

	const handleFilterClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const category = projectCategories.find(
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
			aria-labelledby="project-filter-title"
			className="border-border border-b bg-card py-[clamp(1.75rem,3vw,2.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
			id="project-filters"
		>
			<div className="flex flex-col gap-[1.25rem] lg:flex-row lg:items-end lg:justify-between lg:gap-8">
				<div>
					<h2
						className="m-0 font-heading font-medium text-[clamp(1.35rem,1.1rem+0.7vw,1.75rem)] leading-[1.2] tracking-[-0.015em]"
						id="project-filter-title"
					>
						Browse by sector
					</h2>
					<p
						aria-live="polite"
						className="mt-[0.4rem] text-[0.8125rem] text-muted-foreground leading-[1.5]"
					>
						{activeCategory?.label ?? "All Projects"} · {visible}{" "}
						{visible === 1 ? "project" : "projects"}
					</p>
				</div>
				<fieldset className="flex flex-wrap gap-2 border-0 p-0">
					<legend className="sr-only">Filter projects by sector</legend>
					{projectCategories.map((category) => {
						const selected = category.id === active;
						const count = filterProjects(category.id).length;

						return (
							<button
								aria-controls="project-list"
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
									{count} {count === 1 ? "project" : "projects"}
								</span>
							</button>
						);
					})}
				</fieldset>
			</div>
		</section>
	);
}
