export const photos = {
	lobby: {
		src: "/home/lobby.webp",
		alt: "Temporary lobby photograph from the company profile, Resort De Coracao, Rishikesh",
	},
	lounge: {
		src: "/home/lounge.webp",
		alt: "Temporary lounge photograph from the company profile",
	},
	dining: {
		src: "/home/dining.webp",
		alt: "Temporary dining-room photograph from the company profile",
	},
	guestRoom: {
		src: "/home/guest-room.webp",
		alt: "Temporary guest-room photograph from the company profile",
	},
	guestBath: {
		src: "/home/guest-bath.webp",
		alt: "Temporary guest bathroom photograph from the company profile",
	},
	meeting: {
		src: "/home/meeting.webp",
		alt: "Temporary meeting-room photograph from the company profile",
	},
	corridor: {
		src: "/home/corridor.webp",
		alt: "Temporary corridor photograph from the company profile",
	},
	workplace: {
		src: "/home/workplace.webp",
		alt: "Temporary workplace photograph from the company profile",
	},
	building: {
		src: "/home/office-building.webp",
		alt: "Temporary exterior photograph of a completed hospitality building from the company profile",
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
			"Named in the company profile as a completed turnkey hospitality project. Detailed guest-room counts and scope still need client confirmation.",
	},
	{
		id: "residential",
		type: "Residential",
		name: "[Residential project name]",
		location: "[Location]",
		image: photos.lounge,
		scope:
			"[Scope: living spaces, fitted storage and bespoke furniture. Client confirmation needed.]",
	},
	{
		id: "commercial",
		type: "Commercial",
		name: "[Commercial project name]",
		location: "[Location]",
		image: photos.workplace,
		scope:
			"[Scope: workplace interiors, meeting spaces and fitted furniture. Client confirmation needed.]",
	},
] as const;

export const services = [
	{
		title: "Interior design & execution",
		body: "Homes, workplaces and hospitality spaces, planned around the client’s needs, then taken through to site.",
		image: photos.lounge,
	},
	{
		title: "Bespoke furniture",
		body: "Furniture developed around the dimensions, materials and character of each space, made in the company’s own setup.",
		image: photos.guestRoom,
	},
	{
		title: "Turnkey projects",
		body: "Coordination from design and material selection through manufacturing, installation and handover.",
		image: photos.dining,
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
		image: photos.guestRoom,
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
		image: photos.dining,
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
		image: photos.corridor,
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
		image: photos.meeting,
	},
] as const;

export const processSteps = [
	{
		title: "First, we listen.",
		description:
			"Your space, your routines, your ambitions. We begin by understanding what the project needs to achieve.",
		deliverable: "Together, we establish the brief and project scope.",
		label: "Space plan · Drawing placeholder",
		alt: "Schematic space plan, placeholder for consultation drawings",
		nav: "1 / Consult",
	},
	{
		title: "Then, we find its character.",
		description:
			"Layouts, materials and finishes take shape together. We review the details and agree on the direction before work begins.",
		deliverable: "The result: approved designs, finishes and samples.",
		label: "Material palette · Sample placeholders",
		alt: "Four material samples in marigold, ice silver, mauve, and cool gray, representing design and finish selection",
		nav: "2 / Design",
	},
	{
		title: "The idea becomes tangible.",
		description:
			"Furniture is manufactured and site work is coordinated. Approved details guide the making, assembly and finishing.",
		deliverable: "The result: components and interiors ready for installation.",
		label: "Component assembly · Factory imagery placeholder",
		alt: "Separated geometric furniture components representing manufacturing and assembly",
		nav: "3 / Make",
	},
	{
		title: "Finally, a space to step into.",
		description:
			"Furniture is fitted, details are checked and the finished space is handed over. The brief becomes a place to live or work.",
		deliverable: "The result: installation, final inspection and handover.",
		label: "Completed space · Project photograph placeholder",
		alt: "Assembled geometric structure representing completed installation and handover",
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
		photo: photos.lobby,
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
		photo: photos.workplace,
	},
	{
		id: 3,
		quote:
			"This table was made for the dining room, not fitted into it. The edge, the base, and the light agree.",
		name: "Kabir Seth",
		company: "Linea Studio",
		photo: photos.dining,
	},
] as const;

export const enquiryOptions = [
	"Design consultation",
	"Furniture quotation",
	"Turnkey project enquiry",
] as const;
