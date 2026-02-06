"use client"

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DESTINATION_URL = "https://rankr.me/community/68";

// Full-screen canvas-based Matrix rain
const FullScreenMatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン₿Ξ◊∞LVLUP';
        const charArray = chars.split('');

        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);

        // Initialize drops at random positions for instant visual
        const drops: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));

        const draw = () => {
            // Semi-transparent black to create fade trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Brighter head of the drop
                if (Math.random() > 0.5) {
                    ctx.fillStyle = '#00ff00'; // Bright green
                } else {
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
                }

                ctx.fillText(char, x, y);

                // Trail characters (slightly dimmer)
                ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
                for (let j = 1; j < 15; j++) {
                    const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
                    const opacity = 1 - (j / 15);
                    ctx.fillStyle = `rgba(0, 255, 0, ${opacity * 0.3})`;
                    ctx.fillText(trailChar, x, y - (j * fontSize));
                }

                // Reset drop when it goes off screen
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 40);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'black' }}
        />
    );
};

export function KonamiMatrix() {
    const [active, setActive] = useState(false);
    const [sequence, setSequence] = useState<string[]>([]);
    const [preloaded, setPreloaded] = useState(false);

    // New code: "lvlup" (l, v, l, u, p)
    const secretCode = ["l", "v", "l", "u", "p"];

    // Preload the destination page when component mounts
    useEffect(() => {
        const iframe = document.createElement('iframe');
        iframe.src = DESTINATION_URL;
        iframe.style.cssText = 'display:none;width:0;height:0;border:none;position:absolute;left:-9999px';
        iframe.onload = () => setPreloaded(true);
        document.body.appendChild(iframe);
        return () => { iframe.parentNode?.removeChild(iframe); };
    }, []);

    // Listen for the secret code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (active) return;
            if (!e.key) return;
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
                    className="fixed inset-0 z-[99999] bg-black overflow-hidden"
                >
                    {/* Full screen matrix rain */}
                    <FullScreenMatrixRain />

                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

                    {/* Center content */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-green-500 z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-6xl mb-4 font-bold tracking-wider" style={{ textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00' }}>
                                SYSTEM ENTRY GRANTED
                            </h1>
                            <p className="text-lg md:text-xl opacity-80 mb-8" style={{ textShadow: '0 0 10px #00ff00' }}>
                                Welcome to the inner circle.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="mt-12"
                        >
                            <motion.p
                                className="text-xl md:text-2xl font-bold"
                                animate={{
                                    opacity: [0.6, 1, 0.6],
                                    textShadow: [
                                        '0 0 10px #00ff00',
                                        '0 0 30px #00ff00, 0 0 60px #00ff00',
                                        '0 0 10px #00ff00'
                                    ]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                [ Press ENTER to continue → ]
                            </motion.p>
                            <p className="text-sm mt-6 opacity-50">Press ESC to exit</p>
                        </motion.div>
                    </div>

                    {/* Scanline effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)'
                        }}
                    />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.8) 100%)'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
