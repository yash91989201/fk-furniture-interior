import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useLocation,
} from "@tanstack/react-router";

import { siteName } from "@/lib/seo";
import { errorRenderPath } from "@/lib/site-urls";
import appCss from "../index.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{
				title: siteName,
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "16x16 32x32 48x48",
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon-32x32.png",
				sizes: "32x32",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
				sizes: "180x180",
			},
			{
				rel: "manifest",
				href: "/site.webmanifest",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const pathname = useLocation({ select: (location) => location.pathname });
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Outlet />
				{/* Hosts serve this document at unknown URLs. Its links work without hydration. */}
				{pathname === errorRenderPath ? null : <Scripts />}
			</body>
		</html>
	);
}
