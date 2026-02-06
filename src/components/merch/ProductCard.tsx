"use client"

import { Product, formatPrice } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Plus, Check, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        product.sizes?.[1] // Default to M if available
    );
    const [isAdding, setIsAdding] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addItem(product, selectedSize);
        setTimeout(() => setIsAdding(false), 1500);
    };

    return (
        <motion.div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Subtle Shadow on Hover */}
            <motion.div
                className="absolute -inset-1 bg-dark-1/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
            />

            {/* Card Container */}
            <div className="relative bg-white border border-dark-1/10 rounded-2xl overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-dark-1/[0.02] to-dark-1/[0.05]">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quick Add Button - Appears on Hover */}
                    <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isHovered && product.inStock ? 1 : 0,
                            y: isHovered && product.inStock ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            onClick={handleAddToCart}
                            disabled={!product.inStock || isAdding}
                            className="w-full rounded-xl py-3 bg-white/90 hover:bg-white text-dark-1 backdrop-blur-sm border-0 shadow-lg font-sans"
                        >
                            <AnimatePresence mode="wait">
                                {isAdding ? (
                                    <motion.span
                                        key="added"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        Added to Cart
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="add"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add to Cart
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    </motion.div>

                    {/* Sold Out Badge */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-dark-1/70 backdrop-blur-sm flex items-center justify-center">
                            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-light-1 font-mono text-sm uppercase tracking-widest border border-white/20">
                                Sold Out
                            </span>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono uppercase tracking-wider text-dark-1/60 border border-dark-1/5">
                            {product.category}
                        </span>
                    </div>


                </div>

                {/* Product Info */}
                <div className="p-5 space-y-4">
                    {/* Title & Price Row */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow min-w-0">
                            <h3 className="font-serif text-lg text-dark-1 leading-tight truncate">
                                {product.name}
                            </h3>
                            <p className="text-sm text-dark-1/50 mt-1 line-clamp-2 font-sans">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <span className="text-xl font-serif text-dark-1">
                                {formatPrice(product.price)}
                            </span>
                        </div>
                    </div>

                    {/* Size Selector */}
                    {product.sizes && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono uppercase tracking-wider text-dark-1/40">
                                    Size
                                </span>
                                {selectedSize && (
                                    <span className="text-xs font-mono text-dark-1/60">
                                        Selected: {selectedSize}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`relative px-4 py-2 text-xs font-mono rounded-lg transition-all duration-300 ${selectedSize === size
                                            ? 'text-light-1'
                                            : 'text-dark-1/60 hover:text-dark-1 bg-dark-1/5 hover:bg-dark-1/10'
                                            }`}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {selectedSize === size && (
                                            <motion.div
                                                layoutId={`size-${product.id}`}
                                                className="absolute inset-0 bg-dark-1 rounded-lg"
                                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                            />
                                        )}
                                        <span className="relative z-10">{size}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mobile Add Button */}
                    <div className="md:hidden pt-2">
                        <Button
                            onClick={handleAddToCart}
                            disabled={!product.inStock || isAdding}
                            className="w-full rounded-xl py-3"
                        >
                            {isAdding ? (
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    Added!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add to Cart
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
