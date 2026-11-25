import { createFileRoute } from "@tanstack/react-router";

import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { BlogIntro } from "@/components/blog/blog-intro";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
	component: BlogComponent,
	head: () =>
		pageHead({
			title: "Blog",
			description:
				"Visit the FK Furniture & Interior blog for articles from the team.",
			path: "/blog/",
		}),
});

function BlogComponent() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<a className="home-skip" href="#blog-content">
				Skip to content
			</a>
			<SiteNav compactStart />
			<main id="blog-content">
				<BlogIntro />
				<BlogEmptyState />
			</main>
			<SiteFooter />
		</div>
	);
}
