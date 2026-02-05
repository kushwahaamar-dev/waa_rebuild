"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Mail, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useSearchParams } from "next/navigation";

export default function MerchSuccessPage() {
    const clearCart = useCartStore((state) => state.clearCart);
    const searchParams = useSearchParams();
    const isDemo = searchParams.get('demo') === 'true';

    // Clear cart on success
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <main className="min-h-screen bg-light-1 dark:bg-dark-1 flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    className="text-center max-w-lg relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 -z-10">
                        <motion.div
                            className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl ${isDemo
                                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/10'
                                    : 'bg-gradient-to-br from-green-500/20 to-emerald-600/10'
                                }`}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>

                    {/* Demo Mode Banner */}
                    {isDemo && (
                        <motion.div
                            className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Demo Mode</p>
                                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                                        This is a simulated checkout. No payment was processed.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Success Icon */}
                    <motion.div
                        className="relative w-28 h-28 mx-auto mb-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <div className={`absolute inset-0 rounded-3xl rotate-6 ${isDemo
                                ? 'bg-gradient-to-br from-amber-400 to-orange-600'
                                : 'bg-gradient-to-br from-green-400 to-emerald-600'
                            }`} />
                        <div className={`absolute inset-0 rounded-3xl flex items-center justify-center ${isDemo
                                ? 'bg-gradient-to-br from-amber-500 to-orange-700'
                                : 'bg-gradient-to-br from-green-500 to-emerald-700'
                            }`}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono mb-6 ${isDemo
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                : 'bg-green-500/10 text-green-600 dark:text-green-400'
                            }`}>
                            <Sparkles className="w-4 h-4" />
                            {isDemo ? 'Demo Order Complete' : 'Order Confirmed'}
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-serif text-dark-1 dark:text-light-1 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {isDemo ? 'Demo Complete!' : 'Thank You!'}
                    </motion.h1>

                    <motion.p
                        className="text-lg text-dark-1/60 dark:text-light-1/60 font-sans mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {isDemo
                            ? 'This simulates what customers would see after a successful payment. Configure API keys in .env.local to enable real payments.'
                            : 'Your order is being processed. We\'ll send you a confirmation email with tracking details shortly.'
                        }
                    </motion.p>

                    {/* Info Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-white dark:bg-white/[0.03] border border-dark-1/5 dark:border-white/5 rounded-2xl p-5 text-left">
                            <div className="w-10 h-10 bg-dark-1/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3">
                                <Mail className="w-5 h-5 text-dark-1 dark:text-light-1" />
                            </div>
                            <h3 className="font-serif text-dark-1 dark:text-light-1 mb-1">
                                {isDemo ? 'Email Integration' : 'Check Your Email'}
                            </h3>
                            <p className="text-sm text-dark-1/50 dark:text-light-1/50 font-sans">
                                {isDemo ? 'Add email service to send confirmations' : 'Order details and tracking info incoming'}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/[0.03] border border-dark-1/5 dark:border-white/5 rounded-2xl p-5 text-left">
                            <div className="w-10 h-10 bg-dark-1/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-3">
                                <Package className="w-5 h-5 text-dark-1 dark:text-light-1" />
                            </div>
                            <h3 className="font-serif text-dark-1 dark:text-light-1 mb-1">
                                {isDemo ? 'Fulfillment Ready' : 'Ships in 3-5 Days'}
                            </h3>
                            <p className="text-sm text-dark-1/50 dark:text-light-1/50 font-sans">
                                {isDemo ? 'Full e-commerce flow is working' : 'Premium packaging, handled with care'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Link href="/merch">
                            <Button variant="outline" className="rounded-xl px-8 py-6 w-full sm:w-auto">
                                Continue Shopping
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button className="rounded-xl px-8 py-6 w-full sm:w-auto">
                                Back to Home
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
