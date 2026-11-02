/** biome-ignore-all lint/performance/noJsxPropsBind: gallery state handlers */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type {
	GalleryCategoryId,
	GalleryWork,
} from "@/components/gallery/content";
import { CraftStrip } from "@/components/gallery/craft-strip";
import { GalleryEnquiry } from "@/components/gallery/gallery-enquiry";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { usePrefersReducedMotion } from "@/hooks/use-media";

export const Route = createFileRoute("/gallery")({
	component: GalleryComponent,
	head: () => ({
		meta: [
			{ title: "Gallery · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Completed furniture and interior work for hotel guest rooms, lobbies, restaurants, wall panelling and executive spaces, with verified scope and specification details.",
			},
		],
	}),
});

function GalleryComponent() {
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState<GalleryCategoryId>("all");
	const [selected, setSelected] = useState<GalleryWork | null>(null);
	const [reference, setReference] = useState("");
	const [focusEnquiry, setFocusEnquiry] = useState(false);

	useEffect(() => {
		if (!focusEnquiry) {
			return;
		}
		const section = document.getElementById("gallery-enquiry");
		section?.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "start",
		});
		section?.focus({ preventScroll: true });
		setFocusEnquiry(false);
	}, [focusEnquiry, reduced]);

	function handleClose() {
		setSelected(null);
	}

	function handleOpen(work: GalleryWork) {
		setSelected(work);
	}

	function handleInquire(itemReference: string) {
		setSelected(null);
		setReference(itemReference);
		setFocusEnquiry(true);
	}

	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a
				className="absolute top-3 left-[max(var(--home-gutter),env(safe-area-inset-left))] z-20 inline-flex min-h-11 -translate-y-[200%] items-center bg-primary px-4 font-medium text-primary-foreground text-sm focus:translate-y-0"
				href="#gallery-work"
			>
				Skip to gallery work
			</a>
			<SiteNav compactStart />
			<main>
				<GalleryHero />
				<GalleryFilters active={active} onChange={setActive} />
				<GalleryGrid active={active} onOpen={handleOpen} />
				<CraftStrip />
				<GalleryEnquiry reference={reference} />
			</main>
			<SiteFooter />
			<GalleryLightbox
				onClose={handleClose}
				onInquire={handleInquire}
				work={selected}
			/>
		</div>
	);
}
