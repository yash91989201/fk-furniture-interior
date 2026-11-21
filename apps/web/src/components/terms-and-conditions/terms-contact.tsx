import { Link } from "@tanstack/react-router";

import { contactEmail, gurgaonOffice } from "@/components/contact/content";

import { termsSections } from "./content";
import { bodyText, labelRole, TermsSection } from "./terms-section";

const channels = [
	{ label: "Email", value: contactEmail },
	{ label: "Phone", value: gurgaonOffice.phones[0].display },
	{
		label: "Factory and office address",
		value: gurgaonOffice.address.join(", "),
	},
] as const;

export function TermsContact() {
	return (
		<TermsSection {...termsSections.contact}>
			<p className={bodyText}>
				Questions about how these terms apply to a quotation, an order or a
				fit-out go to the project desk. The commercial team answers them against
				the drawings and agreement for that project.
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
				For a new project, the{" "}
				<Link
					className="text-foreground decoration-border underline-offset-[0.3em] hover:underline"
					hash="fk-enquiry"
					to="/"
				>
					enquiry form
				</Link>{" "}
				reaches the same team. Existing orders should quote the order or PO
				number.
			</p>
		</TermsSection>
	);
}
