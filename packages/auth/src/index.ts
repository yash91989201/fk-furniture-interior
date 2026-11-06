import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import type { Database } from "@fk-furniture-interior/db";
import {
	account,
	authRelations,
	session,
	user,
	verification,
} from "@fk-furniture-interior/db/schema/auth";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export interface AuthConfig {
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;
}

export function createAuth(env: AuthConfig, database: Database) {
	return betterAuth({
		database: drizzleAdapter(database, {
			provider: "pg",
			schema: { user, session, account, verification, authRelations },
		}),
		trustedOrigins: [env.BETTER_AUTH_URL],
		emailAndPassword: { enabled: true },
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		plugins: [tanstackStartCookies()],
	});
}

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];
