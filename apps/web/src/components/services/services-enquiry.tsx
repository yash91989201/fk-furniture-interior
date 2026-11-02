import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";

import { contactEmail } from "@/components/contact/content";

import {
	bodyCopy,
	enquiryChecklist,
	sectionFrame,
	sectionTitle,
} from "./content";

export function ServicesEnquiry() {
	return (
		<section
			aria-labelledby="services-enquiry-title"
			className={`${sectionFrame} border-border border-t bg-card`}
			id="fk-enquiry"
		>
			<div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[2.5rem] lg:grid-cols-2">
				<div className="min-w-0">
					<h2
						className={`${sectionTitle} max-w-[18ch]`}
						id="services-enquiry-title"
					>
						Have drawings, or just the room?
					</h2>
					<p className={`${bodyCopy} mt-[1.15rem] max-w-[46ch]`}>
						Share the type of space, project location, approximate scope, and
						any drawings or BOQ already held. The more complete the brief, the
						more useful the first conversation.
					</p>
				</div>
				<div className="min-w-0">
					<ul className="m-0 list-none p-0">
						{enquiryChecklist.map((item) => (
							<li
								className="border-border border-t py-[0.7rem] text-[0.9375rem] leading-[1.5]"
								key={item}
							>
								{item}
							</li>
						))}
					</ul>
					<div className="mt-[1.75rem] flex flex-wrap items-center gap-x-[1.5rem] gap-y-[0.75rem]">
						<Link
							className={buttonVariants({ className: "min-h-11" })}
							to="/contact"
						>
							Start a project enquiry
						</Link>
						<a
							className="inline-flex min-h-11 items-center underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
							href={`mailto:${contactEmail}`}
						>
							Email the project desk
						</a>
					</div>
				</div>
			</div>
			<p className="mt-[clamp(2rem,4vw,3rem)] max-w-[54ch] border-border border-t pt-[1rem] text-[0.8125rem] text-muted-foreground leading-[1.55]">
				The contact form prepares an email in your own mail app. It does not
				upload or store files. Attach drawings or a BOQ to that email before
				sending.
			</p>
		</section>
	);
}
