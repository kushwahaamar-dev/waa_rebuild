import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-dark-1 text-light-1 hover:bg-dark-1/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
                destructive:
                    "bg-red-500 text-white shadow-md hover:bg-red-500/90 hover:shadow-lg hover:-translate-y-0.5",
                outline:
                    "border-2 border-dark-1/20 bg-transparent shadow-sm hover:bg-dark-1 hover:text-light-1 hover:border-dark-1 hover:-translate-y-0.5",
                secondary:
                    "bg-dark-1/10 text-dark-1 shadow-sm hover:bg-dark-1/20 hover:-translate-y-0.5",
                ghost: "hover:bg-dark-1/5 hover:text-dark-1",
                link: "text-dark-1 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 rounded-full px-4 text-xs",
                lg: "h-12 rounded-full px-8 text-base",
                icon: "h-10 w-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
