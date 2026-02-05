"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/merch/ProductCard";
import { products, getProductsByCategory, Product } from "@/data/products";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shirt, Package, Sparkles, ArrowDown, Diamond, ShoppingBag, Mail, MapPin, Shield } from "lucide-react";
import { AsciiTshirt, AsciiShoppingBag, AsciiHanger } from "@/components/AsciiAnimations";
import { WalletConnect } from "@/components/merch/WalletConnect";
import { useMembership } from "@/context/MembershipContext";


type Category = 'all' | Product['category'];

const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Products', icon: <Diamond className="w-4 h-4" /> },
    { value: 'apparel', label: 'Apparel', icon: <Shirt className="w-4 h-4" /> },
    { value: 'accessories', label: 'Accessories', icon: <Package className="w-4 h-4" /> },
    { value: 'stickers', label: 'Stickers', icon: <Sparkles className="w-4 h-4" /> },
];

export default function MerchPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const { isMember, isConnected } = useMembership();
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });


    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const filteredProducts = activeCategory === 'all'
        ? products
        : getProductsByCategory(activeCategory);

    return (
        <main className="min-h-screen bg-light-1 flex flex-col overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <motion.section
                ref={heroRef}
                className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-1/5 via-transparent to-transparent" />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* ASCII Decorations - Thematic to Merch */}
                <div className="absolute bottom-32 left-8 hidden lg:block opacity-40">
                    <AsciiTshirt />
                </div>
                <div className="absolute top-32 right-12 hidden lg:block opacity-35">
                    <AsciiShoppingBag />
                </div>
                <div className="absolute bottom-20 right-8 hidden xl:block opacity-30">
                    <AsciiHanger />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    {/* Pre-title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-dark-1/5 backdrop-blur-sm rounded-full border border-dark-1/10">
                            <span className="w-2 h-2 bg-dark-1 rounded-full animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-dark-1/60">
                                Now Available
                            </span>
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <motion.span
                            className="block text-[12vw] md:text-[10vw] lg:text-[8vw] font-serif leading-[0.85] tracking-tight text-dark-1"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            Wear the
                        </motion.span>
                        <motion.span
                            className="block text-[14vw] md:text-[12vw] lg:text-[10vw] font-serif italic leading-[0.85] tracking-tight text-dark-1"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            Revolution
                        </motion.span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-8 text-lg md:text-xl text-dark-1/50 font-sans max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        Premium merchandise crafted for the Web3 pioneers.
                        <br className="hidden md:block" />
                        Every piece tells a story. Every purchase fuels the movement.
                    </motion.p>

                    {/* Wallet Connect & Member Banner */}
                    <motion.div
                        className="mt-10 flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        <WalletConnect />

                        {isMember && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl"
                            >
                                <Shield className="w-5 h-5 text-emerald-600" />
                                <span className="font-serif text-lg text-emerald-700">
                                    All merch is <span className="font-bold">FREE</span> for you!
                                </span>
                            </motion.div>
                        )}

                        {!isConnected && (
                            <p className="text-sm text-dark-1/40 font-mono">
                                Connect wallet to verify membership for free merch
                            </p>
                        )}
                    </motion.div>


                    {/* Stats Row */}
                    <motion.div
                        className="flex items-center justify-center gap-8 md:gap-16 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        {[
                            { value: '8', label: 'Products' },
                            { value: '100%', label: 'Premium' },
                            { value: '∞', label: 'Impact' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-serif text-dark-1">{stat.value}</div>
                                <div className="text-xs font-mono uppercase tracking-wider text-dark-1/40 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-2 text-dark-1/30"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Category Navigation - Sticky */}
            <section className="sticky top-16 z-40 bg-light-1/80 backdrop-blur-xl border-b border-dark-1/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.value}
                                    onClick={() => setActiveCategory(category.value)}
                                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm whitespace-nowrap transition-all duration-300 ${activeCategory === category.value
                                        ? 'text-light-1'
                                        : 'text-dark-1/60 hover:text-dark-1'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeCategory === category.value && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-dark-1 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {category.icon}
                                        {category.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Product Count */}
                        <div className="hidden md:block text-sm font-mono text-dark-1/40">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        layout
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} isMember={isMember} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-dark-1/5 border-y border-dark-1/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-dark-1 mb-4">
                            How It <span className="italic">Works</span>
                        </h2>
                        <p className="text-lg text-dark-1/50 font-sans">
                            Place your order online, pick up on campus.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShoppingBag,
                                title: 'Place Your Order',
                                description: 'Browse our collection and add items to your cart. Enter your email and submit the order.',
                            },
                            {
                                icon: Mail,
                                title: 'Get Instructions',
                                description: 'You\'ll receive an email with payment details (Venmo/Zelle/Cash) and pickup information.',
                            },
                            {
                                icon: MapPin,
                                title: 'Pick Up on Campus',
                                description: 'Complete payment and collect your merch at the designated pickup location.',
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className="relative p-8 bg-white rounded-2xl border border-dark-1/10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-dark-1 flex items-center justify-center mb-6">
                                    <step.icon className="w-5 h-5 text-light-1" />
                                </div>
                                <div className="absolute top-8 right-8 text-4xl font-serif text-dark-1/10">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-serif text-dark-1 mb-2">{step.title}</h3>
                                <p className="text-dark-1/50 font-sans text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Statement */}
            <section className="py-24 px-4">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-dark-1 mb-4">
                        Every purchase supports the mission.
                    </h2>
                    <p className="text-dark-1/50 font-sans">
                        100% of proceeds go directly to WAA initiatives.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
