export function FaqHero() {
	return (
		<section
			aria-labelledby="faq-hero-title"
			className="border-border border-b bg-background pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2.5rem,6vw,4.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] [padding-top:calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] [@media(max-height:34rem)]:pb-[1.5rem] [@media(max-height:34rem)]:[padding-top:calc(var(--home-nav-compact)+1.25rem)]"
		>
			<div className="grid items-end gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] [@media(min-width:48rem)_and_(max-height:34rem)]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] [@media(min-width:48rem)_and_(max-height:34rem)]:gap-x-[clamp(1.5rem,3vw,3rem)] [@media(min-width:48rem)_and_(max-height:34rem)]:gap-y-[1rem]">
				<h1
					className="max-w-[18ch] text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] [@media(max-height:34rem)]:text-[clamp(1.875rem,1rem+2.4vw,2.5rem)]"
					id="faq-hero-title"
				>
					Answers before <em className="italic">the first drawing.</em>
				</h1>
				<div className="max-w-[46ch]">
					<p className="m-0 text-pretty text-[clamp(1rem,0.95rem+0.22vw,1.125rem)] text-muted-foreground leading-[1.65]">
						Scope, materials, lead times and warranty, for hospitality,
						residential and commercial work.
					</p>
					<p className="mt-[1.15rem] max-w-[52ch] border-border border-t pt-[0.9rem] text-[0.8125rem] text-muted-foreground leading-[1.55]">
						Where a term is still being worked through with our project desk,
						the answer says so before it is published as a commitment.
					</p>
				</div>
			</div>
		</section>
	);
}
