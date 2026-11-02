import { type ProjectImage, projectImages } from "./project-images";

export const projectCategories = [
	{ id: "all", label: "All Projects" },
	{ id: "resorts-hotels", label: "Luxury Resorts & Hotels" },
	{ id: "villas-boutique", label: "Villas & Boutique Stays" },
	{ id: "nightclubs-banquets", label: "Nightclubs & Banquets" },
	{ id: "corporate-institutional", label: "Corporate & Institutional" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectCategoryId = ProjectCategory["id"];
export type ProjectSector = Exclude<ProjectCategoryId, "all">;

export interface ProjectScopeGroup {
	items: readonly string[];
	title: string;
}

export interface ProjectFact {
	label: string;
	value: string;
}

export interface Project {
	category: ProjectSector;
	facts: readonly ProjectFact[];
	featured?: boolean;
	gallery: readonly ProjectImage[];
	image: ProjectImage;
	intro: string;
	location?: string;
	name: string;
	overview: string;
	scope: readonly ProjectScopeGroup[];
	/**
	 * "verified" uses the company profile. "draft" is scope supplied by the
	 * projects brief and still needs client confirmation before publication.
	 */
	scopeStatus: "verified" | "draft";
	slug: string;
	summary: string;
}

export function categoryLabel(category: ProjectSector): string {
	const match = projectCategories.find((item) => item.id === category);
	return match?.label ?? category;
}

/**
 * Resort De Coracao is the only project with a verified description in the
 * company profile. Every other scope below is draft content from the projects
 * brief; keep the "draft" flag until the client confirms each record.
 */
export const projects: readonly Project[] = [
	{
		category: "resorts-hotels",
		featured: true,
		slug: "resort-de-coracao",
		name: "Resort De Coracao",
		location: "Tapovan, Rishikesh",
		image: projectImages.lobby,
		summary:
			"Turnkey interiors from lobby and reception to guest rooms and dining, with furniture, lighting and finishes delivered as one scope.",
		intro:
			"A complete turnkey interior fit-out for a boutique resort in Tapovan, Rishikesh, designed and executed in-house from concept through final installation.",
		overview:
			"FK Furniture & Interior designed and executed the complete interior fit-out for Resort De Coracao in Tapovan, Rishikesh. The scope covered the lobby and reception, guest rooms and dining, together with the furniture, lighting and finishes. Every element was designed and executed in-house by the team, from concept through final installation.",
		facts: [
			{ label: "Location", value: "Tapovan, Rishikesh" },
			{ label: "Project type", value: "Turnkey hospitality interior" },
			{
				label: "Work scope",
				value:
					"Lobby and reception, guest rooms, dining, furniture, lighting and finishes",
			},
		],
		scopeStatus: "verified",
		scope: [
			{
				title: "Lobby and reception",
				items: [
					"Reception counter and front-of-house joinery",
					"Lobby and lounge seating",
					"Lighting and finish coordination",
				],
			},
			{
				title: "Guest rooms",
				items: [
					"Beds, headboards and bedside furniture",
					"Wardrobes and storage",
					"Desks, luggage racks and room joinery",
				],
			},
			{
				title: "Dining",
				items: ["Dining tables and seating", "Restaurant joinery and finishes"],
			},
			{
				title: "Furniture and lighting",
				items: [
					"Bespoke furniture made in the company’s own setup",
					"Lighting specified with the interior",
				],
			},
			{
				title: "Finishes",
				items: [
					"Surface and material selection",
					"Finishes carried through the fit-out",
				],
			},
		],
		gallery: [
			projectImages.lobbyChandelier,
			projectImages.dining,
			projectImages.lounge,
		],
	},
	{
		category: "resorts-hotels",
		slug: "de-alturas-resort",
		name: "De Alturas Resort",
		image: projectImages.guestRoomWardrobe,
		summary:
			"Premium suite interiors, vanity units, modular wardrobes and acoustic wall cladding.",
		intro:
			"A resort engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"De Alturas Resort is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Luxury resort interiors" },
			{
				label: "Work scope",
				value:
					"Suite interiors, vanity units, wardrobes and acoustic panelling",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Suite interiors",
				items: [
					"Premium suite interiors",
					"Vanity units",
					"Modular wardrobes",
					"Acoustic wall cladding",
				],
			},
		],
		gallery: [
			projectImages.guestRoomBed,
			projectImages.lobbyChandelier,
			projectImages.lounge,
		],
	},
	{
		category: "resorts-hotels",
		slug: "de-bells-resort",
		name: "De Bells Resort",
		image: projectImages.lounge,
		summary:
			"Lobby lounge seating, centre tables, outdoor and patio setups, and wooden ceiling rafters.",
		intro:
			"A resort engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"De Bells Resort is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Resort interiors" },
			{
				label: "Work scope",
				value:
					"Lobby seating, centre tables, outdoor setups and ceiling rafters",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Lobby and lounge",
				items: ["Lobby lounge seating", "Centre tables"],
			},
			{
				title: "Outdoor areas",
				items: ["Resort outdoor and patio setups"],
			},
			{
				title: "Ceilings",
				items: ["Wooden ceiling rafters"],
			},
		],
		gallery: [
			projectImages.lobbyLounge,
			projectImages.dining,
			projectImages.lobby,
		],
	},
	{
		category: "resorts-hotels",
		slug: "hotel-omega",
		name: "Hotel Omega",
		image: projectImages.guestRoomWardrobe,
		summary:
			"Full floor room setups, study desks, minibar consoles and hallway wooden partitions.",
		intro:
			"A hotel engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Hotel Omega is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Hotel interiors" },
			{
				label: "Work scope",
				value:
					"Guest room setups, study desks, minibar consoles and corridor partitions",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Guest rooms",
				items: ["Full floor room setups", "Study desks", "Minibar consoles"],
			},
			{
				title: "Corridors",
				items: ["Hallway decorative wooden partitions"],
			},
		],
		gallery: [
			projectImages.guestRoomBalcony,
			projectImages.lobbyChandelier,
			projectImages.lobbyLounge,
		],
	},
	{
		category: "villas-boutique",
		slug: "eden-stays",
		name: "Eden Stays",
		image: projectImages.guestRoomBed,
		summary:
			"Minimalist boutique room furniture, floating side tables and veneer-finished TV units.",
		intro:
			"A boutique stay listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Eden Stays is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Boutique stay interiors" },
			{
				label: "Work scope",
				value: "Boutique room furniture, side tables and TV units",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Guest rooms",
				items: [
					"Minimalist boutique room furniture",
					"Floating side tables",
					"Veneer-finished TV units",
				],
			},
		],
		gallery: [
			projectImages.guestRoomBalcony,
			projectImages.lobbyLounge,
			projectImages.dining,
		],
	},
	{
		category: "villas-boutique",
		slug: "mdn-villas-by-beacholics",
		name: "MDN Villas by Beacholics",
		image: projectImages.dining,
		summary:
			"Bespoke villa woodwork, custom sofa frames, open-plan dining tables and wooden door frames.",
		intro:
			"A villa engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"MDN Villas by Beacholics is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Villa interiors" },
			{
				label: "Work scope",
				value: "Bespoke woodwork, sofa frames, dining tables and door frames",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Villa woodwork",
				items: ["Luxury villa bespoke woodwork", "Custom sofa frames"],
			},
			{
				title: "Dining",
				items: ["Open-plan dining tables"],
			},
			{
				title: "Doors",
				items: ["Wooden door frames"],
			},
		],
		gallery: [
			projectImages.guestRoomBed,
			projectImages.lounge,
			projectImages.lobby,
		],
	},
	{
		category: "nightclubs-banquets",
		slug: "the-white-night-club",
		name: "The White Night Club",
		image: projectImages.dining,
		summary:
			"Architectural bar counters, high-traffic booth and banquet seating, and backlit decorative wall panelling.",
		intro:
			"A nightclub engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"The White Night Club is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Nightclub and banquet interiors" },
			{
				label: "Work scope",
				value: "Bar counters, booth seating and backlit wall panelling",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Bar",
				items: ["Custom architectural bar counters"],
			},
			{
				title: "Seating",
				items: ["High-traffic booth seating", "Banquet seating"],
			},
			{
				title: "Walls",
				items: ["Backlit decorative wall panelling"],
			},
		],
		gallery: [
			projectImages.lounge,
			projectImages.lobby,
			projectImages.lobbyChandelier,
		],
	},
	{
		category: "corporate-institutional",
		slug: "lohias-group",
		name: "Lohia’s Group",
		image: projectImages.lobbyChandelier,
		summary:
			"Executive boardroom tables, director desks, acoustic conference room panelling and storage credenzas.",
		intro:
			"A corporate engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Lohia’s Group is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Corporate interiors" },
			{
				label: "Work scope",
				value:
					"Boardroom tables, director desks, conference panelling and credenzas",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Boardrooms",
				items: [
					"Executive boardroom tables",
					"Acoustic conference room panelling",
				],
			},
			{
				title: "Workspaces",
				items: ["Director desks", "Storage credenzas"],
			},
		],
		gallery: [
			projectImages.lobbyLounge,
			projectImages.exterior,
			projectImages.lobby,
		],
	},
	{
		category: "corporate-institutional",
		slug: "aroon-aviation",
		name: "Aroon Aviation",
		image: projectImages.exterior,
		summary:
			"Commercial reception workstations, front office counters and modular administrative storage.",
		intro:
			"A corporate engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Aroon Aviation is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Corporate interiors" },
			{
				label: "Work scope",
				value: "Reception workstations, front office counters and storage",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Reception",
				items: ["Commercial reception workstations", "Front office counters"],
			},
			{
				title: "Administration",
				items: ["Modular administrative office storage"],
			},
		],
		gallery: [
			projectImages.lobbyChandelier,
			projectImages.lobbyLounge,
			projectImages.lobby,
		],
	},
	{
		category: "corporate-institutional",
		slug: "andhra-house",
		name: "Andhra House",
		image: projectImages.lobbyLounge,
		summary:
			"Institutional dining tables, solid wood seating, and heavy-duty corridor doors and frames.",
		intro:
			"An institutional engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Andhra House is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Institutional interiors" },
			{
				label: "Work scope",
				value: "Dining tables, solid wood seating and corridor doors",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Dining",
				items: ["Institutional dining tables", "Durable solid wood seating"],
			},
			{
				title: "Circulation",
				items: ["Heavy-duty corridor wooden doors and frames"],
			},
		],
		gallery: [
			projectImages.dining,
			projectImages.lobby,
			projectImages.guestRoomWardrobe,
		],
	},
	{
		category: "corporate-institutional",
		slug: "maps-of-group",
		name: "Maps of Group",
		image: projectImages.lobbyLounge,
		summary:
			"Modern modular workstations, executive cabin setups and interior veneer panelling.",
		intro:
			"A corporate engagement listed in the FK client record. The scope below follows the supplied project brief and is confirmed per project.",
		overview:
			"Maps of Group is listed among the clients in the FK Furniture & Interior company profile. This page records the scope supplied for the engagement; confirmed project photography and final specification details are still being prepared.",
		facts: [
			{ label: "Project type", value: "Corporate interiors" },
			{
				label: "Work scope",
				value: "Modular workstations, executive cabins and veneer panelling",
			},
		],
		scopeStatus: "draft",
		scope: [
			{
				title: "Workstations",
				items: ["Modern modular workstations"],
			},
			{
				title: "Cabins",
				items: ["Executive cabin setups"],
			},
			{
				title: "Panelling",
				items: ["Interior veneer panelling"],
			},
		],
		gallery: [
			projectImages.guestRoomWardrobe,
			projectImages.lobby,
			projectImages.guestRoomBed,
		],
	},
];

