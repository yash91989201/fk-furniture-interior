import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { MaterialsAndFinishes } from "@/components/services/materials-and-finishes";
import { ProjectProcess } from "@/components/services/project-process";
import { ServiceOfferings } from "@/components/services/service-offerings";
import { ServicesEnquiry } from "@/components/services/services-enquiry";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesOverview } from "@/components/services/services-overview";
import { WhyFk } from "@/components/services/why-fk";

export const Route = createFileRoute("/services")({
	component: ServicesComponent,
	head: () => ({
		meta: [
			{ title: "Services · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Custom furniture, architectural woodwork, modular storage and contract manufacturing for hospitality, residential and workplace projects, from drawings or a BOQ.",
			},
		],
	}),
});

function ServicesComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a
				className="fixed top-3 left-[max(var(--home-gutter),env(safe-area-inset-left))] z-20 inline-flex min-h-11 -translate-y-[200%] items-center bg-primary px-4 font-medium text-primary-foreground text-sm focus:translate-y-0"
				href="#fk-overview"
			>
				Skip to services
			</a>
			<SiteNav compactStart />
			<main>
				<ServicesHero />
				<ServicesOverview />
				<ServiceOfferings />
				<MaterialsAndFinishes />
				<ProjectProcess />
				<WhyFk />
				<ServicesEnquiry />
			</main>
			<SiteFooter />
		</div>
	);
}
