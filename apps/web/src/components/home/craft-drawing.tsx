/** biome-ignore-all lint/performance/noJsxPropsBind: each drawing part owns its gesture handlers */
import { motion } from "motion/react";
import type { ReactNode } from "react";

export const CRAFT_SPRING = {
	type: "spring",
	stiffness: 260,
	damping: 21,
	mass: 0.8,
} as const;

const CRAFT_HOVER_SPRING = {
	type: "spring",
	stiffness: 420,
	damping: 20,
	mass: 0.65,
} as const;

export interface CraftDrawingProps {
	activePart: string | null;
	expanded: boolean;
	onInspect: (id: string | null) => void;
	onSelect: (id: string) => void;
	reducedMotion: boolean;
	selectedPart?: string | null;
}

interface CraftPartProps extends CraftDrawingProps {
	children: ReactNode;
	id: string;
	label: string;
	offset?: { x?: number; y?: number; rotate?: number };
}

export function CraftPart({
	activePart,
	selectedPart,
	children,
	id,
	label,
	offset,
	onInspect,
	onSelect,
	reducedMotion,
}: CraftPartProps) {
	const active = activePart === id;

	return (
		<motion.g
			animate={{
				x: offset?.x ?? 0,
				y: offset?.y ?? 0,
				rotate: offset?.rotate ?? 0,
				opacity: activePart && !active ? 0.45 : 1,
			}}
			aria-label={`Inspect ${label}`}
			aria-pressed={selectedPart === id}
			className="craft-part"
			data-craft-part={id}
			data-muted={Boolean(activePart && !active)}
			initial={false}
			onBlur={() => onInspect(null)}
			onClick={() => onSelect(id)}
			onFocus={() => onInspect(id)}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onSelect(id);
				}
			}}
			onPointerEnter={(event) => {
				if (event.pointerType !== "touch") {
					onInspect(id);
				}
			}}
			onPointerLeave={() => onInspect(null)}
			role="button"
			tabIndex={0}
			transition={
				reducedMotion
					? { duration: 0 }
					: { ...CRAFT_SPRING, opacity: { duration: 0.18, ease: "easeOut" } }
			}
		>
			<g className="craft-part-drift">
				<motion.g
					animate={{ scale: active ? 1.045 : 1 }}
					className="craft-part-ambient"
					data-active={active}
					initial={false}
					transition={reducedMotion ? { duration: 0 } : CRAFT_HOVER_SPRING}
				>
					{children}
				</motion.g>
			</g>
		</motion.g>
	);
}

export function CraftDetail({
	active,
	children,
	reducedMotion,
	x = 0,
	y = -10,
}: {
	active: boolean;
	children: ReactNode;
	reducedMotion: boolean;
	x?: number;
	y?: number;
}) {
	const rest = { x: active ? x * 0.5 : 0, y: active ? y * 0.5 : 0 };
	return (
		<motion.g
			animate={reducedMotion ? { x: 0, y: 0 } : rest}
			initial={false}
			transition={reducedMotion ? { duration: 0 } : CRAFT_HOVER_SPRING}
			whileHover={reducedMotion ? undefined : { x, y }}
			whileTap={reducedMotion ? undefined : { x: x * 0.7, y: y * 0.7 }}
		>
			{children}
		</motion.g>
	);
}
