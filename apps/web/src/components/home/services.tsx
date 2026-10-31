import { services } from "./content";

// <name>-720/-1280.webp are pre-generated next to each <name>.webp band photo.
const bandSrcSet = (src: string) =>
	`${src.replace(".webp", "-720.webp")} 720w, ${src.replace(".webp", "-1280.webp")} 1280w, ${src} 2000w`;

export function Services() {
	return (
		<section className="home-section home-services" id="fk-services">
			<div className="home-services-split">
				<header className="home-services-rail">
					<h2>What we do</h2>
					<a className="home-kicker-link" href="#fk-capabilities">
						Explore services →
					</a>
				</header>
				<ol className="home-services-list">
					{services.map((service) => (
						<li className="home-service-entry" key={service.title}>
							<h3>{service.title}</h3>
							<p>{service.body}</p>
							<figure className="home-service-band">
								<img
									alt={service.image.alt}
									decoding="async"
									height={1333}
									loading="lazy"
									sizes="(max-width: 55.99rem) 100vw, (max-width: 90rem) 65vw, 58rem"
									src={service.image.src}
									srcSet={bandSrcSet(service.image.src)}
									width={2000}
								/>
							</figure>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
