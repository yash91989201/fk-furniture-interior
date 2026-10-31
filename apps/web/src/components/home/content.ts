export const photos = {
	// Keys describe the room in the photograph; filenames are the supplied assets.
	lobby: {
		src: "/home/lobby.webp",
		alt: "Hotel lobby with lounge seating and a staircase",
	},
	lobbyLounge: {
		src: "/home/guest-bath.webp",
		alt: "Hotel lounge with seating and a staircase",
	},
	lounge: {
		src: "/home/dining.webp",
		alt: "Lounge with green seating and brass tables",
	},
	restaurant: {
		src: "/home/corridor.webp",
		alt: "Restaurant with dining tables and chairs",
	},
	lobbyChandelier: {
		src: "/home/guest-room.webp",
		alt: "Hotel lobby with a chandelier and lounge seating",
	},
	guestRoomBalcony: {
		src: "/home/lounge.webp",
		alt: "Guest room with a bed and balcony doors",
	},
	guestRoomTv: {
		src: "/home/meeting.webp",
		alt: "Guest room with a balcony and wall-mounted television",
	},
	guestRoomWardrobe: {
		src: "/home/workplace.webp",
		alt: "Guest room with a fitted wardrobe and desk",
	},
	exterior: {
		src: "/home/office-building.webp",
		alt: "Exterior of a completed hospitality building",
	},
} as const;

export const projects = [
	{
		id: "hospitality",
		type: "Hospitality",
		name: "Resort De Coracao",
		location: "Tapovan, Rishikesh",
		image: photos.lobby,
		scope:
			"Completed turnkey hospitality interior, from design and bespoke furniture through to installation.",
	},
	{
		id: "residential",
		type: "Residential",
		name: "[Residential project name]",
		location: "[Location]",
		image: photos.guestRoomTv,
		scope:
			"[Scope: living spaces, fitted storage and bespoke furniture. Client confirmation needed.]",
	},
	{
		id: "commercial",
		type: "Commercial",
		name: "[Commercial project name]",
		location: "[Location]",
		image: photos.lobbyLounge,
		scope:
			"[Scope: workplace interiors, meeting spaces and fitted furniture. Client confirmation needed.]",
	},
] as const;

export const services = [
	{
		title: "Interior design & execution",
		body: "Homes, workplaces and hospitality spaces, planned around the client’s needs, then taken through to site.",
		image: photos.guestRoomBalcony,
	},
	{
		title: "Bespoke furniture",
		body: "Furniture developed around the dimensions, materials and character of each space, made in the company’s own setup.",
		image: photos.guestRoomWardrobe,
	},
	{
		title: "Turnkey projects",
		body: "Coordination from design and material selection through manufacturing, installation and handover.",
		image: photos.lobbyChandelier,
	},
] as const;

export const furnitureCategories = [
	{
		id: "guest-room",
		title: "Guest-room furniture",
		heading: "A complete room, thoughtfully fitted.",
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
		heading: "Set the tone from the entrance.",
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
		heading: "Spaces that bring people together.",
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
		heading: "The details that shape the room.",
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
		heading: "Furniture that supports the working day.",
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
		title: "First, we listen.",
		description:
			"Your space, your routines, your ambitions. We begin by understanding what the project needs to achieve.",
		deliverable: "Together, we establish the brief and project scope.",
		label: "Space plan",
		alt: "Illustrative architectural floor plan with door swings, furniture layouts, and dimension lines",
		nav: "1 / Consult",
	},
	{
		title: "Then, we find its character.",
		description:
			"Layouts, materials and finishes take shape together. We review the details and agree on the direction before work begins.",
		deliverable: "The result: approved designs, finishes and samples.",
		label: "Material palette",
		alt: "Illustrative finish study with linear timber grain, diagonal stone hatching, and a marigold sample",
		nav: "2 / Design",
	},
	{
		title: "The idea becomes tangible.",
		description:
			"Furniture is manufactured and site work is coordinated. Approved details guide the making, assembly and finishing.",
		deliverable: "The result: components and interiors ready for installation.",
		label: "Component assembly",
		alt: "Illustrative furniture elevation showing a tabletop, two legs, and a rail assembling into a table",
		nav: "3 / Make",
	},
	{
		title: "Finally, a space to step into.",
		description:
			"Furniture is fitted, details are checked and the finished space is handed over. The brief becomes a place to live or work.",
		deliverable: "The result: installation, final inspection and handover.",
		label: "Completed space",
		alt: "Illustrative furnished floor plan with seating, a rug, fitted furniture, and a final inspection mark",
		nav: "4 / Handover",
	},
] as const;

export const testimonials = [
	{
		id: 0,
		quote:
			"The guest room reads as one piece. Timber, stone, and the bed were drawn together, then built that way.",
		name: "Meera Anand",
		company: "Harbour House Hotels",
		photo: photos.guestRoomBalcony,
	},
	{
		id: 1,
		quote:
			"We sent a rough plan of the lounge. What returned fitted the room, including the corners we had drawn poorly.",
		name: "Rohan Varghese",
		company: "Northlight Residences",
		photo: photos.lounge,
	},
	{
		id: 2,
		quote:
			"The meeting room had to work a full day and still feel calm. The joinery does both, quietly.",
		name: "Leela Krishnan",
		company: "Atelier North",
		photo: photos.lobbyLounge,
	},
	{
		id: 3,
		quote:
			"This table was made for the dining room, not fitted into it. The edge, the base, and the light agree.",
		name: "Kabir Seth",
		company: "Linea Studio",
		photo: photos.restaurant,
	},
] as const;

export const enquiryOptions = [
	"Design consultation",
	"Furniture quotation",
	"Turnkey project enquiry",
] as const;
