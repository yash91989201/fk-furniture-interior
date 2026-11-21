import {
	projectClients,
	projectsBody,
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "./content";

export function ClientStrip() {
	return (
		<section
			aria-labelledby="client-strip-title"
			className={`${projectsSection} border-border border-b bg-secondary text-secondary-foreground`}
			id="project-clients"
		>
			<div className="grid gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
				<div>
					<p className={`${projectsLabel} text-secondary-foreground/75`}>
						Client list from our company profile
					</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem] max-w-[14ch]`}
						id="client-strip-title"
					>
						Clients we have worked with.
					</h2>
					<p
						className={`${projectsBody} mt-[1rem] max-w-[36ch] text-secondary-foreground/80`}
					>
						Names as listed in the FK Furniture &amp; Interior company profile.
						Resort De Coracao is the only project documented on this site so
						far.
					</p>
				</div>
				<ul className="m-0 grid list-none grid-cols-1 gap-x-[clamp(1rem,3vw,3rem)] p-0 sm:grid-cols-2 lg:grid-cols-3">
					{projectClients.map((client) => (
						<li
							className="border-secondary-foreground/20 border-t py-[0.85rem] font-heading font-medium text-[clamp(1.05rem,0.95rem+0.35vw,1.3rem)] leading-[1.25] tracking-[-0.01em]"
							key={client}
						>
							{client}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
