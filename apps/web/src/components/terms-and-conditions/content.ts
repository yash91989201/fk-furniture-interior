// The client has confirmed quotation validity, payment milestones, storage
// grace, warranty duration and jurisdiction. The remaining gaps are listed in
// openDecisions. The whole text waits for business and legal review before it
// is shown as binding.

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
			"Made-to-order work, the 20-day quotation, and what a change costs.",
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
		summary:
			"Payment milestones, cancellation, and what a quoted price excludes.",
	},
	delivery: {
		id: "fk-terms-delivery",
		short: "Delivery and installation",
		index: "04",
		title: "Delivery, installation, site readiness, and storage",
		summary:
			"Lead times, what the site must have ready, and storage after a missed delivery.",
	},
	warranty: {
		id: "fk-terms-warranty",
		short: "Warranty and quality",
		index: "05",
		title: "Warranty, quality, and exclusions",
		summary: "The 5-year manufacturing warranty, and what it does not cover.",
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
		summary:
			"Which law applies, and that disputes are heard in Gurugram, Haryana.",
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
		label: "Final 10% payment",
		detail:
			"Payments confirmed so far total 90% (50% + 30% + 10%). The final 10% and its due date are not defined.",
	},
	{
		label: "Cancellation scope",
		detail:
			'The supplied wording is "Cancelled order is non refundable." It is not settled whether this covers the advance only or all payments.',
	},
	{
		label: "Storage rate",
		detail:
			"The 10-day grace period is confirmed. The storage charge rate is not.",
	},
	{
		label: "Mock-up approval",
		detail:
			"Whether mock-up approval is mandatory on every project or only above a stated order size.",
	},
	{
		label: "Revision date",
		detail: "No revision date has been approved.",
	},
	{
		label: "Legal sign-off",
		detail: "Business and legal review is pending.",
	},
] as const;
