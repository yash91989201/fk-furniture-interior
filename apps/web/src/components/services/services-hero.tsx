import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";

import { bandSrcSet } from "@/components/home/content";

import { photos } from "./content";

export function ServicesHero() {
	return (
		<section
			aria-labelledby="services-hero-title"
			className="border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2rem,4vw,3.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<div className="grid items-end gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
				<h1
					className="m-0 max-w-[15ch] text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.75rem)] leading-[1.02] tracking-[-0.03em]"
					id="services-hero-title"
				>
					Made for your drawings.{" "}
					<em className="italic">Built for the room.</em>
				</h1>
				<div className="max-w-[44ch]">
					<p className="m-0 text-pretty text-[clamp(1rem,0.95rem+0.22vw,1.125rem)] text-muted-foreground leading-[1.65]">
						FK Furniture &amp; Interior makes custom furniture, architectural
						woodwork and fitted interiors for hospitality, residential and
						workplace projects.
					</p>
					<div className="mt-[1.5rem] flex flex-wrap items-center gap-x-5 gap-y-3">
						<Link
							className={buttonVariants({ className: "min-h-11" })}
							to="/contact"
						>
							Discuss a project
						</Link>
						<a
							className="inline-flex min-h-11 items-center text-[0.9375rem] text-foreground underline decoration-1 decoration-primary underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
							href="#fk-overview"
						>
							Explore services
						</a>
					</div>
				</div>
			</div>
			<figure className="group m-0 mt-[clamp(2.25rem,5vw,4rem)]">
				<img
					alt={photos.hero.alt}
					className="block aspect-[16/10] w-full object-cover object-[center_58%] transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.015] motion-reduce:transition-none sm:aspect-[16/7]"
					decoding="async"
					fetchPriority="high"
					height={1333}
					sizes="(max-width: 63.99rem) 100vw, 92vw"
					src={photos.hero.src}
					srcSet={bandSrcSet(photos.hero.src)}
					width={2000}
				/>
				<figcaption className="pt-[0.6rem] text-[0.75rem] text-muted-foreground leading-[1.45]">
					{photos.hero.caption}
				</figcaption>
			</figure>
		</section>
	);
}
