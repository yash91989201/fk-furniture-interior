import { contactEmail, offices } from "./content";

const [gurgaon] = offices;

export function ContactHero() {
	return (
		<section
			aria-labelledby="contact-hero-title"
			className="grid gap-[clamp(1.5rem,3vw,2.5rem)] border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2.5rem,6vw,4.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<h1
				className="m-0 max-w-[24ch] text-balance text-[clamp(2.5rem,1.1rem+4.6vw,5rem)] leading-[0.98] tracking-[-0.03em]"
				id="contact-hero-title"
			>
				Let’s talk about <em className="italic">the space you have in mind.</em>
			</h1>
			<div className="flex flex-wrap items-baseline gap-[0.5rem_clamp(1rem,2.5vw,2rem)] text-[1rem] leading-[1.5] max-sm:flex-col max-sm:items-start max-sm:gap-[0.4rem] [&>*+*]:border-border [&>*+*]:border-l [&>*+*]:pl-[clamp(1rem,2.5vw,2rem)] max-sm:[&>*+*]:border-l-0 max-sm:[&>*+*]:pl-0">
				<a
					className="w-fit underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
					href={`mailto:${contactEmail}`}
				>
					{contactEmail}
				</a>
				<a
					className="w-fit underline decoration-1 decoration-primary underline-offset-4 [font-variant-numeric:tabular-nums] hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
					href={gurgaon.phones[0].href}
				>
					{gurgaon.phones[0].display}
				</a>
				<p className="m-0 text-muted-foreground">Offices in Gurgaon and Goa</p>
			</div>
			<p className="m-0 max-w-[62ch] text-pretty text-[1rem] text-muted-foreground leading-[1.65]">
				Tell us about the project, the room or the brief. We will read it
				against the drawings or BOQ you already hold, and take the first
				conversation from there.
			</p>
		</section>
	);
}
