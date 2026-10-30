/** biome-ignore-all lint/performance/noJsxPropsBind: illustration gestures update the inspected part */
import { ArrowUpRight, Layers2, RotateCcw } from "lucide-react";
import {
	MotionConfig,
	motion,
	useInView,
	useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";
import { CRAFT_SPRING } from "./craft-drawing";
import { CraftExploded } from "./craft-exploded";
import { CraftInterior } from "./craft-interior";
import { CraftJoinery } from "./craft-joinery";

const PARTS = [
	{
		id: "finish",
		title: "The finish.",
		body: "Custom finishes, considered in the context of the finished space.",
		color: "#EAAA00",
	},
	{
		id: "material",
		title: "The material.",
		body: "Material selection: woods, boards and veneers.",
		color: "#AD967C",
	},
	{
		id: "making",
		title: "The making.",
		body: "Workshop & manufacturing, joinery & assembly, quality checks.",
		color: "#3A0F34",
	},
] as const;

export type CraftIllustrationKind = "exploded" | "joinery" | "interior";

const STUDIES = {
	exploded: {
		Drawing: CraftExploded,
		name: "Anatomy of a surface",
		detail: "Exploded assembly study",
	},
	joinery: {
		Drawing: CraftJoinery,
		name: "Inside the joint",
		detail: "Section & connection study",
	},
	interior: {
		Drawing: CraftInterior,
		name: "A room, deconstructed",
		detail: "Interior cutaway study",
	},
} as const;

export function CraftIllustration({ kind }: { kind: CraftIllustrationKind }) {
	const studyRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<string | null>(null);
	const [inspected, setInspected] = useState<string | null>(null);
	const [expanded, setExpanded] = useState(true);
	const reducedMotion = useReducedMotion() ?? false;
	const inView = useInView(studyRef, { amount: 0.15 });
	const activePart = inspected ?? selected;
	const { Drawing, name, detail } = STUDIES[kind];

	function selectPart(id: string) {
		const deselecting = selected === id;
		setSelected(deselecting ? null : id);
		if (deselecting) {
			setInspected((current) => (current === id ? null : current));
		}
	}

	function resetStudy() {
		setSelected(null);
		setInspected(null);
		setExpanded(true);
	}

	return (
		<MotionConfig reducedMotion="user" transition={CRAFT_SPRING}>
			<div
				className={`craft-study craft-study-${kind}`}
				data-in-view={inView}
				ref={studyRef}
			>
				<div className="craft-study-heading">
					<h3>{name}</h3>
					<span>{detail}</span>
				</div>
				<div className="craft-study-layout">
					<div className="craft-canvas">
						<Drawing
							activePart={activePart}
							expanded={expanded}
							onInspect={setInspected}
							onSelect={selectPart}
							reducedMotion={reducedMotion}
							selectedPart={selected}
						/>

						<p className="craft-canvas-note">
							Illustrative study · Not a construction specification
						</p>
					</div>
					<div className="craft-inspector">
						<p className="craft-interaction-hint">
							<span className="craft-hint-look">Hover to look closer.</span>
							<span>Tap a part to hold it in focus.</span>
						</p>
						<fieldset
							aria-label="Explore the craft"
							className="craft-part-list"
						>
							{PARTS.map((part) => (
								<motion.button
									aria-pressed={selected === part.id}
									className="craft-part-button"
									data-active={activePart === part.id}
									key={part.id}
									onBlur={() => setInspected(null)}
									onClick={() => selectPart(part.id)}
									onFocus={() => setInspected(part.id)}
									onHoverEnd={() => setInspected(null)}
									onHoverStart={() => setInspected(part.id)}
									type="button"
									whileTap={reducedMotion ? undefined : { scale: 0.98 }}
								>
									<span className="craft-part-label">
										<i aria-hidden="true" style={{ background: part.color }} />
										<span>{part.title}</span>
										<ArrowUpRight aria-hidden="true" size={17} />
									</span>
									<span className="craft-part-body">{part.body}</span>
								</motion.button>
							))}
						</fieldset>
					</div>
				</div>
				<div className="craft-study-toolbar">
					<button
						aria-pressed={expanded}
						className="craft-assembly-toggle"
						onClick={() => setExpanded((current) => !current)}
						type="button"
					>
						<Layers2 aria-hidden="true" size={18} />
						{expanded ? "Bring it together" : "Open the assembly"}
					</button>
					<span className="craft-assembly-state">
						{expanded
							? "An open view of the craft"
							: "Every part, working together"}
					</span>
					<button className="craft-reset" onClick={resetStudy} type="button">
						<RotateCcw aria-hidden="true" size={15} />
						Reset view
					</button>
				</div>
			</div>
		</MotionConfig>
	);
}
