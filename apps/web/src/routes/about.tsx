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
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
	component: AboutComponent,
	head: () =>
		pageHead({
			title: "About Our Furniture Workshop",
			description:
				"Explore FK’s family craft roots in Gurugram, its furniture workshop and the people behind its furniture and interior projects.",
			path: "/about/",
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
				<Enquiry
					copy={visitCopy}
					presetCategory=""
					presetRequirement="Factory visit"
				/>
			</main>
			<SiteFooter />
		</div>
	);
}
