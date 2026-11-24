import { buttonVariants } from "@fk-furniture-interior/ui/components/button";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteNav } from "@/components/home/site-nav";

export function PageNotFound() {
	return (
		<div className="home-page selection:bg-primary selection:text-primary-foreground">
			<SiteNav compactStart />
			<main className="flex min-h-[70svh] flex-col justify-center border-border border-b bg-background px-[var(--home-gutter)] pt-[calc(var(--home-nav-compact)+3rem)] pb-12">
				<h1 className="m-0 text-balance font-medium text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] leading-tight">
					Page not found
				</h1>
				<p className="mt-4 max-w-[48ch] text-muted-foreground">
					The address may have changed. Return home or browse our projects.
				</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link className={buttonVariants({ className: "min-h-11" })} to="/">
						Back to home
					</Link>
					<Link
						className={buttonVariants({
							className: "min-h-11",
							variant: "outline",
						})}
						to="/projects/"
					>
						View projects
					</Link>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
