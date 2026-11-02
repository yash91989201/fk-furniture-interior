import { describe, expect, it } from "bun:test";

import { buildEnquiryMailto, contactEmail } from "./content";

describe("buildEnquiryMailto", () => {
	it("addresses the verified email and encodes the enquiry", () => {
		const href = buildEnquiryMailto({
			city: "Panaji",
			company: "Casa Verde",
			details: "Lobby and 24 guest rooms.",
			email: "asha@example.com",
			name: "Asha Rao",
			phone: "+91 90000 00000",
			requirement: "Turnkey project",
		});
		const url = new URL(href);

		expect(href.startsWith(`mailto:${contactEmail}?`)).toBe(true);
		expect(url.searchParams.get("subject")).toBe(
			"Project enquiry — Asha Rao, Panaji"
		);
		const body = url.searchParams.get("body") ?? "";
		expect(body).toContain("Phone: +91 90000 00000");
		expect(body).toContain("Company or hotel: Casa Verde");
		expect(body).toContain("Requirement: Turnkey project");
		expect(body).toContain("\n\nProject details:\nLobby and 24 guest rooms.");
	});

	it("omits empty optional fields", () => {
		const body = new URL(
			buildEnquiryMailto({
				city: "Goa",
				details: "A dining table.",
				email: "dev@example.com",
				name: "Dev",
				requirement: "Furniture quotation",
			})
		).searchParams.get("body");

		expect(body).not.toContain("Phone:");
		expect(body).not.toContain("Company or hotel:");
		expect(body).toContain("Name: Dev");
	});
});
