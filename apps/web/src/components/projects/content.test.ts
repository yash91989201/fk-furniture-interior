import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
	filterProjects,
	getProject,
	getRelatedProject,
	projectCategories,
	projectClients,
	projects,
} from "./content";

describe("project content", () => {
	it("keeps slugs unique and resolvable", () => {
		const slugs = projects.map((project) => project.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) {
			expect(getProject(slug)?.slug).toBe(slug);
		}
		expect(getProject("not-a-project")).toBeUndefined();
	});

	it("uses only defined sector filters", () => {
		const valid = new Set(
			projectCategories
				.filter((category) => category.id !== "all")
				.map((category) => category.id)
		);
		for (const project of projects) {
			expect(valid.has(project.category)).toBe(true);
		}
	});

	it("gives every card and gallery image a described, sized source", () => {
		const publicDir = join(import.meta.dir, "../../../public");
		for (const project of projects) {
			const images = [project.image, ...project.gallery];
			expect(
				project.gallery.some((image) => image.src === project.image.src)
			).toBe(false);
			for (const image of images) {
				expect(image.alt.length).toBeGreaterThan(0);
				expect(image.src.startsWith("/home/")).toBe(true);
				expect(image.width).toBeGreaterThan(0);
				expect(image.height).toBeGreaterThan(0);
				expect(image.provisional).toBe(true);
				expect(existsSync(join(publicDir, image.src))).toBe(true);
				for (const entry of image.srcSet?.split(",") ?? []) {
					const [src = ""] = entry.trim().split(" ");
					expect(existsSync(join(publicDir, src))).toBe(true);
				}
			}
		}
	});

	it("publishes a location only where the company profile supplies one", () => {
		const located = projects.filter((project) => project.location);
		expect(located.map((project) => project.slug)).toEqual([
			"resort-de-coracao",
		]);
		expect(getProject("resort-de-coracao")?.scopeStatus).toBe("verified");
	});

	it("filters by sector and finds a related project", () => {
		expect(filterProjects("all")).toHaveLength(projects.length);
		expect(filterProjects("nightclubs-banquets")).toHaveLength(1);
		expect(filterProjects("corporate-institutional")).toHaveLength(4);

		const resort = getProject("resort-de-coracao");
		expect(resort).toBeDefined();
		if (!resort) {
			return;
		}
		const related = getRelatedProject(resort);
		expect(related?.category).toBe("resorts-hotels");
		expect(related?.slug).not.toBe(resort.slug);
	});

	it("lists every named client once", () => {
		expect(new Set(projectClients).size).toBe(projectClients.length);
		for (const project of projects) {
			expect(projectClients).toContain(project.name);
		}
	});
});
