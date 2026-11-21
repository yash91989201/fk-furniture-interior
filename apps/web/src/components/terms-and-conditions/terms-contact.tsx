import { Link } from "@tanstack/react-router";

import {
	contactEmail,
	gstin,
	gurgaonOffice,
} from "@/components/contact/content";

import { termsSections } from "./content";
import { bodyText, labelRole, TermsSection } from "./terms-section";

const channels = [
	{ label: "Email", value: contactEmail },
	{ label: "Phone", value: gurgaonOffice.phones[0].display },
	{ label: "GSTIN", value: gstin },
	{
		label: "Gurugram office address",
		value: gurgaonOffice.address.join(", "),
	},
] as const;

export function TermsContact() {
	return (
		<TermsSection {...termsSections.contact}>
			<p className={bodyText}>
				Send questions about these terms to the email address or phone number
				below.
			</p>
			<dl className="m-0 grid gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-[1.15rem] sm:grid-cols-2">
				{channels.map((channel) => (
					<div
						className="border-border border-t pt-[0.7rem] last:sm:col-span-2"
						key={channel.label}
					>
						<dt className={labelRole}>{channel.label}</dt>
						<dd className="m-0 mt-[0.35rem] text-[0.9375rem] text-foreground leading-[1.55]">
							{channel.value}
						</dd>
					</div>
				))}
			</dl>
			<p className={bodyText}>
				For a new project, use the{" "}
				<Link
					className="text-foreground decoration-border underline-offset-[0.3em] hover:underline"
					hash="fk-enquiry"
					to="/"
				>
					enquiry form
				</Link>
				. For an existing order, quote the order number.
			</p>
		</TermsSection>
	);
}
