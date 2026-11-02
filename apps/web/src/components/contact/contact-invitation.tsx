import { buttonVariants } from "@fk-furniture-interior/ui/components/button";

import { contactEmail, offices } from "./content";

const [gurgaon] = offices;

export function ContactInvitation() {
	return (
		<section
			aria-labelledby="contact-invitation-title"
			className="bg-secondary text-secondary-foreground"
		>
			<div className="grid gap-[clamp(1.75rem,4vw,4rem)] pt-[clamp(3.5rem,8vw,6.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(3.5rem,8vw,6.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
				<h2
					className="m-0 max-w-[17ch] text-balance font-medium text-[clamp(2rem,1.4rem+2.8vw,3.75rem)] leading-[1.06] tracking-[-0.03em]"
					id="contact-invitation-title"
				>
					Bring the drawings.{" "}
					<em className="italic">We will bring the questions.</em>
				</h2>
				<div className="max-w-[46ch]">
					<p className="m-0 text-pretty text-[0.9375rem] leading-[1.7] opacity-80">
						Tell us where the project is and what stage it is at. We will
						arrange a consultation, and discuss a site visit where it helps.
					</p>
					<div className="mt-[1.75rem] flex flex-wrap items-center gap-x-5 gap-y-3">
						<a
							className={buttonVariants({ className: "min-h-11" })}
							href={`mailto:${contactEmail}`}
						>
							Email the project desk
						</a>
						<a
							className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
							href={gurgaon.phones[0].href}
						>
							Call {gurgaon.phones[0].display}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
