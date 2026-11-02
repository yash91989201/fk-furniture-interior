import { PolicyReview, PolicySection } from "./policy-section";

export function DataRights() {
	return (
		<PolicySection
			id="data-rights"
			number={7}
			title="Access, correction and deletion"
		>
			<p>You can ask us to:</p>
			<ul>
				<li>Tell you what personal information we hold about you.</li>
				<li>Correct business contact details that are out of date.</li>
				<li>
					Delete your enquiry contact details from our active communication
					records.
				</li>
			</ul>
			<p>
				Send the request through the privacy contact below. We may confirm your
				identity before we act, so that one person cannot read another person's
				details.
			</p>
			<PolicyReview>
				Confirm the response window the business commits to, and any records it
				must keep, such as invoices or signed contracts, that cannot be deleted
				on request.
			</PolicyReview>
		</PolicySection>
	);
}
