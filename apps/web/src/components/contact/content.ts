// Office addresses, phones and email from the company profile, p. 9.
export const contactEmail = "interiorfkfurniture@gmail.com";

export const offices = [
	{
		address: ["Office No. 4, Sec 65", "Near M3M Latitude", "Gurgaon, Haryana"],
		name: "Gurgaon office",
		phones: [
			{ display: "+91 98737 46270", href: "tel:+919873746270" },
			{ display: "+91 97118 55985", href: "tel:+919711855985" },
		],
	},
	{
		address: ["1411, Aradi, Candolim", "Goa"],
		name: "Goa office",
		phones: [
			{ display: "+91 70119 27251", href: "tel:+917011927251" },
			{ display: "+91 91455 31475", href: "tel:+919145531475" },
		],
	},
] as const;

export const requirementOptions = [
	"New project",
	"Renovation or upgrade",
	"Design consultation",
	"Furniture quotation",
	"Turnkey project",
] as const;

export interface EnquiryFields {
	city: string;
	company?: string;
	details: string;
	email: string;
	name: string;
	phone?: string;
	requirement: string;
}

export function buildEnquiryMailto(fields: EnquiryFields): string {
	const lines = [
		`Name: ${fields.name}`,
		`Email: ${fields.email}`,
		...(fields.phone ? [`Phone: ${fields.phone}`] : []),
		...(fields.company ? [`Company or hotel: ${fields.company}`] : []),
		`Project city: ${fields.city}`,
		`Requirement: ${fields.requirement}`,
		"",
		"Project details:",
		fields.details,
	];
	const subject = `Project enquiry — ${fields.name}, ${fields.city}`;
	return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
