import { contactEmail, offices } from "./content";

const [gurgaon] = offices;

export function ContactHero() {
	return (
		<section
			aria-labelledby="contact-hero-title"
			className="border-border border-b bg-background pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2.5rem,6vw,4.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] [padding-top:calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))]"
		>
			<div className="grid items-end gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
				<div>
					<p className="m-0 font-sans font-semibold text-[0.75rem] text-muted-foreground tracking-[0.09em]">
						Contact
					</p>
					<h1
						className="mt-[1.25rem] max-w-[17ch] text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] leading-[1.02] tracking-[-0.03em]"
						id="contact-hero-title"
					>
						Let’s talk about{" "}
						<em className="italic">the space you have in mind.</em>
					</h1>
				</div>
				<div className="max-w-[46ch]">
					<p className="m-0 text-pretty text-[clamp(1rem,0.95rem+0.22vw,1.125rem)] text-muted-foreground leading-[1.65]">
						Tell us about the project, the room or the brief. We will read it
						against the drawings or BOQ you already hold, and take the first
						conversation from there.
					</p>
					<div className="mt-[1.5rem] grid gap-[0.4rem] border-border border-t pt-[1rem] text-[0.9375rem] leading-[1.5]">
						<a
							className="w-fit underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
							href={`mailto:${contactEmail}`}
						>
							{contactEmail}
						</a>
						<a
							className="w-fit underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
							href={gurgaon.phones[0].href}
						>
							{gurgaon.phones[0].display}
						</a>
						<p className="m-0 text-muted-foreground">
							Offices in Gurgaon and Goa
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
