import { createFileRoute } from "@tanstack/react-router";

import { Homepage } from "@/components/home/homepage";

export const Route = createFileRoute("/")({
	component: HomeComponent,
	head: () => ({
		meta: [
			{ title: "FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Interior design, bespoke furniture and turnkey execution for homes, workplaces and hospitality spaces.",
			},
		],
	}),
});

function HomeComponent() {
	return <Homepage />;
}
