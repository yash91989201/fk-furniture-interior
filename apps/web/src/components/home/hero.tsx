import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { photos } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const LINE_ONE = "Spaces with";
const LINE_TWO = "a point of view.";
const FULL_LABEL = "Spaces with a point of view.";
const SLIDE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PACE_SECONDS = { brisk: 0.46, smooth: 0.74, unhurried: 1.05 } as const;
const REST = { x: "0%", y: "0%", clipPath: "inset(0% 0% 0% 0%)" };

const PACE_PARAM = {
	id: "pace",
	kind: "steps",
	default: "smooth",
	label: "Pace",
	options: [
		{ value: "brisk", label: "Brisk" },
		{ value: "smooth", label: "Smooth" },
		{ value: "unhurried", label: "Unhurried" },
	],
} as const;

type SlideKind = "cascade" | "wipe" | "drift";

function paceFrom(node: Element): number {
	const value = node.getAttribute("data-p-pace");
	if (value === "brisk" || value === "unhurried") {
		return PACE_SECONDS[value];
	}
	return PACE_SECONDS.smooth;
}

function lineOffset(kind: SlideKind, travel: "across" | "up") {
	if (kind === "wipe" && travel === "up") {
		return { x: "0%", y: "42%", clipPath: "inset(100% 0 0 0)" };
	}
	if (kind === "wipe") {
		return { x: "-14%", y: "0%", clipPath: "inset(0 100% 0 0)" };
	}
	return { x: "0%", y: "115%", clipPath: "inset(0% 0% 0% 0%)" };
}

function ledeOffset(kind: SlideKind, driftX: string) {
	if (kind === "cascade") {
		return { x: "0%", y: "1.4rem" };
	}
	if (kind === "drift") {
		return { x: driftX, y: "0%" };
	}
	return { x: "-8%", y: "0%" };
}

function HeroSlideCopy({ kind }: { kind: SlideKind }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const reduced = usePrefersReducedMotion();
	const [shown, setShown] = useState(false);
	const [pace, setPace] = useState(PACE_SECONDS.smooth);
	const [scope, setScope] = useState<"lines" | "full">("full");
	const [travel, setTravel] = useState<"across" | "up">("across");
	const [reach, setReach] = useState<"near" | "far">("near");
	const [play, setPlay] = useState(0);

	useEffect(() => {
		const node = rootRef.current;
		if (!node) {
			return;
		}
		const variant = node.closest("[data-impeccable-variant]");
		const read = () => {
			if (!variant) {
				return;
			}
			setPace(paceFrom(variant));
			setScope(variant.getAttribute("data-p-scope") === "lines" ? "lines" : "full");
			setTravel(variant.getAttribute("data-p-travel") === "up" ? "up" : "across");
			setReach(variant.getAttribute("data-p-reach") === "far" ? "far" : "near");
		};
		read();
		const knobs = new MutationObserver(read);
		if (variant) {
			knobs.observe(variant, { attributes: true });
		}
		const visibility = new IntersectionObserver(([entry]) => {
			setShown(Boolean(entry?.isIntersecting));
		});
		visibility.observe(node);
		return () => {
			knobs.disconnect();
			visibility.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!(shown && !reduced)) {
			return;
		}
		setPlay((current) => current + 1);
	}, [shown, reduced, pace, scope, travel, reach]);

	const active = play > 0 && !reduced;
	const includeLede = kind !== "cascade" || scope === "full";
	const offset = lineOffset(kind, travel);
	const driftX = reach === "far" ? "-20%" : "-9%";
	const slide = {
		delay: 0,
		duration: active ? pace : 0,
		ease: SLIDE_EASE,
	};

	return (
		<div className="home-hero-copy" ref={rootRef}>
			{kind === "drift" ? (
				<motion.h1
					animate={REST}
					aria-label={FULL_LABEL}
					initial={active ? { x: driftX, y: "0%", clipPath: REST.clipPath } : false}
					key={play}
					transition={slide}
				>
					<span aria-hidden="true" className="home-hero-line">
						{LINE_ONE}
					</span>
					<em aria-hidden="true" className="home-hero-line">
						{LINE_TWO}
					</em>
				</motion.h1>
			) : (
				<h1 aria-label={FULL_LABEL}>
					<span aria-hidden="true" className="home-hero-line">
						<motion.span
							animate={REST}
							initial={active ? offset : false}
							key={play}
							style={{ display: "block" }}
							transition={slide}
						>
							{LINE_ONE}
						</motion.span>
					</span>
					<em aria-hidden="true" className="home-hero-line">
						<motion.span
							animate={REST}
							initial={active ? offset : false}
							key={play}
							style={{ display: "block" }}
							transition={{ ...slide, delay: active ? 0.08 : 0 }}
						>
							{LINE_TWO}
						</motion.span>
					</em>
				</h1>
			)}
			<motion.div
				animate={{ x: "0%", y: "0%" }}
				className="home-hero-intro"
				initial={active && includeLede ? ledeOffset(kind, driftX) : false}
				key={play}
				transition={{ ...slide, delay: active && includeLede ? 0.16 : 0 }}
			>
				<p>
					Interior design, bespoke furniture and turnkey execution for homes,
					workplaces and hospitality spaces.
				</p>
				<div className="home-hero-actions">
					<a
						className={buttonVariants({ variant: "default" })}
						href="#fk-projects"
					>
						Explore our work
					</a>
					<a
						className={buttonVariants({
							className: "home-hero-secondary",
							variant: "link",
						})}
						href="#fk-enquiry"
					>
						Discuss your project
					</a>
				</div>
			</motion.div>
		</div>
	);
}

