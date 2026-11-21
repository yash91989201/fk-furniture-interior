import { termsSections } from "./content";
import { bodyText, leadTerm, TermsSection, termList } from "./terms-section";

export function ServicesAndQuotations() {
	return (
		<TermsSection {...termsSections.services}>
			<p className={bodyText}>
				Work is quoted and made against what the client supplies: drawings,
				renders, a Bill of Quantities (BOQ) or a written specification. There is
				no fixed minimum order. Scope is quoted per BOQ and project. Nothing
				goes into production from a verbal description.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>
						Made to measure, business to business.
					</span>{" "}
					Custom hotel furniture, architectural woodwork, modular items and
					commercial fit-outs are built from client-approved drawings, BOQs or
					specifications. Every line is made for one project rather than drawn
					from stock.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Quotations are valid for 20 days.</span> A
					quotation is open for 20 days from the date of issue. After that,
					prices follow raw material costs, such as plywood, HDHMR and veneers,
					and are revised against them.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Specification changes are repriced.</span>{" "}
					Any change to design, dimensions, materials or finish after
					confirmation can move both the price and the delivery schedule. The
					revised figures are shared in writing before the change is made.
				</li>
			</ul>
		</TermsSection>
	);
}
