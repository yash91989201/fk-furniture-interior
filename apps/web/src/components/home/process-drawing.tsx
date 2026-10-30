import { AnimatePresence, motion } from "motion/react";

const DRAWINGS = [
	{
		structure: [
			"M100 208V72H440V292H310M258 292H100V252",
			"M108 208V80H432V284H310M258 284H108V252",
			"M320 80V150M320 194V284M320 150H432",
			"M100 252H144A44 44 0 0 0 100 208M258 292V240A52 52 0 0 1 310 292",
			"M320 194H364A44 44 0 0 0 320 150",
		],
		furniture: [
			"M138 111H262V165H138ZM148 119H186V138H148ZM196 119H234V138H196ZM138 144H262M148 165V173M252 165V173",
			"M171 196H237V232H171ZM180 204H228M180 224H228",
			"M137 198H155V235H137M253 198H271V235H253",
			"M352 98H407V126H352ZM358 103H401M358 121H401",
			"M355 221H407V264H355ZM361 227H401V258H361Z",
		],
		accents: ["M142 76H260M142 72V80M260 72V80", "M436 195V258"],
		dimensions: [
			"M100 49H440M100 43V55M440 43V55",
			"M464 72V292M458 72H470M458 292H470",
		],
	},
	{
		structure: [
			"M98 100H246V249H98Z",
			"M278 73H426V222H278Z",
			"M114 116H230V233H114Z",
			"M294 89H410V206H294Z",
		],
		furniture: [
			"M126 117V232M138 117V232M150 117V232M162 117V232M174 117V232M186 117V232M198 117V232M210 117V232M222 117V232",
			"M295 118L325 89M295 151L358 89M295 184L391 89M306 206L410 102M339 206L410 135M372 206L410 168",
			"M209 201H332V292H209ZM219 211H322V282H219Z",
		],
		accents: ["M220 212H321V281H220Z", "M98 269H166M278 53H346"],
		dimensions: [
			"M76 100V249M70 100H82M70 249H82",
			"M350 244H426M350 238V250M426 238V250",
		],
	},
	{
		structure: [
			"M125 125H415V144H125ZM136 131H404",
			"M146 144H165V278H146Z",
			"M375 144H394V278H375Z",
			"M165 163H375V182H165ZM176 170H364",
		],
		furniture: ["M155 145V160M385 145V160", "M165 171H180M360 171H375"],
		accents: ["M146 144H165M375 144H394", "M165 163V182M375 163V182"],
		dimensions: [
			"M125 100H415M125 94V106M415 94V106",
			"M445 125V278M439 125H451M439 278H451",
		],
	},
	{
		structure: [
			"M100 208V72H440V292H310M258 292H100V252",
			"M108 208V80H432V284H310M258 284H108V252",
			"M320 80V150M320 194V284M320 150H432",
			"M100 252H144A44 44 0 0 0 100 208M258 292V240A52 52 0 0 1 310 292",
		],
		furniture: [
			"M129 102H282V247H129Z",
			"M143 111H268V165H143ZM151 119H190V138H151ZM200 119H239V138H200ZM143 145H268",
			"M173 192H237V230H173ZM181 200H229M181 222H229",
			"M140 194H156V231H140ZM254 194H270V231H254Z",
			"M351 99H407V127H351ZM357 105H401V121H357Z",
			"M351 218H407V264H351ZM357 224H401V258H357Z",
			"M293 102a10 10 0 1 0 0 20a10 10 0 1 0 0-20M293 107V117M288 112H298",
		],
		accents: ["M143 76H268M436 195V258", "M353 177L365 189L390 164"],
		dimensions: [
			"M100 49H440M100 43V55M440 43V55",
			"M464 72V292M458 72H470M458 292H470",
		],
	},
] as const;

const FURNITURE_OFFSETS = [
	[0, 26],
	[24, 0],
	[-24, 0],
	[0, -22],
	[22, 0],
	[0, 24],
	[0, -18],
] as const;
const ASSEMBLY_OFFSETS = [
	[0, -42],
	[-38, 18],
	[38, 18],
	[0, 44],
] as const;

function DrawingLines({
	paths,
	reduced,
	delay = 0,
	offsets = [],
}: {
	paths: readonly string[];
	reduced: boolean;
	delay?: number;
	offsets?: readonly (readonly [number, number])[];
}) {
	const initialOpacity = offsets.length ? 0.4 : 0;
	return paths.map((d, index) => (
		<motion.path
			custom={index}
			d={d}
			key={d}
			variants={{
				hidden: {
					opacity: reduced ? 1 : initialOpacity,
					pathLength: reduced || offsets.length ? 1 : 0,
					x: reduced ? 0 : (offsets[index]?.[0] ?? 0),
					y: reduced ? 0 : (offsets[index]?.[1] ?? 0),
				},
				visible: (order: number) => ({
					opacity: 1,
					pathLength: 1,
					x: 0,
					y: 0,
					transition: {
						duration: reduced ? 0 : 0.9,
						delay: reduced ? 0 : delay + order * 0.14,
						ease: [0.22, 1, 0.36, 1],
						x: {
							type: "spring",
							bounce: 0.04,
							visualDuration: reduced ? 0 : 0.85,
							delay: reduced ? 0 : delay + order * 0.14,
						},
						y: {
							type: "spring",
							bounce: 0.04,
							visualDuration: reduced ? 0 : 0.85,
							delay: reduced ? 0 : delay + order * 0.14,
						},
					},
				}),
			}}
		/>
	));
}

export function ProcessDrawing({
	active,
	reduced,
}: {
	active: number;
	reduced: boolean;
}) {
	const drawing = DRAWINGS[active];
	return (
		<div aria-hidden="true" className="home-scene-drawing">
			<AnimatePresence mode="wait">
				<motion.svg
					animate={{ opacity: 1 }}
					className="home-process-blueprint"
					exit={{ opacity: 0 }}
					fill="none"
					initial={{ opacity: reduced ? 1 : 0 }}
					key={active}
					transition={{ duration: reduced ? 0 : 0.18 }}
					viewBox="45 20 450 305"
				>
					<motion.g
						initial="hidden"
						viewport={{ once: true, amount: 0.5 }}
						whileInView="visible"
					>
						<g className="home-drawing-dimensions">
							<DrawingLines
								delay={active === 2 ? 1.25 : 0.65}
								paths={drawing.dimensions}
								reduced={reduced}
							/>
						</g>
						<g className="home-drawing-structure">
							<DrawingLines
								offsets={active === 2 ? ASSEMBLY_OFFSETS : undefined}
								paths={drawing.structure}
								reduced={reduced}
							/>
						</g>
						<g className="home-drawing-furniture">
							<DrawingLines
								delay={active === 2 ? 1 : 0.25}
								offsets={active === 2 ? undefined : FURNITURE_OFFSETS}
								paths={drawing.furniture}
								reduced={reduced}
							/>
						</g>
						<g className="home-drawing-accents">
							<DrawingLines
								delay={active === 2 ? 1.15 : 0.8}
								paths={drawing.accents}
								reduced={reduced}
							/>
						</g>
					</motion.g>
				</motion.svg>
			</AnimatePresence>
		</div>
	);
}
