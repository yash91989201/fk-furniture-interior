import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
	projectsBody,
	projectsSection,
	projectsTitle,
} from "@/components/projects/content";

export function ProjectNavigation() {
	return (
		<section
			aria-labelledby="project-navigation-title"
			className={`${projectsSection} bg-background`}
			id="project-enquiry"
		>
			<div className="border-border border-t pt-[clamp(2rem,4vw,3.5rem)]">
				<Link
					className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-muted-foreground underline decoration-1 underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					to="/projects/"
				>
					<ArrowLeft aria-hidden="true" size={15} />
					All projects
				</Link>
				<h2
					className={`${projectsTitle} mt-[1.25rem] max-w-[18ch]`}
					id="project-navigation-title"
				>
					Discuss a similar project.
				</h2>
				<p className={`${projectsBody} mt-[1rem] max-w-[48ch]`}>
					Share the location, the spaces involved and any drawings or BOQ you
					hold. The team will review them and reply with the next step.
				</p>
				<div className="mt-[clamp(1.5rem,3vw,2rem)] flex flex-wrap items-center gap-x-5 gap-y-3">
					<Link
						className={buttonVariants({ className: "min-h-11" })}
						to="/contact/"
					>
						Start a project enquiry
						<ArrowUpRight aria-hidden="true" size={16} />
					</Link>
				</div>
			</div>
		</section>
	);
}
