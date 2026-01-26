"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const FadeIn = ({
    children,
    className,
    delay = 0,
    direction = "up"
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right" | "none"
}) => {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
        none: {}
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}

export const StaggerContainer = ({
    children,
    className,
    delay = 0,
    staggerDelay = 0.1
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    staggerDelay?: number
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
