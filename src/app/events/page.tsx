"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { POAPCard } from "@/components/events/POAPCard";
import { poapEvents, getYears, getEventsByYear, getTotalCollectors } from "@/data/poap-events";
import { ExternalLink, Calendar, Sparkles, Users, Award, TrendingUp } from "lucide-react";
import { AsciiPOAPBadge, AsciiCommunity } from "@/components/AsciiAnimations";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = 'upcoming' | 'past';

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('upcoming');
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

    const years = getYears();
    const filteredEvents = selectedYear === 'all'
        ? poapEvents
        : getEventsByYear(selectedYear);

    const totalCollectors = getTotalCollectors();
    const totalEvents = poapEvents.length;

    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
                {/* ASCII Decorations - Thematic to Events */}
                <div className="absolute top-24 right-4 hidden lg:block opacity-35">
                    <AsciiPOAPBadge />
                </div>
                <div className="absolute bottom-4 right-20 hidden xl:block opacity-30">
                    <AsciiCommunity />
                </div>
                <div className="max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-dark-1/5 border border-dark-1/10 text-dark-1/70 rounded-full text-sm font-mono mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        {totalEvents} Events Hosted
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif mb-6 text-dark-1"
                    >
                        Events & <span className="italic">Memories</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dark-1/60 font-sans max-w-2xl"
                    >
                        Join us at upcoming workshops and sessions, or explore our past events preserved forever on-chain as POAPs.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center gap-6 md:gap-10 mt-10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-dark-1/5 border border-dark-1/10 flex items-center justify-center">
                                <Award className="w-5 h-5 text-dark-1/60" />
                            </div>
                            <div>
                                <div className="text-2xl font-serif text-dark-1">{totalEvents}</div>
                                <div className="text-xs font-mono text-dark-1/40 uppercase tracking-wider">POAPs</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-dark-1/5 border border-dark-1/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-dark-1/60" />
                            </div>
                            <div>
                                <div className="text-2xl font-serif text-dark-1">{totalCollectors.toLocaleString()}</div>
                                <div className="text-xs font-mono text-dark-1/40 uppercase tracking-wider">Collectors</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-dark-1/5 border border-dark-1/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-dark-1/60" />
                            </div>
                            <div>
                                <div className="text-2xl font-serif text-dark-1">{years.length}</div>
                                <div className="text-xs font-mono text-dark-1/40 uppercase tracking-wider">Years</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="sticky top-16 z-40 bg-light-1/80 backdrop-blur-xl border-y border-dark-1/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            {[
                                { id: 'upcoming' as Tab, label: 'Upcoming Events', icon: Calendar },
                                { id: 'past' as Tab, label: 'Past POAPs', icon: Award },
                            ].map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                        ? 'text-light-1'
                                        : 'text-dark-1/60 hover:text-dark-1'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-dark-1 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Year Filter (only for past events) */}
                        <AnimatePresence>
                            {activeTab === 'past' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center gap-2 flex-wrap"
                                >
                                    <span className="text-xs font-mono text-dark-1/40 uppercase tracking-wider mr-2">Year:</span>
                                    {['all', ...years].map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year as number | 'all')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${selectedYear === year
                                                ? 'bg-dark-1 text-light-1'
                                                : 'bg-dark-1/5 text-dark-1/60 hover:bg-dark-1/10'
                                                }`}
                                        >
                                            {year === 'all' ? 'All' : year}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'upcoming' ? (
                        <motion.div
                            key="upcoming"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Luma Embed */}
                            <div className="bg-white rounded-2xl border border-dark-1/10 overflow-hidden shadow-sm min-h-[600px] relative">
                                <iframe
                                    src="https://lu.ma/embed/calendar/cal-G1ZxPHJzz4H3U2C/events"
                                    className="w-full h-[800px] border-none"
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex={0}
                                ></iframe>

                                <div className="absolute top-4 right-4 z-10">
                                    <Link href="https://lu.ma/user/WAA" target="_blank">
                                        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white">
                                            Open in Luma <ExternalLink className="ml-2 w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-dark-1/40 text-sm">
                                    If the calendar is not loading, please{" "}
                                    <Link href="https://lu.ma/user/WAA" className="underline hover:text-dark-1" target="_blank">
                                        click here
                                    </Link>{" "}
                                    to view our events on Luma.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="past"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Collection Link Banner */}
                            <div className="mb-10 p-6 bg-white rounded-2xl border border-dark-1/10">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-dark-1/5 border border-dark-1/10 flex items-center justify-center">
                                            <Award className="w-6 h-6 text-dark-1/60" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg text-dark-1">Texas Tech Blockchain Club Collection</h3>
                                            <p className="text-sm text-dark-1/50">These POAPs recognize the real OGs showing up and making moves!</p>
                                        </div>
                                    </div>
                                    <Link href="https://collections.poap.xyz/collections/texas-tech-blockchain-club/5371" target="_blank">
                                        <Button className="rounded-xl whitespace-nowrap">
                                            View Full Collection <ExternalLink className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* POAP Grid - Visual Gallery */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                                {filteredEvents.map((event, index) => (
                                    <POAPCard key={event.id} event={event} index={index} />
                                ))}
                            </div>

                            {filteredEvents.length === 0 && (
                                <div className="text-center py-24 text-dark-1/40">
                                    <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <p className="font-mono">No events found for this year.</p>
                                </div>
                            )}

                            {/* Bottom CTA */}
                            <div className="mt-16 text-center">
                                <p className="text-sm text-dark-1/40 mb-4">
                                    Want to see the full collection with all artwork?
                                </p>
                                <Link href="https://collections.poap.xyz/collections/texas-tech-blockchain-club/5371" target="_blank">
                                    <Button variant="outline" className="rounded-xl">
                                        Open POAP Collection <ExternalLink className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Footer />
        </main>
    );
}
