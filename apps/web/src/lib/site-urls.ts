export const siteOrigin = "https://fkfurnitureinterior.com";
export const errorRenderPath = "/404/";

export const draftLegalPaths = {
	privacy: "/privacy-policy/",
	terms: "/terms-and-conditions/",
} as const;

export function siteUrl(path: string) {
	return new URL(path, siteOrigin).href;
}
