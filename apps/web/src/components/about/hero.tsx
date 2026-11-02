import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";

import { bandSrcSet } from "@/components/home/content";

import { photos } from "./content";

export function AboutHero() {
	return (
		<section
			aria-labelledby="about-hero-title"
			className="grid min-h-[100svh] grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] bg-background pt-[var(--home-nav-compact)] [--hero-display:clamp(2.5rem,1.5rem+3.6vw,4.75rem)] max-lg:min-h-0 max-lg:grid-cols-[minmax(0,1fr)] min-[110rem]:[--hero-body:1.25rem] min-[110rem]:[--hero-display:clamp(4.75rem,2rem+2.2vw,6rem)] min-[110rem]:[--hero-meta:0.875rem] [@media(max-height:38rem)]:[--hero-display:clamp(2rem,1.2rem+2.4vw,3.25rem)]"
		>
			<div className="flex min-w-0 flex-col justify-end gap-[clamp(1.1rem,2vw,1.6rem)] pt-[clamp(2rem,4vw,3.5rem)] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(1.5rem,3vw,2.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))] max-lg:pb-[2rem] [@media(max-height:38rem)]:gap-[0.85rem] [@media(max-height:38rem)]:pt-[1.25rem] [@media(max-height:38rem)]:pb-[1.25rem]">
				<h1
					className="max-w-[15ch] text-balance font-medium text-[length:var(--hero-display)] leading-[1.04] tracking-[-0.02em] [animation:home-rise_0.9s_var(--home-ease)_backwards] max-lg:max-w-[18ch] motion-reduce:[animation:none] [&_em]:font-normal"
					id="about-hero-title"
				>
					A family craft, <em className="italic">built to last.</em>
				</h1>
				<p className="m-0 max-w-[42ch] text-pretty text-[length:var(--hero-body)] text-muted-foreground leading-[1.55] tracking-[0.005em] [animation:about-hero-lift_0.9s_var(--home-ease)_90ms_backwards] motion-reduce:[animation:none]">
					FK Furniture &amp; Interior designs, manufactures and installs bespoke
					furniture and turnkey interiors for homes, workplaces and hospitality
					spaces.
				</p>
				<div className="home-hero-actions mt-[0.25rem] [animation:about-hero-lift_0.9s_var(--home-ease)_180ms_backwards] motion-reduce:[animation:none]">
					<a className={buttonVariants()} href="#fk-enquiry">
						Discuss your project
					</a>
					<Link
						className={buttonVariants({
							className: "home-hero-secondary",
							variant: "link",
						})}
						hash="fk-projects"
						to="/"
					>
						See selected work
					</Link>
				</div>
				<p className="mt-[0.5rem] border-border border-t pt-[0.85rem] text-[length:var(--hero-meta)] text-muted-foreground leading-[1.45] tracking-[0.01em] [animation:about-hero-lift_0.9s_var(--home-ease)_270ms_backwards] motion-reduce:[animation:none]">
					Family craft since 1986 · Offices in Gurgaon and Goa
				</p>
			</div>
			<figure className="group relative m-0 min-w-0 overflow-hidden bg-muted max-lg:aspect-[16/11]">
				<img
					alt={photos.foyer.alt}
					className="block size-full object-cover object-[55%_55%] transition-transform duration-[0.8s] ease-[var(--home-ease)] [animation:about-hero-settle_1.1s_var(--home-ease)_backwards] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:[animation:none]"
					decoding="async"
					fetchPriority="high"
					height={1333}
					sizes="(max-width: 63.99rem) 100vw, 50vw"
					src={photos.foyer.src}
					srcSet={bandSrcSet(photos.foyer.src)}
					width={2000}
				/>
				<figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-[color-mix(in_oklch,var(--card)_92%,transparent)] px-[0.7rem] py-[0.45rem] text-[length:var(--hero-meta)] text-foreground leading-[1.4] tracking-[0.01em] backdrop-blur-[6px]">
					Completed hospitality foyer and lounge
				</figcaption>
			</figure>
		</section>
	);
}
