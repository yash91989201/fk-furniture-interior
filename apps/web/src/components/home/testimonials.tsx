import { Button } from "@fk-furniture-interior/ui/components/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { animate, MotionConfig, motion } from "motion/react";
import {
	type MouseEvent,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

import { testimonials } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const COUNT = testimonials.length;

const CARD_SPRING = {
	bounce: 0.15,
	type: "spring",
	visualDuration: 0.4,
} as const;

interface DepartingCard {
	company: string;
	dir: 1 | -1;
	height: number;
	id: number;
	left: number;
	name: string;
	stamp: number;
	top: number;
	width: number;
}

function ClientFace() {
	return (
		<span aria-hidden="true" className="home-client-avatar">
			<User />
		</span>
	);
}

function ClientId({ name, company }: { name: string; company: string }) {
	return (
		<span className="home-client-id">
			<span className="home-client-name">{name}</span>
			<span className="home-client-company">{company}</span>
		</span>
	);
}

function clientOrder(active: number): number[] {
	return Array.from(
		{ length: COUNT },
		(_, slot) => (active + slot - 1 + COUNT) % COUNT
	);
}

function shortestDelta(next: number, current: number): number {
	let delta = next - current;
	if (delta > COUNT / 2) {
		delta -= COUNT;
	}
	if (delta < -COUNT / 2) {
		delta += COUNT;
	}
	return delta;
}

function bumpWrappedStamps(
	stamps: number[],
	oldOrder: number[],
	nextOrder: number[],
	forward: boolean
): void {
	for (const id of nextOrder) {
		const oldIndex = oldOrder.indexOf(id);
		const newIndex = nextOrder.indexOf(id);
		const wrapped = forward ? newIndex > oldIndex : newIndex < oldIndex;
		if (wrapped) {
			stamps[id] += 1;
		}
	}
}

function departingCard(
	track: HTMLElement,
	leavingId: number,
	forward: boolean,
	stamp: number
): DepartingCard | null {
	const leavingCard = track.querySelector<HTMLElement>(
		`[data-client-id="${leavingId}"]`
	);
	if (!leavingCard) {
		return null;
	}
	const cardBox = leavingCard.getBoundingClientRect();
	const trackBox = track.getBoundingClientRect();
	const item = testimonials[leavingId];
	return {
		company: item.company,
		dir: forward ? 1 : -1,
		height: cardBox.height,
		id: leavingId,
		left: cardBox.left - trackBox.left + track.scrollLeft,
		name: item.name,
		stamp,
		top: cardBox.top - trackBox.top,
		width: cardBox.width,
	};
}

export function Testimonials() {
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState(0);
	const [settled, setSettled] = useState(0);
	const stageRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLElement>(null);
	const rippleRef = useRef<HTMLImageElement>(null);
	const [departing, setDeparting] = useState<DepartingCard | null>(null);
	const [direction, setDirection] = useState<1 | -1>(1);
	const [arrival, setArrival] = useState<number | null>(null);
	const activeRef = useRef(0);
	const reducedRef = useRef(reduced);
	reducedRef.current = reduced;
	const orderRef = useRef(clientOrder(0));
	const stampRef = useRef(testimonials.map(() => 0));
	const rippleStopRef = useRef<(() => void) | null>(null);

	activeRef.current = active;
	const client = testimonials[active];
	const base = testimonials[settled];

	useLayoutEffect(() => {
		const stage = stageRef.current;
		const ripple = rippleRef.current;
		if (!(stage && ripple)) {
			return;
		}
		if (reduced || settled === active) {
			ripple.style.opacity = "0";
			ripple.style.filter = "none";
			ripple.style.willChange = "auto";
			if (reduced && settled !== active) {
				setSettled(active);
			}
			return;
		}
		const card = stage.querySelector<HTMLElement>(
			`[data-client-id="${active}"]`
		);
		if (!card) {
			return;
		}
		let stopped = false;
		let controls: { stop: () => void } | null = null;
		// Measure after Motion applies its layout invert, so the ripple
		// starts on the card that is becoming active.
		const frame = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (stopped) {
					return;
				}
				const bounds = stage.getBoundingClientRect();
				const box = card.getBoundingClientRect();
				const x = box.left + box.width / 2 - bounds.left;
				const y = box.top + box.height / 2 - bounds.top;
				const start = Math.min(box.width, box.height) / 2;
				const radius =
					Math.max(
						Math.hypot(x, y),
						Math.hypot(bounds.width - x, y),
						Math.hypot(x, bounds.height - y),
						Math.hypot(bounds.width - x, bounds.height - y)
					) + 8;
				const from = `circle(${start}px at ${x}px ${y}px)`;
				const to = `circle(${radius}px at ${x}px ${y}px)`;
				ripple.style.opacity = "1";
				ripple.style.clipPath = from;
				ripple.style.willChange = "clip-path, filter";
				rippleStopRef.current?.();
				controls = animate(
					ripple,
					{ clipPath: [from, to], filter: ["blur(14px)", "blur(0px)"] },
					{
						duration: 0.9,
						ease: [0.16, 1, 0.36, 1],
						onComplete: () => {
							ripple.style.willChange = "auto";
							if (activeRef.current !== active) {
								return;
							}
							setSettled(active);
						},
					}
				);
				rippleStopRef.current = () => controls?.stop();
			});
		});
		return () => {
			stopped = true;
			cancelAnimationFrame(frame);
			controls?.stop();
		};
	}, [active, reduced, settled]);

	useLayoutEffect(() => {
		const track = trackRef.current;
		const card = track?.querySelector<HTMLElement>(
			`[data-client-id="${active}"]`
		);
		if (!(track && card)) {
			return;
		}
		const align = () => {
			const left = card.offsetLeft;
			const right = left + card.offsetWidth;
			const visible =
				left >= track.scrollLeft &&
				right <= track.scrollLeft + track.clientWidth + 1;
			if (visible) {
				return;
			}
			track.scrollLeft = Math.max(0, left - 12);
		};
		align();
		const frame = requestAnimationFrame(align);
		return () => cancelAnimationFrame(frame);
	}, [active]);

	const clearDeparting = useCallback(() => {
		setDeparting(null);
	}, []);

	const select = useCallback((index: number) => {
		const next = ((index % COUNT) + COUNT) % COUNT;
		if (next === activeRef.current) {
			return;
		}
		const nextOrder = clientOrder(next);
		const forward = shortestDelta(next, activeRef.current) > 0;
		const oldOrder = orderRef.current;
		const leavingId = forward ? oldOrder[0] : oldOrder.at(-1);
		if (leavingId === undefined) {
			return;
		}
		bumpWrappedStamps(stampRef.current, oldOrder, nextOrder, forward);
		const track = trackRef.current;
		const dir = forward ? 1 : -1;
		setDirection(dir);
		if (reducedRef.current) {
			setArrival(null);
		} else {
			setArrival(leavingId);
			if (track) {
				const card = departingCard(
					track,
					leavingId,
					forward,
					stampRef.current[leavingId]
				);
				if (card) {
					setDeparting(card);
				}
			}
		}
		orderRef.current = nextOrder;
		activeRef.current = next;
		setActive(next);
	}, []);

	const showPrevious = useCallback(() => {
		select(activeRef.current - 1);
	}, [select]);

	const showNext = useCallback(() => {
		select(activeRef.current + 1);
	}, [select]);

	const showClient = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const index = event.currentTarget.dataset.clientIndex;
			if (index) {
				select(Number(index));
			}
		},
		[select]
	);

	return (
		<MotionConfig reducedMotion="user">
			<section
				className="home-section home-testimonials"
				id="fk-proof"
				ref={stageRef}
			>
				<div aria-hidden="true" className="home-testimonial-media">
					<img
						alt=""
						className="home-testimonial-photo"
						height={1333}
						src={base.photo.src}
						width={2000}
					/>
					<img
						alt=""
						className="home-testimonial-photo home-testimonial-ripple"
						height={1333}
						ref={rippleRef}
						src={client.photo.src}
						width={2000}
					/>
					<div className="home-testimonial-wash" />
				</div>
				<div className="home-testimonial-header">
					<h2>Through our clients’ eyes.</h2>
					<p className="home-testimonial-lede">
						Sample notes from furnished rooms, standing in for approved client
						words.
					</p>
				</div>
				<nav
					aria-label="Client notes"
					className="home-client-track"
					ref={trackRef}
				>
					{clientOrder(active).map((id) => {
						const item = testimonials[id];
						const isActive = id === active;
						const stamp = stampRef.current[id];
						const entering = arrival === id;
						return (
							<motion.div
								className={
									isActive ? "home-client-slot is-active" : "home-client-slot"
								}
								key={`${id}-${stamp}`}
								layout
								transition={CARD_SPRING}
							>
								<motion.article
									animate={{ opacity: 1, x: 0 }}
									className={
										isActive ? "home-client-card is-active" : "home-client-card"
									}
									data-client-id={id}
									initial={
										entering
											? { opacity: 0, x: direction > 0 ? 72 : -72 }
											: false
									}
									transition={CARD_SPRING}
								>
									{isActive ? (
										<blockquote className="home-client-quote">
											“{item.quote}”
										</blockquote>
									) : (
										<button
											className="home-client-open"
											data-client-index={id}
											onClick={showClient}
											type="button"
										>
											<ClientFace />
											<ClientId company={item.company} name={item.name} />
										</button>
									)}
									{isActive ? (
										<>
											<div className="home-client-person">
												<ClientFace />
												<ClientId company={item.company} name={item.name} />
											</div>
											<div className="home-client-controls">
												<Button
													aria-label="Previous client"
													className="home-client-step"
													onClick={showPrevious}
													size="icon-sm"
													type="button"
													variant="outline"
												>
													<ChevronLeft aria-hidden="true" />
												</Button>
												<div className="home-client-dots">
													{testimonials.map((dot, index) => (
														<button
															aria-current={
																index === active ? "true" : undefined
															}
															aria-label={`${dot.name}, ${dot.company}`}
															data-client-index={index}
															key={dot.id}
															onClick={showClient}
															type="button"
														/>
													))}
												</div>
												<Button
													aria-label="Next client"
													className="home-client-step"
													onClick={showNext}
													size="icon-sm"
													type="button"
													variant="outline"
												>
													<ChevronRight aria-hidden="true" />
												</Button>
											</div>
										</>
									) : null}
								</motion.article>
							</motion.div>
						);
					})}
					{departing ? (
						<motion.article
							animate={{
								opacity: 0,
								x:
									departing.dir > 0
										? -(departing.width + 16)
										: departing.width + 16,
							}}
							aria-hidden="true"
							className="home-client-card home-client-ghost"
							initial={{ opacity: 1, x: 0 }}
							key={`${departing.id}-exit-${departing.stamp}`}
							onAnimationComplete={clearDeparting}
							style={{
								height: departing.height,
								left: departing.left,
								minHeight: departing.height,
								top: departing.top,
								width: departing.width,
							}}
							transition={CARD_SPRING}
						>
							<ClientFace />
							<ClientId company={departing.company} name={departing.name} />
						</motion.article>
					) : null}
				</nav>
				<span aria-live="polite" className="sr-only">
					{client.name}, {client.company}. {client.quote}
				</span>
			</section>
		</MotionConfig>
	);
}
