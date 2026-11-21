import { type ProjectImage, projectImages } from "./project-images";

// Only Resort De Coracao has a verified project record. The other client names
// come from the company profile and are listed as clients, not as case studies.
export const projectCategories = [
	{ id: "resorts-hotels", label: "Luxury Resorts & Hotels" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectCategoryId = ProjectCategory["id"];
export type ProjectSector = ProjectCategoryId;

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
	slug: string;
	summary: string;
}

export function categoryLabel(category: ProjectSector): string {
	const match = projectCategories.find((item) => item.id === category);
	return match?.label ?? category;
}

export const projects: readonly Project[] = [
	{
		category: "resorts-hotels",
		featured: true,
		slug: "resort-de-coracao",
		name: "Resort De Coracao",
		location: "Tapovan, Rishikesh",
		image: projectImages.lobbyLounge,
		summary:
			"Lobby and reception, guest rooms, dining, furniture, lighting and finishes for a resort in Tapovan, Rishikesh.",
		intro:
			"Interiors for a resort in Tapovan, Rishikesh: lobby and reception, guest rooms, dining, furniture, lighting and finishes.",
		overview:
			"Resort De Coracao is a resort in Tapovan, Rishikesh. FK Furniture & Interior worked on its lobby and reception, guest rooms and dining, along with the furniture, lighting and finishes. Materials were BWP marine ply and natural teak veneer, with commercial-grade hardware.",
		facts: [
			{ label: "Location", value: "Tapovan, Rishikesh" },
			{ label: "Project type", value: "Turnkey hospitality interior" },
			{
				label: "Work scope",
				value:
					"Lobby and reception, guest rooms, dining, furniture, lighting and finishes",
			},
			{
				label: "Materials",
				value: "BWP marine ply, natural teak veneer, commercial-grade hardware",
			},
		],
		scope: [
			{
				title: "Lobby and reception",
				items: ["Lobby and reception furniture", "Lighting and finishes"],
			},
			{
				title: "Guest rooms",
				items: ["Guest room furniture", "Lighting and finishes"],
			},
			{
				title: "Dining",
				items: ["Dining furniture", "Lighting and finishes"],
			},
			{
				title: "Materials",
				items: [
					"BWP marine ply",
					"Natural teak veneer",
					"Commercial-grade hardware",
				],
			},
		],
		gallery: [
			projectImages.guestRoomBed,
			projectImages.lounge,
			projectImages.dining,
			projectImages.exterior,
		],
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
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
