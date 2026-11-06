// Filenames are the supplied assets; alts describe what each photograph shows.
export const photos = {
	foyer: {
		alt: "Hotel foyer with green lounge chairs, brass side tables and a lit staircase",
		src: "/home/lobby.webp",
	},
	guestRoom: {
		alt: "Guest room with a made bed, timber desk, artwork and sheer curtains",
		src: "/home/lounge.webp",
	},
	fitted: {
		alt: "Guest room with a fitted wardrobe, tea station and bedside storage",
		src: "/home/workplace.webp",
	},
	restaurant: {
		alt: "Restaurant dining room with timber tables and upholstered chairs",
		src: "/home/corridor.webp",
	},
} as const;

export const timeline = [
	{
		text: "The family’s craft work begins in Gurgaon with labour-based site work.",
		year: "1986",
	},
	{
		text: "Material supply joins execution, so specification and making sit with one team.",
		year: "2012",
	},
	{
		text: "Design, in-house manufacturing and installation for homes, workplaces and hospitality.",
		year: "Today",
	},
] as const;

export const buildFacts = [
	{
		text: "Made in our own facility rather than bought in and resold.",
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
		text: "Veneer, laminate, polish and fittings agreed from samples before production.",
		term: "Finishes and hardware",
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
		text: "Soft-close channels and concealed hinges specified for daily hotel use.",
		term: "Commercial hardware",
	},
	{
		text: "Packing and site installation are handled by the same team.",
		term: "Packed, delivered, installed",
	},
] as const;

export const values = [
	{
		label: "The approved sample is the standard.",
		text: "What is signed off is what ships.",
	},
	{
		label: "Agreed dates hold.",
		text: "Handovers are planned backwards from the date that cannot move.",
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
	body: "Hotel developers, architects and designers are welcome at our factory. Inspect production and material samples, and bring drawings or a BOQ for a first conversation.",
	heading: "Request a factory visit.",
	title: "Experience our manufacturing standards in person.",
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
