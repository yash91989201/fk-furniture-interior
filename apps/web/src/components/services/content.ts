// Supplied project photographs; alts describe what the frame shows.
export const photos = {
	guestRoom: {
		alt: "Guest room with a made bed, timber desk, artwork and sheer curtains",
		caption: "Completed guest-room furniture and joinery",
		src: "/home/lounge.webp",
	},
	fitted: {
		alt: "Guest room with a fitted wardrobe, tea station and bedside storage",
		caption: "Fitted wardrobe, tea station and bedside storage",
		src: "/home/workplace.webp",
	},
	hero: {
		alt: "Hotel lobby with a chandelier and lounge seating",
		caption: "Completed lobby seating and joinery",
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
		lead: "Beds, seating, counters and tables are built for how the room is used rather than adapted from a standard range.",
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
			"Panelling, cladding, ceilings, doors, partitions and screens, made and fitted as one interior.",
		lead: "Woodwork that has to meet a drawing as closely as it meets the room’s structure.",
		scopes: [
			"Wall panelling and cladding",
			"Wooden ceilings and rafter details",
			"Door frames, doors and architraves",
			"Partitions and screen dividers",
			"Fitted joinery for lobbies and corridors",
			"Reception and buffet surrounds",
		],
		note: {
			title: "Drawn together",
			text: "Panelling, ceilings and doors are set out with the furniture, so junctions, reveals and fixings are resolved before production.",
		},
	},
	{
		anchor: "modular-furniture",
		title: "Modular furniture and storage",
		summary:
			"Wardrobes, vanities, kitchenettes and office storage, built to a module and a plan.",
		lead: "Storage and cabinetry are sized for the space, then finished to match the rest of the interior.",
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
			"Production from the drawings, specifications or bill of quantities your team already holds.",
		lead: "We can make to another designer’s or contractor’s documentation, with the specification confirmed before production.",
		scopes: [
			"CAD drawings and 3D renders",
			"BOQs and dimensioned plans",
			"Approved samples and mock-ups",
			"Batch production and packing",
			"Finish matching across a run",
		],
		note: {
			title: "Send what you hold",
			text: "Share the CAD package, BOQ or a set of dimensioned drawings. We will confirm what is missing before quoting.",
		},
	},
] as const;

export const materials = [
	{
		term: "Boards and substrates",
		options: "Plywood, HDHMR and MDF grades",
		text: "The board is chosen against the approved specification, the way the piece is used and the project budget.",
	},
	{
		term: "Solid wood",
		options: "Teak, ash and oak",
		text: "Species are discussed against the design, the intended finish and the budget, then confirmed as a specified option.",
	},
	{
		term: "Surface finishes",
		options: "Veneers, laminates and PU polish",
		text: "Finish direction is matched to an approved sample, with sheen and colour checked before production.",
	},
	{
		term: "Hardware and details",
		options: "Channels, hinges and fittings",
		text: "Hardware is selected for the piece and the specification, including soft-close and concealed options where agreed.",
	},
] as const;

export const processSteps = [
	{
		title: "Review the project documents",
		text: "Drawings, floor plans, specifications and the BOQ are read together to understand scope, quantities and site conditions.",
	},
	{
		title: "Agree materials and samples",
		text: "Materials, finishes and hardware are fixed against the specification. A sample or mock-up is agreed where the project calls for one.",
	},
	{
		title: "Manufacture and inspect",
		text: "Production follows the approved drawings and finish. Pieces are checked against the agreed specification before packing.",
	},
	{
		title: "Pack, deliver and install",
		text: "Protective packing, transport and installation are coordinated for the agreed project scope.",
	},
] as const;

export const distinctions = [
	{
		term: "Made in house",
		text: "Furniture is produced in our own manufacturing setup rather than bought in and resold.",
	},
	{
		term: "From drawing to installation",
		text: "Design, specification and execution sit with one team.",
	},
	{
		term: "Specification and samples first",
		text: "Drawings, BOQ and approved finishes guide production and inspection.",
	},
	{
		term: "One coordinated scope",
		text: "Making and installation are planned together for the agreed work.",
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
