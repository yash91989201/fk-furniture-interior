import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { contactEmail, offices } from "@/components/contact/content";

import {
	projectsBody,
	projectsLabel,
	projectsLead,
	projectsSection,
	projectsTitle,
} from "./content";

export function ProjectsEnquiry() {
	const [gurgaon] = offices;
	const [phone] = gurgaon.phones;

	return (
		<section
			aria-labelledby="projects-enquiry-title"
			className={`${projectsSection} bg-background outline-none`}
			id="projects-enquiry"
			tabIndex={-1}
		>
			<div className="grid gap-[clamp(2rem,5vw,5rem)] border-border border-t pt-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
				<div>
					<p className={projectsLabel}>Project enquiry</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem] max-w-[18ch]`}
						id="projects-enquiry-title"
					>
						Have a new hotel, home, workplace or commercial project?
					</h2>
					<p className={`${projectsLead} mt-[1.35rem] max-w-[28ch]`}>
						Start with the location, the scope and the drawings you hold.
					</p>
					<p className={`${projectsBody} mt-[1rem] max-w-[50ch]`}>
						Share the project location, the spaces involved and any drawings or
						BOQ you already have. The studio will review them and reply with the
						next practical step.
					</p>
				</div>
				<div className="flex flex-col justify-end gap-[1.25rem]">
					<Link
						className={buttonVariants({ className: "min-h-11 w-fit" })}
						to="/contact"
					>
						Discuss your project
						<ArrowUpRight aria-hidden="true" size={16} />
					</Link>
					<p className="m-0 max-w-[36ch] text-[0.8125rem] text-muted-foreground leading-[1.6]">
						The contact form prepares an email in your mail app. Attach drawings
						or the BOQ there before sending.
					</p>
					<dl className="m-0 grid border-border border-t">
						<div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.75rem]">
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								Email
							</dt>
							<dd className="m-0 break-words text-[0.8125rem]">
								<a
									className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									href={`mailto:${contactEmail}`}
								>
									{contactEmail}
								</a>
							</dd>
						</div>
						<div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.75rem]">
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								Phone
							</dt>
							<dd className="m-0 text-[0.8125rem]">
								<a
									className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									href={phone.href}
								>
									{phone.display}
								</a>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
