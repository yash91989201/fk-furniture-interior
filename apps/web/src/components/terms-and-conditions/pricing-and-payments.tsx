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
					standard schedule is 50% advance, 30% before dispatch and 10% before
					installation.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Taxes and duties are extra.</span> Quoted
					prices exclude Goods and Services Tax, shipping and freight charges,
					and local transit duties unless the quotation states otherwise.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Cancellation.</span> Cancelled order is non
					refundable.
				</li>
			</ul>
			<PendingNote>
				the stated payments total 90% (50% + 30% + 10%). The final 10% and its
				due date are not defined. It is also unresolved whether "Cancelled order
				is non refundable." applies to the advance only or to all payments.
			</PendingNote>
		</TermsSection>
	);
}
