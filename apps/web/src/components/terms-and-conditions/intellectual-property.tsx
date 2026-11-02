import { termsSections } from "./content";
import { bodyText, leadTerm, TermsSection, termList } from "./terms-section";

export function IntellectualProperty() {
	return (
		<TermsSection {...termsSections.intellectualProperty}>
			<p className={bodyText}>
				The drawings, designs and photographs behind our work belong to the
				company.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Company property.</span> Website content,
					furniture designs, blueprints, CAD drawings, product photographs and
					catalogues are the exclusive intellectual property of FK Furniture
					&amp; Interior.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>No unauthorised use.</span> Reproducing,
					copying or commercially using that material without written permission
					is prohibited. Project drawings issued to a client stay licensed for
					that project.
				</li>
			</ul>
		</TermsSection>
	);
}
