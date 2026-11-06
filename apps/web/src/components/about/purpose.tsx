import {
	factText,
	groupLabel,
	sectionFrame,
	sectionTitle,
	values,
} from "./content";

export function Purpose() {
	return (
		<section
			aria-labelledby="about-purpose-title"
			className={`${sectionFrame} grid grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-x-[clamp(2rem,6vw,6rem)] gap-y-[2.5rem] selection:bg-primary selection:text-primary-foreground max-lg:grid-cols-[minmax(0,1fr)]`}
			id="fk-purpose"
		>
			<div className="self-start lg:sticky lg:top-[calc(var(--home-nav-compact)+1.5rem)]">
				<h2
					className={`${sectionTitle} mb-[clamp(1.5rem,3vw,2.5rem)] max-w-[12ch]`}
					id="about-purpose-title"
				>
					What we are working towards.
				</h2>
				<div className="border-border border-t pt-[0.85rem]">
					<h3 className={`${groupLabel} mb-[0.6rem]`}>Vision</h3>
					<p className="m-0 max-w-[30ch] text-pretty text-[0.9375rem] leading-[1.6]">
						A fit-out partner that boutique hotels, resorts, designers and
						homeowners return to, project after project.
					</p>
				</div>
			</div>
			<div>
				<p className="m-0 max-w-[22ch] text-balance font-heading font-medium text-[clamp(2rem,1.2rem+3vw,3.75rem)] leading-[1.1] tracking-[-0.025em]">
					To turn a client’s design intent into furniture that{" "}
					<em className="underline decoration-[0.09em] decoration-primary underline-offset-[0.14em]">
						lasts
					</em>
					, made in our own workshop to the specification signed off.
				</p>
				<h3 className={`${groupLabel} mt-[clamp(3rem,6vw,5rem)]`}>
					How we work
				</h3>
				<ul className="m-0 mt-[clamp(1.25rem,2vw,1.75rem)] grid list-none gap-[clamp(1.75rem,3vw,2.5rem)] p-0">
					{values.map((value) => (
						<li
							className="before:mb-4 before:block before:h-[3px] before:w-8 before:bg-primary before:content-['']"
							key={value.label}
						>
							<p className="m-0 font-heading font-medium text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] leading-[1.18] tracking-[-0.015em]">
								{value.label}
							</p>
							<p className={`${factText} text-muted-foreground`}>
								{value.text}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
