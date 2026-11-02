import { contactEmail, offices } from "./content";
import "@/styles/contact.css";

export function OfficeDetails() {
	return (
		<section aria-labelledby="contact-offices-title" className="office-dir">
			<div className="office-dir__top">
				<h2 id="contact-offices-title">Two offices, one team.</h2>
				<div className="office-dir__mail">
					<span className="office-dir__label">Email</span>
					<a href={`mailto:${contactEmail}`}>{contactEmail}</a>
				</div>
			</div>
			<div aria-hidden="true" className="office-dir__cols">
				<span>Office</span>
				<span>Address</span>
				<span>Telephone</span>
			</div>
			<ul className="office-dir__list">
				{offices.map((office) => (
					<li className="office-dir__row" key={office.name}>
						<h3 className="office-dir__name">{office.name}</h3>
						<address className="office-dir__address">
							{office.address.map((line) => (
								<span key={line}>{line}</span>
							))}
						</address>
						<ul className="office-dir__phones">
							{office.phones.map((phone) => (
								<li key={phone.href}>
									<a href={phone.href}>{phone.display}</a>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
