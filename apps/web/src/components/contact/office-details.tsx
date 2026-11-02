import { contactEmail, offices } from "./content";

const link =
	"w-fit underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4";

export function OfficeDetails() {
	return (
		<section
			aria-labelledby="contact-offices-title"
			className="border-border border-b bg-background pt-[clamp(3rem,7vw,5.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(3rem,7vw,5.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<div className="grid items-baseline gap-[1rem] sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
				<p className="m-0 font-sans font-semibold text-[0.75rem] text-muted-foreground tracking-[0.09em]">
					Offices
				</p>
				<h2
					className="m-0 max-w-[18ch] text-balance font-medium text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.08] tracking-[-0.025em]"
					id="contact-offices-title"
				>
					Two offices, one team.
				</h2>
			</div>
			<div className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[2.5rem] md:grid-cols-2">
				{offices.map((office) => (
					<div
						className="border-border border-t pt-[1.25rem]"
						key={office.name}
					>
						<h3 className="m-0 font-heading font-medium text-[clamp(1.4rem,1.2rem+0.8vw,1.75rem)] leading-[1.2] tracking-[-0.01em]">
							{office.name}
						</h3>
						<address className="mt-[1rem] text-[0.9375rem] not-italic leading-[1.65]">
							{office.address.map((line) => (
								<span className="block" key={line}>
									{line}
								</span>
							))}
						</address>
						<ul className="m-0 mt-[1.1rem] grid list-none gap-[0.35rem] p-0 text-[0.9375rem] leading-[1.5]">
							{office.phones.map((phone) => (
								<li key={phone.href}>
									<a className={link} href={phone.href}>
										{phone.display}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-baseline justify-between gap-3 border-border border-t pt-[1.25rem]">
				<p className="m-0 font-semibold text-[0.75rem] text-muted-foreground tracking-[0.09em]">
					Email
				</p>
				<a className={link} href={`mailto:${contactEmail}`}>
					{contactEmail}
				</a>
			</div>
		</section>
	);
}
