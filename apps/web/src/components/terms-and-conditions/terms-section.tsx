import type { ReactNode } from "react";
import type { TermsSectionMeta } from "./content";

// Four sans roles: body 17px, secondary 15px, data 15px, label 11px caps.
export const bodyText = "m-0 text-pretty leading-[1.7]";

export const secondaryText =
	"m-0 text-pretty text-[0.9375rem] text-muted-foreground leading-[1.65]";

export const labelRole =
	"font-sans font-semibold text-[0.6875rem] text-muted-foreground uppercase tracking-[0.16em]";

export const indexToken =
	"font-sans font-semibold text-[0.8125rem] text-muted-foreground tabular-nums tracking-[0.08em]";

export const termList =
	"m-0 flex list-disc flex-col gap-[0.65rem] pl-[1.15rem] marker:text-muted-foreground";

export const leadTerm = "font-semibold text-foreground";

interface TermsSectionProps extends TermsSectionMeta {
	children: ReactNode;
}

export function TermsSection({
	children,
	id,
	index,
	summary,
	title,
}: TermsSectionProps) {
	return (
		<section
			aria-labelledby={`${id}-title`}
			className="border-border border-t pt-8 [scroll-margin-top:calc(3.75rem+1.5rem)]"
			id={id}
		>
			<h2
				className="flex items-baseline gap-3 font-medium text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-[1.2] tracking-[-0.02em] print:break-after-avoid"
				id={`${id}-title`}
			>
				<span aria-hidden="true" className={indexToken}>
					{index}
				</span>
				<span className="text-balance">{title}</span>
			</h2>
			<p
				className={`mt-2 max-w-[48ch] print:break-after-avoid ${secondaryText}`}
			>
				{summary}
			</p>
			<div className="mt-5 flex flex-col gap-[0.9rem] text-[1.0625rem]">
				{children}
			</div>
		</section>
	);
}

// Marks a term the draft leaves open, so no reader mistakes it for agreed wording.
export function PendingNote({ children }: { children: ReactNode }) {
	return (
		<p
			className={`border-border border-l py-0.5 pl-3 print:break-inside-avoid ${secondaryText}`}
		>
			<strong className="font-semibold text-foreground">Decision needed</strong>
			{" — "}
			{children}
		</p>
	);
}
