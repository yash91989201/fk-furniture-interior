import { PolicyReview, PolicySection } from "./policy-section";

export function InformationUse() {
	return (
		<PolicySection
			id="how-we-use-information"
			number={2}
			title="How we use your information"
		>
			<p>
				We use your details to answer the enquiry you sent and to deliver the
				work you ask for:
			</p>
			<ul>
				<li>Prepare factory-direct estimates, quotes and mock-up schedules.</li>
				<li>
					Discuss technical drawings, material finishes, production timelines
					and logistics.
				</li>
				<li>
					Arrange site measurement visits, delivery dispatches and installation.
				</li>
				<li>Answer technical questions and support you after handover.</li>
				<li>Improve the content and usability of this website.</li>
			</ul>
			<PolicyReview>
				Site improvement currently rests on no analytics or measurement data.
				Remove the final point, or describe the measurement that will be used,
				before publication.
			</PolicyReview>
		</PolicySection>
	);
}
