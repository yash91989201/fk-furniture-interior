import { Button } from "@fk-furniture-interior/ui/components/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { testimonials } from "./content";
import { usePrefersReducedMotion } from "./use-media";

const COUNT = testimonials.length;

const CARD_SPRING = {
	bounce: 0.15,
	type: "spring",
	visualDuration: 0.45,
} as const;

const PHOTO_TRANSITION = {
	duration: 0.65,
	ease: [0.22, 1, 0.36, 1],
} as const;

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

export function Testimonials() {
	const reduced = usePrefersReducedMotion();
	const [active, setActive] = useState(0);
	const [settled, setSettled] = useState(0);
	const [direction, setDirection] = useState<1 | -1>(1);
	const [arrival, setArrival] = useState<number | null>(null);
	const activeRef = useRef(0);
	const orderRef = useRef(clientOrder(0));
	const stampRef = useRef(testimonials.map(() => 0));

	activeRef.current = active;
	const client = testimonials[active];
	const base = testimonials[settled];

	useEffect(() => {
		if (reduced && settled !== active) {
			setSettled(active);
		}
	}, [active, reduced, settled]);

	const handlePhotoSettled = useCallback(() => {
		setSettled(activeRef.current);
	}, []);

	const select = useCallback((index: number) => {
		const next = ((index % COUNT) + COUNT) % COUNT;
		if (next === activeRef.current) {
			return;
		}
		const nextOrder = clientOrder(next);
		const forward = shortestDelta(next, activeRef.current) > 0;
		const oldOrder = orderRef.current;
		const enteringId = forward ? nextOrder.at(-1) : nextOrder[0];

		bumpWrappedStamps(stampRef.current, oldOrder, nextOrder, forward);
		const dir = forward ? 1 : -1;
		setDirection(dir);
		setArrival(enteringId ?? null);
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
			if (index !== undefined) {
				select(Number(index));
			}
		},
		[select]
	);

	return (
		<MotionConfig reducedMotion="user">
			<section className="home-section home-testimonials" id="fk-proof">
				<div aria-hidden="true" className="home-testimonial-media">
					<img
						alt=""
						className="home-testimonial-photo"
						height={1333}
						src={base.photo.src}
						width={2000}
					/>
					<AnimatePresence initial={false}>
						{active !== settled && (
							<motion.img
								alt=""
								animate={{ opacity: 1 }}
								className="home-testimonial-photo"
								exit={{ opacity: 0 }}
								height={1333}
								initial={{ opacity: 0 }}
								key={client.id}
								onAnimationComplete={handlePhotoSettled}
								src={client.photo.src}
								transition={reduced ? { duration: 0 } : PHOTO_TRANSITION}
								width={2000}
							/>
						)}
					</AnimatePresence>
					<div className="home-testimonial-wash" />
				</div>

				<div className="home-testimonial-header">
					<h2>Through our clients’ eyes.</h2>
					<p className="home-testimonial-lede">
						Sample notes from furnished rooms, standing in for approved client
						words.
					</p>
				</div>

				<nav aria-label="Client notes" className="home-client-track">
					{clientOrder(active).map((id) => {
						const item = testimonials[id];
						const isActive = id === active;
						const stamp = stampRef.current[id];
						const entering = arrival === id;
						return (
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className={
									isActive ? "home-client-slot is-active" : "home-client-slot"
								}
								initial={
									entering ? { opacity: 0, x: direction > 0 ? 56 : -56 } : false
								}
								key={`${id}-${stamp}`}
								layout
								transition={CARD_SPRING}
							>
								<article
									className={
										isActive ? "home-client-card is-active" : "home-client-card"
									}
									data-client-id={id}
								>
									<button
										className="home-client-open"
										data-client-index={id}
										onClick={showClient}
										style={{
											opacity: isActive ? 0 : 1,
											pointerEvents: isActive ? "none" : "auto",
											transition: "opacity 0.2s ease",
										}}
										type="button"
									>
										<ClientFace />
										<ClientId company={item.company} name={item.name} />
									</button>

									<div
										className="home-client-active-body"
										style={{
											opacity: isActive ? 1 : 0,
											pointerEvents: isActive ? "auto" : "none",
											transition: isActive
												? "opacity 0.3s ease 0.12s"
												: "opacity 0.15s ease",
										}}
									>
										<blockquote className="home-client-quote">
											“{item.quote}”
										</blockquote>
										<div className="home-client-person">
											<ClientFace />
											<ClientId company={item.company} name={item.name} />
										</div>
									</div>
								</article>
							</motion.div>
						);
					})}

					<div className="home-client-anchored-controls">
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
										aria-current={index === active ? "true" : undefined}
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
					</div>
				</nav>

				<span aria-live="polite" className="sr-only">
					{client.name}, {client.company}. {client.quote}
				</span>
			</section>
		</MotionConfig>
	);
}
