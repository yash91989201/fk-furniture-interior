import { bandSrcSet } from "@/components/home/content";

export interface ProjectImage {
	alt: string;
	caption?: string;
	height: number;
	/**
	 * Provisional repository photograph, not approved photography of the named
	 * project. Replace the record here when final assets are cleared.
	 */
	provisional: true;
	src: string;
	srcSet?: string;
	width: number;
}

function photo(
	src: string,
	alt: string,
	caption: string,
	options: { height?: number; variants?: boolean; width?: number } = {}
): ProjectImage {
	const { height = 1333, variants = true, width = 2000 } = options;
	return {
		alt,
		caption,
		height,
		provisional: true,
		src,
		srcSet: variants ? bandSrcSet(src) : undefined,
		width,
	};
}

/**
 * Every project image is referenced through this registry. Page components
 * never hold a file path, so swapping in approved photography is one edit.
 */
export const projectImages = {
	lobby: photo(
		"/home/lobby.webp",
		"Lounge seating, brass tables and a staircase in a hotel lobby",
		"Lobby lounge seating and joinery"
	),
	lobbyChandelier: photo(
		"/home/guest-room.webp",
		"Hotel lobby with a chandelier, lounge seating and a staircase",
		"Lobby seating beneath a chandelier"
	),
	lounge: photo(
		"/home/dining.webp",
		"Lounge with green armchairs, brass tables and a staircase",
		"Green lounge seating and brass tables"
	),
	lobbyLounge: photo(
		"/home/guest-bath.webp",
		"Hotel lounge with green armchairs, brass tables and a staircase",
		"Lounge seating and tables",
		{ variants: false }
	),
	guestRoomWardrobe: photo(
		"/home/workplace.webp",
		"Guest room with a fitted wardrobe, desk, television and bed",
		"Fitted wardrobe, desk and bedside storage"
	),
	guestRoomBed: photo(
		"/home/lounge.webp",
		"Guest room with a bed, balcony doors and a wall-mounted television",
		"Guest room bed and balcony doors"
	),
	guestRoomBalcony: photo(
		"/home/meeting.webp",
		"Guest room with a bed, balcony and wall-mounted television",
		"Guest room with balcony access",
		{ variants: false }
	),
	dining: photo(
		"/home/corridor.webp",
		"Restaurant dining room with laid tables and upholstered chairs",
		"Restaurant dining tables and seating",
		{ variants: false }
	),
	exterior: photo(
		"/home/office-building.webp",
		"Exterior of a multi-storey building against a mountain backdrop",
		"Building exterior",
		{ height: 1120, variants: false }
	),
} as const;
