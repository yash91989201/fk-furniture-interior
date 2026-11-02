import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { DeliveryAndInstallation } from "@/components/terms-and-conditions/delivery-and-installation";
import { GoverningLaw } from "@/components/terms-and-conditions/governing-law";
import { IntellectualProperty } from "@/components/terms-and-conditions/intellectual-property";
import { LimitationOfLiability } from "@/components/terms-and-conditions/limitation-of-liability";
import { OrdersAndApprovals } from "@/components/terms-and-conditions/orders-and-approvals";
import { PricingAndPayments } from "@/components/terms-and-conditions/pricing-and-payments";
import { ServicesAndQuotations } from "@/components/terms-and-conditions/services-and-quotations";
import { TermsContact } from "@/components/terms-and-conditions/terms-contact";
import {
	TermsContents,
	TermsDecisions,
	TermsHero,
} from "@/components/terms-and-conditions/terms-header";
import { WarrantyAndQuality } from "@/components/terms-and-conditions/warranty-and-quality";

export const Route = createFileRoute("/terms-and-conditions")({
	component: TermsAndConditionsComponent,
	head: () => ({
		meta: [
			{ title: "Terms & Conditions · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"Proposed terms for quotations, orders, mock-up approval, payment, delivery, installation, warranty, intellectual property and liability on custom furniture and interior fit-out work.",
			},
		],
	}),
});

function TermsAndConditionsComponent() {
	return (
		<div className="home-page bg-background text-foreground">
			<a className="home-skip" href="#fk-terms-contents">
				Skip to contents
			</a>
			<div className="print:hidden">
				<SiteNav compactStart />
			</div>
			<main>
				<TermsHero />
				<div className="mx-auto grid max-w-[76rem] grid-cols-1 gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-12 pt-[clamp(1.75rem,3vw,2.5rem)] pr-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-right))] pb-[clamp(4rem,8vw,7rem)] pl-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-left))] lg:grid-cols-[15rem_minmax(0,42rem)] lg:justify-center print:pt-0 print:pb-0">
					<TermsContents />
					<div className="max-w-[42rem] space-y-10">
						<ServicesAndQuotations />
						<OrdersAndApprovals />
						<PricingAndPayments />
						<DeliveryAndInstallation />
						<WarrantyAndQuality />
						<IntellectualProperty />
						<LimitationOfLiability />
						<GoverningLaw />
						<TermsContact />
						<TermsDecisions />
					</div>
				</div>
			</main>
			<div className="print:hidden">
				<SiteFooter />
			</div>
		</div>
	);
}
