import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

const inputVariants = cva(
	"w-full min-w-0 bg-transparent text-base outline-none transition-[color,border-color,background-color] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			surface: {
				line: "h-10 border border-transparent border-b-input px-0 py-1 focus-visible:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50",
				box: "h-10 border border-input bg-card px-3 py-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive",
			},
		},
		defaultVariants: {
			surface: "line",
		},
	}
);

function Input({
	className,
	type,
	surface,
	...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<InputPrimitive
			className={cn(inputVariants({ surface, className }))}
			data-slot="input"
			type={type}
			{...props}
		/>
	);
}

export { Input, inputVariants };
