import {
	createRouter as createTanStackRouter,
	lazyRouteComponent,
} from "@tanstack/react-router";

import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
	createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		trailingSlash: "always",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: () => <Loader />,
		defaultNotFoundComponent: lazyRouteComponent(
			() => import("./components/page-not-found"),
			"PageNotFound"
		),
	});

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
