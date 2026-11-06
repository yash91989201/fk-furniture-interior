import { useEffect, useState } from "react";

const sections = [
	["information-collected", "Information we collect"],
	["how-we-use-information", "How we use your information"],
	["design-confidentiality", "Confidentiality of plans, drawings and BOQs"],
	["third-party-sharing", "Sharing with service providers"],
	["data-security", "Security and storage"],
	["cookies", "Cookies"],
	["data-rights", "Access, correction and deletion"],
	["policy-updates", "Updates to this policy"],
	["privacy-contact", "Privacy contact"],
] as const;

// A section becomes current once its heading passes just under the compact nav.
const ACTIVE_LINE = 120;

export function PolicyContents() {
	const [active, setActive] = useState<string>(sections[0][0]);

	useEffect(() => {
		const targets = sections
			.map(([id]) => document.getElementById(id))
			.filter((node): node is HTMLElement => node !== null);
		const [firstTarget] = targets;
		if (!firstTarget) {
			return;
		}

		let frame = 0;
		const measure = () => {
			frame = 0;
			let current = firstTarget.id;
			for (const target of targets) {
				if (target.getBoundingClientRect().top <= ACTIVE_LINE) {
					current = target.id;
				}
			}
			setActive(current);
		};
		const schedule = () => {
			if (frame === 0) {
				frame = requestAnimationFrame(measure);
			}
		};

		measure();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<nav
			aria-labelledby="policy-contents-title"
			className="lg:sticky lg:top-[calc(3.75rem+2rem)] lg:self-start print:hidden"
		>
			<h2
				className="font-sans font-semibold text-[0.75rem] text-muted-foreground uppercase tracking-[0.14em]"
				id="policy-contents-title"
			>
				Contents
			</h2>
			<ol className="mt-4 space-y-2.5 border-border border-t pt-4 text-[0.9375rem] leading-[1.5] sm:columns-2 sm:gap-x-8 lg:columns-1">
				{sections.map(([id, label], index) => {
					const current = active === id;
					return (
						<li key={id}>
							<a
								aria-current={current ? "true" : undefined}
								className={`group flex gap-2.5 rounded-sm pointer-coarse:py-3 transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 ${
									current
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
								href={`#${id}`}
							>
								<span
									aria-hidden="true"
									className={`mt-[0.65em] h-0.5 w-3 shrink-0 rounded-full transition-colors ${
										current
											? "bg-primary"
											: "bg-transparent group-hover:bg-border"
									}`}
								/>
								<span className="tabular-nums">{index + 1}</span>
								<span className={current ? "font-medium" : undefined}>
									{label}
								</span>
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
