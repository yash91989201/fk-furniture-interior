import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInvitation } from "@/components/contact/contact-invitation";
import { OfficeDetails } from "@/components/contact/office-details";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";

export const Route = createFileRoute("/contact")({
	component: ContactComponent,
	head: () => ({
		meta: [
			{ title: "Contact · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Discuss a furniture, interior or turnkey project with FK Furniture & Interior. Offices in Gurgaon and Goa, with direct phone and email contact.",
			},
		],
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
				<OfficeDetails />
				<ContactInvitation />
			</main>
			<SiteFooter />
		</div>
	);
}
