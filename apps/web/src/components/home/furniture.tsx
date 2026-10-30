/** biome-ignore-all lint/performance/noJsxPropsBind: accordion handlers close over open state */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: summary is the details control */
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import {
	type KeyboardEvent,
	type MouseEvent,
	type SyntheticEvent,
	useRef,
	useState,
} from "react";

import { furnitureCategories } from "./content";
import { usePrefersReducedMotion } from "./use-media";

export function Furniture({
	onEnquire,
}: {
	onEnquire: (category: string, requirement: string) => void;
}) {
	const reduced = usePrefersReducedMotion();
	const [openId, setOpenId] = useState<
		(typeof furnitureCategories)[number]["id"]
	>(furnitureCategories[0].id);
	const photoRef = useRef<HTMLImageElement>(null);
	const openCategory =
		furnitureCategories.find((category) => category.id === openId) ??
		furnitureCategories[0];

	function openAt(index: number) {
		const next = furnitureCategories[index];
		setOpenId(next.id);
		const photo = photoRef.current;
		if (!(photo && reduced)) {
			const catalogue = photo?.closest(".home-furniture-catalogue");
			if (catalogue && photo) {
				const region = catalogue.getBoundingClientRect();
				const summaries = catalogue.querySelectorAll("summary");
				const entry = summaries[index]?.getBoundingClientRect();
				if (entry) {
					const left = Math.max(0, entry.left - region.left);
					const right = Math.max(0, region.right - entry.right);
					photo.animate(
						[
							{
								clipPath: `inset(0 ${right}px 0 ${left}px)`,
								filter: "grayscale(1) blur(6px)",
								transform: "scale(1.025)",
							},
							{
								clipPath: "inset(0 0 0 0)",
								filter: "grayscale(1) blur(0px)",
								transform: "scale(1)",
							},
						],
						{ duration: 800, easing: "cubic-bezier(.16,1,.3,1)" }
					);
				}
			}
		}
	}

	function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
		if (event.currentTarget.open) {
			openAt(Number(event.currentTarget.dataset.index));
		}
	}

	function handleSummaryClick(event: MouseEvent<HTMLElement>) {
		if (event.currentTarget.dataset.id === openId) {
			event.preventDefault();
		}
	}

	function handleSummaryKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
			return;
		}
		event.preventDefault();
		const index = Number(event.currentTarget.dataset.index);
		const next =
			(index + (event.key === "ArrowRight" ? 1 : 4)) %
			furnitureCategories.length;
		openAt(next);
		const summaries = event.currentTarget
			.closest(".home-furniture-catalogue")
			?.querySelectorAll("summary");
		summaries?.[next]?.focus({ preventScroll: true });
	}

	function handleEnquireClick(event: MouseEvent<HTMLElement>) {
		const index = Number(event.currentTarget.dataset.index);
		const category = furnitureCategories[index];
		onEnquire(category.title, category.requirement);
	}

	return (
		<section className="home-section" id="fk-capabilities">
			<div className="home-furniture-intro">
				<h2>
					Made for
					<br />
					your space.
				</h2>
				<p>
					Furniture and architectural woodwork, considered as part of the whole
					interior.
				</p>
			</div>
			<div className="home-furniture-catalogue">
				<div aria-hidden="true" className="home-furniture-scene">
					<img
						alt=""
						className="home-furniture-photo"
						decoding="async"
						height={1333}
						key={openCategory.image.src}
						ref={photoRef}
						src={openCategory.image.src}
						width={2000}
					/>
				</div>
				{furnitureCategories.map((category, index) => (
					<details
						data-index={String(index)}
						key={category.id}
						onToggle={handleToggle}
						open={openId === category.id}
					>
						<summary
							data-id={category.id}
							data-index={String(index)}
							onClick={handleSummaryClick}
							onKeyDown={handleSummaryKeyDown}
						>
							{category.title}
						</summary>
						<div className="home-furniture-content">
							<h3>{category.heading}</h3>
							<ul>
								{category.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
							{/* biome-ignore lint/a11y/useValidAnchor: This link presets the enquiry before it navigates. */}
							<a
								className={buttonVariants({ variant: "default" })}
								data-index={String(index)}
								href="#fk-enquiry"
								onClick={handleEnquireClick}
							>
								{category.cta}
							</a>
							<p className="home-muted">
								[Materials, dimensions and finishes to be confirmed.]
							</p>
						</div>
					</details>
				))}
			</div>
		</section>
	);
}
