import { Button } from "@fk-furniture-interior/ui/components/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { MotionConfig, motion, type PanInfo } from "motion/react";
import {
	type MouseEvent,
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { testimonials } from "./content";
import { useMediaQuery, usePrefersReducedMotion } from "./use-media";

const COUNT = testimonials.length;
const SWIPE_CONSTRAINTS = { left: 0, right: 0 };

const CARD_SPRING = {
	bounce: 0.15,
	type: "spring",
	visualDuration: 0.45,
} as const;

const PHOTO_TRANSITION = {
	duration: 0.8,
	ease: [0.22, 1, 0.36, 1],
} as const;

interface PhotoReveal {
	index: number;
	radius: number;
	sequence: number;
	x: number;
	y: number;
}

function ClientPhotoReveal({
	reveal,
	onComplete,
}: {
	reveal: PhotoReveal;
	onComplete: (reveal: PhotoReveal) => void;
}) {
	const [loaded, setLoaded] = useState(false);
	const origin = `${reveal.x}px ${reveal.y}px`;
	const handleLoad = useCallback(() => setLoaded(true), []);
	const handleComplete = useCallback(() => {
		if (loaded) {
			onComplete(reveal);
		}
	}, [loaded, onComplete, reveal]);
	return (
		<motion.img
			alt=""
			animate={{
				clipPath: `circle(${loaded ? reveal.radius : 0}px at ${origin})`,
			}}
			className="home-testimonial-photo"
			height={1333}
			initial={{ clipPath: `circle(0px at ${origin})` }}
			onAnimationComplete={handleComplete}
			onLoad={handleLoad}
			src={testimonials[reveal.index].photo.src}
			transition={PHOTO_TRANSITION}
			width={2000}
		/>
	);
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

const ACTIVE_MIN_FALLBACK_REM = 17;

function parseLengthPx(styles: CSSStyleDeclaration, value: string): number {
	const trimmed = value.trim();
	if (!trimmed) {
		return 0;
	}
	if (trimmed.endsWith("rem")) {
		const root = Number.parseFloat(styles.fontSize) || 16;
		return Number.parseFloat(trimmed) * root;
	}
	if (trimmed.endsWith("px")) {
		return Number.parseFloat(trimmed);
	}
	return Number.parseFloat(trimmed);
}

function readTrackTokenPx(
	track: HTMLElement,
	name: string,
	fallbackRem: number
): number {
	const styles = getComputedStyle(track);
	const raw = styles.getPropertyValue(name);
	if (raw) {
		return parseLengthPx(styles, raw);
	}
	const root =
		Number.parseFloat(getComputedStyle(document.documentElement).fontSize) ||
		16;
	return fallbackRem * root;
}

/** Active is always slot index 1; peers expand right first, then left. */
function peerSlotVisible(slotIndex: number, inactiveVisible: number): boolean {
	if (slotIndex === 1) {
		return true;
	}
	if (slotIndex === 2) {
		return inactiveVisible >= 1;
	}
	if (slotIndex === 3) {
		return inactiveVisible >= 2;
	}
	if (slotIndex === 0) {
		return inactiveVisible >= 3;
	}
	return false;
}

function inactivePeersForTrackWidth(
	trackWidth: number,
	peerPx: number,
	gapPx: number,
	activeMinPx: number,
	activeMaxPx: number
): number {
	const max = COUNT - 1;
	for (let n = max; n >= 1; n -= 1) {
		const fixed = n * peerPx + n * gapPx;
		const activeSpace = trackWidth - fixed;
		const activeW = Math.min(activeMaxPx, activeSpace);
		if (activeW >= activeMinPx && fixed + activeW <= trackWidth + 1) {
			return n;
		}
	}
	return 1;
}

function useVisibleInactivePeers(
	trackRef: RefObject<HTMLElement | null>
): number {
	const [count, setCount] = useState(COUNT - 1);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) {
			return;
		}
		const update = () => {
			if (globalThis.matchMedia("(max-width: 40rem)").matches) {
				setCount(COUNT - 1);
				return;
			}
			const peerPx = readTrackTokenPx(track, "--client-peer-width", 8.25);
			const gapPx = readTrackTokenPx(track, "--client-peer-gap", 0.85);
			const activeMaxPx = readTrackTokenPx(track, "--client-active-max", 26);
			const activeMinPx = readTrackTokenPx(
				track,
				"--client-active-min",
				ACTIVE_MIN_FALLBACK_REM
			);
			setCount(
				inactivePeersForTrackWidth(
					track.clientWidth,
					peerPx,
					gapPx,
					activeMinPx,
					activeMaxPx
				)
			);
		};
		update();
		const observer = new ResizeObserver(update);
		observer.observe(track);
		const stackQuery = globalThis.matchMedia("(max-width: 40rem)");
		stackQuery.addEventListener("change", update);
		return () => {
			observer.disconnect();
			stackQuery.removeEventListener("change", update);
		};
	}, [trackRef]);

	return count;
}