export function filterProjects(
	category: ProjectCategoryId
): readonly Project[] {
	return category === "all"
		? projects
		: projects.filter((project) => project.category === category);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function getRelatedProject(project: Project): Project | undefined {
	const sameCategory = projects.find(
		(item) => item.slug !== project.slug && item.category === project.category
	);
	return sameCategory ?? projects.find((item) => item.slug !== project.slug);
}

export const projectClients = [
	"Resort De Coracao",
	"De Alturas Resort",
	"De Bells Resort",
	"Hotel Omega",
	"Eden Stays",
	"MDN Villas by Beacholics",
	"The White Night Club",
	"Lohia’s Group",
	"Aroon Aviation",
	"Andhra House",
	"Maps of Group",
] as const;

export const draftScopeNote =
	"Scope recorded from the project brief. Final specification is confirmed with the client before production.";

// Shared Tailwind roles, matching the type and spacing ladder used on Gallery.
export const projectsSection =
	"pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] py-[clamp(3.5rem,7vw,6.5rem)] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const projectsTitle =
	"m-0 font-heading font-medium text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.08] tracking-[-0.025em] text-balance";

export const projectsLead =
	"m-0 max-w-[30ch] text-pretty font-heading font-medium text-[clamp(1.4rem,1.15rem+1vw,1.9rem)] leading-[1.42] tracking-[-0.01em]";

export const projectsBody =
	"m-0 text-pretty text-[clamp(1rem,0.96rem+0.14vw,1.0625rem)] text-muted-foreground leading-[1.7]";

export const projectsLabel =
	"m-0 font-sans text-[0.75rem] font-semibold tracking-[0.09em] text-muted-foreground";
