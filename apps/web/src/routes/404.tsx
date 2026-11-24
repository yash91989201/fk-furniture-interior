import { createFileRoute } from "@tanstack/react-router";
import { PageNotFound } from "@/components/page-not-found";
import { siteName } from "@/lib/seo";

export const Route = createFileRoute("/404")({
	component: PageNotFound,
	head: () => ({
		meta: [
			{ title: `Page not found | ${siteName}` },
			{ name: "robots", content: "noindex" },
		],
	}),
});