export function Hero() {
	const reduced = usePrefersReducedMotion();
	const photoRef = useRef<HTMLImageElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const [lineOne, setLineOne] = useState(LINE_ONE);
	const [lineTwo, setLineTwo] = useState(LINE_TWO);
	const [typing, setTyping] = useState(false);
	const [phase, setPhase] = useState<
		"ready" | "expanding" | "content" | "complete"
	>("complete");

	useEffect(() => {
		const photo = photoRef.current;
		const intro = introRef.current;
		if (!(photo && intro)) {
			return;
		}

		let cancelled = false;
		let typeFrame = 0;
		let expandAnimation: Animation | null = null;
		let introAnimation: Animation | null = null;

		const finish = () => {
			setLineOne(LINE_ONE);
			setLineTwo(LINE_TWO);
			setTyping(false);
			setPhase("complete");
			photo.style.clipPath = "inset(0)";
			photo.style.filter = "none";
			intro.style.opacity = "1";
			intro.style.transform = "none";
			intro.style.filter = "none";
			intro.inert = false;
		};

		const start = () => {
			if (cancelled) {
				return;
			}
			if (reduced) {
				finish();
				return;
			}

			setPhase("expanding");
			setTyping(false);
			setLineOne("");
			setLineTwo("");
			intro.style.opacity = "0";
			intro.inert = true;

			expandAnimation = photo.animate(
				[
					{
						clipPath: "inset(15vh 25vw)",
						filter: "blur(0px)",
						offset: 0,
					},
					{
						clipPath: "inset(6vh 10vw)",
						filter: "blur(7px)",
						offset: 0.45,
					},
					{
						clipPath: "inset(0px)",
						filter: "blur(0px)",
						offset: 1,
					},
				],
				{
					duration: 1350,
					delay: 200,
					easing: "cubic-bezier(.16,1,.3,1)",
					fill: "backwards",
				}
			);

			expandAnimation.onfinish = () => {
				if (cancelled) {
					return;
				}
				setPhase("content");
				intro.inert = false;
				intro.style.opacity = "1";
				introAnimation = intro.animate(
					[
						{ opacity: 0, transform: "translateY(20px)", filter: "blur(5px)" },
						{ opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
					],
					{ duration: 650, easing: "cubic-bezier(.16,1,.3,1)" }
				);
				setTyping(true);
				const started = performance.now();
				const total = LINE_ONE.length + LINE_TWO.length;
				const type = (now: number) => {
					if (cancelled) {
						return;
					}
					const count = Math.min(
						total,
						Math.floor(Math.max(0, now - started) / 32)
					);
					setLineOne(LINE_ONE.slice(0, count));
					setLineTwo(LINE_TWO.slice(0, Math.max(0, count - LINE_ONE.length)));
					if (now - started < total * 32) {
						typeFrame = requestAnimationFrame(type);
					} else {
						setTyping(false);
						setPhase("complete");
					}
				};
				typeFrame = requestAnimationFrame(type);
			};
		};

		const ready = document.fonts?.ready ?? Promise.resolve();
		ready.then(start).catch(finish);

		return () => {
			cancelled = true;
			cancelAnimationFrame(typeFrame);
			expandAnimation?.cancel();
			introAnimation?.cancel();
		};
	}, [reduced]);

	return (
		<section
			className="home-hero home-section"
			data-hero-phase={phase}
			id="fk-hero"
		>
			<img
				alt={photos.lobby.alt}
				className="home-hero-photo"
				decoding="async"
				fetchPriority="high"
				height={1333}
				ref={photoRef}
				src={photos.lobby.src}
				width={2000}
			/>
			<div aria-hidden="true" className="home-hero-wash" />
			<div data-impeccable-carbonize="9d9bd3b6" style={{ display: "contents" }}>
			  {/* impeccable-carbonize-start 9d9bd3b6 */}
			  <style data-impeccable-css="9d9bd3b6">{`
			  @scope ([data-impeccable-variant="1"]) {
			  :scope > .home-hero-copy .home-hero-line { overflow: hidden; }
			  }
			  @scope ([data-impeccable-variant="2"]) {
			  :scope > .home-hero-copy .home-hero-line { overflow: hidden; }
			  }
			  @scope ([data-impeccable-variant="3"]) {
			  :scope > .home-hero-copy .home-hero-line { overflow: hidden; }
			  }
			  `}</style>
			  {/* impeccable-param-values 9d9bd3b6: {"pace":"unhurried","travel":"across"} */}
			  {/* impeccable-carbonize-end 9d9bd3b6 */}
			  <div data-impeccable-variant="2" style={{ display: 'contents' }}>
			    <HeroSlideCopy kind="wipe" />
			  </div>
			</div>
			<div className="home-hero-bottom">
				<p className="home-muted">Scroll to explore our work.</p>
				<p className="home-hero-caption">
					Resort De Coracao · Rishikesh
					<br />
					Interior design · Furniture · Execution
				</p>
			</div>
		</section>
	);
}
