"use client"

import { useEffect, useState } from "react";
import { MatrixRain } from "../AsciiAnimations";
import { motion, AnimatePresence } from "framer-motion";

export function KonamiMatrix() {
    const [active, setActive] = useState(false);
    const [sequence, setSequence] = useState<string[]>([]);

    // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence(prev => {
                const newSequence = [...prev, e.key];
                // Keep only the last N keys where N is konami code length
                if (newSequence.length > konamiCode.length) {
                    newSequence.shift();
                }

                // Check match
                if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
                    setActive(true);
                    return []; // Reset sequence
                }

                return newSequence;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [sequence]); // sequence dependency might be needed if state update relies on it, but functional update handles prev. actually dependency is empty usually for listener but since we use functional update on state it's fine. 
    // Wait, dependency array: if I use prev state in setSequence, I don't strictly need 'sequence' in dependency of useEffect, 
    // BUT since I need to check the updated sequence to trigger 'setActive', doing it inside the setter or an effect on sequence is better.
    // Let's refine: Use a separate effect to check sequence matches.

    // Better approach:
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence(prev => {
                const updated = [...prev, e.key].slice(-konamiCode.length);
                if (JSON.stringify(updated) === JSON.stringify(konamiCode)) {
                    setActive(true);
                }
                return updated;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Dismiss on click/escape
    useEffect(() => {
        if (!active) return;

        const dismiss = (e: KeyboardEvent | MouseEvent) => {
            if (e.type === 'click' || (e as KeyboardEvent).key === 'Escape') {
                setActive(false);
                setSequence([]);
            }
        };

        window.addEventListener("keydown", dismiss);
        window.addEventListener("click", dismiss);
        return () => {
            window.removeEventListener("keydown", dismiss);
            window.removeEventListener("click", dismiss);
        };
    }, [active]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] bg-black cursor-pointer"
                >
                    <div className="absolute inset-0 opacity-50">
                        <MatrixRain width={100} height={40} className="w-full h-full text-green-500 scale-150 transform-origin-top-left" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-green-500">
                        <h1 className="text-4xl mb-4 blink">SYSTEM ENTRY GRANTED</h1>
                        <p className="text-sm opacity-70">Welcome to the inner circle.</p>
                        <p className="text-xs mt-8 opacity-40">Press ESC to exit</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
