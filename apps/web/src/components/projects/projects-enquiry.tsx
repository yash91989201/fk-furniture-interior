import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { contactEmail, offices } from "@/components/contact/content";

import "@/styles/projects-enquiry.css";

export function ProjectsEnquiry() {
	const [gurgaon] = offices;
	const [phone] = gurgaon.phones;

	return (
		<section
			aria-labelledby="projects-enquiry-title"
			className="projects-enquiry-section outline-none"
			id="projects-enquiry"
			tabIndex={-1}
		>
			<div className="projects-enquiry-inner">
				<p className="projects-enquiry-label">Project enquiry</p>
				<h2 className="projects-enquiry-title" id="projects-enquiry-title">
					Planning a hotel, resort or hospitality project?
				</h2>
				<p className="projects-enquiry-lead">
					Start with the location, the scope and the drawings you hold.
				</p>
				<p className="projects-enquiry-body">
					Share the project location, the spaces involved and any drawings or
					BOQ you already have. The team will review them and reply with the
					next step.
				</p>
				<div className="projects-enquiry-actions">
					<Link
						className={buttonVariants({ className: "min-h-11" })}
						to="/contact/"
					>
						Discuss your project
						<ArrowUpRight aria-hidden="true" size={16} />
					</Link>
				</div>
				<p className="projects-enquiry-note">
					The contact form prepares an email in your mail app. Attach drawings
					or the BOQ there before sending.
				</p>
				<dl className="projects-enquiry-contacts">
					<div>
						<dt>Email</dt>
						<dd>
							<a href={`mailto:${contactEmail}`}>{contactEmail}</a>
						</dd>
					</div>
					<div>
						<dt>Phone</dt>
						<dd>
							<a href={phone.href}>{phone.display}</a>
						</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
