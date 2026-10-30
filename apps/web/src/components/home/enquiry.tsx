/** biome-ignore-all lint/performance/noJsxPropsBind: handlers close over form state */
import { Button } from "@fk-furniture-interior/ui/components/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@fk-furniture-interior/ui/components/field";
import { Input } from "@fk-furniture-interior/ui/components/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@fk-furniture-interior/ui/components/select";
import { Textarea } from "@fk-furniture-interior/ui/components/textarea";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { enquiryOptions } from "./content";

export function Enquiry({
	presetCategory,
	presetRequirement,
}: {
	presetCategory: string;
	presetRequirement: string;
}) {
	const [feedback, setFeedback] = useState("");
	const [contactNote, setContactNote] = useState("");
	const [requirement, setRequirement] = useState(
		presetRequirement || enquiryOptions[0]
	);
	const [message, setMessage] = useState(
		presetCategory
			? `I would like to discuss ${presetCategory.toLowerCase()}.`
			: ""
	);

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setFeedback("Preview only — no enquiry has been sent or stored.");
	}

	function handleWhatsApp() {
		setContactNote(
			"WhatsApp destination will be connected once the contact number is confirmed."
		);
	}

	function handleRequirementChange(value: unknown) {
		if (typeof value === "string") {
			setRequirement(value);
		}
	}

	function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setMessage(event.currentTarget.value);
	}

	return (
		<section className="home-section home-enquiry" id="fk-enquiry">
			<h2 className="home-enquiry-title">
				Your space.
				<br />
				Our next conversation.
			</h2>
			<div className="home-enquiry-grid">
				<div>
					<h3>Let’s discuss your project.</h3>
					<p>Tell us about your space, your ideas and the support you need.</p>
					<div className="home-actions">
						<Button onClick={handleWhatsApp} variant="outline">
							WhatsApp the team
						</Button>
					</div>
					<p className="home-muted">
						[Phone number]
						<br />
						[Email address]
						<br />
						Gurgaon and Goa offices
					</p>
					<p aria-live="polite">{contactNote}</p>
				</div>
				<form onSubmit={onSubmit}>
					<FieldGroup className="home-form-grid !grid gap-4">
						<Field>
							<FieldLabel htmlFor="enquiry-name">Your name</FieldLabel>
							<Input
								autoComplete="name"
								id="enquiry-name"
								name="name"
								placeholder="Name"
								required
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="enquiry-email">Email</FieldLabel>
							<Input
								autoComplete="email"
								id="enquiry-email"
								name="email"
								placeholder="Email"
								required
								surface="box"
								type="email"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="enquiry-phone">Phone</FieldLabel>
							<Input
								autoComplete="tel"
								id="enquiry-phone"
								name="phone"
								placeholder="Phone number"
								surface="box"
								type="tel"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="enquiry-company">
								Company / hotel (optional)
							</FieldLabel>
							<Input
								autoComplete="organization"
								id="enquiry-company"
								name="company"
								placeholder="Company name"
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="enquiry-city">City</FieldLabel>
							<Input
								autoComplete="address-level2"
								id="enquiry-city"
								name="city"
								placeholder="Project city"
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="enquiry-requirement">
								I need help with
							</FieldLabel>
							<Select
								onValueChange={handleRequirementChange}
								value={requirement}
							>
								<SelectTrigger
									className="h-10 w-full border border-input bg-card px-3"
									id="enquiry-requirement"
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{enquiryOptions.map((option) => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field>
						<Field className="home-full">
							<FieldLabel htmlFor="enquiry-message">
								About your project
							</FieldLabel>
							<Textarea
								id="enquiry-message"
								name="message"
								onChange={handleMessageChange}
								placeholder="Space, approximate scope and requirements"
								surface="box"
								value={message}
							/>
							<FieldDescription>
								[Optional BOQ / drawing upload — placement placeholder]
							</FieldDescription>
						</Field>
					</FieldGroup>
					<p className="home-muted">[Privacy notice and policy link]</p>
					<Button type="submit" variant="secondary">
						Send enquiry · preview
					</Button>
					<p aria-live="polite">{feedback}</p>
				</form>
			</div>
		</section>
	);
}
