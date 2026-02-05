"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MerchCancelPage() {
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
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-600/5 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>

                    {/* Cancel Icon */}
                    <motion.div
                        className="relative w-28 h-28 mx-auto mb-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <div className="absolute inset-0 bg-dark-1/5 dark:bg-white/5 rounded-3xl rotate-6" />
                        <div className="absolute inset-0 bg-dark-1/10 dark:bg-white/10 rounded-3xl flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                            >
                                <XCircle className="w-12 h-12 text-dark-1/40 dark:text-light-1/40" />
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-serif text-dark-1 dark:text-light-1 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Payment Cancelled
                    </motion.h1>

                    <motion.p
                        className="text-lg text-dark-1/60 dark:text-light-1/60 font-sans mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        No worries — your cart is still saved. Ready to try again whenever you are.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/merch">
                            <Button className="rounded-xl px-8 py-6 w-full sm:w-auto">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="rounded-xl px-8 py-6 w-full sm:w-auto">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Help Section */}
                    <motion.div
                        className="bg-white dark:bg-white/[0.03] border border-dark-1/5 dark:border-white/5 rounded-2xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-dark-1/5 dark:bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MessageCircle className="w-5 h-5 text-dark-1 dark:text-light-1" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-serif text-dark-1 dark:text-light-1 mb-1">Need Help?</h3>
                                <p className="text-sm text-dark-1/50 dark:text-light-1/50 font-sans">
                                    Reach out at{" "}
                                    <a href="mailto:support@waa.org" className="text-dark-1 dark:text-light-1 underline underline-offset-2">
                                        support@waa.org
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
