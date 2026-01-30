"use client"

import { ArrowRight, Sparkles, Bitcoin, Blocks, Coins, Wallet, Shield, Hexagon, Zap, Globe } from "lucide-react";
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

// Floating Decorative Icons with custom icon support
const FloatingIcon = ({
    delay = 0,
    className = "",
    icon: Icon = Sparkles,
    size = "w-6 h-6",
    rotate = 0
}: {
    delay?: number,
    className?: string,
    icon?: React.ComponentType<{ className?: string }>,
    size?: string,
    rotate?: number
}) => {
    return (
        <motion.div
            className={`absolute pointer-events-none text-dark-1/15 dark:text-light-1/15 ${className}`}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: rotate,
                y: [0, -12, 0],
            }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5, type: "spring" },
                rotate: { delay, duration: 0.5 },
                y: { delay: delay + 0.5, duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <Icon className={size} />
        </motion.div>
    );
};

// Stats Badge
const StatsBadge = ({ number, label, delay }: { number: string, label: string, delay: number }) => {
    return (
        <motion.div
            className="flex items-center gap-2 bg-dark-1/5 px-4 py-2 rounded-full border border-dark-1/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
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

            {/* Web3/Crypto Floating Decorative Elements */}
            {mounted && (
                <>
                    {/* Original sparkles */}
                    <FloatingIcon delay={1} className="top-1/4 left-[10%]" icon={Sparkles} />
                    <FloatingIcon delay={1.2} className="top-1/3 right-[15%]" icon={Sparkles} />

                    {/* Bitcoin icons */}
                    <FloatingIcon delay={0.8} className="top-[15%] left-[5%]" icon={Bitcoin} size="w-8 h-8" rotate={15} />
                    <FloatingIcon delay={1.8} className="bottom-[20%] right-[8%]" icon={Bitcoin} size="w-10 h-10" rotate={-10} />

                    {/* Ethereum-style hexagons */}
                    <FloatingIcon delay={1.1} className="top-[20%] right-[5%]" icon={Hexagon} size="w-12 h-12" rotate={30} />
                    <FloatingIcon delay={1.5} className="bottom-[35%] left-[8%]" icon={Hexagon} size="w-6 h-6" rotate={-15} />

                    {/* Blockchain blocks */}
                    <FloatingIcon delay={1.3} className="top-[40%] left-[3%]" icon={Blocks} size="w-9 h-9" rotate={12} />
                    <FloatingIcon delay={1.7} className="top-[25%] right-[25%]" icon={Blocks} size="w-7 h-7" rotate={-8} />

                    {/* Wallet */}
                    <FloatingIcon delay={0.9} className="bottom-[25%] left-[15%]" icon={Wallet} size="w-8 h-8" rotate={5} />
                    <FloatingIcon delay={2.0} className="top-[50%] right-[3%]" icon={Wallet} size="w-6 h-6" rotate={-20} />

                    {/* Coins */}
                    <FloatingIcon delay={1.4} className="bottom-[40%] right-[20%]" icon={Coins} size="w-7 h-7" rotate={-12} />
                    <FloatingIcon delay={2.2} className="top-[60%] left-[6%]" icon={Coins} size="w-9 h-9" rotate={18} />

                    {/* Security/Shield */}
                    <FloatingIcon delay={1.6} className="top-[12%] left-[30%]" icon={Shield} size="w-6 h-6" rotate={0} />
                    <FloatingIcon delay={2.1} className="bottom-[15%] right-[30%]" icon={Shield} size="w-8 h-8" rotate={10} />

                    {/* Globe (decentralized) */}
                    <FloatingIcon delay={1.9} className="top-[35%] right-[10%]" icon={Globe} size="w-10 h-10" rotate={-5} />

                    {/* Zap (fast transactions) */}
                    <FloatingIcon delay={2.3} className="bottom-[30%] left-[25%]" icon={Zap} size="w-5 h-5" rotate={22} />
                    <FloatingIcon delay={1.0} className="top-[55%] right-[18%]" icon={Zap} size="w-7 h-7" rotate={-15} />
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
