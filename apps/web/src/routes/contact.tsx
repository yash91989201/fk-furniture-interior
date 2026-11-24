import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInvitation } from "@/components/contact/contact-invitation";
import { OfficeDetails } from "@/components/contact/office-details";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
	component: ContactComponent,
	head: () =>
		pageHead({
			title: "Contact Our Gurugram & Goa Offices",
			description:
				"Discuss a furniture or interiors project with our Gurugram or Goa office. Send your brief, drawings or bill of quantities.",
			path: "/contact/",
		}),
});

function ContactComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a className="home-skip" href="#contact-form">
				Skip to the enquiry form
			</a>
			<SiteNav compactStart />
			<main>
				<ContactHero />
				<ContactForm />
				<ContactInvitation />
				<OfficeDetails />
			</main>
			<SiteFooter />
		</div>
	);
}
