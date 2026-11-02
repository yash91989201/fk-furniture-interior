// Answers follow the FAQ draft; terms the company has not settled yet carry
// `pending` so the page states them as proposed rather than agreed.

export interface FaqQuestion {
	answer: string;
	id: string;
	pending: boolean;
	question: string;
}

export interface FaqGroup {
	id: string;
	intro: string;
	questions: FaqQuestion[];
	title: string;
}

export const faqGroups: FaqGroup[] = [
	{
		id: "fk-faq-planning",
		title: "Planning a project",
		intro:
			"Scope, drawings and sign-off — what to settle before a single panel is cut.",
		questions: [
			{
				id: "fk-faq-order-size",
				question:
					"What is the minimum order quantity for a hotel furniture project?",
				answer:
					"We work on B2B hospitality projects — boutique hotels, luxury resorts, banquets and offices — and take on both full-property furnishing and phased room renovations. No fixed minimum order quantity is published: share your BOQ with our project desk and the team will confirm the scope it can take for your dates.",
				pending: true,
			},
			{
				id: "fk-faq-drawings",
				question:
					"Can you manufacture from architectural drawings, CAD and 3D renders?",
				answer:
					"Yes. Send 2D CAD drawings, 3D renders or a Bill of Quantities and the workshop manufactures to those dimensions, design intent and finish specification. Where a drawing is incomplete, the gap is raised with your team before cutting rather than settled on the factory floor.",
				pending: false,
			},
			{
				id: "fk-faq-mockup",
				question:
					"Can we inspect a mock-up room before mass production begins?",
				answer:
					"For larger projects a physical mock-up room or sample unit is built first. Its dimensions, finishes and strength are checked against the approved drawings, and bulk production starts only after your project team signs the prototype off. On smaller scopes, approved material and finish samples serve the same purpose.",
				pending: false,
			},
		],
	},
	{
		id: "fk-faq-making",
		title: "Materials and making",
		intro:
			"What a piece is made of, how it is finished, and what is checked before it leaves the factory.",
		questions: [
			{
				id: "fk-faq-substrates",
				question: "Which substrates and core materials do you use?",
				answer:
					"Material is specified piece by piece and approved as a sample before production. The range we work with: commercial-grade BWP marine plywood, high-density HDHMR board, moisture-resistant MDF, and kiln-seasoned solid hardwood — teak, ash and oak — treated against termites and borers. The exact substrate for your BOQ is fixed in the approved specification.",
				pending: true,
			},
			{
				id: "fk-faq-finishes",
				question: "What surface finishes and polishing options are available?",
				answer:
					"Natural wood veneers, scratch-resistant high-pressure laminates, PU polish in matte and high gloss, duco paint, PVD metal trims, brass inlay and integrated LED profiles. The finish schedule is agreed from physical samples, so colour and sheen are settled before the run rather than after it.",
				pending: false,
			},
			{
				id: "fk-faq-scope",
				question: "Do you make both loose furniture and fixed millwork?",
				answer:
					"Both, under one roof. Loose FF&E covers beds, lounge seating, study desks and dining sets; fixed millwork covers wardrobes, wall panelling, vanity counters, minibar units and doors. One team owns both, so the joinery and the loose pieces meet at the same tolerances.",
				pending: false,
			},
			{
				id: "fk-faq-fire-safety",
				question: "How are fire safety and commercial quality checked?",
				answer:
					"Fire-retardant boards, laminates, foams and fabrics are used on request; what is available for your specification, and its supporting documentation, is confirmed with the quotation. Every batch is inspected in the factory for wood moisture content, joinery strength and finish consistency before dispatch.",
				pending: true,
			},
		],
	},
	{
		id: "fk-faq-support",
		title: "Delivery and support",
		intro: "Dates, site work, and what carries on after handover.",
		questions: [
			{
				id: "fk-faq-turnaround",
				question: "What turnaround should we plan for?",
				answer:
					"Timelines follow project scale and design complexity. Our working plan allows roughly 2–3 weeks for mock-up room units after drawing approval, and roughly 6–8 weeks for mass production after mock-up approval. Both figures are indicative: the dated schedule is confirmed with the quotation once the drawings and BOQ are fixed.",
				pending: true,
			},
			{
				id: "fk-faq-delivery",
				question: "Do you deliver and install outside your own cities?",
				answer:
					"Furniture and fixed woodwork are finished at the factory, packed for transit and installed by our own carpentry crew. Delivery and installation beyond Gurgaon and Goa are planned per project, subject to location, site access and schedule; the project desk confirms coverage for your site before an order is placed.",
				pending: true,
			},
			{
				id: "fk-faq-warranty",
				question: "What warranty applies to a commercial order?",
				answer:
					"Manufacturing warranty is quoted per project. Draft terms cover structural integrity and factory workmanship for one to three years, with the exact period written into your contract. Hardware carries the manufacturer’s own warranty, documented at handover.",
				pending: true,
			},
		],
	},
];

// Shared rhythm for the FAQ sections, matching the about page frame.
export const sectionFrame =
	"py-[clamp(3.5rem,7vw,6.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const sectionTitle =
	"m-0 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.025em] text-balance";
