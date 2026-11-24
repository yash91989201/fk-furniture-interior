import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";

import { contactEmail } from "@/components/contact/content";

import "@/styles/services-enquiry.css";

import { enquiryChecklist } from "./content";

export function ServicesEnquiry() {
	return (
		<section
			aria-labelledby="services-enquiry-title"
			className="enquiry-section"
			id="fk-enquiry"
		>
			<div className="enquiry-inner">
				<h2 className="enquiry-title" id="services-enquiry-title">
					Have drawings or a BOQ?
				</h2>
				<p className="enquiry-body">
					Tell us the type of space, the location and the approximate scope.
					Send drawings, renders or a BOQ if you have them. We quote per BOQ and
					project, with no fixed minimum.
				</p>
				<ul className="enquiry-list">
					{enquiryChecklist.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
				<div className="enquiry-actions">
					<Link
						className={buttonVariants({ className: "min-h-11" })}
						to="/contact"
					>
						Start a project enquiry
					</Link>
					<a className="enquiry-email" href={`mailto:${contactEmail}`}>
						Email the project desk
					</a>
				</div>
				<p className="enquiry-note">
					The contact form opens a draft in your own mail app. It does not
					upload or store anything. Attach drawings or a BOQ to that email
					before you send it.
				</p>
			</div>
		</section>
	);
}
