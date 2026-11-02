import { PolicyReview, PolicySection } from "./policy-section";

export function DesignConfidentiality() {
	return (
		<PolicySection
			id="design-confidentiality"
			number={3}
			title="Confidentiality of plans, drawings and BOQs"
		>
			<p>
				Hotel layouts, concept designs, custom furniture drawings and Bills of
				Quantities you share stay confidential. We use them only to quote,
				manufacture and install your project.
			</p>
			<p>
				We do not sell, trade or rent your drawings or project requirements, and
				we do not pass them to competitors. Access stays with the people pricing
				and making your project.
			</p>
			<PolicyReview>
				Draft commitment. Confirm who inside the business can open project
				files, and whether any subcontracted workshop needs access, before this
				wording is approved.
			</PolicyReview>
		</PolicySection>
	);
}
