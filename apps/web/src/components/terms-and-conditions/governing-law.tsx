import { termsSections } from "./content";
import {
	bodyText,
	leadTerm,
	PendingNote,
	TermsSection,
	termList,
} from "./terms-section";

export function GoverningLaw() {
	return (
		<TermsSection {...termsSections.law}>
			<p className={bodyText}>
				These terms are governed by Indian law. Where a dispute is heard is not
				yet fixed.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Applicable law.</span> The terms are
					governed by and construed in accordance with the laws of India.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Exclusive jurisdiction.</span> Disputes
					arising from a transaction are subject to the exclusive jurisdiction
					of the courts at the city and state named in the agreement.
				</li>
			</ul>
			<PendingNote>
				the city and state whose courts hold exclusive jurisdiction — Gurgaon,
				Goa, or the registered office location.
			</PendingNote>
		</TermsSection>
	);
}
