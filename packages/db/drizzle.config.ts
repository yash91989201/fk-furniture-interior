import { defineConfig } from "drizzle-kit";
import "varlock/auto-load";

export default defineConfig({
	schema: "./src/schema/auth.ts",
	out: "./src/migrations",
	dialect: "postgresql",
	schemaFilter: ["public"],
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
