import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  "border border-[#000000]",
  {
    variants: {
      variant: {
        default:
          "border-[#15F0F0]",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
      },
    //   size: {
    //     default: "h-9 px-4 py-2",
    //     sm: "h-8 rounded-md px-3 text-xs",
    //     lg: "h-10 rounded-md px-8",
    //     icon: "h-9 w-9",
    //   },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Input ({ className, variant, size, ...props }) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className )}
      {...props} />
  );
}

export { Input, inputVariants }