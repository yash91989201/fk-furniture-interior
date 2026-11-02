import { createFileRoute } from "@tanstack/react-router";
import { visitCopy } from "@/components/about/content";
import { AboutHero } from "@/components/about/hero";
import { Manufacturing } from "@/components/about/manufacturing";
import { Purpose } from "@/components/about/purpose";
import { Quality } from "@/components/about/quality";
import { Story } from "@/components/about/story";
import { Team } from "@/components/about/team";
import { Enquiry } from "@/components/home/enquiry";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";

export const Route = createFileRoute("/about")({
	component: AboutComponent,
	head: () => ({
		meta: [
			{ title: "About · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"A family craft that began in Gurgaon in 1986, making bespoke furniture and turnkey interiors for homes, workplaces and hospitality spaces.",
			},
		],
	}),
});

function AboutComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a className="home-skip" href="#fk-story">
				Skip to the story
			</a>
			<SiteNav compactStart />
			<main>
				<AboutHero />
				<Story />
				<Manufacturing />
				<Quality />
				<Purpose />
				<Team />
				<Enquiry copy={visitCopy} presetCategory="" presetRequirement="" />
			</main>
			<SiteFooter />
		</div>
	);
}
