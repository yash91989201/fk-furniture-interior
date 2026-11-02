import { PolicyReview, PolicySection } from "./policy-section";

export function DataSecurity() {
	return (
		<PolicySection id="data-security" number={5} title="Security and storage">
			<p>
				We protect personal and project information with operational and digital
				safeguards, and we limit access to the people working on your project.
			</p>
			<p>
				Enquiries sent by email or WhatsApp also sit with those providers under
				their own terms, alongside the records we keep for quoting and
				manufacturing.
			</p>
			<PolicyReview>
				Secure storage, retention periods and the deletion schedule are not yet
				verified. Confirm where enquiry and project files are stored and how
				long each record is kept before this section is approved.
			</PolicyReview>
		</PolicySection>
	);
}
