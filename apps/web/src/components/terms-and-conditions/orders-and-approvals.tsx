import { termsSections } from "./content";
import {
	bodyText,
	leadTerm,
	PendingNote,
	TermsSection,
	termList,
} from "./terms-section";

export function OrdersAndApprovals() {
	return (
		<TermsSection {...termsSections.orders}>
			<p className={bodyText}>
				An order is not live until three things exist: written confirmation, the
				agreed advance, and drawings or a prototype the client has signed off.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>
						Written confirmation starts the order.
					</span>{" "}
					The order is processed only after written or digital confirmation,
					payment of the agreed advance, and final signed-off technical drawings
					or mock-up approval.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Mock-ups set the standard.</span> For bulk
					hotel projects a physical prototype or mock-up room is approved before
					bulk production. Once signed off, that sample is the standard the
					whole run is checked against.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Natural materials vary.</span> Wood, veneer
					and natural finishes carry their own grain, texture and shade. Minor
					differences from a digital render or a sample swatch are a property of
					the material, not a defect.
				</li>
			</ul>
			<PendingNote>
				whether mock-up approval is mandatory on every bulk project or only
				above a stated order size.
			</PendingNote>
		</TermsSection>
	);
}
