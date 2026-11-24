import { siteUrl } from "./site-urls";

export const siteName = "FK Furniture & Interior";

const defaultShareImage = {
	alt: "Green armchairs and brass tables in the Resort De Coracao lobby",
	src: "/home/guest-bath-1280.webp",
};

interface PageHeadOptions {
	description: string;
	image?: { alt: string; src: string };
	noindex?: boolean;
	path: string;
	title: string;
}

export function pageHead({
	description,
	image = defaultShareImage,
	noindex = false,
	path,
	title,
}: PageHeadOptions) {
	const url = siteUrl(path);
	const imageUrl = siteUrl(image.src);
	const pageTitle = `${title} | ${siteName}`;

	return {
		links: [{ rel: "canonical", href: url }],
		meta: [
			{ title: pageTitle },
			{ name: "description", content: description },
			...(noindex ? [{ name: "robots", content: "noindex" }] : []),
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: siteName },
			{ property: "og:title", content: pageTitle },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: imageUrl },
			{ property: "og:image:alt", content: image.alt },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: pageTitle },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },
			{ name: "twitter:image:alt", content: image.alt },
		],
	};
}

export function jsonLd(data: Record<string, unknown>) {
	return {
		type: "application/ld+json",
		children: JSON.stringify({ "@context": "https://schema.org", ...data }),
	};
}
