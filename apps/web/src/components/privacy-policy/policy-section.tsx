import type { ReactNode } from "react";

const prose =
	"space-y-5 text-pretty text-[1.0625rem] leading-[1.75] [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:pl-1 [&_li::marker]:text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5";

export function PolicySection({
	children,
	id,
	number,
	title,
}: {
	children: ReactNode;
	id: string;
	number: number;
	title: string;
}) {
	return (
		<section
			aria-labelledby={`${id}-title`}
			className="scroll-mt-[calc(3.75rem+1.5rem)] border-border border-t pt-8 focus:outline-none"
			id={id}
			tabIndex={-1}
		>
			<h2
				className="flex items-baseline gap-3 font-heading font-medium text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] text-foreground leading-[1.2] tracking-[-0.015em]"
				id={`${id}-title`}
			>
				<span
					aria-hidden="true"
					className="font-sans font-semibold text-[0.75rem] text-muted-foreground tabular-nums tracking-[0.14em]"
				>
					{String(number).padStart(2, "0")}
				</span>
				{title}
			</h2>
			<div className={`mt-5 ${prose}`}>{children}</div>
		</section>
	);
}

export function PolicyReview({ children }: { children: ReactNode }) {
	return (
		<p className="text-[0.875rem] text-muted-foreground leading-[1.6]">
			<span
				aria-hidden="true"
				className="mb-3 block h-0.5 w-6 rounded-full bg-primary"
			/>
			<strong className="font-semibold text-foreground">Review:</strong>{" "}
			{children}
		</p>
	);
}
