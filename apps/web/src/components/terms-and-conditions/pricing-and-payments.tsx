import { termsSections } from "./content";
import {
	bodyText,
	leadTerm,
	PendingNote,
	TermsSection,
	termList,
} from "./terms-section";

export function PricingAndPayments() {
	return (
		<TermsSection {...termsSections.pricing}>
			<p className={bodyText}>
				A quoted price covers the manufactured item. It does not cover tax,
				freight or local transit unless the quotation says so in writing.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Payment runs in milestones.</span> The
					standard schedule is an advance on order placement, a payment during
					production or at dispatch, and the balance before or on delivery and
					installation. The percentages and dates for a given order are fixed in
					the agreement.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Taxes and duties are extra.</span> Quoted
					prices exclude Goods and Services Tax, shipping and freight charges,
					and local transit duties unless the quotation states otherwise.
				</li>
			</ul>
			<PendingNote>
				the milestone percentages, and whether the balance falls due before
				delivery or on installation.
			</PendingNote>
		</TermsSection>
	);
}
