import { AboutDrawing } from "@/components/home/about-drawing";

import { sectionFrame } from "./content";

export function FaqEnquiry() {
	return (
		<section
			aria-labelledby="faq-enquiry-title"
			className={`${sectionFrame} relative isolate grid min-h-[clamp(17rem,30vw,24rem)] content-center overflow-hidden bg-secondary text-secondary-foreground`}
			id="fk-faq-enquiry"
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
			<div className="relative z-[1] mx-auto max-w-[48rem] text-center max-[47.99rem]:text-left">
				<h2
					className="mx-auto mb-[clamp(1.75rem,3vw,2.25rem)] max-w-[21ch] text-balance font-medium text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.06] tracking-[-0.02em] max-[47.99rem]:ml-0"
					id="faq-enquiry-title"
				>
					Ask the project desk.
				</h2>
				<p className="mx-auto max-w-[65ch] text-pretty text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-[color-mix(in_oklch,var(--secondary-foreground)_82%,var(--secondary))] leading-[1.75] tracking-[0.005em]">
					Scope, rates, dates and warranty periods are settled per project. Send
					the rooms, the city, and any drawings or BOQ you already hold; we will
					answer against your brief.
				</p>
			</div>
		</section>
	);
}
