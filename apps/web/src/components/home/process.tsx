/** biome-ignore-all lint/performance/noJsxPropsBind: process controls close over active step */
import { Button } from "@fk-furniture-interior/ui/components/button";
import { useLenis } from "lenis/react";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp } from "lucide-react";
import {
	MotionConfig,
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media";
import { processSteps } from "./content";
import { ProcessDrawing } from "./process-drawing";

const STEP_COUNT = processSteps.length;
const LAST_STEP = STEP_COUNT - 1;
const SCROLL_SLOW = 1.2;

const STEP_SPRING = {
	bounce: 0.28,
	type: "spring",
	visualDuration: 0.5,
} as const;

function StepFill({
	index,
	progress,
}: {
	index: number;
	progress: MotionValue<number>;
}) {
	const scaleX = useTransform(
		progress,
		[index / STEP_COUNT, (index + 1) / STEP_COUNT],
		[0, 1],
		{ clamp: true }
	);

	return (
		<motion.span
			className="home-story-nav-fill"
			style={{ scaleX, transformOrigin: "left center" }}
		/>
	);
}

export function Process() {
	const lenis = useLenis();
	const reduced = usePrefersReducedMotion();
	const short = useMediaQuery("(max-height: 40rem)");
	const staticStory = reduced || short;
	const [active, setActive] = useState(0);
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const rawProgress = useMotionValue(0);
	const sprungProgress = useSpring(rawProgress, {
		bounce: 0.2,
		visualDuration: 0.6,
	});
	const progress = reduced ? rawProgress : sprungProgress;
	const step = processSteps[active] ?? processSteps[0];

	function choose(index: number) {
		const next = Math.max(0, Math.min(LAST_STEP, index));
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (staticStory) {
			rawProgress.set((next + 1) / STEP_COUNT);
			setActive(next);
			return;
		}
		if (runway && stage) {
			const top = runway.getBoundingClientRect().top + window.scrollY;
			const travel = Math.max(1, runway.offsetHeight - stage.offsetHeight);
			const target = top + (travel * (next + 0.15)) / STEP_COUNT;
			if (lenis) {
				lenis.scrollTo(target, { immediate: true });
			} else {
				window.scrollTo({ behavior: "instant", top: target });
			}
		} else {
			rawProgress.set((next + 1) / STEP_COUNT);
		}
		setActive(next);
	}

	useEffect(() => {
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (!(runway && stage)) {
			return;
		}

		const resize = () => {
			runway.style.height = staticStory
				? "auto"
				: `${stage.offsetHeight * STEP_COUNT * SCROLL_SLOW}px`;
		};
		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(stage);

		if (staticStory) {
			return () => observer.disconnect();
		}

		let frame = 0;
		const onScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(() => {
					frame = 0;
					const top = runway.getBoundingClientRect().top + window.scrollY;
					const travel = Math.max(1, runway.offsetHeight - stage.offsetHeight);
					const offset = window.scrollY - top;
					const ratio = Math.min(1, Math.max(0, offset / travel));
					rawProgress.set(ratio);
					if (offset >= 0 && offset <= travel + stage.offsetHeight) {
						setActive(Math.min(STEP_COUNT - 1, Math.floor(ratio * STEP_COUNT)));
					}
				});
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", onScroll);
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, [rawProgress, staticStory]);

	useEffect(() => {
		if (!staticStory) {
			return;
		}
		rawProgress.set((active + 1) / STEP_COUNT);
	}, [active, rawProgress, staticStory]);

	function handleStepClick(event: MouseEvent<HTMLButtonElement>) {
		choose(Number(event.currentTarget.dataset.step));
	}

	function handlePrevious() {
		choose(active - 1);
	}

	function handleNext() {
		choose(active + 1);
	}

	function jump(target: string) {
		const section = document.getElementById(target);
		if (!section) {
			return;
		}
		if (lenis) {
			lenis.scrollTo(section);
		} else {
			section.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
		}
	}

	return (
		<MotionConfig reducedMotion="user">
			<section
				className="home-section home-process dark"
				data-hide-nav
				id="fk-process"
			>
				<div className="home-story-runway" ref={runwayRef}>
					<div className="home-story-stage" ref={stageRef}>
						<div className="home-story-header">
							<h2>From idea to handover.</h2>
							<div className="home-story-transport">
								<Button
									aria-label="Skip to the previous section"
									onClick={() => jump("fk-craft")}
									size="icon-sm"
									type="button"
									variant="outline"
								>
									<ChevronsUp aria-hidden="true" />
								</Button>
								<Button
									aria-label="Previous step"
									disabled={active === 0}
									onClick={handlePrevious}
									size="icon-sm"
									type="button"
									variant="outline"
								>
									<ChevronUp aria-hidden="true" />
								</Button>
								<Button
									aria-label="Next step"
									disabled={active === LAST_STEP}
									onClick={handleNext}
									size="icon-sm"
									type="button"
									variant="outline"
								>
									<ChevronDown aria-hidden="true" />
								</Button>
								<Button
									aria-label="Skip to the next section"
									onClick={() => jump("fk-enquiry")}
									size="icon-sm"
									type="button"
									variant="outline"
								>
									<ChevronsDown aria-hidden="true" />
								</Button>
							</div>
						</div>
						<div className="home-story-body">
							<div
								aria-label={step.alt}
								className="home-scene"
								data-scene={String(active)}
								role="img"
							>
								<ProcessDrawing active={active} reduced={reduced} />
								<div className="home-scene-label">{step.label}</div>
							</div>
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="home-story-copy"
								initial={reduced ? false : { opacity: 0, y: 16 }}
								key={step.title}
								transition={STEP_SPRING}
							>
								<div className="home-muted">Step {active + 1} / 4</div>
								<h3 id="fk-step-title">{step.title}</h3>
								<p>{step.description}</p>
								<p className="home-deliverable">{step.deliverable}</p>
							</motion.div>
						</div>
						<div>
							<nav
								aria-label="Choose a process step"
								className="home-story-nav"
							>
								{processSteps.map((item, index) => (
									<button
										aria-current={index === active ? "step" : undefined}
										data-step={String(index)}
										key={item.nav}
										onClick={handleStepClick}
										type="button"
									>
										<motion.span
											animate={{ scaleY: index === active ? 3.3 : 1 }}
											aria-hidden="true"
											className="home-story-nav-track"
											style={{ originX: 0.5, originY: 0.5 }}
											transition={STEP_SPRING}
										>
											<StepFill index={index} progress={progress} />
										</motion.span>
										<motion.span
											animate={{ scale: index === active ? 1.14 : 1 }}
											className="home-story-nav-label"
											style={{ originX: 0.5, originY: 0.5 }}
											transition={STEP_SPRING}
										>
											{item.nav}
										</motion.span>
									</button>
								))}
							</nav>
							<span aria-live="polite" className="sr-only">
								Step {active + 1} of 4: {step.title}
							</span>
						</div>
					</div>
				</div>
			</section>
		</MotionConfig>
	);
}
