"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-light-1"
        >
            {/* Minimal Decorative Line */}
            <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-1/10 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1 }}
            />

            {/* Content */}
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-dark-1/5 text-dark-1/60 px-4 py-2 rounded-full text-sm font-medium mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Zap className="w-4 h-4 text-dark-1" />
                        Applications Open for Spring 2026
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-dark-1 leading-tight mb-6">
                        Ready to Build the{" "}
                        <motion.span
                            className="italic text-dark-1"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Future?
                        </motion.span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-dark-1/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join 200+ students learning blockchain development, building real projects,
                        and connecting with industry leaders.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/join">
                                <Button
                                    size="lg"
                                    className="rounded-full px-10 h-16 text-lg bg-dark-1 text-light-1 hover:bg-dark-1/90 shadow-lg group"
                                >
                                    Apply Now
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/about">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-10 h-16 text-lg border-2 border-dark-1/10 text-dark-1 hover:bg-dark-1/5 hover:border-dark-1/30"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        className="mt-12 pt-12 border-t border-dark-1/10"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-sm text-dark-1/40 mb-4">Backed by Texas Tech SGA • Recognized Student Organization</p>
                        <div className="flex justify-center items-center gap-8 text-dark-1/30">
                            <span className="text-xs uppercase tracking-wider font-medium">Est. 2022</span>
                            <span className="w-1 h-1 bg-dark-1/20 rounded-full" />
                            <span className="text-xs uppercase tracking-wider font-medium">Lubbock, TX</span>
                            <span className="w-1 h-1 bg-dark-1/20 rounded-full" />
                            <span className="text-xs uppercase tracking-wider font-medium">100% Free to Join</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div >
        </section >
    );
}
