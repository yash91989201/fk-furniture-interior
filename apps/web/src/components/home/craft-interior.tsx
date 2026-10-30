/** biome-ignore-all lint/a11y/useSemanticElements: interactive SVG diagrams need a group role, not a fieldset. */
/** biome-ignore-all lint/a11y/noAriaHiddenOnFocusable: these static SVG annotation groups have no tab stops. */
import { useId } from "react";

import {
	CraftDetail,
	type CraftDrawingProps,
	CraftPart,
} from "./craft-drawing";

const ink = "#3A0F34";
const gold = "#EAAA00";
const silver = "#DDE3E8";
const paper = "#F7F4EE";
const muted = "#8A7F84";

export function CraftInterior(props: CraftDrawingProps) {
	const grainId = useId();
	const fluteId = useId();
	return (
		<svg
			aria-label="Axonometric interior cutaway showing wall finishes, flooring and custom joinery"
			className="craft-drawing craft-drawing-interior"
			role="group"
			viewBox="0 0 900 600"
		>
			<defs>
				<pattern
					height="10"
					id={grainId}
					patternUnits="userSpaceOnUse"
					width="10"
				>
					<path
						d="M0 9 10 1"
						fill="none"
						stroke={ink}
						strokeOpacity=".16"
						strokeWidth=".7"
					/>
				</pattern>
				<pattern
					height="8"
					id={fluteId}
					patternUnits="userSpaceOnUse"
					width="8"
				>
					<path
						d="M2 0v8 M6 0v8"
						fill="none"
						stroke={ink}
						strokeOpacity=".22"
						strokeWidth=".8"
					/>
				</pattern>
			</defs>

			<g
				className="craft-drawing-annotation"
				fill="none"
				stroke={muted}
				strokeDasharray="2 6"
				strokeOpacity=".48"
				strokeWidth="1"
			>
				<path d="M90 477 148 443 M752 496 810 462 M456 76v-34 M706 327l89-51" />
				<path d="M118 510h74 M118 506v8 M192 506v8 M766 522h52 M766 518v8 M818 518v8" />
			</g>
			<g
				className="craft-drawing-annotation"
				fill={muted}
				fontFamily="Instrument Sans Variable, sans-serif"
				fontSize="10"
				letterSpacing="1.2"
			>
				<text x="118" y="527">
					ILLUSTRATIVE FINISH STUDY
				</text>
				<text x="766" y="539">
					MATERIAL EDGE
				</text>
			</g>

			{/* Room shell: two joined wall planes and a lifted floor slab. */}
			<path
				d="M167 250 456 87 734 246 734 392 456 550 167 386Z"
				fill={paper}
				stroke={ink}
				strokeLinejoin="round"
				strokeWidth="2.4"
			/>
			<path
				d="M167 250 456 87 456 354 167 519Z"
				fill="#EAE3D9"
				stroke={ink}
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
			<path
				d="M456 87 734 246 734 413 456 354Z"
				fill="#F1EEE9"
				stroke={ink}
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
			<path
				d="m167 386 289 164 278-159v22L456 578 167 414Z"
				fill={silver}
				stroke={ink}
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
			<path
				d="m186 388 270 153 258-147M194 405l257 146m-232-160 258 146m-216-170 258 146m-216-170 258 146"
				fill="none"
				stroke={ink}
				strokeOpacity=".18"
				strokeWidth="1"
			/>
			<path
				d="M167 386 456 550 734 391"
				fill="none"
				stroke={gold}
				strokeWidth="4"
			/>

			{/* Finish layer: rhythm of inset panels, rail, and a restrained wall sconce. */}
			<CraftPart
				{...props}
				id="finish"
				label="Wall finish and panelling"
				offset={{ y: props.expanded ? -20 : 0 }}
			>
				<g>
					<path
						d="m189 254 267-151v223L189 479Z"
						fill="#F5F0E8"
						stroke={ink}
						strokeWidth="1.6"
					/>
					<path
						d="m201 261 45-26v210l-45 26Zm55-31 45-25v209l-45 26Zm55-31 45-25v210l-45 25Zm55-31 45-25v210l-45 25Zm55-31 30-17v210l-30 17Z"
						fill="#E5D8C4"
						stroke={ink}
						strokeWidth="1.1"
					/>
					<path
						d="m201 261 45-26v210l-45 26Zm55-31 45-25v209l-45 26Zm55-31 45-25v210l-45 25Zm55-31 45-25v210l-45 25Zm55-31 30-17v210l-30 17Z"
						fill={`url(#${fluteId})`}
					/>
					<path
						d="m188 250 268-152m-267 186 267-152"
						fill="none"
						stroke={gold}
						strokeWidth="3"
					/>
					<path
						d="M362 161v33m-9-27 9-8 9 8v16h-18v-16Z"
						fill={gold}
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
					<path
						d="m362 194-10 26m10-26 11 26"
						fill="none"
						stroke={ink}
						strokeOpacity=".45"
						strokeWidth="1"
					/>
				</g>
			</CraftPart>

			{/* Material layer: laid timber, inset rug, and seating define the interior scale. */}
			<CraftPart
				{...props}
				id="material"
				label="Floor material and room finishes"
				offset={{ y: props.expanded ? -10 : 0 }}
			>
				<g>
					<path
						d="m189 389 267 151 255-146"
						fill="none"
						stroke={ink}
						strokeOpacity=".54"
						strokeWidth="1.2"
					/>
					<path
						d="m206 391 263 150m-220-174 263 150m-220-175 263 150m-220-175 263 150m-220-174 263 150m-220-175 263 150m-220-174 263 150"
						fill="none"
						stroke={ink}
						strokeOpacity=".14"
						strokeWidth="1"
					/>
					<path
						d="m263 395 153-87 182 104-153 87Z"
						fill="#E9DCC5"
						stroke={ink}
						strokeWidth="1.5"
					/>
					<path
						d="m277 396 139-79 168 96-139 79Z"
						fill="none"
						stroke={gold}
						strokeDasharray="5 4"
						strokeWidth="1.5"
					/>
					{/* Sculptural lounge chair with upholstered shell and timber feet. */}
					<path
						d="m299 338 41-24 54 31-3 54-43 25-51-30Z"
						fill="#D6B6A9"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="2"
					/>
					<path
						d="m299 338 50 29 42-22m-42 22v57m-50-86 7 53 43 33"
						fill="none"
						stroke={ink}
						strokeWidth="1.3"
					/>
					<path
						d="m307 393-3 26m43-2-2 25m43-40 4 23"
						fill="none"
						stroke={ink}
						strokeLinecap="round"
						strokeWidth="3"
					/>
					<path
						d="m411 390 29-17 42 24-29 17Z"
						fill={gold}
						stroke={ink}
						strokeWidth="1.7"
					/>
					<path
						d="m411 390 1 20 42 25v-21m-42-4 42 25 29-17v-21"
						fill="#C98C00"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
					<path
						d="M425 408v24m16-15v24m12-32v22"
						fill="none"
						stroke={ink}
						strokeWidth="1"
					/>
				</g>
			</CraftPart>

			{/* Making layer: fitted credenza, reveal shadow, drawer fronts and fine pulls. */}
			<CraftPart
				{...props}
				id="making"
				label="Custom cabinet and joinery"
				offset={{ y: props.expanded ? -24 : 0 }}
			>
				<g>
					<path
						d="m477 303 176-101 69 40-176 102Z"
						fill="#F3E9D8"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="2"
					/>
					<path
						d="m477 303 69 41v82l-69-40Z"
						fill="#AE7853"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="2"
					/>
					<path
						d="m546 344 176-102v83L546 426Z"
						fill="#C4956D"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="2"
					/>
					<path
						d="m490 307 162-93 48 28-163 93Z"
						fill="#EAAA00"
						stroke={ink}
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
					<CraftDetail
						active={props.activePart === "making"}
						reducedMotion={props.reducedMotion}
						x={12}
						y={10}
					>
						<path
							d="m560 345 49-28v65l-49 29Zm57-33 47-27v65l-47 27Zm55-32 42-24v65l-42 24Z"
							fill="#D5A47B"
							stroke={ink}
							strokeWidth="1.2"
						/>
						<path
							d="m560 345 49-28v65l-49 29Zm57-33 47-27v65l-47 27Zm55-32 42-24v65l-42 24Z"
							fill={`url(#${grainId})`}
						/>
						<path
							d="m584 353 8-5m-8 22 8-5m49-45 8-5m-8 22 8-5m47-38 8-5m-8 22 8-5"
							fill="none"
							stroke={ink}
							strokeLinecap="round"
							strokeWidth="2"
						/>
					</CraftDetail>
					<path
						d="m546 426 176-101v11L546 438Z"
						fill="#8E5C45"
						stroke={ink}
						strokeWidth="1.4"
					/>
				</g>
			</CraftPart>

			{/* Drafting leaders connect the room to finish and joinery swatches. */}
			<g
				className="craft-drawing-annotation"
				fill="none"
				stroke={ink}
				strokeWidth="1.1"
			>
				<path d="m460 129 182-57h71" />
				<path d="m718 270 98 25v27" />
				<path d="m681 389 120 73h35" />
			</g>
			<g
				className="craft-drawing-annotation"
				fill={gold}
				stroke={ink}
				strokeWidth="1.2"
			>
				<circle cx="460" cy="129" r="3" />
				<circle cx="718" cy="270" r="3" />
				<circle cx="681" cy="389" r="3" />
			</g>
			<g className="craft-drawing-annotation" stroke={ink} strokeWidth="1.3">
				<path d="M714 54h52v34h-52z" fill="#E5D8C4" />
				<path d="M714 54h52v34h-52z" fill={`url(#${fluteId})`} />
				<path d="M792 299h46v37h-46z" fill={silver} />
				<path d="M800 306h30v22h-30z" fill="#A57855" />
				<path d="M837 455h23v26h-23z" fill="#D5A47B" />
				<path d="M837 455h23v26h-23z" fill={`url(#${grainId})`} />
			</g>
			<g
				className="craft-drawing-annotation"
				fill={ink}
				fontFamily="Instrument Sans Variable, sans-serif"
				fontSize="9"
				fontWeight="600"
				letterSpacing="1"
			>
				<text x="695" y="46">
					FLUTED FINISH
				</text>
				<text x="782" y="349">
					FLOOR STUDY
				</text>
				<text x="805" y="497">
					VENEER
				</text>
			</g>
		</svg>
	);
}
