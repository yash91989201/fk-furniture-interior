// <name>-720/-1280.webp are pre-generated next to each <name>.webp photo.
export const bandSrcSet = (src: string) =>
	`${src.replace(".webp", "-720.webp")} 720w, ${src.replace(".webp", "-1280.webp")} 1280w, ${src} 2000w`;

export const photos = {
	// Keys describe the room in the photograph; filenames are the supplied assets.
	lobby: {
		src: "/home/lobby.webp",
		alt: "Double-height hotel lobby with a chandelier, green lounge chairs, sofas, brass tables and a staircase",
	},
	lobbyLounge: {
		src: "/home/guest-bath.webp",
		alt: "Hotel lobby with green armchairs, a sofa, brass tables and a staircase",
	},
	lounge: {
		src: "/home/dining.webp",
		alt: "Hotel reception lounge with green armchairs, a long sofa, brass tables and a staircase",
	},
	restaurant: {
		src: "/home/corridor.webp",
		alt: "Restaurant dining room with laid tables and upholstered chairs",
	},
	lobbyChandelier: {
		src: "/home/guest-room.webp",
		alt: "Hotel lobby at night with a chandelier, lounge seating and a staircase",
	},
	guestRoomBalcony: {
		src: "/home/lounge.webp",
		alt: "Hotel guest room with a bed, timber desk, artwork and sheer curtains",
	},
	guestRoomTv: {
		src: "/home/meeting.webp",
		alt: "Hotel guest room with a bed, wall-mounted television and balcony doors",
	},
	guestRoomWardrobe: {
		src: "/home/workplace.webp",
		alt: "Hotel guest room with a fitted wardrobe, tea station and bed",
	},
	exterior: {
		src: "/home/office-building.webp",
		alt: "Hotel exterior against a mountain backdrop",
	},
} as const;

export const projects = [
	{
		id: "hospitality",
		type: "Hospitality",
		name: "Resort De Coracao",
		location: "Tapovan, Rishikesh",
		image: photos.lobbyLounge,
		slug: "resort-de-coracao",
		scope:
			"A resort in Tapovan, Rishikesh. Scope covered the lobby and reception, guest rooms, dining, furniture, lighting and finishes, in BWP marine ply and natural teak veneer with commercial-grade hardware.",
	},
] as const;

export const services = [
	{
		title: "Interior design & execution",
		body: "Homes, workplaces and hospitality spaces, planned from your drawings, renders or BOQ and carried through to installation on site.",
		image: photos.guestRoomBalcony,
	},
	{
		title: "Bespoke furniture",
		body: "Beds, wardrobes, reception counters, dining furniture and wall panelling, made to the dimensions of each room in our own factory.",
		image: photos.guestRoomWardrobe,
	},
	{
		title: "Turnkey projects",
		body: "One team from material selection through manufacturing, delivery and installation. Delivery and fitting are planned around your site access and schedule.",
		image: photos.lobbyChandelier,
	},
] as const;

export const furnitureCategories = [
	{
		id: "guest-room",
		title: "Guest-room furniture",
		heading: "Everything a guest room needs.",
		items: [
			"Beds and headboards",
			"Wardrobes and luggage racks",
			"Desks and minibar units",
		],
		cta: "Discuss guest-room furniture",
		requirement: "Furniture quotation",
		image: photos.guestRoomTv,
	},
	{
		id: "reception",
		title: "Reception & lobby",
		heading: "Where guests first arrive.",
		items: [
			"Reception counters",
			"Lounge seating and centre tables",
			"Partitions and statement woodwork",
		],
		cta: "Discuss reception & lobby",
		requirement: "Furniture quotation",
		image: photos.lobby,
	},
	{
		id: "dining",
		title: "Dining, bars & banquets",
		heading: "Furniture for dining, bars and banquets.",
		items: [
			"Dining tables and seating",
			"Booths and banquet furniture",
			"Bar and buffet counters",
		],
		cta: "Discuss dining & banquet furniture",
		requirement: "Furniture quotation",
		image: photos.restaurant,
	},
	{
		id: "woodwork",
		title: "Wooden fit-outs & panelling",
		heading: "Woodwork made to your drawings.",
		items: [
			"Wall cladding and acoustic panels",
			"Wooden ceilings and rafters",
			"Doors, frames and partitions",
		],
		cta: "Discuss custom woodwork",
		requirement: "Furniture quotation",
		image: photos.guestRoomWardrobe,
	},
	{
		id: "executive",
		title: "Executive & meeting spaces",
		heading: "Desks, tables and cabinetry for offices and meeting rooms.",
		items: [
			"Executive desks and workstations",
			"Conference tables",
			"Storage and fitted cabinetry",
		],
		cta: "Discuss workplace furniture",
		requirement: "Furniture quotation",
		image: photos.lounge,
	},
] as const;

export const processSteps = [
	{
		title: "Brief and BOQ",
		description:
			"Send drawings, renders or a BOQ. We review scope, materials and site conditions, and quote per BOQ and project. There is no fixed minimum order.",
		deliverable: "Result: a written scope and itemised quotation.",
		label: "Space plan",
		alt: "Illustrative architectural floor plan with door swings, furniture layouts, and dimension lines",
		nav: "1 / Brief",
	},
	{
		title: "Mock-up and approval",
		description:
			"For larger projects, we build a mock-up room so you can check materials, finishes and joinery before mass production. Mock-up lead time is 3 weeks.",
		deliverable: "Result: an approved mock-up and signed-off samples.",
		label: "Material palette",
		alt: "Illustrative finish study with linear timber grain, diagonal stone hatching, and a marigold sample",
		nav: "2 / Mock-up",
	},
	{
		title: "Production",
		description:
			"Approved details guide cutting, assembly and finishing in our factory. Mass production lead time is 8 weeks.",
		deliverable:
			"Result: finished furniture and panelling, ready for dispatch.",
		label: "Component assembly",
		alt: "Illustrative furniture elevation showing a tabletop, two legs, and a rail assembling into a table",
		nav: "3 / Make",
	},
	{
		title: "Delivery and installation",
		description:
			"We deliver across India and install on site, planned around your location, site access and schedule.",
		deliverable:
			"Result: installed furniture and a 5-year manufacturing warranty.",
		label: "Completed space",
		alt: "Illustrative furnished floor plan with seating, a rug, fitted furniture, and a final inspection mark",
		nav: "4 / Install",
	},
] as const;

export const enquiryOptions = [
	"Design consultation",
	"Furniture quotation",
	"Turnkey project enquiry",
	"Factory visit",
] as const;
