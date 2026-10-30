import { cn } from "cn";
import type * as React from "react";

function Textarea({
	className,
	surface = "line",
	...props
}: React.ComponentProps<"textarea"> & { surface?: "line" | "box" }) {
	return (
		<textarea
			className={cn(
				"field-sizing-content flex min-h-16 w-full resize-none rounded-none text-base outline-none transition-[color,border-color,background-color] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				surface === "box"
					? "border border-input bg-card px-3 py-3 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive"
					: "border border-transparent border-b-input bg-transparent px-0 py-3 focus-visible:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50",
				className
			)}
			data-slot="textarea"
			{...props}
		/>
	);
}

export { Textarea };
