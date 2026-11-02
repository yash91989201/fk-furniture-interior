export const galleryCategories = [
	{ id: "all", label: "All work" },
	{
		id: "hotel-guest-rooms",
		label: "Hotel guest rooms",
	},
	{
		id: "lobby-reception",
		label: "Lobby & reception",
	},
	{
		id: "restaurants-banquets",
		label: "Restaurants & banquets",
	},
	{
		id: "panelling-ceilings",
		label: "Wall panelling & wooden ceilings",
	},
	{
		id: "executive-meeting",
		label: "Executive & meeting rooms",
	},
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryCategoryId = GalleryCategory["id"];
export type GalleryWorkCategory = Exclude<GalleryCategoryId, "all">;

export interface GalleryImage {
	alt: string;
	height: number;
	sizes?: string;
	src: string;
	srcSet?: string;
	width: number;
}

export interface GalleryWork {
	category: GalleryWorkCategory;
	details?: { finish?: string; hardware?: string; material?: string };
	emphasis?: "standard" | "tall" | "wide";
	image: GalleryImage;
	project?: { location: string; name: string };
	/** Stable id passed into the enquiry form. */
	reference: string;
	scope: string;
	/** The room or space shown, not a marketing project name. */
	space: string;
}

/**
 * Publish only after the client has cleared the photograph and the written
 * scope/specification. The empty array is intentional: the brochure images and
 * generated previews in this repository are not approved project photography.
 */
export const galleryWorks: GalleryWork[] = [];

export interface CraftShot {
	alt: string;
	caption: string;
	height: number;
	sizes?: string;
	src: string;
	srcSet?: string;
	stage: string;
	width: number;
}

/**
 * Factory and site photographs must show actual FK production or execution,
 * with captions checked against what is visible in the frame.
 */
export const craftShots: CraftShot[] = [];

export const craftStages = [
	{
		id: "cutting",
		label: "Cutting and joinery",
	},
	{
		id: "veneering",
		label: "Veneer and edge finishing",
	},
	{
		id: "finishing",
		label: "Finishing",
	},
	{
		id: "inspection",
		label: "Assembly and inspection",
	},
] as const;

// Shared Tailwind roles, matching the type and spacing ladder used on About.
export const gallerySection =
	"pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] py-[clamp(3.5rem,7vw,6.5rem)] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const galleryTitle =
	"m-0 font-heading font-medium text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.08] tracking-[-0.025em] text-balance";

export const galleryLead =
	"m-0 max-w-[30ch] text-pretty font-heading font-medium text-[clamp(1.4rem,1.15rem+1vw,1.9rem)] leading-[1.42] tracking-[-0.01em]";

export const galleryBody =
	"m-0 text-pretty text-[clamp(1rem,0.96rem+0.14vw,1.0625rem)] text-muted-foreground leading-[1.7]";

export const galleryLabel =
	"m-0 font-sans text-[0.75rem] font-semibold tracking-[0.09em] text-muted-foreground";
