/** biome-ignore-all lint/performance/noJsxPropsBind: accordion handlers close over open state */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: summary is the details control */
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { useLenis } from "lenis/react";
import {
	type KeyboardEvent,
	type MouseEvent,
	type SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from "react";

import { furnitureCategories } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const SNAP_THRESHOLD = 0.25;
const SNAP_OVERSHOOT = 0.04;
const SNAP_DURATION = 0.9;

export function Furniture({
	onEnquire,
}: {
	onEnquire: (category: string, requirement: string) => void;
}) {
	const reduced = usePrefersReducedMotion();
	const lenis = useLenis();
	const [openId, setOpenId] = useState<
		(typeof furnitureCategories)[number]["id"]
	>(furnitureCategories[0].id);
	const photoRef = useRef<HTMLImageElement>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const openCategory =
		furnitureCategories.find((category) => category.id === openId) ??
		furnitureCategories[0];

	// Entry snap: pulls the panel flush whenever scrolling settles while the
	// panel is entering the viewport. Once past the entry band, exits are free.
	useEffect(() => {
		if (reduced) {
			return;
		}
		const section = sectionRef.current;
		if (!section) {
			return;
		}
		let lastY = window.scrollY;
		let direction = 0;
		let idle = 0;
		let unlock = 0;
		let snapping = false;
		const release = () => {
			snapping = false;
			clearTimeout(unlock);
			unlock = 0;
		};
		const snapTo = (target: number) => {
			snapping = true;
			unlock = window.setTimeout(release, (SNAP_DURATION + 0.4) * 1000);
			if (lenis) {
				lenis.scrollTo(target, {
					duration: SNAP_DURATION,
					easing: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
					onComplete: release,
				});
			} else {
				window.scrollTo({ top: target, behavior: "smooth" });
			}
		};
		const check = () => {
			if (snapping || !window.matchMedia("(min-width: 48.01rem)").matches) {
				return;
			}
			const { top } = section.getBoundingClientRect();
			const viewport = window.innerHeight;
			if (Math.abs(top) <= 4) {
				return;
			}
			const enteringDown =
				direction > 0 &&
				top > -viewport * SNAP_OVERSHOOT &&
				top < viewport * SNAP_THRESHOLD;
			const enteringUp =
				direction < 0 &&
				top > -viewport * SNAP_THRESHOLD &&
				top < viewport * SNAP_OVERSHOOT;
			if (!(enteringDown || enteringUp)) {
				return;
			}
			snapTo(top + window.scrollY);
		};
		const onScroll = () => {
			const y = window.scrollY;
			if (y !== lastY) {
				direction = Math.sign(y - lastY);
			}
			lastY = y;
			clearTimeout(idle);
			idle = window.setTimeout(check, 160);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			clearTimeout(idle);
			clearTimeout(unlock);
		};
	}, [lenis, reduced]);

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
		<section
			className="home-section home-furniture"
			data-hide-nav
			id="fk-capabilities"
			ref={sectionRef}
		>
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
				<div className="home-furniture-intro">
					<h2>
						Made for
						<br />
						your space.
					</h2>
					<p>
						Furniture and architectural woodwork, considered as part of the
						whole interior.
					</p>
				</div>
				<div className="home-furniture-tabs">
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
			</div>
		</section>
	);
}
