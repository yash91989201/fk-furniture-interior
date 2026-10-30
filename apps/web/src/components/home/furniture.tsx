import "@/styles/furniture.css";
import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { furnitureCategories } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const HEADING_WORDS = /\S+\s*/g;

const SNAP_THRESHOLD = 0.25;
const SNAP_OVERSHOOT = 0.04;
const SNAP_DURATION = 0.9;

type CategoryId = (typeof furnitureCategories)[number]["id"];
interface FurnitureReveal {
	id: CategoryId;
	radius: number;
	sequence: number;
	x: number;
	y: number;
}

function FurnitureBackgroundReveal({
	reveal,
	onComplete,
}: {
	reveal: FurnitureReveal;
	onComplete: (id: CategoryId) => void;
}) {
	const imageRef = useRef<HTMLImageElement>(null);
	const category =
		furnitureCategories.find((item) => item.id === reveal.id) ??
		furnitureCategories[0];
	useEffect(() => {
		const image = imageRef.current;
		if (!image) {
			return;
		}
		let cancelled = false;
		let animation: Animation | undefined;
		async function revealImage() {
			try {
				await image?.decode();
			} catch {
				return;
			}
			if (cancelled || !image) {
				return;
			}
			const origin = `${reveal.x}px ${reveal.y}px`;
			animation = image.animate(
				[
					{ clipPath: `circle(0px at ${origin})`, opacity: 0 },
					{ clipPath: `circle(${reveal.radius}px at ${origin})`, opacity: 1 },
				],
				{
					delay: 120,
					duration: 1100,
					easing: "cubic-bezier(.22,.61,.36,1)",
					fill: "both",
				}
			);
			animation.onfinish = () => {
				if (!cancelled) {
					onComplete(reveal.id);
				}
			};
		}
		revealImage();
		return () => {
			cancelled = true;
			animation?.cancel();
		};
	}, [reveal, onComplete]);
	return (
		<img
			alt=""
			className="fv-background-reveal"
			height={1333}
			ref={imageRef}
			src={category.image.src}
			width={2000}
		/>
	);
}

export function Furniture({
	onEnquire,
}: {
	onEnquire: (category: string, requirement: string) => void;
}) {
	const reduced = usePrefersReducedMotion();
	const lenis = useLenis();
	const sectionRef = useRef<HTMLElement>(null);
	const detailRef = useRef<HTMLDivElement>(null);
	const sequence = useRef(0);
	const [openId, setOpenId] = useState<CategoryId>(furnitureCategories[0].id);
	const [backgroundId, setBackgroundId] = useState<CategoryId>(
		furnitureCategories[0].id
	);
	const [reveal, setReveal] = useState<FurnitureReveal | null>(null);
	const openCategory =
		furnitureCategories.find((category) => category.id === openId) ??
		furnitureCategories[0];
	const backgroundCategory =
		furnitureCategories.find((category) => category.id === backgroundId) ??
		furnitureCategories[0];
	const completeReveal = useCallback((id: CategoryId) => {
		setBackgroundId(id);
		setReveal(null);
	}, []);
	const handleCategoryClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const { id } =
				furnitureCategories[Number(event.currentTarget.dataset.index)];
			if (id === openId) {
				return;
			}
			setOpenId(id);
			const section = sectionRef.current;
			if (reduced || !section) {
				completeReveal(id);
				return;
			}
			const bounds = section.getBoundingClientRect();
			const item = event.currentTarget.getBoundingClientRect();
			const x = item.left + item.width / 2 - bounds.left;
			const y = item.top + item.height / 2 - bounds.top;
			sequence.current += 1;
			setReveal({
				id,
				x,
				y,
				radius: Math.hypot(
					Math.max(x, bounds.width - x),
					Math.max(y, bounds.height - y)
				),
				sequence: sequence.current,
			});
		},
		[openId, reduced, completeReveal]
	);
	useEffect(() => {
		if (reduced) {
			completeReveal(openId);
		}
	}, [reduced, openId, completeReveal]);
	useEffect(() => {
		const detail = detailRef.current;
		if (!detail || detail.dataset.category !== openId) {
			return;
		}
		const compact = window.matchMedia("(max-width: 48rem)");
		let observer: IntersectionObserver | undefined;
		const startFlow = () => {
			detail.dataset.flowReady = "true";
			observer?.disconnect();
		};
		const observe = () => {
			observer?.disconnect();
			if (reduced || !compact.matches || !("IntersectionObserver" in window)) {
				startFlow();
				return;
			}
			detail.dataset.flowReady = "false";
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						startFlow();
					}
				},
				{ threshold: 0.15 }
			);
			observer.observe(detail);
		};
		observe();
		compact.addEventListener("change", observe);
		return () => {
			observer?.disconnect();
			compact.removeEventListener("change", observe);
		};
	}, [openId, reduced]);
	// Entry snap: pulls the panel flush when scrolling settles while it is
	// mostly visible. Once past the entry band, exits stay free.
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
	const handleEnquireClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			const category =
				furnitureCategories[Number(event.currentTarget.dataset.index)];
			onEnquire(category.title, category.requirement);
		},
		[onEnquire]
	);
	return (
		<section className="fv" data-hide-nav id="fk-capabilities" ref={sectionRef}>
			<div aria-hidden="true" className="fv-backdrop">
				<img
					alt=""
					height={1333}
					src={backgroundCategory.image.src}
					width={2000}
				/>
				{reveal !== null && (
					<FurnitureBackgroundReveal
						key={reveal.sequence}
						onComplete={completeReveal}
						reveal={reveal}
					/>
				)}
			</div>
			<header className="fv-intro">
				<h2>
					Made for
					<br />
					<em>your space.</em>
				</h2>
				<p>
					Furniture and architectural woodwork, considered as part of the whole
					interior.
				</p>
			</header>
			<div className="fv-catalogue">
				<nav aria-label="Furniture categories" className="fv-index">
					{furnitureCategories.map((category, index) => (
						<button
							aria-pressed={openId === category.id}
							data-index={String(index)}
							key={category.id}
							onClick={handleCategoryClick}
							type="button"
						>
							<span>{category.title}</span>
							<ChevronRight aria-hidden="true" size={18} />
						</button>
					))}
				</nav>
				<div
					className="fv-detail"
					data-category={openCategory.id}
					key={openCategory.id}
					ref={detailRef}
				>
					<h3>
						<span className="sr-only">{openCategory.heading}</span>
						<span aria-hidden="true">
							{Array.from(
								openCategory.heading.matchAll(HEADING_WORDS),
								(word) => (
									<span
										className="fv-heading-word"
										key={word.index}
										style={{
											animationDelay: `calc(${word.index} * var(--fv-word-step, 16ms))`,
										}}
									>
										{word[0].trimEnd()}
									</span>
								)
							)}
						</span>
					</h3>
					<ul>
						{openCategory.items.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					{/* biome-ignore lint/a11y/useValidAnchor: This link presets the enquiry before it navigates. */}
					<a
						className={buttonVariants({ variant: "default" })}
						data-index={String(furnitureCategories.indexOf(openCategory))}
						href="#fk-enquiry"
						onClick={handleEnquireClick}
					>
						{openCategory.cta}
						<ArrowUpRight aria-hidden="true" size={16} />
					</a>
					<p className="fv-note">
						[Materials, dimensions and finishes to be confirmed.]
					</p>
				</div>
			</div>
		</section>
	);
}
