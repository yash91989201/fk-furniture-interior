/** biome-ignore-all lint/performance/noJsxPropsBind: home page wires section callbacks */
import { createFileRoute } from "@tanstack/react-router";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useState } from "react";
import { About } from "@/components/home/about";
import { Craft } from "@/components/home/craft";
import { Enquiry } from "@/components/home/enquiry";
import { Furniture } from "@/components/home/furniture";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";
import { Projects } from "@/components/home/projects";
import { Services } from "@/components/home/services";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import homeCss from "@/styles/home.css?url";

const SCROLL_OPTIONS = {
	allowNestedScroll: true,
	anchors: true,
	autoRaf: true,
	lerp: 0.1,
	syncTouch: false,
	wheelMultiplier: 0.75,
};

import { contactEmail, gurgaonOffice } from "@/components/contact/content";
import { jsonLd, pageHead, siteName } from "@/lib/seo";
import { siteUrl } from "@/lib/site-urls";

export const Route = createFileRoute("/")({
	component: HomeComponent,
	head: () => {
		const head = pageHead({
			title: "Custom Furniture & Interiors",
			description:
				"Bespoke furniture, architectural woodwork and interiors for hotels, resorts, homes and workplaces, made in our own factory.",
			path: "/",
		});
		return {
			...head,
			links: [...head.links, { rel: "stylesheet", href: homeCss }],
			scripts: [
				jsonLd({
					"@type": "Organization",
					name: siteName,
					url: siteUrl("/"),
					logo: siteUrl("/brand/logo-full-768.webp"),
					email: contactEmail,
					telephone: gurgaonOffice.phones[0].display,
				}),
			],
		};
	},
});

function HomeComponent() {
	const reduced = usePrefersReducedMotion();
	const [mounted, setMounted] = useState(false);
	const [presetCategory, setPresetCategory] = useState("");
	const [presetRequirement, setPresetRequirement] = useState("");

	useEffect(() => {
		setMounted(true);
	}, []);

	function handleEnquire(category: string, requirement: string) {
		setPresetCategory(category);
		setPresetRequirement(requirement);
	}

	return (
		<div className="home-page">
			{mounted && !reduced ? (
				<ReactLenis options={SCROLL_OPTIONS} root />
			) : null}
			<a className="home-skip" href="#fk-projects">
				Skip to selected project
			</a>
			<SiteNav />
			<main>
				<Hero />
				<Projects />
				<About />
				<Services />
				<Furniture onEnquire={handleEnquire} />
				<Craft />
				<Process />
				<Enquiry
					key={`${presetCategory}-${presetRequirement}`}
					presetCategory={presetCategory}
					presetRequirement={presetRequirement}
				/>
			</main>
			<SiteFooter />
		</div>
	);
}
