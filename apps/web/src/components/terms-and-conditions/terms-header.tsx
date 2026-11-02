import { useActiveSection } from "@/hooks/use-active-section";

import {
	openDecisions,
	termsContents,
	termsScope,
	termsSectionIds,
	termsStatus,
} from "./content";
import { indexToken, labelRole, secondaryText } from "./terms-section";

const revisionFacts = [
	{ label: "Revision date", value: "Not set — no approved version" },
	{ label: "Review", value: "Business and legal sign-off pending" },
] as const;

export function TermsHero() {
	return (
		<header className="bg-background pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2rem,4vw,3.25rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] [padding-top:calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] print:pt-0 print:pb-6">
			<div className="mx-auto grid max-w-[76rem] gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(1.5rem,3vw,2rem)] lg:grid-cols-[15rem_minmax(0,42rem)] lg:items-start lg:justify-center">
				<div className="max-w-[42rem] lg:col-start-2 lg:row-start-1">
					<h1
						className="max-w-[16ch] text-balance font-medium text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
						id="fk-terms-title"
					>
						Terms &amp; Conditions
					</h1>
					<p className="mt-5 max-w-[54ch] text-pretty font-heading font-medium text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-[1.45] tracking-[-0.01em]">
						{termsScope}
					</p>
					<p
						className={`mt-6 border-border border-l py-0.5 pl-3 ${secondaryText}`}
					>
						<strong className="font-semibold text-foreground">Draft.</strong>{" "}
						{termsStatus}
					</p>
				</div>
				<dl className="m-0 grid gap-3 leading-[1.5] lg:col-start-1 lg:row-start-1 lg:pb-1">
					{revisionFacts.map((fact) => (
						<div className="grid gap-[0.15rem]" key={fact.label}>
							<dt className={labelRole}>{fact.label}</dt>
							<dd className="m-0 text-[0.9375rem] text-foreground">
								{fact.value}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</header>
	);
}

export function TermsContents() {
	const active = useActiveSection(termsSectionIds);

	return (
		<nav
			aria-labelledby="fk-terms-contents-title"
			className="border-border border-t pt-4 lg:sticky lg:top-[calc(3.75rem+2rem)] lg:self-start print:static"
			id="fk-terms-contents"
		>
			<h2 className={`m-0 ${labelRole}`} id="fk-terms-contents-title">
				Contents
			</h2>
			<ol className="m-0 mt-3 grid list-none gap-x-6 p-0 text-[0.9375rem] leading-[1.5] sm:grid-cols-2 lg:grid-cols-1">
				{termsContents.map((section) => {
					const current = section.id === active;
					return (
						<li key={section.id}>
							<a
								aria-current={current ? "true" : undefined}
								className={`group flex min-h-11 items-center gap-2.5 transition-colors ${
									current
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
								href={`#${section.id}`}
							>
								<span
									aria-hidden="true"
									className={`h-0.5 w-3 shrink-0 self-center rounded-full transition-colors ${
										current
											? "bg-primary"
											: "bg-transparent group-hover:bg-border"
									}`}
								/>
								<span className="tabular-nums">{section.index}</span>
								<span className={`text-pretty ${current ? "font-medium" : ""}`}>
									{section.short}
								</span>
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

// Appendix rather than body copy: these are the blanks the draft leaves for the business.
export function TermsDecisions() {
	return (
		<section
			aria-labelledby="fk-terms-decisions-title"
			className="border-border border-t pt-8 [scroll-margin-top:calc(3.75rem+1.5rem)]"
			id="fk-terms-decisions"
		>
			<h2
				className="flex items-baseline gap-3 font-medium text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-[1.2] tracking-[-0.02em] print:break-after-avoid"
				id="fk-terms-decisions-title"
			>
				<span aria-hidden="true" className={indexToken}>
					Open
				</span>
				<span className="text-balance">
					Decisions needed before publication
				</span>
			</h2>
			<ul className="m-0 mt-5 grid list-none gap-x-8 gap-y-4 p-0 text-[0.9375rem] leading-[1.6] sm:grid-cols-2">
				{openDecisions.map((decision) => (
					<li
						className="border-border border-t pt-3 print:break-inside-avoid"
						key={decision.label}
					>
						<p className="m-0 font-semibold text-foreground">
							{decision.label}
						</p>
						<p className={`mt-1 ${secondaryText}`}>{decision.detail}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
