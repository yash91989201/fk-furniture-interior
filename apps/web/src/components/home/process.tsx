/** biome-ignore-all lint/performance/noJsxPropsBind: process controls close over active step */
import { Button } from "@fk-furniture-interior/ui/components/button";
import { ChevronsRight } from "lucide-react";
import {
	MotionConfig,
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { processSteps } from "./content";
import { ProcessDrawing } from "./process-drawing";
import { usePrefersReducedMotion } from "./use-media";

const STEP_COUNT = processSteps.length;
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
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState(0);
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const rawProgress = useMotionValue(0);
	const sprungProgress = useSpring(rawProgress, {
		bounce: 0.2,
		visualDuration: 0.6,
	});
	const progress = reduced ? rawProgress : sprungProgress;
	const step = processSteps[active];

	useEffect(() => {
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (!(runway && stage)) {
			return;
		}

		const resize = () => {
			runway.style.height = reduced
				? "auto"
				: `${stage.offsetHeight * STEP_COUNT * SCROLL_SLOW}px`;
		};
		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(stage);

		if (reduced) {
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
	}, [rawProgress, reduced]);

	function choose(index: number) {
		const next = Math.max(0, Math.min(STEP_COUNT - 1, index));
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (runway && stage && !reduced) {
			const top = runway.getBoundingClientRect().top + window.scrollY;
			const travel = Math.max(1, runway.offsetHeight - stage.offsetHeight);
			window.scrollTo({
				behavior: "instant",
				top: top + (travel * (next + 0.15)) / STEP_COUNT,
			});
		} else {
			rawProgress.set((next + 1) / STEP_COUNT);
		}
		setActive(next);
	}

	function handleStepClick(event: MouseEvent<HTMLButtonElement>) {
		choose(Number(event.currentTarget.dataset.step));
	}

	function handlePrevious() {
		choose(active - 1);
	}

	function handleNext() {
		choose(active + 1);
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
							<a className="home-kicker-link home-story-skip" href="#fk-proof">
								<ChevronsRight
									aria-hidden="true"
									className="home-story-skip-icon"
								/>
								<span className="home-story-skip-label">
									Continue past the story
								</span>
							</a>
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
							<div className="home-story-controls">
								{reduced ? (
									<p className="home-muted">
										Choose a step. Reduced motion is enabled.
									</p>
								) : null}
								<div className="home-story-buttons">
									<Button
										disabled={active === 0}
										onClick={handlePrevious}
										size="sm"
										variant="outline"
									>
										Previous
									</Button>
									<Button
										disabled={active === 3}
										onClick={handleNext}
										size="sm"
										variant="secondary"
									>
										Next
									</Button>
								</div>
							</div>
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
