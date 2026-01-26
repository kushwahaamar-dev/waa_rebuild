"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { motion, useInView, useAnimation, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

// ============================================
// 1. MAGNETIC BUTTON EFFECT
// ============================================
export function MagneticButton({ children, className = "", strength = 0.3 }: {
    children: ReactNode,
    className?: string,
    strength?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        x.set((e.clientX - centerX) * strength)
        y.set((e.clientY - centerY) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// 2. ANIMATED LINK UNDERLINE
// ============================================
export function AnimatedLink({ href, children, className = "" }: {
    href: string,
    children: ReactNode,
    className?: string
}) {
    return (
        <a href={href} className={`group relative inline-block ${className}`}>
            {children}
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
        </a>
    )
}

// ============================================
// 3. SCROLL REVEAL ANIMATION
// ============================================
export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up"
}: {
    children: ReactNode,
    className?: string,
    delay?: number,
    direction?: "up" | "down" | "left" | "right"
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// 4. CARD HOVER EFFECT
// ============================================
export function HoverCard({
    children,
    className = "",
    liftAmount = -8,
    rotateAmount = 2
}: {
    children: ReactNode,
    className?: string,
    liftAmount?: number,
    rotateAmount?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        })
    }

    const rotateX = isHovered ? (mousePosition.y - 0.5) * -rotateAmount : 0
    const rotateY = isHovered ? (mousePosition.x - 0.5) * rotateAmount : 0

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            animate={{
                y: isHovered ? liftAmount : 0,
                rotateX,
                rotateY,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
            {children}
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-inherit pointer-events-none"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    background: isHovered
                        ? `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0,0,0,0.03), transparent 40%)`
                        : 'none'
                }}
            />
        </motion.div>
    )
}

// ============================================
// 5. STAGGERED LIST ANIMATION
// ============================================
export function StaggeredList({
    children,
    className = "",
    staggerDelay = 0.1
}: {
    children: ReactNode[],
    className?: string,
    staggerDelay?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <div ref={ref} className={className}>
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * staggerDelay }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    )
}

// ============================================
// 6. BUTTON HOVER EFFECT WITH SHINE
// ============================================
export function ShineButton({
    children,
    className = "",
    onClick
}: {
    children: ReactNode,
    className?: string,
    onClick?: () => void
}) {
    return (
        <motion.button
            className={`relative overflow-hidden ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
            {/* Shine effect */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
            />
        </motion.button>
    )
}

// ============================================
// 7. COUNTER ANIMATION
// ============================================
export function AnimatedCounter({
    value,
    className = "",
    duration = 2
}: {
    value: number,
    className?: string,
    duration?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            setCount(Math.floor(progress * value))

            if (progress < 1) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }, [isInView, value, duration])

    return (
        <span ref={ref} className={className}>
            {count}
        </span>
    )
}

// ============================================
// 8. TEXT REVEAL ANIMATION
// ============================================
export function TextReveal({
    text,
    className = "",
    delay = 0
}: {
    text: string,
    className?: string,
    delay?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const words = text.split(" ")

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.05,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

// ============================================
// 9. TOOLTIP WITH ANIMATION
// ============================================
export function AnimatedTooltip({
    children,
    content,
    className = ""
}: {
    children: ReactNode,
    content: string,
    className?: string
}) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-dark-1 text-light-1 text-xs rounded-lg whitespace-nowrap pointer-events-none z-50"
                    >
                        {content}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-dark-1 rotate-45 -mt-1" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ============================================
// 10. GLOWING BORDER EFFECT
// ============================================
export function GlowingBorder({
    children,
    className = "",
    glowColor = "rgba(0,0,0,0.1)"
}: {
    children: ReactNode,
    className?: string,
    glowColor?: string
}) {
    return (
        <motion.div
            className={`relative ${className}`}
            whileHover="hover"
        >
            <motion.div
                className="absolute inset-0 rounded-inherit"
                variants={{
                    hover: {
                        boxShadow: `0 0 30px 5px ${glowColor}`,
                    }
                }}
                transition={{ duration: 0.3 }}
            />
            {children}
        </motion.div>
    )
}
