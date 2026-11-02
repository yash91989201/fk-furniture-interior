import { PolicySection } from "./policy-section";

export function PolicyUpdates() {
	return (
		<PolicySection
			id="policy-updates"
			number={8}
			title="Updates to this policy"
		>
			<p>
				We update this policy when our practices or the law change. A revised
				version is published on this page with a new date, and the date at the
				top always shows the current version.
			</p>
			<p>
				Earlier versions are not archived here, so keep a copy if you need a
				record of what applied when you sent an enquiry.
			</p>
		</PolicySection>
	);
}
