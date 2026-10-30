import { services } from "./content";

export function Services() {
	return (
		<section className="home-section home-services" id="fk-services">
			<div className="home-section-head">
				<h2>What we do</h2>
				<a className="home-kicker-link" href="#fk-capabilities">
					Explore services →
				</a>
			</div>
			<div>
				{services.map((service) => (
					<article className="home-service-row" key={service.title}>
						<h3>{service.title}</h3>
						<p>{service.body}</p>
						<img
							alt={service.image.alt}
							decoding="async"
							height={1333}
							src={service.image.src}
							width={2000}
						/>
					</article>
				))}
			</div>
		</section>
	);
}
