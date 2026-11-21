// Supplied project photographs; alts describe what the frame shows.
export const photos = {
	guestRoom: {
		alt: "Hotel guest room with a bed, timber desk, artwork and sheer curtains",
		caption: "Guest room at Resort De Coracao",
		src: "/home/lounge.webp",
	},
	fitted: {
		alt: "Hotel guest room with a fitted wardrobe, tea station and bed",
		caption: "Hotel guest room with a fitted wardrobe and tea station",
		src: "/home/workplace.webp",
	},
	hero: {
		alt: "Hotel lobby at night with a chandelier, lounge seating and a staircase",
		caption: "Hotel lobby at night",
		src: "/home/guest-room.webp",
	},
} as const;

export interface ServiceOffering {
	anchor: string;
	image?: { alt: string; caption: string; src: string };
	lead: string;
	note?: { text: string; title: string };
	scopes: readonly string[];
	summary: string;
	title: string;
}

export const offerings: readonly ServiceOffering[] = [
	{
		anchor: "custom-furniture",
		title: "Custom furniture",
		summary:
			"Guest rooms, shared spaces, homes and workplaces, made to the room and the approved finish.",
		lead: "Beds, seating, counters and tables are built to the dimensions and drawings of each room.",
		scopes: [
			"Beds, headboards and luggage racks",
			"Desks and minibar units",
			"Lobby and reception seating",
			"Reception counters",
			"Restaurant and banquet tables",
			"Bar units and booth seating",
			"Executive desks and conference tables",
			"Loose furniture and centre tables",
		],
		image: photos.guestRoom,
	},
	{
		anchor: "architectural-woodwork",
		title: "Architectural woodwork and fit-outs",
		summary:
			"Panelling, cladding, ceilings, doors, partitions and screens, made and fitted with the furniture.",
		lead: "Woodwork is made to your drawing and fitted to the room’s structure on site.",
		scopes: [
			"Wall panelling and cladding",
			"Wooden ceilings and rafter details",
			"Door frames, doors and architraves",
			"Partitions and screen dividers",
			"Fitted joinery for lobbies and corridors",
			"Reception and buffet surrounds",
		],
		note: {
			title: "Set out with the furniture",
			text: "Panelling, ceilings and doors are planned together with the furniture. Junctions, reveals and fixings are checked at mock-up stage, before mass production.",
		},
	},
	{
		anchor: "modular-furniture",
		title: "Modular furniture and storage",
		summary:
			"Wardrobes, vanities, kitchenettes and office storage, built to a module and a plan.",
		lead: "Storage and cabinetry are sized for the room and finished to match the rest of the interior.",
		scopes: [
			"Wardrobes and storage systems",
			"Bathroom and hospitality vanities",
			"Kitchenettes and tea stations",
			"Office partitions and credenzas",
			"Filing and utility cabinetry",
			"Bedside and corridor storage",
		],
		image: photos.fitted,
	},
	{
		anchor: "contract-manufacturing",
		title: "Contract manufacturing",
		summary:
			"Production from the CAD drawings, renders or bill of quantities your team already holds.",
		lead: "We manufacture from CAD drawings, renders and BOQs, and confirm the specification with you before production.",
		scopes: [
			"CAD drawings and 3D renders",
			"BOQs and dimensioned plans",
			"Approved samples and mock-ups",
			"Batch production and packing for delivery",
			"Finish matching across a run",
		],
		note: {
			title: "Send what you hold",
			text: "Share the CAD package, BOQ or dimensioned drawings. We will tell you what is missing before we quote.",
		},
	},
] as const;

export const materials = [
	{
		term: "Boards and substrates",
		options:
			"Commercial-grade BWP marine plywood, high-density HDHMR, moisture-resistant MDF",
		text: "Board is chosen to suit how the piece is used and the approved specification.",
	},
	{
		term: "Solid wood",
		options: "Kiln-seasoned teak, ash and oak",
		text: "Timber is treated against termites and borers.",
	},
	{
		term: "Surface finishes",
		options: "Natural veneer, laminates and PU",
		text: "Finishes are applied in a dust-free PU and veneer spray booth. Sheen and colour are checked against the approved mock-up.",
	},
	{
		term: "Hardware and details",
		options: "Commercial-grade hardware",
		text: "Hardware is specified for each piece and confirmed in the BOQ.",
	},
] as const;

export const processSteps = [
	{
		title: "Review the brief",
		text: "We read your drawings, renders and BOQ together to understand scope, quantities and site conditions, then quote.",
	},
	{
		title: "Build and approve a mock-up",
		text: "Materials, finishes and hardware are fixed against the specification. The mock-up room takes 3 weeks and is approved before mass production begins.",
	},
	{
		title: "Manufacture",
		text: "Production follows the approved mock-up and finish. Mass production takes 8 weeks. The factory runs CNC routing, automatic edge banding and a hydraulic cold press.",
	},
	{
		title: "Pack, deliver and install",
		text: "We deliver and install across India, planned around location, site access and schedule.",
	},
] as const;

export const distinctions = [
	{
		term: "Made in house",
		text: "A 22-person in-house team works from a 4,500 sq ft factory with CNC routing, automatic edge banding and a hydraulic cold press.",
	},
	{
		term: "From drawing to installation",
		text: "Specification, manufacturing, delivery and installation are handled by one team.",
	},
	{
		term: "Mock-up before production",
		text: "Where a project calls for one, a mock-up room (3 weeks) is approved before mass production (8 weeks).",
	},
	{
		term: "Capacity",
		text: "The factory produces up to 20 guest rooms per month.",
	},
	{
		term: "Manufacturing warranty",
		text: "Five years on manufacturing, under normal commercial use.",
	},
] as const;

export const enquiryChecklist = [
	"The type of space and how it is used",
	"The project location",
	"The approximate scope or room count",
	"Any drawings, BOQ or references you hold",
] as const;

// Shared Tailwind roles, matching the type and spacing ladder used on About.
export const sectionFrame =
	"py-[clamp(3.5rem,7vw,6.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const sectionTitle =
	"m-0 max-w-[20ch] text-balance font-medium text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.08] tracking-[-0.025em]";

export const leadCopy =
	"m-0 max-w-[30ch] text-pretty font-heading font-medium text-[clamp(1.4rem,1.15rem+1vw,1.9rem)] leading-[1.42] tracking-[-0.01em]";

export const bodyCopy =
	"m-0 text-pretty text-[clamp(1rem,0.96rem+0.14vw,1.0625rem)] text-muted-foreground leading-[1.7]";

export const factRow = "border-border border-t py-[1.1rem]";

export const factTerm =
	"m-0 font-heading font-medium text-[clamp(1.15rem,1rem+0.4vw,1.4rem)] leading-[1.2] tracking-[-0.01em]";

export const factText =
	"m-0 mt-[0.4rem] max-w-[42ch] text-pretty text-[0.9375rem] leading-[1.55]";

export const figureCaption =
	"pt-[0.6rem] text-[0.75rem] leading-[1.45] text-muted-foreground";
