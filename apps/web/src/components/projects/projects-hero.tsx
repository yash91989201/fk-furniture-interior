import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { ArrowDown } from "lucide-react";
import { projectsBody, projectsLabel, projectsLead } from "./content";
import { projectImages } from "./project-images";

export function ProjectsHero() {
	const image = projectImages.lobby;

	return (
		<section
			aria-labelledby="projects-title"
			className="border-border border-b bg-background pt-[calc(var(--home-nav-compact)+clamp(2.5rem,6vw,5rem))] pr-[max(var(--home-gutter),env(safe-area-inset-right))] pb-[clamp(2.5rem,5vw,4.5rem)] pl-[max(var(--home-gutter),env(safe-area-inset-left))]"
		>
			<div className="grid items-end gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
				<div className="lg:order-2">
					<p className={projectsLabel}>Our work</p>
					<h1
						className="m-0 mt-[0.9rem] max-w-[14ch] text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.75rem)] leading-[1.02] tracking-[-0.03em]"
						id="projects-title"
					>
						Furniture and interiors,{" "}
						<em className="italic">made for the room.</em>
					</h1>
					<p
						className={`${projectsLead} mt-[clamp(1.5rem,3vw,2.25rem)] max-w-[26ch]`}
					>
						A portfolio across hospitality, residential, commercial and
						institutional work.
					</p>
					<p className={`${projectsBody} mt-[1.1rem] max-w-[46ch]`}>
						The work spans resort guest rooms and public areas, villas and
						boutique stays, nightclubs and banquets, and corporate and
						institutional spaces, made through design, manufacture and
						installation.
					</p>
					<div className="mt-[clamp(1.75rem,3vw,2.5rem)]">
						<a
							className={buttonVariants({ className: "min-h-11" })}
							href="#project-list"
						>
							Explore projects
							<ArrowDown aria-hidden="true" size={16} />
						</a>
					</div>
				</div>
				<figure className="group m-0 min-w-0 lg:order-1">
					<div className="overflow-hidden bg-muted lg:h-[min(68svh,40rem)]">
						<img
							alt={image.alt}
							className="block aspect-[4/5] w-full object-cover object-center transition-transform duration-[0.8s] ease-[var(--home-ease)] group-hover:scale-[1.02] motion-reduce:transition-none lg:aspect-auto lg:h-full"
							decoding="async"
							fetchPriority="high"
							height={image.height}
							sizes="(max-width: 63.99rem) 100vw, 55vw"
							src={image.src}
							srcSet={image.srcSet}
							width={image.width}
						/>
					</div>
					<figcaption className="pt-[0.6rem] text-[0.75rem] text-muted-foreground leading-[1.45]">
						{image.caption}
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
