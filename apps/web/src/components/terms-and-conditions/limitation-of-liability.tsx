import { termsSections } from "./content";
import { bodyText, leadTerm, TermsSection, termList } from "./terms-section";

export function LimitationOfLiability() {
	return (
		<TermsSection {...termsSections.liability}>
			<p className={bodyText}>
				Liability is capped against the work the claim is about, not the project
				as a whole.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Ceiling on any claim.</span> To the maximum
					extent permitted by law, total liability for a claim arising from
					product supply or fit-out execution does not exceed the contract value
					paid by the client for the specific product or service in question.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Scope of the cap.</span> The cap applies
					per claim and per product or service. Consequential loss, lost revenue
					and loss of business fall outside what we accept.
				</li>
			</ul>
		</TermsSection>
	);
}
