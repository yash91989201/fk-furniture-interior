import { PolicyReview, PolicySection } from "./policy-section";

export function InformationCollected() {
	return (
		<PolicySection
			id="information-collected"
			number={1}
			title="Information we collect"
		>
			<p>
				We collect what you choose to send us about a project, and the limited
				technical data this website records while you use it.
			</p>
			<p>
				<strong>Contact details.</strong> Name, company or hotel name, email
				address, phone number, project city, requirement type and your message —
				the fields in the enquiry form.
			</p>
			<p>
				<strong>Project specifications.</strong> Floor plans, design drawings,
				Bills of Quantities, sample requests and furniture quantities. Today
				these reach us by email, WhatsApp or in person; this website has no file
				upload.
			</p>
			<p>
				<strong>Technical and usage data.</strong> This website runs no
				analytics and sets no cookies for measurement, so a visit adds nothing
				beyond what the hosting provider may log at the server.
			</p>
			<PolicyReview>
				The enquiry form on this site is a preview: submissions are not sent or
				stored. Confirm the fields retained, where enquiries will land, whether
				an upload will be added, and how long hosting logs are kept.
			</PolicyReview>
		</PolicySection>
	);
}
