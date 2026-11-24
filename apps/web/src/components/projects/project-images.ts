import { bandSrcSet } from "@/components/home/content";

export interface ProjectImage {
	alt: string;
	caption?: string;
	height: number;
	src: string;
	srcSet: string;
	width: number;
}

function photo(
	src: string,
	alt: string,
	caption: string,
	options: { height?: number; width?: number } = {}
): ProjectImage {
	const { height = 1333, width = 2000 } = options;
	return {
		alt,
		caption,
		height,
		src,
		srcSet: bandSrcSet(src),
		width,
	};
}

/**
 * Confirmed Resort De Coracao photographs from the company profile. Page
 * components reference this registry rather than file paths.
 */
export const projectImages = {
	lobbyLounge: {
		...photo(
			"/home/guest-bath.webp",
			"Hotel lobby with green armchairs, a sofa, brass tables and a staircase",
			"Lobby and reception at Resort De Coracao"
		),
		srcSet:
			"/home/guest-bath-720.webp 720w, /home/guest-bath-1024.webp 1024w, /home/guest-bath-1280.webp 1280w, /home/guest-bath.webp 2000w",
	},
	guestRoomBed: photo(
		"/home/lounge.webp",
		"Hotel guest room with a bed, timber desk, artwork and sheer curtains",
		"Guest room at Resort De Coracao"
	),
	lounge: photo(
		"/home/dining.webp",
		"Hotel reception lounge with green armchairs, a long sofa, brass tables and a staircase",
		"Reception lounge at Resort De Coracao"
	),
	dining: photo(
		"/home/corridor.webp",
		"Restaurant dining room with laid tables and upholstered chairs",
		"Dining room at Resort De Coracao"
	),
	exterior: photo(
		"/home/office-building.webp",
		"Hotel exterior against a mountain backdrop",
		"Exterior of Resort De Coracao",
		{ height: 1120 }
	),
} as const;
