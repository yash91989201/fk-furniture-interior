import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";
import { Cookies } from "@/components/privacy-policy/cookies";
import { DataRights } from "@/components/privacy-policy/data-rights";
import { DataSecurity } from "@/components/privacy-policy/data-security";
import { DesignConfidentiality } from "@/components/privacy-policy/design-confidentiality";
import { InformationCollected } from "@/components/privacy-policy/information-collected";
import { InformationUse } from "@/components/privacy-policy/information-use";
import { PolicyContents } from "@/components/privacy-policy/policy-contents";
import { PolicyHero } from "@/components/privacy-policy/policy-hero";
import { PolicyUpdates } from "@/components/privacy-policy/policy-updates";
import { PrivacyContact } from "@/components/privacy-policy/privacy-contact";
import { ThirdPartySharing } from "@/components/privacy-policy/third-party-sharing";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyComponent,
	head: () => ({
		meta: [
			{ title: "Privacy Policy · FK Furniture & Interior" },
			{
				name: "description",
				content:
					"How FK Furniture & Interior collects, uses, shares and stores the details you share about a project, and the choices you have.",
			},
		],
	}),
});

function PrivacyPolicyComponent() {
	return (
		<div className="home-page bg-background text-foreground print:[&>.home-nav-slot]:hidden print:[&>footer]:hidden">
			<a className="home-skip print:hidden!" href="#information-collected">
				Skip to the policy
			</a>
			<SiteNav compactStart />
			<main>
				<PolicyHero />
				<div className="mx-auto grid max-w-[62rem] grid-cols-1 gap-x-[clamp(2rem,5vw,4rem)] gap-y-12 pt-[clamp(2.5rem,5vw,4rem)] pr-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-right))] pb-[clamp(4rem,8vw,7rem)] pl-[max(clamp(1.25rem,5vw,5rem),env(safe-area-inset-left))] lg:grid-cols-[13rem_minmax(0,1fr)] print:max-w-none print:px-0 print:pt-4 print:pb-0 print:[&_h2]:break-after-avoid">
					<PolicyContents />
					<div className="max-w-[36rem] space-y-10 print:max-w-none print:space-y-8">
						<InformationCollected />
						<InformationUse />
						<DesignConfidentiality />
						<ThirdPartySharing />
						<DataSecurity />
						<Cookies />
						<DataRights />
						<PolicyUpdates />
						<PrivacyContact />
					</div>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
