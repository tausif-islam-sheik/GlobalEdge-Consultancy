import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-500 text-white hover:bg-brand-600 shadow",
        outline: "border border-brand-500 text-brand-600 bg-white hover:bg-brand-50",
        navy: "bg-navy-900 text-white hover:bg-navy-800",
        ghost: "hover:bg-slate-100 text-slate-700",
      },
      size: { default: "h-10 px-5 text-sm", sm: "h-8 px-3 text-xs", lg: "h-12 px-8 text-base", pill: "h-11 px-8 text-sm rounded-full font-semibold" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
export { Button, buttonVariants };
