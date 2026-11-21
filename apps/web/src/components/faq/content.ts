export interface FaqQuestion {
	answer: string;
	id: string;
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
			"Scope, drawings and sign-off: what to settle before production starts.",
		questions: [
			{
				id: "fk-faq-order-size",
				question:
					"What is the minimum order quantity for a hotel furniture project?",
				answer:
					"There is no fixed minimum order. Scope is quoted per BOQ and per project, whether that is a full property or a phased room renovation. Send your BOQ and the team will confirm what it can take for your dates.",
			},
			{
				id: "fk-faq-drawings",
				question:
					"Can you manufacture from architectural drawings, CAD and 3D renders?",
				answer:
					"Yes. Send 2D CAD drawings, 3D renders or a Bill of Quantities and we manufacture to those dimensions, design intent and finish specification. If a drawing is incomplete, we raise the gap with your team before cutting.",
			},
			{
				id: "fk-faq-mockup",
				question:
					"Can we inspect a mock-up room before mass production begins?",
				answer:
					"Yes. A mock-up room takes 3 weeks to build. Its dimensions and finishes are checked against the approved drawings, and mass production starts after your project team signs it off. On smaller scopes, approved material and finish samples do the same job.",
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
					"We use commercial-grade BWP marine plywood, high-density HDHMR, moisture-resistant MDF, and kiln-seasoned teak, ash and oak. Timber is treated against termites and borers. The exact substrate for each item in your BOQ is fixed in the approved specification and sample.",
			},
			{
				id: "fk-faq-finishes",
				question: "What surface finishes and polishing options are available?",
				answer:
					"Natural wood veneers, high-pressure laminates, PU polish in matte and high gloss, duco paint, PVD metal trims, brass inlay and integrated LED profiles. PU and veneer work is sprayed in our dust-free booth. The finish schedule is agreed from physical samples, so colour and sheen are settled before production.",
			},
			{
				id: "fk-faq-scope",
				question: "Do you make both loose furniture and fixed millwork?",
				answer:
					"Yes, both, from the same factory. Loose FF&E covers beds, lounge seating, study desks and dining sets. Fixed millwork covers wardrobes, wall panelling, vanity counters, minibar units and doors. One team makes both, so loose pieces and joinery are built to the same drawings.",
			},
			{
				id: "fk-faq-fire-safety",
				question: "How are fire safety and commercial quality checked?",
				answer:
					"Fire-retardant options are available on request for boards, laminates, foams and fabrics. Work is checked in the factory before dispatch for wood moisture content, joinery strength and finish consistency.",
			},
		],
	},
	{
		id: "fk-faq-support",
		title: "Delivery and support",
		intro: "Lead times, delivery, installation and warranty.",
		questions: [
			{
				id: "fk-faq-turnaround",
				question: "What turnaround should we plan for?",
				answer:
					"A mock-up room takes 3 weeks and mass production takes 8 weeks. The dated schedule is confirmed with the quotation once the drawings and BOQ are fixed.",
			},
			{
				id: "fk-faq-delivery",
				question: "Do you deliver and install across India?",
				answer:
					"Yes. We deliver and install across India. Furniture and fixed woodwork are finished at the factory, packed for transit and installed on site. Each delivery is planned around the project's location, site access and schedule.",
			},
			{
				id: "fk-faq-warranty",
				question: "What warranty applies to a commercial order?",
				answer: "Our manufacturing warranty is 5 years.",
			},
		],
	},
];

// Shared rhythm for the FAQ sections, matching the about page frame.
export const sectionFrame =
	"py-[clamp(3.5rem,7vw,6.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const sectionTitle =
	"m-0 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.025em] text-balance";
