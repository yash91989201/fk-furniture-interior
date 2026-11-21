// Filenames are the supplied assets; alts describe what each photograph shows.
export const photos = {
	foyer: {
		alt: "Double-height hotel lobby with a chandelier, green lounge chairs, sofas, brass tables and a staircase",
		src: "/home/lobby.webp",
	},
	guestRoom: {
		alt: "Hotel guest room with a bed, timber desk, artwork and sheer curtains",
		src: "/home/lounge.webp",
	},
	fitted: {
		alt: "Hotel guest room with a fitted wardrobe, tea station and bed",
		src: "/home/workplace.webp",
	},
	restaurant: {
		alt: "Restaurant dining room with laid tables and upholstered chairs",
		src: "/home/corridor.webp",
	},
} as const;

export const timeline = [
	{
		text: "The family’s craft work begins in Gurugram with labour-based site work.",
		year: "1986",
	},
	{
		text: "Material supply joins execution, so specification and making sit with one team.",
		year: "2012",
	},
	{
		text: "Design, in-house manufacturing and installation for homes, workplaces and hospitality, with offices in Gurugram and Goa.",
		year: "Today",
	},
] as const;

export const buildFacts = [
	{
		text: "A 4,500 sq ft factory, a team of 22, and a capacity of 20 guest rooms per month.",
		term: "In-house manufacturing",
	},
	{
		text: "Built to the sizes, finishes and details a project calls for.",
		term: "Custom specification",
	},
	{
		text: "The approved bill of quantities is the reference for every line produced.",
		term: "BOQ compliance",
	},
	{
		text: "Veneer, laminate, polish and commercial-grade hardware agreed from samples before production.",
		term: "Finishes and hardware",
	},
	{
		text: "CNC routing, automatic edge banding, a hydraulic cold press and a dust-free PU and veneer spray booth.",
		term: "Machinery",
	},
	{
		text: "Commercial-grade BWP marine plywood, high-density HDHMR, moisture-resistant MDF, and kiln-seasoned teak, ash and oak.",
		term: "Materials",
	},
	{
		text: "Mock-up rooms take 3 weeks. Mass production takes 8 weeks.",
		term: "Lead times",
	},
] as const;

export const checks = [
	{
		text: "Material and finish samples are approved before a production run starts.",
		term: "Sample first",
	},
	{
		text: "Drawings, BOQ and approved samples are reconciled before cutting.",
		term: "Specification held",
	},
	{
		text: "Commercial-grade hardware chosen for daily hotel use.",
		term: "Commercial hardware",
	},
	{
		text: "Delivery and site installation across India are planned per project around location, site access and schedule.",
		term: "Delivered and installed",
	},
	{
		text: "Timber is treated against termites and borers.",
		term: "Termite and borer treatment",
	},
	{
		text: "Fire-retardant options are available on request for boards, laminates, foams and fabrics.",
		term: "Fire-retardant options",
	},
	{
		text: "Manufacturing warranty of 5 years.",
		term: "Five-year warranty",
	},
] as const;

export const values = [
	{
		label: "The approved sample is the standard.",
		text: "What is signed off is what ships.",
	},
	{
		label: "Lead times are stated.",
		text: "Mock-up rooms take 3 weeks and mass production 8 weeks, with delivery planned per project around site access and schedule.",
	},
	{
		label: "Materials stated plainly.",
		text: "Substrates, finishes and hardware are named, with no undisclosed substitution.",
	},
] as const;

export const roles = [
	{
		text: "Joinery, assembly and the details that show at the edges.",
		term: "Master carpenters",
	},
	{
		text: "Drawings and BOQ that the workshop builds from.",
		term: "CAD draftsmen",
	},
	{
		text: "Veneer, polish and hardware.",
		term: "Finishing team",
	},
	{
		text: "Delivery and installation.",
		term: "Site team",
	},
] as const;

export const visitCopy = {
	body: "Hotel developers, architects and designers are welcome at our factory. See CNC routing, edge banding, the cold press and the spray booth at work, look over material samples, and bring drawings or a BOQ for a first conversation.",
	heading: "Request a factory visit.",
	title: "See the factory and the samples.",
};

// Role ladder shared by the section headings, matching the homepage h2 step.
export const sectionTitle =
	"m-0 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.025em] text-balance";

// Prose roles: the lead sentence opens a section, body copy carries the rest.
export const leadCopy =
	"m-0 max-w-[28ch] text-pretty font-heading font-medium text-[clamp(1.4rem,1.15rem+1vw,1.9rem)] leading-[1.42] tracking-[-0.01em]";

export const bodyCopy =
	"m-0 text-pretty text-[clamp(1rem,0.96rem+0.14vw,1.0625rem)] text-muted-foreground leading-[1.7]";

// Gutter, vertical rhythm and anchor offset shared by every about section.
export const sectionFrame =
	"py-[clamp(3.5rem,7vw,6.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] [scroll-margin-top:calc(var(--home-nav-compact)+0.75rem)]";

export const figureCaption =
	"pt-[0.6rem] text-[0.8125rem] leading-[1.5] tracking-[0.006em] text-muted-foreground";

// Term and explanation pairs share one role across every definition list.
export const factRow = "border-border border-t py-[clamp(1rem,1.7vw,1.3rem)]";

export const factTerm =
	"m-0 font-heading font-medium text-[clamp(1.15rem,1rem+0.4vw,1.4rem)] leading-[1.2] tracking-[-0.01em]";

export const factText =
	"m-0 mt-[0.35rem] max-w-[46ch] text-pretty text-[clamp(1rem,0.95rem+0.16vw,1.0625rem)] leading-[1.65]";

// Small label that names a group; it never labels a single term.
export const groupLabel =
	"m-0 font-sans text-[0.75rem] font-semibold tracking-[0.09em] text-muted-foreground";