function ClientTrackControls({
	activeIndex,
	onPick,
	onPrevious,
	onNext,
}: {
	activeIndex: number;
	onPick: (event: MouseEvent<HTMLButtonElement>) => void;
	onPrevious: () => void;
	onNext: () => void;
}) {
	return (
		<div className="home-client-anchored-controls">
			<div className="home-client-controls">
				<Button
					aria-label="Previous client"
					className="home-client-step"
					onClick={onPrevious}
					size="icon-sm"
					type="button"
					variant="outline"
				>
					<ChevronLeft aria-hidden="true" />
				</Button>
				<div className="home-client-dots">
					{testimonials.map((dot, index) => (
						<button
							aria-current={index === activeIndex ? "true" : undefined}
							aria-label={`${dot.name}, ${dot.company}`}
							data-client-index={index}
							key={dot.id}
							onClick={onPick}
							type="button"
						/>
					))}
				</div>
				<Button
					aria-label="Next client"
					className="home-client-step"
					onClick={onNext}
					size="icon-sm"
					type="button"
					variant="outline"
				>
					<ChevronRight aria-hidden="true" />
				</Button>
			</div>
		</div>
	);
}

function clientSlotClass(isActive: boolean, collapsed: boolean): string {
	if (collapsed) {
		return "home-client-slot is-peer-collapsed";
	}
	if (isActive) {
		return "home-client-slot is-active";
	}
	return "home-client-slot";
}

function ClientTrackSlot({
	activeIndex,
	clientId,
	collapsed,
	direction,
	entering,
	offscreen,
	onPick,
	onPrevious,
	onNext,
	slotIndex,
}: {
	activeIndex: number;
	clientId: number;
	collapsed: boolean;
	direction: 1 | -1;
	entering: boolean;
	offscreen: boolean;
	onPick: (event: MouseEvent<HTMLButtonElement>) => void;
	onPrevious: () => void;
	onNext: () => void;
	slotIndex: number;
}) {
	const item = testimonials[clientId];
	const isActive = clientId === activeIndex;
	const slotClass = clientSlotClass(isActive, collapsed);

	return (
		<motion.div
			animate={{ opacity: 1, x: 0 }}
			aria-hidden={collapsed || offscreen ? true : undefined}
			className={slotClass}
			data-slot-index={slotIndex}
			inert={collapsed || offscreen}
			initial={entering ? { opacity: 0, x: direction > 0 ? 56 : -56 } : false}
			layout
			transition={CARD_SPRING}
		>
			<article
				className={isActive ? "home-client-card is-active" : "home-client-card"}
				data-client-id={clientId}
			>
				<button
					className="home-client-open"
					data-client-index={clientId}
					disabled={isActive}
					onClick={onPick}
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
					<blockquote className="home-client-quote">“{item.quote}”</blockquote>
					<div className="home-client-person">
						<ClientFace />
						<ClientId company={item.company} name={item.name} />
					</div>
				</div>
			</article>
			{isActive ? (
				<ClientTrackControls
					activeIndex={activeIndex}
					onNext={onNext}
					onPick={onPick}
					onPrevious={onPrevious}
				/>
			) : null}
		</motion.div>
	);
}

