import {
	factTerm,
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
			className={sectionFrame}
			id="fk-purpose"
		>
			<h2
				className={`${sectionTitle} mb-[clamp(2rem,4vw,3rem)] max-w-[16ch]`}
				id="about-purpose-title"
			>
				What we are working towards.
			</h2>
			<div className="grid grid-cols-[minmax(0,7fr)_minmax(0,4fr)] items-end gap-[clamp(1.5rem,4vw,4rem)] max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-[1.75rem]">
				<p className="m-0 max-w-[28ch] text-balance font-heading font-medium text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.16] tracking-[-0.02em]">
					To turn a client’s design intent into furniture that lasts, made in
					our own workshop to the specification signed off.
				</p>
				<div className="border-border border-t pt-[0.85rem]">
					<h3 className={`${groupLabel} mb-[0.6rem]`}>Vision</h3>
					<p className="m-0 max-w-[34ch] text-pretty text-[0.9375rem] leading-[1.6]">
						A fit-out partner that boutique hotels, resorts, designers and
						homeowners return to, project after project.
					</p>
				</div>
			</div>
			<div className="mt-[clamp(2.25rem,4vw,3.25rem)] border-border border-t pt-[0.85rem]">
				<h3 className={groupLabel}>How we work</h3>
			</div>
			<ul className="m-0 mt-[clamp(1.25rem,2vw,1.75rem)] grid list-none grid-cols-[repeat(3,minmax(0,1fr))] gap-[clamp(1.25rem,3vw,2.5rem)] p-0 max-lg:grid-cols-[repeat(2,minmax(0,1fr))] max-[47.99rem]:grid-cols-[minmax(0,1fr)] max-[47.99rem]:[&>li:first-child]:border-t-0">
				{values.map((value) => (
					<li className="border-border border-t pt-[1rem]" key={value.label}>
						<p className={factTerm}>{value.label}</p>
						<p className={`${factText} text-muted-foreground`}>{value.text}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
