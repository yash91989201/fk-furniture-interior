export function BlogEmptyState() {
	return (
		<section aria-labelledby="blog-empty-title" className="blog-empty">
			<div aria-hidden="true" className="blog-empty-row">
				<div className="blog-empty-card">
					<div className="blog-empty-media" />
					<div className="blog-empty-body">
						<div className="blog-empty-line blog-empty-line--title" />
						<div className="blog-empty-line" />
						<div className="blog-empty-line blog-empty-line--short" />
						<div className="blog-empty-line blog-empty-line--meta" />
					</div>
				</div>
				<div className="blog-empty-card">
					<div className="blog-empty-media" />
					<div className="blog-empty-body">
						<div className="blog-empty-line blog-empty-line--title" />
						<div className="blog-empty-line blog-empty-line--short" />
						<div className="blog-empty-line" />
						<div className="blog-empty-line blog-empty-line--meta" />
					</div>
				</div>
				<div className="blog-empty-card">
					<div className="blog-empty-media" />
					<div className="blog-empty-body">
						<div className="blog-empty-line blog-empty-line--title" />
						<div className="blog-empty-line" />
						<div className="blog-empty-line blog-empty-line--meta" />
					</div>
				</div>
			</div>
			<div className="blog-empty-overlay">
				<div className="blog-empty-plate">
					<h2 className="blog-empty-title" id="blog-empty-title">
						No posts yet
					</h2>
					<p className="blog-empty-copy">
						Check back later for articles from FK Furniture &amp; Interior.
					</p>
				</div>
			</div>
		</section>
	);
}
