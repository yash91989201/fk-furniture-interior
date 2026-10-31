/** biome-ignore-all lint/performance/noJsxPropsBind: handlers close over form state */
import { Button } from "@fk-furniture-interior/ui/components/button";
import { Field, FieldGroup } from "@fk-furniture-interior/ui/components/field";
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
	const [requirement, setRequirement] = useState(presetRequirement || "");
	const [message, setMessage] = useState(
		presetCategory
			? `I would like to discuss ${presetCategory.toLowerCase()}.`
			: ""
	);

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const subject = requirement.trim();
		setFeedback(
			subject
				? `Brief received: ${subject.toLowerCase()}. Nothing has been sent or stored.`
				: "Brief received. Nothing has been sent or stored."
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
			<div className="home-enquiry-grid">
				<div className="home-enquiry-invite">
					<h2 className="home-enquiry-title">
						Your space. Our next conversation.
					</h2>
					<h3>Let’s discuss your project.</h3>
					<p>Tell us about your space, your ideas and the support you need.</p>
					<p className="home-muted">
						[Phone number]
						<br />
						[Email address]
						<br />
						Gurgaon and Goa offices
					</p>
				</div>
				<form className="home-enquiry-form" onSubmit={onSubmit}>
					<FieldGroup className="home-form-grid !grid gap-4">
						<Field>
							<Input
								aria-label="Your name"
								autoComplete="name"
								id="enquiry-name"
								name="name"
								placeholder="Your name"
								required
								surface="line"
							/>
						</Field>
						<Field>
							<Input
								aria-label="Email address"
								autoComplete="email"
								id="enquiry-email"
								name="email"
								placeholder="Email address"
								required
								surface="line"
								type="email"
							/>
						</Field>
						<Field>
							<Input
								aria-label="Phone number (optional)"
								autoComplete="tel"
								id="enquiry-phone"
								name="phone"
								placeholder="Phone number (optional)"
								surface="line"
								type="tel"
							/>
						</Field>
						<Field>
							<Input
								aria-label="Company or hotel (optional)"
								autoComplete="organization"
								id="enquiry-company"
								name="company"
								placeholder="Company or hotel (optional)"
								surface="line"
							/>
						</Field>
						<Field>
							<Input
								aria-label="Project city"
								autoComplete="address-level2"
								id="enquiry-city"
								name="city"
								placeholder="City of the project"
								surface="line"
							/>
						</Field>
						<Field>
							<Select
								onValueChange={handleRequirementChange}
								value={requirement}
							>
								<SelectTrigger
									aria-label="I need help with"
									className="w-full"
									id="enquiry-requirement"
								>
									<SelectValue placeholder="I need help with" />
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
							<Textarea
								aria-label="About your project"
								id="enquiry-message"
								name="message"
								onChange={handleMessageChange}
								placeholder="The space, the scope, and what you need"
								surface="line"
								value={message}
							/>
						</Field>
					</FieldGroup>
					<Button className="home-enquiry-button" type="submit">
						Send enquiry · preview
					</Button>
					<p
						aria-live="polite"
						className={feedback ? "home-enquiry-note" : undefined}
					>
						{feedback}
					</p>
				</form>
			</div>
		</section>
	);
}
