import { buttonVariants } from "@fk-furniture-interior/ui/components/button";

import { photos } from "./content";

export function Hero() {
	return (
		<section
			aria-labelledby="fk-hero-title"
			className="home-hero home-section"
			id="fk-hero"
		>
			<div aria-hidden="true" className="home-hero-media">
				<img
					alt={photos.lobby.alt}
					className="home-hero-photo"
					decoding="async"
					fetchPriority="high"
					height={1333}
					src={photos.lobby.src}
					width={2000}
				/>
				<div className="home-hero-glass">
					<img
						alt=""
						decoding="async"
						height={1333}
						loading="lazy"
						src={photos.lobby.src}
						width={2000}
					/>
				</div>
			</div>
			<div aria-hidden="true" className="home-hero-marks">
				<span />
				<span />
				<span />
				<span />
			</div>
			<div className="home-hero-card">
				<h1 id="fk-hero-title">
					<span>Spaces with</span>
					<em>
						<span>a point of view.</span>
					</em>
				</h1>
				<p className="home-hero-lede">
					Interior design, bespoke furniture and turnkey execution for homes,
					workplaces and hospitality spaces.
				</p>
				<div className="home-hero-actions">
					<a className={buttonVariants()} href="#fk-projects">
						Explore our work
					</a>
					<a
						className={buttonVariants({
							className: "home-hero-secondary",
							variant: "link",
						})}
						href="#fk-enquiry"
					>
						Discuss your project
					</a>
				</div>
				<p className="home-hero-caption">
					Resort De Coracao · Rishikesh · Interior design · Furniture ·
					Execution
				</p>
			</div>
		</section>
	);
}
