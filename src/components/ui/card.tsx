import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "hover";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-dark-1/10 bg-white p-6 md:p-8 overflow-hidden relative",
                variant === "hover" && "transition-all duration-300 hover:shadow-lg hover:border-dark-1/20",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn("text-2xl font-serif text-dark-1 leading-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-dark-1/60 leading-relaxed text-sm md:text-base font-sans", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("pt-0", className)}>{children}</div>;
}