export function Testimonials() {
	const reduced = usePrefersReducedMotion();
	const mobile = useMediaQuery("(max-width: 40rem)");
	const [active, setActive] = useState(0);
	const [settled, setSettled] = useState(0);
	const [reveals, setReveals] = useState<PhotoReveal[]>([]);
	const [direction, setDirection] = useState<1 | -1>(1);
	const [arrival, setArrival] = useState<number | null>(null);
	const activeRef = useRef(0);
	const orderRef = useRef(clientOrder(0));
	const stampRef = useRef(testimonials.map(() => 0));
	const trackRef = useRef<HTMLElement>(null);
	const mediaRef = useRef<HTMLDivElement>(null);
	const sequenceRef = useRef(0);
	const visibleInactivePeers = useVisibleInactivePeers(trackRef);

	activeRef.current = active;
	const client = testimonials[active];
	const base = testimonials[settled];

	useEffect(() => {
		if (reduced) {
			setSettled(active);
			setReveals((current) => (current.length ? [] : current));
		}
	}, [active, reduced]);

	const handlePhotoSettled = useCallback((reveal: PhotoReveal) => {
		if (reveal.sequence === sequenceRef.current) {
			setSettled(reveal.index);
			setReveals([]);
		}
	}, []);

	const select = useCallback(
		(index: number) => {
			const next = ((index % COUNT) + COUNT) % COUNT;
			if (next === activeRef.current) {
				return;
			}
			const media = mediaRef.current?.getBoundingClientRect();
			const selectedCard = trackRef.current?.querySelector<HTMLElement>(
				`[data-client-id="${next}"]`
			);
			const selectedBounds = selectedCard?.getBoundingClientRect();
			const card = selectedBounds?.width
				? selectedBounds
				: trackRef.current
						?.querySelector(".home-client-card.is-active")
						?.getBoundingClientRect();
			sequenceRef.current += 1;
			if (media && card && !reduced) {
				const x = card.left + card.width / 2 - media.left;
				const y = card.top + card.height / 2 - media.top;
				const reveal = {
					index: next,
					sequence: sequenceRef.current,
					x,
					y,
					radius: Math.hypot(
						Math.max(x, media.width - x),
						Math.max(y, media.height - y)
					),
				};
				setReveals((current) => [...current, reveal]);
			} else {
				setSettled(next);
				setReveals([]);
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
		},
		[reduced]
	);

	const showPrevious = useCallback(() => {
		select(activeRef.current - 1);
	}, [select]);

	const showNext = useCallback(() => {
		select(activeRef.current + 1);
	}, [select]);

	const handleSwipe = useCallback(
		(_event: unknown, info: PanInfo) => {
			if (Math.abs(info.offset.x) < 40 && Math.abs(info.velocity.x) < 400) {
				return;
			}
			const movement =
				Math.abs(info.offset.x) >= 40 ? info.offset.x : info.velocity.x;
			select(activeRef.current + (movement < 0 ? 1 : -1));
		},
		[select]
	);

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
				<div
					aria-hidden="true"
					className="home-testimonial-media"
					ref={mediaRef}
				>
					<img
						alt=""
						className="home-testimonial-photo"
						height={1333}
						src={base.photo.src}
						width={2000}
					/>
					{reveals.map((reveal) => (
						<ClientPhotoReveal
							key={reveal.sequence}
							onComplete={handlePhotoSettled}
							reveal={reveal}
						/>
					))}
					<div className="home-testimonial-wash" />
				</div>

				<div className="home-testimonial-header">
					<h2>Through our clients’ eyes.</h2>
					<p className="home-testimonial-lede">
						Sample notes from furnished rooms, standing in for approved client
						words.
					</p>
				</div>

				<div className="home-client-viewport">
					<motion.nav
						aria-label="Client notes"
						className="home-client-track"
						data-visible-inactive-peers={visibleInactivePeers}
						drag={mobile ? "x" : false}
						dragConstraints={SWIPE_CONSTRAINTS}
						dragElastic={reduced ? 0 : 0.2}
						dragMomentum={false}
						dragSnapToOrigin
						onDragEnd={handleSwipe}
						ref={trackRef}
					>
						{clientOrder(active).map((id, slotIndex) => (
							<ClientTrackSlot
								activeIndex={active}
								clientId={id}
								collapsed={!peerSlotVisible(slotIndex, visibleInactivePeers)}
								direction={direction}
								entering={arrival === id}
								key={`${id}-${stampRef.current[id]}`}
								offscreen={mobile && slotIndex !== 1 && slotIndex !== 2}
								onNext={showNext}
								onPick={showClient}
								onPrevious={showPrevious}
								slotIndex={slotIndex}
							/>
						))}
					</motion.nav>
				</div>

				<span aria-live="polite" className="sr-only">
					{client.name}, {client.company}. {client.quote}
				</span>
			</section>
		</MotionConfig>
	);
}
