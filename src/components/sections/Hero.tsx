"use client"

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ParticleNetwork } from "../ParticleNetwork";

// Magnetic Button Component
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
    );
};

// Floating Decorative Icons
const FloatingIcon = ({ delay = 0, className = "" }: { delay?: number, className?: string }) => {
    return (
        <motion.div
            className={`absolute pointer-events-none text-dark-1/10 ${className}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5, type: "spring" },
                y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <Sparkles className="w-6 h-6" />
        </motion.div>
    );
};

// Stats Badge
const StatsBadge = ({ number, label, delay }: { number: string, label: string, delay: number }) => {
    return (
        <motion.div
            className="flex items-center gap-2 bg-dark-1/5 px-4 py-2 rounded-full border border-dark-1/5 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <span className="text-lg font-bold text-dark-1">{number}</span>
            <span className="text-sm text-dark-1/60">{label}</span>
        </motion.div>
    );
};

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 20,
                stiffness: 100
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* Particle Network */}
            <ParticleNetwork />

            {/* Floating Decorative Elements */}
            {mounted && (
                <>
                    <FloatingIcon delay={1} className="top-1/4 left-[10%]" />
                    <FloatingIcon delay={1.2} className="top-1/3 right-[15%]" />
                    <FloatingIcon delay={1.4} className="bottom-1/4 left-[20%]" />
                    <FloatingIcon delay={1.6} className="bottom-1/3 right-[10%]" />
                </>
            )}

            {/* Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <motion.span
                            className="inline-flex items-center gap-2 bg-dark-1/5 text-dark-1/80 px-4 py-2 rounded-full text-sm font-medium border border-dark-1/5"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="w-2 h-2 bg-dark-1 rounded-full animate-pulse" />
                            Texas Tech's Premier Web3 Organization
                        </motion.span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-dark-1 leading-[0.9] tracking-tight mb-8"
                    >
                        <span className="block">Embrace</span>
                        <span className="block">
                            the{" "}
                            <motion.span
                                className="italic text-dark-1"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Future
                            </motion.span>
                            <span className="text-dark-1">.</span>
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-dark-1/60 font-sans max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        Learn blockchain. Build projects. Connect with innovators.
                        <br />
                        <span className="text-dark-1/80 font-medium">Join the Web3 revolution at Texas Tech.</span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4 mb-16"
                    >
                        <MagneticButton>
                            <Link href="/join">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="lg"
                                        className="rounded-full px-10 h-16 text-lg bg-dark-1 text-light-1 hover:bg-dark-1/90 shadow-xl group relative overflow-hidden transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Join the Movement
                                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Button>
                                </motion.div>
                            </Link>
                        </MagneticButton>

                        <MagneticButton>
                            <Link href="/learn">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full px-10 h-16 text-lg border-2 border-dark-1/20 text-dark-1 hover:bg-dark-1 hover:text-light-1 hover:border-dark-1"
                                    >
                                        Explore Courses
                                    </Button>
                                </motion.div>
                            </Link>
                        </MagneticButton>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <StatsBadge number="200+" label="Active Members" delay={1.2} />
                        <StatsBadge number="15+" label="Projects Built" delay={1.4} />
                        <StatsBadge number="50+" label="Events Hosted" delay={1.6} />
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="w-6 h-10 border-2 border-dark-1/20 rounded-full flex items-start justify-center p-1"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-1.5 h-3 bg-dark-1/40 rounded-full"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
