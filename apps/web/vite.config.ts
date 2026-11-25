import { ok } from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import {
	draftLegalPaths,
	errorRenderPath,
	siteUrl,
} from "./src/lib/site-urls.ts";

const nonIndexablePaths = new Set<string>(Object.values(draftLegalPaths));
const directoryIndex = /\/index\.html$/;
const errorDocument = "/404.html";

export default defineConfig({
	server: {
		port: 3001,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		tanstackStart(),
		nitro({
			preset: "static",
			prerender: { failOnError: true, routes: ["/", errorRenderPath] },
			modules: [
				(nitroApp) => {
					nitroApp.hooks.hook("prerender:generate", (route) => {
						if (route.route === errorRenderPath) {
							route.fileName = errorDocument;
						}
					});
					nitroApp.hooks.hook(
						"prerender:done",
						async ({ prerenderedRoutes }) => {
							const paths = new Set<string>();
							for (const { fileName } of prerenderedRoutes) {
								if (!(fileName && directoryIndex.test(fileName))) {
									continue;
								}

								const path = fileName.replace(directoryIndex, "/");
								if (!nonIndexablePaths.has(path)) {
									paths.add(path);
								}
							}
							ok(
								paths.has("/"),
								"The sitemap requires a prerendered homepage."
							);
							ok(
								prerenderedRoutes.some(
									(route) => route.fileName === errorDocument
								),
								"The static site requires a prerendered 404 document."
							);
							const urls = [...paths].sort().map((path) => {
								const loc = siteUrl(path).replaceAll("&", "&amp;");
								return `  <url><loc>${loc}</loc></url>`;
							});
							const sitemap = [
								'<?xml version="1.0" encoding="UTF-8"?>',
								'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
								...urls,
								"</urlset>",
								"",
							].join("\n");
							const robots = `User-agent: *\nDisallow:\n\nSitemap: ${siteUrl("/sitemap.xml")}\n`;
							const output = nitroApp.options.output.publicDir;
							await Promise.all([
								writeFile(join(output, "robots.txt"), robots),
								writeFile(join(output, "sitemap.xml"), sitemap),
							]);
						}
					);
				},
			],
		}),
		viteReact(),
	],
});
