import { termsSections } from "./content";
import { bodyText, leadTerm, TermsSection, termList } from "./terms-section";

export function GoverningLaw() {
	return (
		<TermsSection {...termsSections.law}>
			<p className={bodyText}>
				These terms are governed by Indian law. Disputes are heard in Gurugram,
				Haryana.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Applicable law.</span> The terms are
					governed by and construed in accordance with the laws of India.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Jurisdiction.</span> Disputes arising from
					a transaction are subject to the jurisdiction of the courts at
					Gurugram, Haryana.
				</li>
			</ul>
		</TermsSection>
	);
}
