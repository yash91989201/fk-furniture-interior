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
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

import {
	buildEnquiryMailto,
	contactEmail,
	gurgaonOffice,
} from "@/components/contact/content";

import { enquiryOptions } from "./content";

const HOME_COPY = {
	body: "Share the location, scope and timeline, with drawings, renders or a BOQ if you have them. We reply with questions or a quotation plan.",
	heading: "Tell us about your project.",
	title: "Start with the brief.",
};

export function Enquiry({
	presetCategory,
	presetRequirement,
	copy = HOME_COPY,
}: {
	presetCategory: string;
	presetRequirement: string;
	copy?: { body: string; heading: string; title: string };
}) {
	const [mounted, setMounted] = useState(false);
	const [requirement, setRequirement] = useState(presetRequirement || "");
	const [message, setMessage] = useState(
		presetCategory
			? `I would like to discuss ${presetCategory.toLowerCase()}.`
			: ""
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const value = (key: string) => String(data.get(key) ?? "").trim();
		window.location.href = buildEnquiryMailto({
			city: value("city"),
			company: value("company") || undefined,
			details: value("message"),
			email: value("email"),
			name: value("name"),
			phone: value("phone") || undefined,
			requirement,
		});
	}

	function handleRequirementChange(value: unknown) {
		if (typeof value === "string") {
			setRequirement(value);
		}
	}

	function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setMessage(event.currentTarget.value);
	}

	const formFields = (
		<>
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
				<Select onValueChange={handleRequirementChange} value={requirement}>
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
		</>
	);

	return (
		<section className="home-section home-enquiry" id="fk-enquiry">
			<div className="home-enquiry-grid">
				<div className="home-enquiry-invite">
					<h2 className="home-enquiry-title">{copy.title}</h2>
					<h3>{copy.heading}</h3>
					<p>{copy.body}</p>
					<p className="home-muted">
						Prefer to write directly? Email{" "}
						<a
							className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							href={`mailto:${contactEmail}`}
						>
							{contactEmail}
						</a>{" "}
						or call{" "}
						<a
							className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							href={gurgaonOffice.phones[0].href}
						>
							{gurgaonOffice.phones[0].display}
						</a>
						.
					</p>
				</div>
				<form className="home-enquiry-form" onSubmit={onSubmit}>
					<fieldset className="contents" disabled={!mounted}>
						<FieldGroup className="home-form-grid !grid gap-4">
							{formFields}
						</FieldGroup>
						<Button className="home-enquiry-button" type="submit">
							Open email draft
						</Button>
					</fieldset>
				</form>
			</div>
		</section>
	);
}
