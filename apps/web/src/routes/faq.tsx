import { createFileRoute } from "@tanstack/react-router";

import { FaqEnquiry } from "@/components/faq/faq-enquiry";
import { FaqHero } from "@/components/faq/faq-hero";
import { FaqQuestions } from "@/components/faq/faq-questions";
import { Enquiry } from "@/components/home/enquiry";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";

const faqEnquiryCopy = {
	body: "Location, room count, and the drawings or BOQ you already hold. We will answer the open questions against your brief.",
	heading: "Send the brief.",
	title: "Your project, in your words.",
};

export const Route = createFileRoute("/faq")({
	component: FaqComponent,
	head: () => ({
		meta: [
			{ title: "FAQ · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Answers on project scope, drawings and BOQ manufacturing, materials, mock-up approval, finishes, lead times, delivery, installation and warranty for hospitality, residential and commercial furniture.",
			},
		],
	}),
});

function FaqComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a className="home-skip" href="#fk-faq">
				Skip to questions
			</a>
			<SiteNav compactStart />
			<main>
				<FaqHero />
				<FaqQuestions />
				<FaqEnquiry />
				<Enquiry copy={faqEnquiryCopy} presetCategory="" presetRequirement="" />
			</main>
			<SiteFooter />
		</div>
	);
}
