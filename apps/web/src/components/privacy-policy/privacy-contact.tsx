import { PolicyReview, PolicySection } from "./policy-section";

const details = [
	["Entity", "[Registered company name — to confirm]"],
	["Email", "[Official email address — to confirm]"],
	["Phone", "[Official phone number — to confirm]"],
	["Registered address", "[Factory or corporate office address — to confirm]"],
] as const;

export function PrivacyContact() {
	return (
		<PolicySection id="privacy-contact" number={9} title="Privacy contact">
			<p>
				Write to us with privacy questions, corrections or deletion requests,
				and we will reply from the same address.
			</p>
			<dl className="grid gap-x-8 gap-y-4 border-border border-t pt-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-y-3">
				{details.map(([label, value]) => (
					<div className="sm:contents" key={label}>
						<dt className="font-sans font-semibold text-[0.75rem] text-muted-foreground uppercase tracking-[0.14em]">
							{label}
						</dt>
						<dd className="m-0 mt-1 text-base text-muted-foreground leading-[1.6] sm:mt-0">
							{value}
						</dd>
					</div>
				))}
			</dl>
			<PolicyReview>
				The four values above are placeholders carried over from the source
				document. Replace them with the approved entity name, email, phone and
				registered address before the policy goes live.
			</PolicyReview>
		</PolicySection>
	);
}
