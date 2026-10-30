/** biome-ignore-all lint/a11y/useSemanticElements: interactive SVG diagrams need a group role, not a fieldset. */
/** biome-ignore-all lint/a11y/noAriaHiddenOnFocusable: these static SVG annotation groups have no tab stops. */
import {
	CraftDetail,
	type CraftDrawingProps,
	CraftPart,
} from "./craft-drawing";

export function CraftExploded(props: CraftDrawingProps) {
	const { expanded } = props;
	return (
		<svg
			aria-label="Exploded axonometric furniture surface with veneer, a solid core, fixing rails and brass fasteners"
			className="craft-drawing craft-drawing-exploded"
			fill="none"
			role="group"
			viewBox="0 0 900 600"
		>
			<g aria-hidden="true" className="craft-drafting" stroke="currentColor">
				<path
					d="M150 480 450 575 775 422M170 135 170 485M450 52 450 575M750 152 750 470"
					strokeDasharray="4 7"
				/>
				<path d="m182 142 282-98m-286 88 9 20m271-118 10 20M144 416l-21 8 287 95 21-8m-312-93 8 16m279 79 8 16" />
				<path d="m764 178 28 9v204l-28 12m19-220 18 6m-18 200 18 6" />
			</g>
			<g aria-hidden="true" className="craft-drawing-label">
				<text transform="translate(274 85) rotate(-19)">Surface / veneer</text>
				<text transform="translate(221 481) rotate(18)">Assembly axis</text>
				<text transform="translate(845 230) rotate(90)">Exploded view</text>
			</g>
			<CraftPart
				{...props}
				id="making"
				label="fixing rails and fasteners"
				offset={{ y: expanded ? 90 : 12 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="2">
					<path
						d="m170 297 300-102 276 95-300 102Z"
						fill="#F0ECE4"
						strokeDasharray="5 5"
					/>
					<path d="m199 301 35-12 268 91-35 12Z" fill="#61445B" />
					<path d="m199 301 268 91v16l-268-91Z" fill="#3A0F34" />
					<path d="m467 392 35-12v16l-35 12Z" fill="#7A6074" />
					<path d="m412 226 35-12 269 91-35 12Z" fill="#61445B" />
					<path d="m412 226 269 91v16l-269-91Z" fill="#3A0F34" />
					<path d="m681 317 35-12v16l-35 12Z" fill="#7A6074" />
					<path d="m249 311 215-73 29 10-215 73Z" fill="#9B8794" />
					<path d="m424 371 216-73 28 10-215 73Z" fill="#9B8794" />
					<g fill="#EAAA00">
						{[
							{ x: 246, y: 304 },
							{ x: 460, y: 232 },
							{ x: 464, y: 377 },
							{ x: 677, y: 305 },
						].map((fixing) => (
							<CraftDetail
								active={props.activePart === "making"}
								key={fixing.x}
								reducedMotion={props.reducedMotion}
								y={-14}
							>
								<rect
									fill="transparent"
									height={30}
									stroke="none"
									width={30}
									x={fixing.x - 15}
									y={fixing.y - 15}
								/>
								<path d={`M${fixing.x} ${fixing.y}v14`} strokeWidth={3} />
								<ellipse cx={fixing.x} cy={fixing.y} rx={8} ry={4} />
								<path d={`m${fixing.x - 4} ${fixing.y}h8`} />
							</CraftDetail>
						))}
					</g>
				</g>
				<g className="craft-leader" stroke="#3A0F34">
					<path d="m200 314-64 25H68" />
					<circle cx="200" cy="314" fill="#EAAA00" r="4" />
				</g>
				<text className="craft-drawing-label" x="68" y="328">
					Fixing rails
				</text>
			</CraftPart>
			<CraftPart
				{...props}
				id="material"
				label="layered timber core and dowels"
				offset={{ y: expanded ? -5 : 0 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="2">
					<path d="m170 280 300-102 276 95-300 102Z" fill="#C6B49B" />
					<path d="m170 280 276 95v28L170 308Z" fill="#A88D6C" />
					<path d="m446 375 300-102v28L446 403Z" fill="#8C7057" />
					<path
						d="m170 289 276 95 300-102m-576 16 276 95 300-102"
						opacity=".6"
						strokeWidth="1"
					/>
					<path
						d="m215 282 254-86m-206 103 254-86m-206 103 254-86m-206 103 254-86m-206 103 254-86"
						opacity=".3"
						strokeWidth="1"
					/>
					<g fill="#3A0F34">
						<ellipse cx="225" cy="279" rx="7" ry="3" />
						<ellipse cx="470" cy="196" rx="7" ry="3" />
						<ellipse cx="444" cy="355" rx="7" ry="3" />
						<ellipse cx="690" cy="272" rx="7" ry="3" />
					</g>
					<path
						d="M225 276v-21m-5 0h10m235-62v-21m-5 0h10m-26 180v-21m-5 0h10m241-62v-21m-5 0h10"
						strokeDasharray="2 4"
					/>
				</g>
				<g className="craft-leader" stroke="#3A0F34">
					<path d="m681 321 75 25h60" />
					<circle cx="681" cy="321" fill="#EAAA00" r="4" />
				</g>
				<text className="craft-drawing-label" textAnchor="end" x="810" y="350">
					Layered core
				</text>
			</CraftPart>
			<CraftPart
				{...props}
				id="finish"
				label="veneer surface and edge finish"
				offset={{ y: expanded ? -100 : -12 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="2">
					<path d="m170 270 300-102 276 95-300 102Z" fill="#EAAA00" />
					<path d="m170 270 276 95v7l-276-95Z" fill="#BF8B13" />
					<path d="m446 365 300-102v7L446 372Z" fill="#986B17" />
					<g opacity=".42" strokeWidth="1">
						<path d="m210 271 254-87m-225 97 253-87m-220 98 244-84m-211 95 243-83m-210 95 242-83m-210 95 241-83m-207 95 241-83m-209 94 241-82" />
						<path d="m344 243 31-11 38 6 40-14 42 6 37-12m-143 40 28-10 44 4 35-12 45 5 24-8" />
						<path d="m450 183 268 91M197 274l270 93" strokeDasharray="3 5" />
					</g>
				</g>
				<g className="craft-leader" stroke="#3A0F34">
					<path d="m680 250 60-43h76" />
					<circle cx="680" cy="250" fill="#DDE3E8" r="4" />
				</g>
				<text className="craft-drawing-label" textAnchor="end" x="816" y="195">
					Grain &amp; edge
				</text>
			</CraftPart>
			<g aria-hidden="true" className="craft-drawing-label">
				<path d="M75 64h35m-17-17v34" stroke="currentColor" />
				<text x="75" y="108">
					Surface study
				</text>
				<text x="75" y="127">
					Veneer / core / fixing
				</text>
			</g>
		</svg>
	);
}
