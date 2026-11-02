import { PolicyReview, PolicySection } from "./policy-section";

export function Cookies() {
	return (
		<PolicySection id="cookies" number={6} title="Cookies">
			<p>
				This website sets no cookies for analytics, advertising or
				personalisation, so it shows no cookie banner and asks for no consent.
			</p>
			<p>
				Your browser settings still control cookies from any site you visit.
				Declining or clearing cookies does not restrict the enquiry form or the
				rest of this page.
			</p>
			<PolicyReview>
				Verified against the current build, which loads no analytics or tracking
				scripts. Update this section if measurement, embedded media or a consent
				banner is added.
			</PolicyReview>
		</PolicySection>
	);
}
