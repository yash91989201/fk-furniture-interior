import { faqGroups, sectionFrame, sectionTitle } from "./content";

export function FaqQuestions() {
	return (
		<section
			aria-label="Common questions"
			className={`${sectionFrame} bg-card`}
			id="fk-faq"
		>
			<div className="flex flex-col gap-[clamp(3.5rem,7vw,5rem)]">
				{faqGroups.map((group, groupIndex) => (
					<section
						aria-labelledby={`${group.id}-title`}
						className="[scroll-margin-top:calc(var(--home-nav-compact)+1.5rem)]"
						id={group.id}
						key={group.id}
					>
						<div className="grid gap-[clamp(0.85rem,2vw,2rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-baseline">
							<h2
								className={`${sectionTitle} max-w-[20ch]`}
								id={`${group.id}-title`}
							>
								{group.title}
							</h2>
							<p className="m-0 max-w-[46ch] text-pretty text-[0.9375rem] text-muted-foreground leading-[1.6]">
								{group.intro}
							</p>
						</div>

						<div className="mt-[clamp(1rem,1.6vw,1.25rem)] border-border border-y">
							{group.questions.map((question, questionIndex) => (
								<details
									className="group border-border not-first:border-t"
									key={question.id}
									name={group.id}
									open={
										groupIndex === 0 && questionIndex === 0 ? true : undefined
									}
								>
									<summary className="flex min-h-[3.5rem] cursor-pointer list-none items-start hover:bg-accent/50 active:bg-accent/70 [&::-webkit-details-marker]:hidden">
										<h3 className="m-0 flex flex-1 items-start justify-between gap-[clamp(1rem,2vw,2rem)] py-[clamp(1rem,1.8vw,1.35rem)] pr-[clamp(1rem,1.5vw,1.5rem)] font-heading text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] leading-[1.32] tracking-[-0.01em]">
											<span className="max-w-[66ch] text-pretty">
												{question.question}
											</span>
											<svg
												aria-hidden="true"
												className="mt-[0.22em] size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
												fill="none"
												stroke="currentColor"
												strokeWidth={1.4}
												viewBox="0 0 12 12"
											>
												<path d="M6 1.2v9.6M1.2 6h9.6" />
											</svg>
										</h3>
									</summary>
									<div className="pr-[clamp(1rem,1.5vw,1.5rem)] pb-[clamp(1.25rem,2vw,1.6rem)]">
										<p className="m-0 max-w-[34rem] text-pretty text-[clamp(1rem,0.95rem+0.2vw,1.0625rem)] text-foreground leading-[1.7]">
											{question.answer}
										</p>
										{question.pending ? (
											<p className="mt-[0.9rem] flex max-w-[58ch] items-start gap-[0.45rem] text-[0.8125rem] text-muted-foreground leading-[1.55]">
												<span
													aria-hidden="true"
													className="mt-[0.4em] size-1.5 shrink-0 rounded-full bg-primary"
												/>
												Awaiting confirmation before this is published as a
												commitment.
											</p>
										) : null}
									</div>
								</details>
							))}
						</div>
					</section>
				))}
			</div>
		</section>
	);
}
