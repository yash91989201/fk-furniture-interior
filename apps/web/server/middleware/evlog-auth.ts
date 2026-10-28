import {
	type BetterAuthInstance,
	createAuthMiddleware,
} from "evlog/better-auth";
import { useLogger } from "evlog/nitro/v3";
import { defineHandler } from "nitro";

import { auth } from "../../src/services";

const identifyUser = createAuthMiddleware(auth as BetterAuthInstance, {
	exclude: ["/api/auth/**"],
	maskEmail: true,
});

export default defineHandler(async (event) => {
	await identifyUser(useLogger(event), event.req.headers, event.url.pathname);
});
