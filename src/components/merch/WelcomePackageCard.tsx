"use client";

import { motion } from "framer-motion";
import { Gift, Check, Sparkles, Package } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMembership } from "@/context/MembershipContext";
import { WELCOME_PACKAGE } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

export function WelcomePackageCard() {
    const { isMember, hasRedeemed, markAsRedeemed } = useMembership();
    const [selectedSize, setSelectedSize] = useState("M");
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    // Only show for members who haven't redeemed
    if (!isMember) return null;

    const handleClaim = async () => {
        if (hasRedeemed || claimed) return;

        setIsClaiming(true);

        // Add to cart
        addItem(WELCOME_PACKAGE, selectedSize);

        // Mark as redeemed
        await markAsRedeemed();
        setClaimed(true);
        setIsClaiming(false);
    };

    const isRedeemed = hasRedeemed || claimed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full mb-8"
        >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-1 to-dark-1/90 p-1">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />

                <div className="relative rounded-xl bg-dark-1/50 backdrop-blur-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                        {/* Image */}
                        <div className="relative w-full md:w-64 aspect-square rounded-xl overflow-hidden bg-dark-1/30 flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Package className="w-20 h-20 text-light-1/20" />
                            </div>
                            {/* Placeholder for actual package image */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-light-1/60">
                                <Gift className="w-16 h-16 mb-2" />
                                <span className="text-xs font-mono uppercase tracking-wider">Welcome Package</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-light-1/60" />
                                <span className="text-xs font-mono uppercase tracking-wider text-light-1/60">
                                    Member Exclusive
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-serif text-light-1 mb-3">
                                {WELCOME_PACKAGE.name}
                            </h2>

                            <p className="text-light-1/60 mb-6 max-w-lg">
                                {WELCOME_PACKAGE.description}
                            </p>

                            {/* Size Selection */}
                            {!isRedeemed && WELCOME_PACKAGE.sizes && (
                                <div className="mb-6">
                                    <p className="text-xs font-mono uppercase tracking-wider text-light-1/40 mb-2">
                                        Select T-Shirt Size
                                    </p>
                                    <div className="flex gap-2 justify-center md:justify-start">
                                        {WELCOME_PACKAGE.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-10 h-10 rounded-lg font-mono text-sm transition-all ${selectedSize === size
                                                    ? "bg-light-1 text-dark-1"
                                                    : "bg-light-1/10 text-light-1/60 hover:bg-light-1/20"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action */}
                            {isRedeemed ? (
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-light-1/10 rounded-full text-light-1/60">
                                    <Check className="w-4 h-4" />
                                    <span className="font-mono text-sm">Added to Cart</span>
                                </div>
                            ) : (
                                <motion.button
                                    onClick={handleClaim}
                                    disabled={isClaiming}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-light-1 text-dark-1 rounded-full font-medium hover:bg-light-1/90 transition-colors disabled:opacity-50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Gift className="w-5 h-5" />
                                    <span>{isClaiming ? "Claiming..." : "Claim Your Package"}</span>
                                    <span className="text-dark-1/50">· $0</span>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
