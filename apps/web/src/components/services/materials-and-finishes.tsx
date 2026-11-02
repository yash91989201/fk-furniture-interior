import {
	bodyCopy,
	factTerm,
	factText,
	leadCopy,
	materials,
	sectionFrame,
	sectionTitle,
} from "./content";

export function MaterialsAndFinishes() {
	return (
		<section
			aria-labelledby="services-materials-title"
			className={`${sectionFrame} bg-secondary text-secondary-foreground`}
			id="fk-materials"
		>
			<div className="grid items-end gap-x-[clamp(2rem,5vw,5rem)] gap-y-[1.5rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
				<h2 className={sectionTitle} id="services-materials-title">
					Materials are chosen against the specification.
				</h2>
				<p
					className={`${bodyCopy} max-w-[52ch] text-secondary-foreground/80 lg:justify-self-end`}
				>
					Options are selected against each project&apos;s specification,
					budget, use and approved samples, then confirmed in the BOQ.
				</p>
			</div>
			<dl className="m-0 mt-[clamp(2rem,4vw,3.25rem)] grid gap-x-[clamp(2rem,5vw,4rem)] gap-y-0 p-0 md:grid-cols-2">
				{materials.map((material) => (
					<div
						className="border-secondary-foreground/25 border-t pt-[1.1rem]"
						key={material.term}
					>
						<dt className={factTerm}>{material.term}</dt>
						<dd className="m-0 mt-[0.35rem]">
							<p className="m-0 font-sans font-semibold text-[0.75rem] text-primary tracking-[0.09em]">
								{material.options}
							</p>
							<p className={`${factText} text-secondary-foreground/80`}>
								{material.text}
							</p>
						</dd>
					</div>
				))}
			</dl>
			<aside className="mt-[clamp(2rem,4vw,3rem)] border-secondary-foreground/25 border-t pt-[1.5rem]">
				<p className={`${leadCopy} max-w-[62ch] text-secondary-foreground/80`}>
					A material option is not a performance claim. Moisture, wear, fire and
					treatment claims are published only where the project carries approved
					test evidence.
				</p>
				<p className="m-0 mt-[1rem] max-w-[62ch] text-pretty text-[0.9375rem] text-secondary-foreground/80 leading-[1.6]">
					Final availability is confirmed against the approved specification and
					BOQ.
				</p>
			</aside>
		</section>
	);
}
