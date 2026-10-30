import { buttonVariants } from "@fk-furniture-interior/ui/components/button";

import { photos } from "./content";

export function Craft() {
	return (
		<section className="home-section" id="fk-craft">
			<div className="home-craft-heading">
				<h2>
					Considered in
					<br />
					every detail.
				</h2>
				<p>
					Materials, finishes and craftsmanship come together to shape the
					finished space.
				</p>
			</div>
			<div className="home-craft-bento">
				<figure className="home-craft-workshop">
					<div
						aria-label="Placeholder for a workshop photograph"
						className="home-placeholder"
						role="img"
					>
						<span>[Workshop photograph]</span>
					</div>
					<figcaption>
						Behind the craft
						<span>Workshop & manufacturing</span>
					</figcaption>
				</figure>
				<figure>
					<div
						aria-label="Placeholder for a material sample close-up"
						className="home-placeholder"
						role="img"
					>
						<span>[Material close-up]</span>
					</div>
					<figcaption>
						Material selection
						<span>Woods, boards & veneers</span>
					</figcaption>
				</figure>
				<figure>
					<div
						aria-label="Placeholder for a joinery detail photograph"
						className="home-placeholder"
						role="img"
					>
						<span>[Joinery detail]</span>
					</div>
					<figcaption>
						Precision in the details
						<span>Joinery & assembly</span>
					</figcaption>
				</figure>
				<figure className="home-craft-finished">
					<img
						alt={photos.guestRoom.alt}
						className="home-photo"
						decoding="async"
						height={1333}
						src={photos.guestRoom.src}
						width={2000}
					/>
					<figcaption>
						Finishing in context
						<span>Temporary brochure photograph</span>
					</figcaption>
				</figure>
			</div>
			<div className="home-craft-footer">
				<div className="home-craft-focus">
					<span>Material options</span>
					<span>Custom finishes</span>
					<span>Quality checks</span>
					<span>Installation support</span>
				</div>
				<p>Have a particular material, dimension or finish in mind?</p>
				<a
					className={buttonVariants({ variant: "outline" })}
					href="#fk-enquiry"
				>
					Discuss a custom requirement
				</a>
			</div>
		</section>
	);
}
