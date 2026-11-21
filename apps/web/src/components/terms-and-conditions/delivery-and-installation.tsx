import { termsSections } from "./content";
import {
	bodyText,
	leadTerm,
	PendingNote,
	TermsSection,
	termList,
} from "./terms-section";

export function DeliveryAndInstallation() {
	return (
		<TermsSection {...termsSections.delivery}>
			<p className={bodyText}>
				Delivery dates follow factory capacity and project size. Mass production
				lead time is 8 weeks. The site has to be ready before the installation
				team arrives.
			</p>
			<ul className={termList}>
				<li className={bodyText}>
					<span className={leadTerm}>
						Schedules are estimates in good faith.
					</span>{" "}
					Dates are given against the work in hand. Delays caused by force
					majeure, an unready site, or transport disruption fall outside our
					control and outside our liability.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Site readiness is the client’s part.</span>{" "}
					The client confirms the installation area is ready, secure and
					accessible, with working power and lift access where the pieces need
					it, before the team arrives.
				</li>
				<li className={bodyText}>
					<span className={leadTerm}>Late acceptance can attract storage.</span>{" "}
					If delivery cannot be accepted on the scheduled date, there is a
					10-day grace period. Warehousing and storage charges may apply after
					that.
				</li>
			</ul>
			<PendingNote>
				the storage charge rate. The 10-day grace period is confirmed.
			</PendingNote>
		</TermsSection>
	);
}
