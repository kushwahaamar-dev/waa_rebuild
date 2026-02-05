"use client"

import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CartButton() {
    const { toggleCart, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Only show cart count after hydration to avoid mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const itemCount = mounted ? getTotalItems() : 0;

    return (
        <motion.button
            onClick={toggleCart}
            className="relative p-3 rounded-full hover:bg-dark-1/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Shopping cart"
        >
            <ShoppingBag className="w-5 h-5 text-dark-1" />

            {/* Animated Badge */}
            <AnimatePresence>
                {mounted && itemCount > 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center"
                    >
                        <motion.div
                            className="absolute inset-0 bg-dark-1 rounded-full"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <span className="relative z-10 text-[11px] font-mono text-light-1 font-semibold px-1.5">
                            {itemCount > 99 ? '99+' : itemCount}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ping effect when item added */}
            <AnimatePresence>
                {mounted && itemCount > 0 && (
                    <motion.div
                        key={itemCount}
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-dark-1 rounded-full"
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}
