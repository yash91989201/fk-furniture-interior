import { PolicyReview, PolicySection } from "./policy-section";

export function ThirdPartySharing() {
	return (
		<PolicySection
			id="third-party-sharing"
			number={4}
			title="Sharing with service providers"
		>
			<p>We do not sell, rent or lease your personal information.</p>
			<p>We share what a task needs, and nothing more:</p>
			<ul>
				<li>
					<strong>Logistics and freight partners</strong> receive contact
					numbers and site delivery addresses for vehicle dispatch, tracking and
					offloading.
				</li>
				<li>
					<strong>Legal compliance.</strong> Information is released only when
					Indian law, a court order or a lawful request from an authority
					requires it.
				</li>
			</ul>
			<PolicyReview>
				List every processor that touches enquiry data — for example hosting,
				email and WhatsApp Business — and confirm which ones must be named here.
			</PolicyReview>
		</PolicySection>
	);
}
