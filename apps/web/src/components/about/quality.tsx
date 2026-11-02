import { AboutDrawing } from "@/components/home/about-drawing";

import {
	checks,
	factTerm,
	factText,
	sectionFrame,
	sectionTitle,
} from "./content";

export function Quality() {
	return (
		<section
			aria-labelledby="about-quality-title"
			className={`${sectionFrame} relative isolate overflow-hidden bg-secondary text-secondary-foreground`}
			id="fk-quality"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -inset-x-[20%] -inset-y-[24%] z-[-2] select-none text-secondary-foreground [animation:home-about-drift_44s_ease-in-out_infinite_alternate] max-[47.99rem]:opacity-[0.45] motion-reduce:[animation:none]"
			>
				<AboutDrawing />
			</div>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-[-1] bg-[color-mix(in_oklch,var(--secondary)_88%,transparent)] backdrop-blur-[8px] [mask-image:radial-gradient(ellipse_farthest-corner_at_center,#000_15%,rgb(0_0_0/95%)_35%,rgb(0_0_0/65%)_55%,rgb(0_0_0/30%)_78%,transparent_100%)]"
			/>
			<div className="relative z-[1] grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-end gap-[clamp(1.25rem,4vw,4rem)] max-lg:grid-cols-[minmax(0,1fr)] max-lg:items-start max-lg:gap-[1.75rem]">
				<h2 className={`${sectionTitle} max-w-[18ch]`} id="about-quality-title">
					Nothing ships before it is checked.
				</h2>
				<p className="m-0 max-w-[42ch] text-pretty text-[clamp(1rem,0.95rem+0.2vw,1.0625rem)] text-[color-mix(in_oklch,var(--secondary-foreground)_80%,var(--secondary))] leading-[1.6]">
					Every piece is inspected before packing, and the specification that
					was approved is the specification delivered.
				</p>
			</div>
			<dl className="relative z-[1] mt-[clamp(2rem,4vw,3rem)] grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-x-[clamp(1.25rem,4vw,4rem)] max-lg:grid-cols-[repeat(2,minmax(0,1fr))] max-[47.99rem]:grid-cols-[minmax(0,1fr)]">
				{checks.map((check) => (
					<div
						className="border-[color-mix(in_oklch,var(--secondary-foreground)_26%,var(--secondary))] border-t py-[1.1rem]"
						key={check.term}
					>
						<dt className={factTerm}>{check.term}</dt>
						<dd
							className={`${factText} text-[color-mix(in_oklch,var(--secondary-foreground)_80%,var(--secondary))]`}
						>
							{check.text}
						</dd>
					</div>
				))}
			</dl>
			<div className="relative z-[1] mt-[clamp(1.5rem,3vw,2.25rem)] border-[color-mix(in_oklch,var(--secondary-foreground)_26%,var(--secondary))] border-t pt-[1rem]">
				<p className="m-0 max-w-[60ch] text-[0.9375rem] text-[color-mix(in_oklch,var(--secondary-foreground)_72%,var(--secondary))] leading-[1.55]">
					Treatments, finishes and hardware are confirmed per project against
					the approved sample.
				</p>
			</div>
		</section>
	);
}
