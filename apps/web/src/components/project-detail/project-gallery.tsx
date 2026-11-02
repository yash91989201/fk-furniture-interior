import type { Project } from "@/components/projects/content";
import {
	projectsLabel,
	projectsSection,
	projectsTitle,
} from "@/components/projects/content";

export function ProjectGallery({ project }: { project: Project }) {
	return (
		<section
			aria-labelledby="project-gallery-title"
			className={`${projectsSection} border-border border-b bg-muted/40`}
			id="project-gallery"
		>
			<div className="flex flex-col gap-3 border-border border-b pb-[1.25rem] sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className={projectsLabel}>Imagery</p>
					<h2
						className={`${projectsTitle} mt-[0.9rem]`}
						id="project-gallery-title"
					>
						Project imagery.
					</h2>
				</div>
				<p className="m-0 max-w-[34ch] text-[0.8125rem] text-muted-foreground leading-[1.55] sm:text-right">
					Interior details from the studio’s work. Final project photography is
					being prepared.
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 pt-[clamp(2rem,4vw,3rem)] sm:grid-cols-2">
				{project.gallery.map((image, index) => (
					<figure
						className={`m-0 ${index === 0 ? "sm:col-span-2" : ""}`}
						key={`${image.src}-${image.caption ?? ""}`}
					>
						<div className="overflow-hidden bg-muted">
							<img
								alt={image.alt}
								className={`block w-full object-cover object-center ${
									index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
								}`}
								decoding="async"
								height={image.height}
								loading="lazy"
								sizes={
									index === 0
										? "(max-width: 63.99rem) 100vw, 92vw"
										: "(max-width: 47.99rem) 100vw, 46vw"
								}
								src={image.src}
								srcSet={image.srcSet}
								width={image.width}
							/>
						</div>
						{image.caption ? (
							<figcaption className="pt-[0.55rem] text-[0.75rem] text-muted-foreground leading-[1.45]">
								{image.caption}
							</figcaption>
						) : null}
					</figure>
				))}
			</div>
		</section>
	);
}
