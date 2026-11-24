import {
	contactEmail,
	gstin,
	gurgaonOffice,
} from "@/components/contact/content";

import { PolicySection } from "./policy-section";

const details: readonly (readonly [string, string, string?])[] = [
	["Entity", "FK Furniture & Interior"],
	["GSTIN", gstin],
	["Email", contactEmail, `mailto:${contactEmail}`],
	["Phone", gurgaonOffice.phones[0].display, gurgaonOffice.phones[0].href],
	["Gurugram office", gurgaonOffice.address.join(", ")],
];

export function PrivacyContact() {
	return (
		<PolicySection id="privacy-contact" number={9} title="Privacy contact">
			<p>
				Write to us with privacy questions, corrections or deletion requests,
				and we will reply from the same address.
			</p>
			<dl className="grid gap-x-8 gap-y-4 border-border border-t pt-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-y-3">
				{details.map(([label, value, href]) => (
					<div className="sm:contents" key={label}>
						<dt className="font-sans font-semibold text-[0.75rem] text-muted-foreground uppercase tracking-[0.14em]">
							{label}
						</dt>
						<dd className="m-0 mt-1 text-base text-muted-foreground leading-[1.6] sm:mt-0">
							{href ? (
								<a className="underline underline-offset-2" href={href}>
									{value}
								</a>
							) : (
								value
							)}
						</dd>
					</div>
				))}
			</dl>
		</PolicySection>
	);
}
