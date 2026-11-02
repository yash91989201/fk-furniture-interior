// Source: the supplied "Terms & Conditions" draft (nine proposed sections).
// That draft carries bracketed values for quotation validity, payment
// milestones, storage grace, warranty duration, jurisdiction and contact
// details, and dates itself "October 2026" without approval. None of those are
// published here: each stays a decision the business has to make, and the whole
// text waits for business and legal review before it is shown as binding.

export interface TermsSectionMeta {
	id: string;
	index: string;
	short: string;
	summary: string;
	title: string;
}

export const termsSections = {
	services: {
		id: "fk-terms-services",
		short: "Services and quotations",
		index: "01",
		title: "Services, quotations, and specification changes",
		summary:
			"Made-to-order work, how long a quotation holds, and what a change costs.",
	},
	orders: {
		id: "fk-terms-orders",
		short: "Orders and approvals",
		index: "02",
		title: "Orders, approvals, mock-ups, and natural material variations",
		summary:
			"What confirms an order, how prototypes are approved, and why timber moves.",
	},
	pricing: {
		id: "fk-terms-pricing",
		short: "Prices and payments",
		index: "03",
		title: "Prices, payments, taxes, and freight",
		summary: "Payment milestones, and what a quoted price excludes.",
	},
	delivery: {
		id: "fk-terms-delivery",
		short: "Delivery and installation",
		index: "04",
		title: "Delivery, installation, site readiness, and storage",
		summary:
			"Schedules, what the site must have ready, and holding charges after a missed date.",
	},
	warranty: {
		id: "fk-terms-warranty",
		short: "Warranty and quality",
		index: "05",
		title: "Warranty, quality, and exclusions",
		summary:
			"Manufacturing cover under commercial use, and what it never covers.",
	},
	intellectualProperty: {
		id: "fk-terms-property",
		short: "Intellectual property",
		index: "06",
		title: "Intellectual property",
		summary:
			"Drawings, designs, photography and catalogues owned by the company.",
	},
	liability: {
		id: "fk-terms-liability",
		short: "Limitation of liability",
		index: "07",
		title: "Limitation of liability",
		summary: "The ceiling on any claim for a product or fit-out.",
	},
	law: {
		id: "fk-terms-law",
		short: "Governing law",
		index: "08",
		title: "Governing law and jurisdiction",
		summary: "Which law applies, and where a dispute is heard.",
	},
	contact: {
		id: "fk-terms-contact",
		short: "Contact information",
		index: "09",
		title: "Contact information",
		summary: "Where questions about these terms are answered.",
	},
} as const satisfies Record<string, TermsSectionMeta>;

export const termsContents = [
	termsSections.services,
	termsSections.orders,
	termsSections.pricing,
	termsSections.delivery,
	termsSections.warranty,
	termsSections.intellectualProperty,
	termsSections.liability,
	termsSections.law,
	termsSections.contact,
] as const;

export const termsSectionIds = termsContents.map((section) => section.id);

export const termsScope =
	"These terms describe how FK Furniture & Interior quotes, manufactures, delivers and installs custom furniture and interior fit-outs, and how a disagreement with a client is handled. They are written for business clients — hotel developers, architects, contractors and companies commissioning a fit-out — who ask for a quotation, place an order or engage the manufacturing and installation teams.";

export const termsStatus =
	"This page carries the proposed wording, not published terms. No revision date has been approved, and nothing here binds either side until the open decisions below are settled and a legal review is signed off.";

export const openDecisions = [
	{
		label: "Quotation validity",
		detail:
			"How many days a quotation stays open before prices are revised against raw material costs.",
	},
	{
		label: "Payment milestones",
		detail:
			"The advance, production or dispatch, and final balance percentages in the standard schedule.",
	},
	{
		label: "Storage grace period",
		detail:
			"How many days after a scheduled delivery date warehousing charges may begin.",
	},
	{
		label: "Warranty duration",
		detail:
			"Years of cover for structural defects, joint failure and hardware under commercial use.",
	},
	{
		label: "Jurisdiction",
		detail:
			"The city and state courts with exclusive jurisdiction over a dispute.",
	},
	{
		label: "Contact details",
		detail:
			"The email address, phone number and factory or office address to publish for terms queries.",
	},
] as const;
