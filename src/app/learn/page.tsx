"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Layers, Trophy } from "lucide-react";
import { MatrixRain, TerminalTyping, AsciiComingSoon } from "@/components/AsciiAnimations";

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Header with Matrix Rain Background */}
            <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
                {/* Matrix Rain Background - More Visible */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <MatrixRain width={100} height={20} />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-dark-1/20 text-dark-1/60 rounded-full font-sans">
                            Web3 Unfolded
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-1">Learn With Us</h1>
                        <p className="text-xl text-dark-1/60 font-sans max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                            A Web3 course curated for students by students. From beginner basics to expert insights, constantly updated.
                        </p>
                    </div>

                    {/* ASCII Terminal */}
                    <div className="hidden lg:block bg-dark-1/5 rounded-xl p-6 border border-dark-1/10">
                        <div className="font-mono text-sm text-dark-1/60 space-y-2">
                            <div className="flex items-center gap-2 text-dark-1/30 text-xs mb-4">
                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                <span className="ml-4">web3-curriculum.sh</span>
                            </div>
                            <TerminalTyping
                                lines={[
                                    "Loading curriculum...",
                                    "Module 1: Blockchain Basics ✓",
                                    "Module 2: Smart Contracts ✓",
                                    "Module 3: DeFi Protocols ✓",
                                    "Ready to learn!"
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-32">
                <div className="space-y-8">
                    {/* Beginner - AVAILABLE */}
                    <div className="bg-white border border-dark-1/10 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-dark-1/20 transition-all">
                        <div className="absolute top-0 left-0 w-1 h-full bg-dark-1/30"></div>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-dark-1/5 rounded-xl flex items-center justify-center text-dark-1/60">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-3xl font-serif text-dark-1">Beginner</h3>
                                    <Badge variant="secondary" className="bg-dark-1/10 text-dark-1 font-normal">Level 1</Badge>
                                </div>
                                <p className="text-dark-1/70 leading-relaxed font-sans mb-6">
                                    Learn the essentials of Web3, from understanding its fundamentals to setting up your first wallet. While also engaging with Ledger Quest, to earn NFTs that may or may not be notable!
                                </p>
                                <Accordion type="single" collapsible className="w-full border-t border-dark-1/5">
                                    <AccordionItem value="modules" className="border-b-0">
                                        <AccordionTrigger className="hover:no-underline py-4 text-dark-1/60 font-medium">View Modules</AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-3 pt-2 text-dark-1/80 font-sans pl-4 list-disc list-outside marker:text-dark-1/30">
                                                <li>Introduction to Blockchain</li>
                                                <li>Setting up a Wallet (Metamask/Phantom)</li>
                                                <li>Understanding Gas & Transactions</li>
                                                <li>Ledger Quest & Safety Basics</li>
                                            </ul>
                                            <a
                                                href="https://www.youtube.com/playlist?list=PLeoccG8rb3GA-q0JW4BoZl_-4AwIn51uw"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-dark-1 text-light-1 rounded-full hover:bg-dark-1/90 transition-colors font-medium"
                                            >
                                                Watch on YouTube →
                                            </a>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    {/* Intermediate - COMING SOON */}
                    <div className="bg-white border border-dark-1/10 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden group opacity-70">
                        <div className="absolute top-0 left-0 w-1 h-full bg-dark-1/20"></div>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-dark-1/5 rounded-xl flex items-center justify-center text-dark-1/40">
                                    <Layers className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-3xl font-serif text-dark-1/60">Intermediate</h3>
                                    <Badge variant="secondary" className="bg-dark-1/5 text-dark-1/40 font-normal">Level 2</Badge>
                                </div>
                                <p className="text-dark-1/50 leading-relaxed font-sans mb-6">
                                    This course takes you beyond the basics, offering a deeper dive into the evolving and dynamic world of Web3, preparing you for more complex concepts and applications.
                                </p>
                                <AsciiComingSoon />
                            </div>
                        </div>
                    </div>

                    {/* Advanced - COMING SOON */}
                    <div className="bg-white border border-dark-1/10 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden group opacity-70">
                        <div className="absolute top-0 left-0 w-1 h-full bg-dark-1/20"></div>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-dark-1/5 rounded-xl flex items-center justify-center text-dark-1/40">
                                    <Trophy className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-3xl font-serif text-dark-1/60">Advanced</h3>
                                    <Badge variant="secondary" className="bg-dark-1/5 text-dark-1/40 font-normal">Level 3</Badge>
                                </div>
                                <p className="text-dark-1/50 leading-relaxed font-sans mb-6">
                                    Tailored for those ready to master the forefront of Web3. Provides an in-depth exploration into the most sophisticated aspects of the technology, equipping you with expertise to lead and innovate.
                                </p>
                                <AsciiComingSoon />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
