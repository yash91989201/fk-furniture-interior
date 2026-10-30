import {
	CraftDetail,
	type CraftDrawingProps,
	CraftPart,
} from "./craft-drawing";

export function CraftJoinery(props: CraftDrawingProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: the SVG group role is required by the illustration contract.
		<svg
			aria-label="Illustrative construction section showing a layered furniture corner and interlocking joinery detail"
			className="craft-drawing craft-drawing-joinery"
			fill="none"
			role="group"
			viewBox="0 0 900 600"
		>
			{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static SVG drafting guides are decorative. */}
			<g aria-hidden="true" className="craft-joinery-guides" stroke="#3A0F34">
				<path d="M105 104H670M105 94V114M670 94V114M105 104l8-8m549 16 8-8" />
				<path d="M130 146V462M120 146H140M120 462H140M130 146l8 8m-16 300 8 8" />
				<path d="M150 482H640M150 472V492M640 472V492M395 472V492" />
				<path d="M702 168V398M692 168H712M692 398H712" />
				<path d="M150 135H670M150 129V141M670 129V141M185 135v10M220 135v10M255 135v10M290 135v10M325 135v10M360 135v10M395 135v10M430 135v10M465 135v10M500 135v10M535 135v10M570 135v10M605 135v10M640 135v10" />
				<circle cx="150" cy="104" fill="#EAAA00" r="3" />
				<circle cx="670" cy="104" fill="#EAAA00" r="3" />
				<circle cx="130" cy="146" fill="#EAAA00" r="3" />
				<circle cx="130" cy="462" fill="#EAAA00" r="3" />
				<path
					d="M176 166H300M176 172H300M300 166V172M176 166v6"
					strokeDasharray="2 5"
				/>
			</g>

			<CraftPart
				{...props}
				id="material"
				label="Material"
				offset={{ x: props.expanded ? -30 : 0, y: props.expanded ? -9 : 0 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="3">
					{/* Main rail: cut end grain and long face remain one connected profile. */}
					<path d="M164 217 207 190H602L559 217Z" fill="#F6F1E8" />
					<path d="M164 217H559V306H164Z" fill="#DDE3E8" />
					<path d="M559 217 602 190V278L559 306Z" fill="#C8D0D7" />
					<path d="M164 217 207 190V278L164 306Z" fill="#E8E9E3" />
					{/* Upright stile, with a stepped mortise open to the rail shoulder. */}
					<path d="M405 319 448 292H594L551 319Z" fill="#F6F1E8" />
					<path d="M405 319H551V438H405Z" fill="#DDE3E8" />
					<path d="M551 319 594 292V411L551 438Z" fill="#C8D0D7" />
					<path d="M405 319 448 292V312L427 325V438H405Z" fill="#E8E9E3" />
					{/* Crisp end-grain hatch bands on the exposed cut ends. */}
					<path
						d="M174 225 194 212M174 240 207 218M174 255 207 233M174 270 207 248M174 285 207 263M415 330 437 316M415 346 437 332M415 362 437 348M415 378 437 364M415 394 437 380M415 410 437 396M415 426 437 412"
						strokeWidth="1.5"
					/>
					<path
						d="M448 292H594M594 292V411M405 438H551"
						fill="none"
						strokeWidth="1.5"
					/>
				</g>
				{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static drawing labels are decorative. */}
				<g
					aria-hidden="true"
					fill="#3A0F34"
					fontFamily="sans-serif"
					fontSize="11"
					letterSpacing="1.2"
				>
					<text x="232" y="252">
						SOLID SECTION
					</text>
					<text transform="rotate(-90 464 365)" x="464" y="365">
						STILE
					</text>
				</g>
			</CraftPart>

			<CraftPart
				{...props}
				id="making"
				label="Making"
				offset={{ x: props.expanded ? 28 : 0, y: props.expanded ? 25 : 0 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="3">
					{/* The tenon is stepped and seated into the stile, rather than a surface overlay. */}
					<CraftDetail
						active={props.activePart === "making"}
						reducedMotion={props.reducedMotion}
						x={-15}
						y={0}
					>
						<path
							d="M245 306H405V345H427V319H448V292H405V278H245Z"
							fill="#EAAA00"
						/>
						<path d="M245 278H405V292H448L405 319H245Z" fill="#F5D77E" />
						<path
							d="M245 306H405V345H427V319H448M245 278V306M405 278V292"
							fill="none"
						/>
						<path
							d="M274 285V299M291 285V299M308 285V299M325 285V299M342 285V299M359 285V299M376 285V299"
							strokeWidth="1.5"
						/>
					</CraftDetail>
					{/* Shoulder datum and discreet assembly witness marks. */}
					<path
						d="M229 265V353M221 265H237M221 353H237M235 265H397M235 353H397"
						strokeDasharray="4 5"
						strokeWidth="1.5"
					/>
					<circle cx="405" cy="306" fill="#EAAA00" r="5" />
					<circle cx="427" cy="319" fill="#EAAA00" r="5" />
				</g>
				{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static drawing labels are decorative. */}
				<g
					aria-hidden="true"
					fill="#3A0F34"
					fontFamily="sans-serif"
					fontSize="11"
					letterSpacing="1.1"
				>
					<text x="270" y="330">
						INTERLOCKING TENON
					</text>
					<text x="211" y="383">
						SHOULDER DATUM
					</text>
				</g>
			</CraftPart>

			<CraftPart
				{...props}
				id="finish"
				label="Finish"
				offset={{ x: props.expanded ? 10 : 0, y: props.expanded ? -55 : 0 }}
			>
				<g stroke="#3A0F34" strokeLinejoin="round" strokeWidth="2">
					{/* Thin finish layer follows both visible faces and wraps the corner edge. */}
					<path d="M164 213 207 186H602L559 213Z" fill="#FFFDF7" />
					<path d="M164 213H559V220H164Z" fill="#EAAA00" />
					<path d="M559 213 602 186V193L559 220Z" fill="#D99400" />
					<path d="M405 315H551V322H405Z" fill="#EAAA00" />
					<path d="M551 315 594 288V295L551 322Z" fill="#D99400" />
					<path
						d="M188 205 216 188M203 208 232 188M218 208 247 188M233 208 262 188M248 208 277 188M263 208 292 188M278 208 307 188"
						strokeWidth="1"
					/>
				</g>
				<path d="M608 197 650 173H686" stroke="#3A0F34" strokeWidth="1.5" />
				<circle
					cx="608"
					cy="197"
					fill="#EAAA00"
					r="4"
					stroke="#3A0F34"
					strokeWidth="1.5"
				/>
				{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static drawing labels are decorative. */}
				<g
					aria-hidden="true"
					fill="#3A0F34"
					fontFamily="sans-serif"
					fontSize="11"
					letterSpacing="1.1"
				>
					<text x="646" y="162">
						FINISH LAYER
					</text>
				</g>
			</CraftPart>

			{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static detail drawing is decorative. */}
			<g aria-hidden="true" className="craft-joinery-detail" stroke="#3A0F34">
				<path
					d="M477 351C546 389 596 408 648 425"
					fill="none"
					strokeDasharray="4 5"
					strokeWidth="1.5"
				/>
				<circle cx="733" cy="456" fill="#F6F1E8" r="94" strokeWidth="2" />
				<path
					d="M661 430H794V454H811V477H794V531H727V477H661Z"
					fill="#DDE3E8"
					strokeWidth="3"
				/>
				<path d="M661 430H727V477H661Z" fill="#EAAA00" strokeWidth="3" />
				<path
					d="M727 477H794M727 477V531M661 454H711M677 435V450M694 435V450M711 435V450M677 461V473M694 461V473M711 461V473"
					fill="none"
					strokeWidth="1.5"
				/>
				<path
					d="M681 411H792M681 406V416M792 406V416"
					fill="none"
					strokeWidth="1"
				/>
				<path
					d="M642 430H628M642 531H628M635 430V531"
					fill="none"
					strokeWidth="1"
				/>
				<path
					d="M648 402H818M648 396V408M818 396V408"
					fill="none"
					strokeWidth="1"
				/>
				<circle
					cx="733"
					cy="456"
					fill="none"
					r="94"
					strokeDasharray="3 6"
					strokeWidth="1"
				/>
				<g
					fill="#3A0F34"
					fontFamily="sans-serif"
					fontSize="10"
					letterSpacing="1"
				>
					<text x="694" y="555">
						CORNER DETAIL
					</text>
					<text x="700" y="397">
						SECTION
					</text>
				</g>
			</g>

			{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: static drawing annotations are decorative. */}
			<g
				aria-hidden="true"
				className="craft-joinery-caption"
				fill="#3A0F34"
				fontFamily="sans-serif"
				fontSize="11"
				letterSpacing="1.4"
			>
				<text x="150" y="520">
					ASSEMBLY STUDY
				</text>
				<text x="150" y="540">
					LAYER / MATERIAL / JOINERY
				</text>
				<path d="M150 498H386M150 504H275" stroke="#3A0F34" strokeWidth="1" />
				<circle cx="654" cy="135" fill="#EAAA00" r="3" />
				<path
					d="M664 135H692M686 131 692 135 686 139"
					fill="none"
					stroke="#3A0F34"
					strokeWidth="1.5"
				/>
			</g>
		</svg>
	);
}
