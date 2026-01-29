"use client"

import { useEffect, useState, useRef } from "react";
import { MatrixRain } from "../AsciiAnimations";
import { motion, AnimatePresence } from "framer-motion";

const DESTINATION_URL = "https://rankr.me/community/68";

export function KonamiMatrix() {
    const [active, setActive] = useState(false);
    const [sequence, setSequence] = useState<string[]>([]);
    const [preloaded, setPreloaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // New code: "lvlup" (l, v, l, u, p)
    const secretCode = ["l", "v", "l", "u", "p"];

    // Preload the destination page when component mounts
    useEffect(() => {
        // Create hidden iframe to preload destination
        const iframe = document.createElement('iframe');
        iframe.src = DESTINATION_URL;
        iframe.style.display = 'none';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.onload = () => setPreloaded(true);
        document.body.appendChild(iframe);

        return () => {
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        };
    }, []);

    // Listen for the secret code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (active) return; // Don't track while overlay is active

            setSequence(prev => {
                const updated = [...prev, e.key.toLowerCase()].slice(-secretCode.length);
                if (JSON.stringify(updated) === JSON.stringify(secretCode)) {
                    setActive(true);
                }
                return updated;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [active]);

    // Handle Enter to navigate and Escape to dismiss
    useEffect(() => {
        if (!active) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // Navigate to destination in same tab
                window.location.href = DESTINATION_URL;
            } else if (e.key === 'Escape') {
                setActive(false);
                setSequence([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [active]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[99999] bg-black"
                >
                    <div className="absolute inset-0 opacity-50">
                        <MatrixRain width={100} height={40} className="w-full h-full text-green-500 scale-150 transform-origin-top-left" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-green-500">
                        <h1 className="text-4xl mb-4 blink">SYSTEM ENTRY GRANTED</h1>
                        <p className="text-sm opacity-70">Welcome to the inner circle.</p>
                        <motion.p
                            className="text-lg mt-8 opacity-90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            Press ENTER to continue →
                        </motion.p>
                        <p className="text-xs mt-4 opacity-40">Press ESC to exit</p>
                    </div>
                    {/* Hidden preloaded iframe for seamless transition */}
                    <iframe
                        ref={iframeRef}
                        src={DESTINATION_URL}
                        className="hidden"
                        aria-hidden="true"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
