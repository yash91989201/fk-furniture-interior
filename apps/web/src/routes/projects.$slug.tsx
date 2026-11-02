import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { ProjectGallery } from "@/components/project-detail/project-gallery";
import { ProjectHeader } from "@/components/project-detail/project-header";
import { ProjectNavigation } from "@/components/project-detail/project-navigation";
import { ProjectOverview } from "@/components/project-detail/project-overview";
import { ProjectScope } from "@/components/project-detail/project-scope";
import { getProject, getRelatedProject } from "@/components/projects/content";

export const Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = getProject(params.slug);
		if (!project) {
			throw notFound();
		}
		return { project, related: getRelatedProject(project) };
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? `${loaderData.project.name} · FK Furniture & Interior`
					: "Project not found · FK Furniture & Interior",
			},
			{
				name: "description",
				content: loaderData
					? loaderData.project.intro
					: "The requested project could not be found.",
			},
		],
	}),
	component: ProjectDetailComponent,
	notFoundComponent: ProjectNotFound,
});

function ProjectDetailComponent() {
	const { project, related } = Route.useLoaderData();

	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a
				className="absolute top-3 left-[max(var(--home-gutter),env(safe-area-inset-left))] z-20 inline-flex min-h-11 -translate-y-[200%] items-center bg-primary px-4 font-medium text-primary-foreground text-sm focus:translate-y-0"
				href="#project-overview"
			>
				Skip to project overview
			</a>
			<SiteNav compactStart />
			<main>
				<ProjectHeader project={project} />
				<ProjectOverview project={project} />
				<ProjectScope project={project} />
				<ProjectGallery project={project} />
				<ProjectNavigation related={related} />
			</main>
			<SiteFooter />
		</div>
	);
}

function ProjectNotFound() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<SiteNav compactStart />
			<main className="flex min-h-[70svh] flex-col justify-center border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(3rem,7vw,6rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]">
				<p className="m-0 font-sans font-semibold text-[0.75rem] text-muted-foreground tracking-[0.09em]">
					Project
				</p>
				<h1 className="m-0 mt-[0.9rem] max-w-[16ch] text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
					Project not found.
				</h1>
				<p className="m-0 mt-[1.1rem] max-w-[48ch] text-pretty text-[1rem] text-muted-foreground leading-[1.7]">
					This project page does not exist, or the address has changed. Browse
					the full portfolio to find the work you were looking for.
				</p>
				<div className="mt-[clamp(1.75rem,3vw,2.5rem)]">
					<Link
						className={buttonVariants({ className: "min-h-11" })}
						to="/projects"
					>
						View all projects
					</Link>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
