import evlog from "evlog/nitro/v3";
import { defineConfig } from "nitro";

export default defineConfig({
	serverDir: "./server",
	rollupConfig: {
		external: ["react", "react-dom", "react-dom/server", "react/jsx-runtime"],
	},
	experimental: {
		asyncContext: true,
	},
	modules: [
		evlog({
			env: { service: "fk-furniture-interior-web" },
		}),
	],
});
