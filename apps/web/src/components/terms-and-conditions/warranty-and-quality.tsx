import { termsSections } from "./content";
import {
	bodyText,
	leadTerm,
	PendingNote,
	TermsSection,
	termList,
} from "./terms-section";

export function WarrantyAndQuality() {
	return (
		<TermsSection {...termsSections.warranty}>
			<p className={bodyText}>
				Cover is limited to the manufacturing we control, under the use the work
				was specified for.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>Manufacturing warranty.</span> A limited
					warranty applies to structural defects, joint failure and hardware
					malfunction under normal commercial usage. The period runs from
					handover and is stated in the project agreement.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>What it excludes.</span> Water seepage,
					misuse, improper handling, faults in the building structure, pest
					infestation after delivery, and normal wear of surface laminates and
					upholstery are outside the warranty.
				</li>
			</ul>
			<PendingNote>
				the warranty period in years, and whether it differs by product type or
				by hospitality versus residential use.
			</PendingNote>
		</TermsSection>
	);
}
