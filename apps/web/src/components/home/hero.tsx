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
					alt={photos.lobbyLounge.alt}
					className="home-hero-photo"
					decoding="async"
					fetchPriority="high"
					height={1333}
					src={photos.lobbyLounge.src}
					width={2000}
				/>
				<div className="home-hero-glass">
					<img
						alt=""
						decoding="async"
						height={1333}
						loading="lazy"
						src={photos.lobbyLounge.src}
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
					<span>Bespoke interiors,</span>
					<em>
						<span>made in our own factory.</span>
					</em>
				</h1>
				<p className="home-hero-lede">
					Furniture, interior fit-outs and turnkey execution for hotels,
					resorts, homes and workplaces. Manufactured in our own factory,
					installed across India.
				</p>
				<div className="home-hero-actions">
					<a className={buttonVariants()} href="#fk-projects">
						See our work
					</a>
					<a
						className={buttonVariants({
							className: "home-hero-secondary",
							variant: "link",
						})}
						href="#fk-enquiry"
					>
						Send a BOQ or brief
					</a>
				</div>
			</div>
		</section>
	);
}
