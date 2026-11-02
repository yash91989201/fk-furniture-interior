import { Button } from "@fk-furniture-interior/ui/components/button";
import {
	Field,
	FieldGroup,
	FieldLabel,
} from "@fk-furniture-interior/ui/components/field";
import { Input } from "@fk-furniture-interior/ui/components/input";
import { Textarea } from "@fk-furniture-interior/ui/components/textarea";
import { type FormEvent, useCallback, useState } from "react";

import {
	buildEnquiryMailto,
	contactEmail,
	type EnquiryFields,
	requirementOptions,
} from "./content";

interface Status {
	href?: string;
	message: string;
	tone: "idle" | "ready" | "error";
}

const fieldLabel =
	"flex items-baseline justify-between gap-3 text-sm text-foreground";
const optional = "font-normal text-muted-foreground text-xs";

export function ContactForm() {
	const [status, setStatus] = useState<Status>({ message: "", tone: "idle" });

	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const value = (key: string) => String(data.get(key) ?? "").trim();
		const fields: EnquiryFields = {
			city: value("city"),
			company: value("company") || undefined,
			details: value("details"),
			email: value("email"),
			name: value("name"),
			phone: value("phone") || undefined,
			requirement: value("requirement"),
		};
		const href = buildEnquiryMailto(fields);

		setStatus({
			href,
			message: `Your email app should open with the enquiry addressed to ${contactEmail}. Nothing is sent until you send it there.`,
			tone: "ready",
		});
		window.location.href = href;
	}, []);

	return (
		<section
			aria-labelledby="contact-form-title"
			className="scroll-mt-[calc(var(--home-nav-compact)+0.75rem)] border-border border-b bg-muted/40 pt-[clamp(3rem,7vw,5.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(3rem,7vw,5.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
			id="contact-form"
			tabIndex={-1}
		>
			<div className="grid gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
				<div className="max-w-[38ch]">
					<h2
						className="m-0 max-w-[14ch] text-balance font-medium text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.08] tracking-[-0.025em]"
						id="contact-form-title"
					>
						Tell us what you are planning.
					</h2>
					<p className="mt-[1.25rem] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.7]">
						A few lines about the space, the scope and the stage you are at is
						enough to begin. If drawings or a BOQ exist, bring those into the
						conversation.
					</p>
					<p className="mt-[1rem] border-border border-t pt-[0.9rem] text-[0.8125rem] text-muted-foreground leading-[1.55]">
						This form prepares an email in your own mail app. The website does
						not send, store or upload anything, so attach plans or a BOQ in the
						email itself.
					</p>
				</div>
				<form
					className="border border-border bg-card p-[clamp(1.25rem,3vw,2.25rem)]"
					onSubmit={onSubmit}
				>
					<FieldGroup className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-name">
								Name
							</FieldLabel>
							<Input
								autoComplete="name"
								id="contact-name"
								name="name"
								required
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-email">
								Email
							</FieldLabel>
							<Input
								autoComplete="email"
								id="contact-email"
								name="email"
								required
								surface="box"
								type="email"
							/>
						</Field>
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-phone">
								Phone
								<span className={optional}>Optional</span>
							</FieldLabel>
							<Input
								autoComplete="tel"
								id="contact-phone"
								name="phone"
								surface="box"
								type="tel"
							/>
						</Field>
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-company">
								Company or hotel
								<span className={optional}>Optional</span>
							</FieldLabel>
							<Input
								autoComplete="organization"
								id="contact-company"
								name="company"
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-city">
								Project city
							</FieldLabel>
							<Input
								autoComplete="address-level2"
								id="contact-city"
								name="city"
								required
								surface="box"
							/>
						</Field>
						<Field>
							<FieldLabel className={fieldLabel} htmlFor="contact-requirement">
								Type of requirement
							</FieldLabel>
							<select
								className="h-10 w-full border border-input bg-card px-3 py-2 text-base outline-none transition-[color,border-color,background-color] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 md:text-sm"
								defaultValue=""
								id="contact-requirement"
								name="requirement"
								required
							>
								<option disabled value="">
									Select one
								</option>
								{requirementOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</Field>
						<Field className="sm:col-span-2">
							<FieldLabel className={fieldLabel} htmlFor="contact-details">
								Project details
							</FieldLabel>
							<Textarea
								className="min-h-32"
								id="contact-details"
								name="details"
								placeholder="The space, the scope, the timeline, and what you need help with"
								required
								surface="box"
							/>
						</Field>
					</FieldGroup>
					<div className="mt-6 flex flex-col gap-3">
						<Button className="w-full sm:w-fit" type="submit">
							Prepare email enquiry
						</Button>
						<p className="m-0 text-[0.8125rem] text-muted-foreground leading-[1.55]">
							Nothing is sent or stored by this website. Your email app sends
							the message.
						</p>
						<div
							aria-live="polite"
							className="min-h-6 text-[0.875rem] leading-[1.55]"
						>
							{status.message ? (
								<p
									className={
										status.tone === "error"
											? "m-0 text-destructive"
											: "m-0 text-muted-foreground"
									}
								>
									{status.message}
									{status.href ? (
										<>
											{" "}
											<a
												className="underline decoration-1 decoration-primary underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
												href={status.href}
											>
												Open the draft
											</a>
											.
										</>
									) : null}
								</p>
							) : null}
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
