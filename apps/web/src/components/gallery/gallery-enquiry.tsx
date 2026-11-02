import {
	Button,
	buttonVariants,
} from "@fk-furniture-interior/ui/components/button";
import { Input } from "@fk-furniture-interior/ui/components/input";
import { Textarea } from "@fk-furniture-interior/ui/components/textarea";
import { MessageCircle } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";

import {
	buildEnquiryMailto,
	contactEmail,
	offices,
} from "@/components/contact/content";

import {
	galleryBody,
	galleryLabel,
	galleryLead,
	gallerySection,
	galleryTitle,
} from "./content";

function readField(data: FormData, name: string) {
	return String(data.get(name) ?? "").trim();
}

export function GalleryEnquiry({ reference }: { reference: string }) {
	const [feedback, setFeedback] = useState("");

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			window.location.href = buildEnquiryMailto({
				city: readField(data, "city"),
				company: readField(data, "company") || undefined,
				details: [
					readField(data, "message"),
					"Drawings or BOQ: I will attach them to this email.",
				].join("\n\n"),
				email: readField(data, "email"),
				name: readField(data, "name"),
				phone: readField(data, "phone") || undefined,
				requirement: reference
					? `Gallery design ${reference}`
					: "Gallery project enquiry",
			});
			setFeedback(
				"Opening your email app with the brief. Attach drawings or the BOQ there before sending."
			);
		},
		[reference]
	);

	const [gurgaon] = offices;
	const [phone] = gurgaon.phones;
	const whatsappText = reference
		? `Hello FK Furniture & Interior, I would like to discuss design ${reference}.`
		: "Hello FK Furniture & Interior, I would like to discuss a project.";
	const whatsappHref = `https://wa.me/${phone.href.replace("tel:+", "")}?text=${encodeURIComponent(whatsappText)}`;

	return (
		<section
			aria-labelledby="gallery-enquiry-title"
			className={`${gallerySection} border-border border-t bg-background outline-none`}
			id="gallery-enquiry"
			tabIndex={-1}
		>
			<div className="grid gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div>
					<p className={galleryLabel}>Project enquiry</p>
					<h2
						className={`${galleryTitle} mt-[0.9rem] max-w-[16ch]`}
						id="gallery-enquiry-title"
					>
						Have drawings or a BOQ?
					</h2>
					<p className={`${galleryLead} mt-[1.35rem] max-w-[24ch]`}>
						Send what you already hold.
					</p>
					<p className={`${galleryBody} mt-[1rem] max-w-[44ch]`}>
						Layouts, drawings or a bill of quantities help us understand the
						scope before the first conversation. We will review what you send
						and reply with the next practical step.
					</p>
					<dl className="m-0 mt-[clamp(1.75rem,3vw,2.5rem)] grid border-border border-t">
						<div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.8rem]">
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								Email
							</dt>
							<dd className="m-0 break-words text-[0.8125rem]">
								<a
									className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									href={`mailto:${contactEmail}`}
								>
									{contactEmail}
								</a>
							</dd>
						</div>
						<div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.8rem]">
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								Phone
							</dt>
							<dd className="m-0 text-[0.8125rem]">
								<a
									className="underline decoration-1 underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									href={phone.href}
								>
									{phone.display}
								</a>
							</dd>
						</div>
						<div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-border border-b py-[0.8rem]">
							<dt className="m-0 text-[0.75rem] text-muted-foreground">
								Offices
							</dt>
							<dd className="m-0 text-[0.8125rem]">
								{offices.map((office) => office.name).join(" and ")}
							</dd>
						</div>
					</dl>
					{reference ? (
						<p className="m-0 mt-[1.25rem] inline-flex flex-wrap items-baseline gap-x-2 border border-border bg-card px-3 py-2 text-[0.75rem] text-muted-foreground">
							Attached to this enquiry:
							<span className="font-semibold text-foreground">{reference}</span>
						</p>
					) : null}
					<a
						className={buttonVariants({
							className: "mt-[1.5rem] h-11 bg-card",
							variant: "outline",
						})}
						href={whatsappHref}
						rel="noopener noreferrer"
						target="_blank"
					>
						<MessageCircle aria-hidden="true" size={16} />
						Connect on WhatsApp
					</a>
				</div>
				<form className="grid gap-[1.25rem]" onSubmit={handleSubmit}>
					<input name="reference" type="hidden" value={reference} />
					<div className="grid gap-5 sm:grid-cols-2">
						<label className="grid gap-1.5" htmlFor="gallery-enquiry-name">
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Your name
							</span>
							<Input
								autoComplete="name"
								id="gallery-enquiry-name"
								name="name"
								placeholder="Your name"
								required
								surface="box"
							/>
						</label>
						<label className="grid gap-1.5" htmlFor="gallery-enquiry-email">
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Email address
							</span>
							<Input
								autoComplete="email"
								id="gallery-enquiry-email"
								name="email"
								placeholder="Email address"
								required
								surface="box"
								type="email"
							/>
						</label>
						<label className="grid gap-1.5" htmlFor="gallery-enquiry-phone">
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Phone number (optional)
							</span>
							<Input
								autoComplete="tel"
								id="gallery-enquiry-phone"
								name="phone"
								placeholder="Phone number"
								surface="box"
								type="tel"
							/>
						</label>
						<label className="grid gap-1.5" htmlFor="gallery-enquiry-company">
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Company or hotel (optional)
							</span>
							<Input
								autoComplete="organization"
								id="gallery-enquiry-company"
								name="company"
								placeholder="Company or hotel"
								surface="box"
							/>
						</label>
						<label
							className="grid gap-1.5 sm:col-span-2"
							htmlFor="gallery-enquiry-city"
						>
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Project city
							</span>
							<Input
								autoComplete="address-level2"
								id="gallery-enquiry-city"
								name="city"
								placeholder="City of the project"
								surface="box"
							/>
						</label>
						<label
							className="grid gap-1.5 sm:col-span-2"
							htmlFor="gallery-enquiry-message"
						>
							<span className="font-medium text-[0.75rem] text-muted-foreground">
								Project details
							</span>
							<Textarea
								id="gallery-enquiry-message"
								name="message"
								placeholder="The space, the scope, and the drawings or BOQ you hold"
								surface="box"
							/>
						</label>
					</div>
					<div className="flex flex-wrap items-center gap-x-5 gap-y-3">
						<Button className="h-11" type="submit">
							Send project details
						</Button>
						<p className="m-0 max-w-[34ch] text-[0.75rem] text-muted-foreground leading-[1.5]">
							This opens an email draft. Attach the drawings or BOQ before
							sending.
						</p>
					</div>
					<p
						aria-live="polite"
						className="m-0 min-h-5 text-[0.8125rem] text-muted-foreground"
					>
						{feedback}
					</p>
				</form>
			</div>
		</section>
	);
}
