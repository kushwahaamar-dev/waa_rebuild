"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AsciiWave } from "./AsciiAnimations";
import { AnimatedLink, MagneticButton } from "./MicroInteractions";
import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="bg-light-1 pt-0 pb-0 relative overflow-hidden border-t border-dark-1/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 border-l border-r border-dark-1/10 h-full">
                    {/* Brand Column */}
                    <div className="md:col-span-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-dark-1/10 flex flex-col justify-between h-full min-h-[300px]">
                        <div>
                            <Link href="/" className="block mb-6">
                                <span className="sr-only">WAA</span>
                                <img
                                    src="/images/waa-logo.png"
                                    alt="WAA Logo"
                                    className="h-12 w-auto object-contain"
                                />
                            </Link>
                            <p className="text-xs font-mono text-dark-1/60 leading-relaxed max-w-[200px] uppercase tracking-wide">
                                Educate. Innovate. Connect.<br />
                                Accelerating Web3 adoption at Texas Tech University.
                            </p>
                        </div>
                        <div className="text-xs font-mono text-dark-1/40 uppercase tracking-widest mt-12">
                            SGA Box 43104<br />
                            Lubbock, TX 79409
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-dark-1/10">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-dark-1/40 mb-8">Organization</h4>
                        <ul className="space-y-4 text-sm font-medium text-dark-1">
                            <li><AnimatedLink href="/about">About Us</AnimatedLink></li>
                            <li><AnimatedLink href="/team">Our Team</AnimatedLink></li>
                            <li><AnimatedLink href="/join">Membership</AnimatedLink></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-dark-1/10">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-dark-1/40 mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm font-medium text-dark-1">
                            <li><AnimatedLink href="/projects">Projects</AnimatedLink></li>
                            <li><AnimatedLink href="/learn">Learn Web3</AnimatedLink></li>
                            <li><AnimatedLink href="/events">Events</AnimatedLink></li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA Column */}
                    <div className="p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <h4 className="font-mono text-xs uppercase tracking-widest text-dark-1/40 mb-8">Stay Updated</h4>
                            <div className="space-y-4">
                                <p className="text-xs font-mono text-dark-1/60">
                                    Join our mailing list for updates.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="EMAIL_ADDRESS"
                                        className="bg-transparent border-b border-dark-1/20 py-2 text-sm w-full focus:outline-none focus:border-dark-1 font-mono transition-colors rounded-none placeholder:text-dark-1/30"
                                    />
                                </div>
                                <MagneticButton>
                                    <Button className="w-full rounded-none bg-dark-1 text-light-1 hover:bg-dark-1/90 h-10 font-mono text-xs uppercase tracking-widest">
                                        Subscribe
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-l border-r border-b border-dark-1/10 p-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-dark-1/40 bg-light-1">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        © Made by <Link href="https://www.linkedin.com/in/kushwaha-amar/" target="_blank" className="hover:text-dark-1 transition-colors underline decoration-1 underline-offset-2">Amar</Link> | 2026 WAA. All rights reserved.
                    </motion.p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-dark-1 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-dark-1 transition-colors">Terms of Service</Link>
                        <span className="hidden md:inline">v2.0.0 (ARCHITECT)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
