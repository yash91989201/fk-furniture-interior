export function PolicyHero() {
	return (
		<header className="border-border border-b pt-[calc(3.75rem+clamp(3rem,6vw,5rem))] pb-[clamp(2.5rem,4vw,3.5rem)] print:pt-0 print:pb-4">
			<div className="mx-auto max-w-[62rem] pr-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-right))] pl-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-left))] print:max-w-none print:px-0">
				<h1 className="max-w-[18ch] text-balance font-heading font-medium text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] leading-[1.02] tracking-[-0.03em]">
					Privacy Policy
				</h1>
				<p className="mt-5 max-w-[46ch] text-pretty text-[1.125rem] text-muted-foreground leading-[1.65]">
					How FK Furniture &amp; Interior handles the details you share when you
					ask about a project, and what this website records while you read it.
				</p>
				<p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-border border-t pt-4 text-[0.875rem] text-muted-foreground leading-[1.5]">
					<span>Last updated 1 November 2026</span>
					<span
						aria-hidden="true"
						className="hidden size-1 rounded-full bg-primary sm:block"
					/>
					<span>Draft for business and legal review</span>
				</p>
			</div>
		</header>
	);
}
