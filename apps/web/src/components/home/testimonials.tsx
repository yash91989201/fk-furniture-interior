/** biome-ignore-all lint/performance/noJsxPropsBind: testimonial controls close over playback state */
import { Button } from "@fk-furniture-interior/ui/components/button";
import {
	type FocusEvent,
	type MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";

import { testimonials } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const INITIAL_ORDER = [3, 0, 1, 2];

export function Testimonials() {
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState(0);
	const [order, setOrder] = useState(INITIAL_ORDER);
	const [playing, setPlaying] = useState(false);
	const [visible, setVisible] = useState(false);
	const [pageVisible, setPageVisible] = useState(true);
	const [interactionPaused, setInteractionPaused] = useState(false);
	const stageRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const rippleRef = useRef<HTMLImageElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const activeRef = useRef(0);
	const visibleRef = useRef<boolean>(false);
	const pageVisibleRef = useRef<boolean>(true);
	const interactionPausedRef = useRef<boolean>(false);
	const reducedRef = useRef(reduced);
	const selectRef = useRef<(index: number) => void>(() => undefined);

	activeRef.current = active;
	reducedRef.current = reduced;

	const client = testimonials[active];

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) {
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				const isVisible = Boolean(entries[0]?.isIntersecting);
				visibleRef.current = isVisible;
				setVisible(isVisible);
			},
			{ threshold: 0.3 }
		);
		const updateVisibility = () => {
			const isVisible = !document.hidden;
			pageVisibleRef.current = isVisible;
			setPageVisible(isVisible);
		};
		updateVisibility();
		observer.observe(stage);
		document.addEventListener("visibilitychange", updateVisibility);
		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", updateVisibility);
		};
	}, []);

	useEffect(() => {
		if (
			!(playing && visible && pageVisible && !interactionPaused && !reduced)
		) {
			return;
		}
		const timer = window.setTimeout(() => {
			if (
				visibleRef.current &&
				pageVisibleRef.current &&
				!interactionPausedRef.current &&
				!reducedRef.current &&
				!document.hidden
			) {
				selectRef.current((activeRef.current + 1) % 4);
			}
		}, 7000);
		return () => window.clearTimeout(timer);
	}, [playing, active, reduced, visible, pageVisible, interactionPaused]);

	function select(index: number) {
		const next = (index + 4) % 4;
		if (next === activeRef.current) {
			return;
		}
		const cards =
			trackRef.current?.querySelectorAll<HTMLElement>(".home-client-card");
		const before = new Map<string, DOMRect>();
		if (cards && !reducedRef.current) {
			for (const card of cards) {
				before.set(card.dataset.clientId ?? "", card.getBoundingClientRect());
			}
		}
		activeRef.current = next;
		setActive(next);
		setOrder([(next + 3) % 4, next, (next + 1) % 4, (next + 2) % 4]);

		requestAnimationFrame(() => {
			if (reducedRef.current) {
				return;
			}
			const track = trackRef.current;
			const stage = stageRef.current;
			const ripple = rippleRef.current;
			const ring = ringRef.current;
			if (!(track && stage && ripple && ring)) {
				return;
			}
			const nextCards =
				track.querySelectorAll<HTMLElement>(".home-client-card");
			for (const card of nextCards) {
				const id = card.dataset.clientId ?? "";
				const old = before.get(id);
				if (!old) {
					continue;
				}
				const now = card.getBoundingClientRect();
				const current = Number(id) === next;
				card.animate(
					[
						{
							transform: `translate(${old.left - now.left}px,${old.top - now.top}px) scale(${old.width / now.width},${old.height / now.height})`,
						},
						{
							transform: current ? "scale(1.045)" : "scale(1)",
							offset: 0.82,
						},
						{ transform: "scale(1)" },
					],
					{ duration: 650, easing: "cubic-bezier(.16,1,.3,1)" }
				);
			}
			window.setTimeout(() => {
				const activeCard = track.children[1]?.getBoundingClientRect();
				if (!activeCard) {
					return;
				}
				const bounds = stage.getBoundingClientRect();
				const x = activeCard.left + activeCard.width / 2 - bounds.left;
				const y = activeCard.top + activeCard.height / 2 - bounds.top;
				const radius =
					Math.max(
						Math.hypot(x, y),
						Math.hypot(bounds.width - x, y),
						Math.hypot(x, bounds.height - y),
						Math.hypot(bounds.width - x, bounds.height - y)
					) + 8;
				ripple.style.opacity = "1";
				const reveal = ripple.animate(
					[
						{
							clipPath: `circle(0px at ${x}px ${y}px)`,
							filter: "blur(7px)",
						},
						{
							clipPath: `circle(${radius}px at ${x}px ${y}px)`,
							filter: "blur(0px)",
						},
					],
					{
						duration: 1100,
						easing: "cubic-bezier(.16,1,.3,1)",
						fill: "both",
					}
				);
				ring.style.left = `${x - 40}px`;
				ring.style.top = `${y - 40}px`;
				ring.animate(
					[
						{ transform: "scale(.1)", opacity: 0.7 },
						{ transform: `scale(${radius / 40})`, opacity: 0 },
					],
					{ duration: 1150, easing: "cubic-bezier(.16,1,.3,1)" }
				);
				reveal.onfinish = () => {
					ripple.style.opacity = "0";
				};
			}, 400);
		});
	}
	selectRef.current = select;

	function handleBlurCapture() {
		interactionPausedRef.current = false;
		setInteractionPaused(false);
	}

	function handleFocusCapture(event: FocusEvent<HTMLElement>) {
		const paused =
			event.target instanceof HTMLElement &&
			event.target.id !== "fk-client-play";
		interactionPausedRef.current = paused;
		setInteractionPaused(paused);
	}

	function handlePointerEnter() {
		interactionPausedRef.current = true;
		setInteractionPaused(true);
	}

	function handlePointerLeave() {
		interactionPausedRef.current = false;
		setInteractionPaused(false);
	}

	function handleClientClick(event: MouseEvent<HTMLButtonElement>) {
		select(Number(event.currentTarget.dataset.clientId));
	}

	function handlePrevious() {
		select(active - 1);
	}

	function handleNext() {
		select(active + 1);
	}

	function handlePlayToggle() {
		setPlaying((value) => !value);
	}

	let playLabel = "Play sequence";
	if (reduced) {
		playLabel = "Reduced motion";
	} else if (playing) {
		playLabel = "Pause sequence";
	}

	return (
		<section
			className="home-section home-testimonials"
			id="fk-proof"
			onBlurCapture={handleBlurCapture}
			onFocusCapture={handleFocusCapture}
			ref={stageRef}
		>
			<img
				alt=""
				aria-hidden="true"
				className="home-testimonial-photo"
				height={1333}
				src={client.photo.src}
				width={2000}
			/>
			<img
				alt=""
				aria-hidden="true"
				className="home-testimonial-photo home-testimonial-ripple"
				height={1333}
				ref={rippleRef}
				src={client.photo.src}
				width={2000}
			/>
			<div aria-hidden="true" className="home-testimonial-wash" />
			<div aria-hidden="true" className="home-ripple-ring" ref={ringRef} />
			<div className="home-testimonial-header">
				<h2>Through our clients’ eyes.</h2>
				<span className="home-hero-caption">{client.label}</span>
			</div>
			<blockquote>{client.quote}</blockquote>
			<p className="home-muted">
				[{client.name}] · [{client.project}]
			</p>
			<nav
				aria-label="Choose a client"
				className="home-client-track"
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				ref={trackRef}
			>
				{order.map((id) => {
					const item = testimonials[id];
					return (
						<button
							aria-label={`Show ${item.name} testimonial`}
							aria-pressed={id === active}
							className="home-client-card"
							data-client-id={String(id)}
							key={item.id}
							onClick={handleClientClick}
							type="button"
						>
							<span className="home-client-avatar">[Photo]</span>
							<span>{item.name}</span>
						</button>
					);
				})}
			</nav>
			<div className="home-testimonial-controls">
				<span className="home-muted">Client {active + 1} / 4</span>
				<div className="home-actions">
					<Button onClick={handlePrevious} size="sm" variant="outline">
						Previous
					</Button>
					<Button onClick={handleNext} size="sm" variant="outline">
						Next client
					</Button>
					<Button
						aria-pressed={playing}
						disabled={reduced}
						id="fk-client-play"
						onClick={handlePlayToggle}
						size="sm"
						variant="secondary"
					>
						{playLabel}
					</Button>
				</div>
			</div>
			<span aria-live="polite" className="sr-only">
				{client.name}, {client.project}. Testimonial placeholder.
			</span>
		</section>
	);
}
