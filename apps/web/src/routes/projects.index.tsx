import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { ClientStrip } from "@/components/projects/client-strip";
import { ExecutionHighlights } from "@/components/projects/execution-highlights";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectsEnquiry } from "@/components/projects/projects-enquiry";
import { ProjectsHero } from "@/components/projects/projects-hero";

export const Route = createFileRoute("/projects/")({
	component: ProjectsComponent,
	head: () => ({
		meta: [
			{ title: "Projects · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Resort De Coracao in Tapovan, Rishikesh, and the client list behind FK Furniture & Interior's hospitality furniture and interiors.",
			},
		],
	}),
});

function ProjectsComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a
				className="absolute top-3 left-[max(var(--home-gutter),env(safe-area-inset-left))] z-20 inline-flex min-h-11 -translate-y-[200%] items-center bg-primary px-4 font-medium text-primary-foreground text-sm focus:translate-y-0"
				href="#project-list"
			>
				Skip to projects
			</a>
			<SiteNav compactStart />
			<main>
				<ProjectsHero />
				<ProjectGrid />
				<ClientStrip />
				<ExecutionHighlights />
				<ProjectsEnquiry />
			</main>
			<SiteFooter />
		</div>
	);
}
