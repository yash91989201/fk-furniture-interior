/** biome-ignore-all lint/performance/noJsxPropsBind: process controls close over active step */
import { Button } from "@fk-furniture-interior/ui/components/button";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { processSteps } from "./content";
import { usePrefersReducedMotion } from "./use-media";

export function Process() {
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState(0);
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const step = processSteps[active];

	useEffect(() => {
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (!(runway && stage)) {
			return;
		}

		const resize = () => {
			runway.style.height = reduced ? "auto" : `${stage.offsetHeight * 4}px`;
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
					if (offset >= 0 && offset <= travel + stage.offsetHeight) {
						const next = Math.min(
							3,
							Math.floor((Math.max(0, offset) / travel) * 4)
						);
						setActive(next);
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
	}, [reduced]);

	useEffect(() => {
		const title = titleRef.current;
		if (title && !reduced) {
			title.animate(
				[
					{ clipPath: "inset(0 0 90% 0)", transform: "translateY(12px)" },
					{ clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
				],
				{ duration: 480, easing: "cubic-bezier(.16,1,.3,1)" }
			);
		}
	}, [active, reduced]);

	function choose(index: number) {
		const next = Math.max(0, Math.min(3, index));
		const runway = runwayRef.current;
		const stage = stageRef.current;
		if (runway && stage && !reduced) {
			const top = runway.getBoundingClientRect().top + window.scrollY;
			const travel = Math.max(1, runway.offsetHeight - stage.offsetHeight);
			window.scrollTo({ top: top + (travel * (next + 0.15)) / 4 });
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
		<section className="home-section home-process dark" id="fk-process">
			<div className="home-story-runway" ref={runwayRef}>
				<div className="home-story-stage" ref={stageRef}>
					<div className="home-story-header">
						<h2>From idea to handover.</h2>
						<a className="home-kicker-link" href="#fk-proof">
							Continue past the story
						</a>
					</div>
					<div className="home-story-body">
						<div
							aria-label={step.alt}
							className="home-scene"
							data-scene={String(active)}
							role="img"
						>
							<div aria-hidden="true" className="home-scene-drawing">
								<span className="piece-a" />
								<span className="piece-b" />
								<span className="piece-c" />
								<span className="piece-d" />
							</div>
							<div className="home-scene-label">{step.label}</div>
						</div>
						<div className="home-story-copy">
							<div className="home-muted">Step {active + 1} / 4</div>
							<h3 id="fk-step-title" ref={titleRef}>
								{step.title}
							</h3>
							<p>{step.description}</p>
							<p className="home-deliverable">{step.deliverable}</p>
						</div>
					</div>
					<div>
						<nav aria-label="Choose a process step" className="home-story-nav">
							{processSteps.map((item, index) => (
								<button
									aria-current={index === active ? "step" : undefined}
									data-step={String(index)}
									key={item.nav}
									onClick={handleStepClick}
									type="button"
								>
									{item.nav}
								</button>
							))}
						</nav>
						<div className="home-story-controls">
							<p className="home-muted">
								{reduced
									? "Choose a step. Reduced motion is enabled."
									: "Scroll to unfold, or choose a step."}
							</p>
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
	);
}
