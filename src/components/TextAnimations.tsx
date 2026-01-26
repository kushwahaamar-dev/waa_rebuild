"use client"

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ============================================
// 1. MAGNETIC TEXT
// Characters repel/attract cursor
// ============================================
export const MagneticText = ({ text, className = "" }: { text: string, className?: string }) => {
    return (
        <span className={`inline-block whitespace-nowrap ${className}`}>
            {text.split("").map((char, i) => (
                <MagneticChar key={i} char={char} />
            ))}
        </span>
    );
};

const MagneticChar = ({ char }: { char: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Trigger radius
            if (distance < 100) {
                const strength = 0.4;
                setPosition({
                    x: distanceX * strength * -1, // Repel
                    y: distanceY * strength * -1
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.span
            ref={ref}
            className="inline-block"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

// ============================================
// 2. CHARACTER SCRAMBLE DECRYPT
// Matrix-style reveal
// ============================================
export const CharScramble = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;

        let timeout: NodeJS.Timeout;
        const startDelay = delay * 1000;

        timeout = setTimeout(() => {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    hasAnimated.current = true;
                }

                iteration += 1 / 3;
            }, 30);
        }, startDelay);

        return () => clearTimeout(timeout);
    }, [isInView, text, delay]);

    return (
        <span ref={ref} className={`${className} font-mono`}>
            {display}
        </span>
    );
};
