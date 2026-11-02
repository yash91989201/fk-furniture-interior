import { buttonVariants } from "@fk-furniture-interior/ui/components/button";

import { AboutDrawing } from "@/components/home/about-drawing";
import { contactEmail, offices } from "./content";

const [gurgaon] = offices;

export function ContactInvitation() {
	return (
		<section
			aria-labelledby="contact-invitation-title"
			className="home-section home-about about-quiet"
		>
			<div aria-hidden="true" className="home-about-backdrop">
				<div className="home-about-plan">
					<AboutDrawing />
				</div>
			</div>
			<div className="about-quiet-inner">
				<h2 id="contact-invitation-title">
					Bring the drawings.{" "}
					<span className="home-about-heading-end">
						We will bring the <em>questions.</em>
					</span>
				</h2>
				<p>
					Tell us where the project is and what stage it is at. We will arrange
					a consultation, and discuss a site visit where it helps.
				</p>
				<div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-sm:justify-start">
					<a
						className={buttonVariants({ className: "min-h-11" })}
						href={`mailto:${contactEmail}`}
					>
						Email the project desk
					</a>
					<a
						className={buttonVariants({
							className: "min-h-11",
							variant: "link",
						})}
						href={gurgaon.phones[0].href}
					>
						Call {gurgaon.phones[0].display}
					</a>
				</div>
			</div>
		</section>
	);
}
