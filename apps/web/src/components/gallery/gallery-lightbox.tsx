/** biome-ignore-all lint/performance/noJsxPropsBind: dialog actions close over the selected work */
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { GalleryWork } from "./content";

const detailLabels = [
	{ key: "material", label: "Core material" },
	{ key: "finish", label: "Surface finish" },
	{ key: "hardware", label: "Hardware & accents" },
] as const;

export function GalleryLightbox({
	work,
	onClose,
	onInquire,
}: {
	work: GalleryWork | null;
	onClose: () => void;
	onInquire: (reference: string) => void;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}
		if (!work) {
			if (dialog.open) {
				dialog.close();
			}
			return;
		}
		if (!dialog.open) {
			dialog.showModal();
		}
		dialog.querySelector<HTMLButtonElement>("[data-gallery-close]")?.focus();
	}, [work]);

	useEffect(() => {
		if (!work) {
			return;
		}
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, [work]);

	function handleInquireClick() {
		if (work) {
			onInquire(work.reference);
		}
	}

	const details = work?.details
		? detailLabels.flatMap(({ key, label }) => {
				const value = work.details?.[key];
				return value ? [{ label, value }] : [];
			})
		: [];

	return (
		<dialog
			aria-describedby={work ? "gallery-lightbox-description" : undefined}
			aria-labelledby={work ? "gallery-lightbox-title" : undefined}
			aria-modal="true"
			className="m-auto max-h-[92svh] w-[min(96vw,76rem)] overflow-y-auto border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-foreground/75 max-sm:h-svh max-sm:max-h-none max-sm:w-full max-sm:border-0"
			onClose={onClose}
			ref={dialogRef}
		>
			{work ? (
				<div className="relative grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
					<button
						aria-label="Close full view"
						className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center border border-border bg-card/95 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						data-gallery-close
						onClick={onClose}
						type="button"
					>
						<X aria-hidden="true" size={18} />
					</button>
					<figure className="m-0 flex min-w-0 items-center justify-center bg-muted p-[clamp(1rem,3vw,2rem)] max-lg:max-h-[52svh]">
						<img
							alt={work.image.alt}
							className="block max-h-[calc(92svh-2rem)] w-full object-contain max-lg:max-h-[calc(52svh-2rem)]"
							decoding="async"
							height={work.image.height}
							sizes={work.image.sizes}
							src={work.image.src}
							srcSet={work.image.srcSet}
							width={work.image.width}
						/>
					</figure>
					<div className="flex min-w-0 flex-col p-[clamp(1.25rem,3vw,2.5rem)] pt-16 lg:pt-[clamp(1.25rem,3vw,2.5rem)]">
						<p className="m-0 font-sans font-semibold text-[0.6875rem] text-muted-foreground tracking-[0.14em]">
							{work.reference}
						</p>
						<h2
							className="m-0 mt-[0.65rem] font-heading font-medium text-[clamp(1.65rem,1.25rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.025em]"
							id="gallery-lightbox-title"
						>
							{work.space}
						</h2>
						{work.project ? (
							<p className="m-0 mt-[0.45rem] text-[0.8125rem] text-muted-foreground leading-[1.5]">
								{work.project.name} · {work.project.location}
							</p>
						) : null}
						<p
							className="m-0 mt-[1.1rem] max-w-[46ch] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.65]"
							id="gallery-lightbox-description"
						>
							{work.scope}
						</p>
						{details.length > 0 ? (
							<dl className="m-0 mt-[clamp(1.5rem,3vw,2.25rem)] grid border-border border-t">
								{details.map((detail) => (
									<div
										className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 border-border border-b py-[0.8rem]"
										key={detail.label}
									>
										<dt className="m-0 text-[0.75rem] text-muted-foreground leading-[1.5]">
											{detail.label}
										</dt>
										<dd className="m-0 text-[0.8125rem] leading-[1.5]">
											{detail.value}
										</dd>
									</div>
								))}
							</dl>
						) : (
							<p className="m-0 mt-[1.5rem] max-w-[42ch] text-[0.75rem] text-muted-foreground leading-[1.55]">
								Material, finish and hardware details have not been published
								for this work.
							</p>
						)}
						<button
							className="mt-[clamp(1.5rem,3vw,2.25rem)] inline-flex min-h-11 w-full items-center justify-center bg-primary px-5 font-semibold text-[0.8125rem] text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							onClick={handleInquireClick}
							type="button"
						>
							Inquire about this design
						</button>
					</div>
				</div>
			) : null}
		</dialog>
	);
}
