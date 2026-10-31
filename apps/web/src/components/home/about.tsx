import { useEffect, useRef } from "react";
import { AboutDrawing } from "./about-drawing";

const PARALLAX_PX = 5;
const DAMPING_MS = 120;
const GOLD_BOOST = 1.6;
const WORKBENCH = { x: 720, y: 369, radius: 140 };

const STATIONS = [
	{ name: "JOINERY BENCH", x: 720, y: 369, radius: 140 },
	{ name: "TIMBER STORAGE", x: 244, y: 286, radius: 110 },
	{ name: "HAND FINISHING", x: 246, y: 627, radius: 110 },
	{ name: "ASSEMBLY", x: 1196, y: 204, radius: 120 },
	{ name: "ROTARY TOOL", x: 1130, y: 470, radius: 80 },
] as const;
function getStation(normX: number, normY: number): string {
	for (const station of STATIONS) {
		if (Math.hypot(normX - station.x, normY - station.y) < station.radius) {
			return station.name;
		}
	}
	return "";
}

export function About() {
	const aboutRef = useRef<HTMLElement>(null);
	const planRef = useRef<HTMLDivElement>(null);
	const crosshairRef = useRef<HTMLDivElement>(null);
	const coordsRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const about = aboutRef.current;
		const plan = planRef.current;
		const crosshair = crosshairRef.current;
		const coords = coordsRef.current;
		if (!(about && plan && crosshair && coords)) {
			return;
		}

		const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
		const still = window.matchMedia("(prefers-reduced-motion: reduce)");

		let frame = 0;
		let last = 0;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let isNearWorkbench = false;
		let goldAnimations: Animation[] = [];

		const queryGoldAnimations = () => {
			goldAnimations = [
				...about.querySelectorAll(".home-about-drawing-accent > *"),
			].flatMap((node) => node.getAnimations());
		};

		const setGoldSpeed = (speed: number) => {
			if (goldAnimations.length === 0) {
				queryGoldAnimations();
			}
			for (const animation of goldAnimations) {
				animation.playbackRate = speed;
			}
		};

		const stop = () => {
			if (frame !== 0) {
				cancelAnimationFrame(frame);
			}
			frame = 0;
			last = 0;
		};

		const settle = () => {
			currentX = 0;
			currentY = 0;
			plan.style.transform = "";
		};

		const step = (time: number) => {
			const delta = last === 0 ? 16 : Math.min(time - last, 64);
			last = time;
			const k = 1 - Math.exp(-delta / DAMPING_MS);
			currentX += (targetX - currentX) * k;
			currentY += (targetY - currentY) * k;
			const settled =
				Math.abs(targetX - currentX) < 0.002 &&
				Math.abs(targetY - currentY) < 0.002;
			if (settled) {
				stop();
				if (targetX === 0 && targetY === 0) {
					settle();
					return;
				}
				currentX = targetX;
				currentY = targetY;
			}
			plan.style.transform = `translate3d(${(currentX * PARALLAX_PX).toFixed(2)}px, ${(currentY * PARALLAX_PX).toFixed(2)}px, 0)`;
			if (settled) {
				return;
			}
			frame = requestAnimationFrame(step);
		};

		const wake = () => {
			if (frame === 0) {
				last = 0;
				frame = requestAnimationFrame(step);
			}
		};

		const handleMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") {
				return;
			}
			const rect = about.getBoundingClientRect();
			const planRect = plan.getBoundingClientRect();

			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			targetX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
			targetY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

			const normX = ((event.clientX - planRect.left) / planRect.width) * 1440;
			const normY = ((event.clientY - planRect.top) / planRect.height) * 760;

			const activeStation = getStation(normX, normY);
			const near =
				Math.hypot(normX - WORKBENCH.x, normY - WORKBENCH.y) < WORKBENCH.radius;

			if (near !== isNearWorkbench) {
				isNearWorkbench = near;
				setGoldSpeed(near ? GOLD_BOOST : 1);
			}
			crosshair.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			const px = String(Math.round((x / rect.width) * 1000)).padStart(3, "0");
			const py = String(Math.round((y / rect.height) * 1000)).padStart(3, "0");
			coords.textContent = activeStation
				? `X ${px} · Y ${py} · ${activeStation}`
				: `X ${px} · Y ${py}`;

			wake();
		};

		const handleLeave = () => {
			targetX = 0;
			targetY = 0;
			crosshair.style.opacity = "0";
			if (isNearWorkbench) {
				isNearWorkbench = false;
				setGoldSpeed(1);
			}
			wake();
		};

		const disable = () => {
			about.removeEventListener("pointermove", handleMove);
			about.removeEventListener("pointerleave", handleLeave);
			stop();
			targetX = 0;
			targetY = 0;
			crosshair.style.opacity = "0";
			setGoldSpeed(1);
			settle();
		};

		const enable = () => {
			queryGoldAnimations();
			about.addEventListener("pointermove", handleMove);
			about.addEventListener("pointerleave", handleLeave);
		};

		const sync = () => {
			if (fine.matches && !still.matches) {
				enable();
				return;
			}
			disable();
		};

		sync();
		fine.addEventListener("change", sync);
		still.addEventListener("change", sync);

		return () => {
			fine.removeEventListener("change", sync);
			still.removeEventListener("change", sync);
			disable();
		};
	}, []);

	return (
		<section
			className="home-section home-about about-quiet"
			id="fk-about"
			ref={aboutRef}
		>
			<div aria-hidden="true" className="home-about-backdrop">
				<div className="home-about-plan" ref={planRef}>
					<AboutDrawing />
				</div>
			</div>
			<div
				aria-hidden="true"
				className="home-about-crosshair"
				ref={crosshairRef}
			>
				<span className="home-about-coords" ref={coordsRef}>
					X 000 · Y 000
				</span>
			</div>
			<div className="about-quiet-inner">
				<h2>
					From the first idea{" "}
					<span className="home-about-heading-end">
						to the <em>final detail.</em>
					</span>
				</h2>
				<p className="home-about-intro">
					FK Furniture & Interior is a Gurgaon-based interior design and bespoke
					furniture business with its own manufacturing setup. Work runs from
					listening and design through making, finishing and installation, for
					homes, workplaces and hospitality spaces.
				</p>
				<p className="home-about-history">
					The family craft began in Gurgaon in 1986; offices are in Gurgaon and
					Goa.
				</p>
				<a className="home-kicker-link" href="#fk-enquiry">
					About FK →
				</a>
			</div>
		</section>
	);
}
