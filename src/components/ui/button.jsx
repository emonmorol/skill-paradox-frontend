import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	// Base styles
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-transform transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary/40 aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/50 aria-invalid:border-destructive cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-md hover:bg-primary/80 hover:scale-[1.05] active:scale-95",
				destructive:
					"bg-destructive text-white shadow-md hover:bg-destructive/80 focus-visible:ring-destructive/40 dark:bg-destructive/70 dark:hover:bg-destructive/85",
				outline:
					"border border-gray-300 bg-transparent shadow-sm hover:bg-gray-100 hover:text-primary dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-primary-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:scale-[0.97]",
				ghost: "bg-transparent hover:bg-accent/60 hover:text-accent-foreground dark:hover:bg-accent/40",
				link: "text-primary underline-offset-4 hover:underline hover:text-primary/90 active:text-primary/70",
				modern: "mt-6 w-1/3 bg-gradient-to-r from-blue-600 to-cyan-500 transition-colors text-primary-foreground shadow-md transition duration-300 ease-in-out hover:from-cyan-500 hover:to-blue-600 hover:scale-[1.015] active:scale-95",
			},
			size: {
				default: "h-10 px-5 has-[>svg]:px-4",
				sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-3",
				lg: "h-12 rounded-lg px-8 has-[>svg]:px-6",
				icon: "size-10 p-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({ className, variant, size, asChild = false, ...props }) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
