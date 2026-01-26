"use client"

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animated Counter Hook
function useAnimatedCounter(target: number, duration: number = 2, inView: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration, inView]);

    return count;
}

// Single Stat Component
const StatItem = ({
    number,
    suffix = "",
    label,
    delay = 0
}: {
    number: number,
    suffix?: string,
    label: string,
    delay?: number
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const animatedNumber = useAnimatedCounter(number, 2, isInView);

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div
                className="text-5xl md:text-7xl font-serif text-dark-1 mb-2"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: delay + 0.2, type: "spring", stiffness: 100 }}
            >
                {animatedNumber}{suffix}
            </motion.div>
            <div className="text-sm md:text-base text-dark-1/50 uppercase tracking-widest font-medium">
                {label}
            </div>
        </motion.div>
    );
};

export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-light-1 relative overflow-hidden">
            {/* Background Decoration */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 50%)"
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-serif text-dark-1 mb-2">
                        Building the Future, <span className="italic">Together</span>
                    </h2>
                    <p className="text-dark-1/60 max-w-lg mx-auto">
                        From hackathon wins to community events, here's what we've accomplished.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <StatItem number={200} suffix="+" label="Active Members" delay={0.1} />
                    <StatItem number={15} suffix="+" label="Projects Built" delay={0.2} />
                    <StatItem number={50} suffix="+" label="Events Hosted" delay={0.3} />
                    <StatItem number={5} label="Hackathon Wins" delay={0.4} />
                </div>

                {/* Decorative Line */}
                <motion.div
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-dark-1/10 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                />
            </div>
        </section>
    );
}
