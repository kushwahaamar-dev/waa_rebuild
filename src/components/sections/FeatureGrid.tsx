"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, GraduationCap, Trophy, Rocket, Zap } from "lucide-react";
import { AsciiIsometricBuild, AsciiGlobe, AsciiFluxCard, AsciiCollegeXYZ } from "@/components/AsciiAnimations";
import { cn } from "@/lib/utils";

export function FeatureGrid() {
    return (
        <section className="py-24 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            {/* Asymmetric Bento Grid - 6 columns for more flexibility */}
            <div className="grid grid-cols-1 md:grid-cols-6 border-t border-l border-dark-1/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">

                {/* Row 1: college.xyz - Wide card with logo at TOP */}
                <Link
                    href="https://www.college.xyz/"
                    target="_blank"
                    className={cn(
                        "group relative p-8 md:p-10 border-r border-b border-dark-1/10 transition-all duration-300",
                        "hover:bg-dark-1 hover:text-light-1 dark:hover:bg-light-1 dark:hover:text-dark-1 overflow-hidden bg-grid-pattern",
                        "md:col-span-6 min-h-[280px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                    )}
                >
                    {/* Left: Logo and Content */}
                    <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-dark-1/5 dark:bg-light-1/5 group-hover:bg-light-1/10 dark:group-hover:bg-dark-1/10 flex items-center justify-center transition-colors">
                                <Rocket className="w-5 h-5" />
                            </div>
                            {/* college.xyz pixel-style logo */}
                            <Image
                                src="/images/collegexyz-logo.png"
                                alt="college.xyz"
                                width={120}
                                height={32}
                                className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 dark:invert group-hover:dark:invert-0 transition-all"
                            />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            Bridging Talent & Industry
                        </h3>
                        <p className="text-sm font-mono opacity-60 max-w-md">
                            501(c)(3) nonprofit connecting students with Web3. Resources, bounties, career pathways, and conference subsidies.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <span className="text-xs font-mono opacity-40 uppercase tracking-wider">Partners:</span>
                            <span className="text-xs font-mono opacity-60">Solana • Coinbase • Galaxy • Avalanche • ETH Foundation</span>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-mono opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                            JOIN NETWORK <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                    </div>

                    {/* Right: ASCII Animation */}
                    <div className="absolute right-4 md:right-12 bottom-4 md:top-1/2 md:-translate-y-1/2 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-300">
                        <div className="text-dark-1/15 group-hover:text-light-1/20 dark:text-light-1/15 dark:group-hover:text-dark-1/20">
                            <AsciiCollegeXYZ className="scale-[1.8] md:scale-[2.5]" />
                        </div>
                    </div>
                </Link>

                {/* Row 2: MBC Conference - Large hero card with logo */}
                <Link
                    href="https://www.midwestblockchain.org/"
                    target="_blank"
                    className={cn(
                        "group relative p-8 md:p-12 border-r border-b border-dark-1/10 transition-all duration-300",
                        "hover:bg-dark-1 hover:text-light-1 dark:hover:bg-light-1 dark:hover:text-dark-1 overflow-hidden bg-grid-pattern",
                        "flex flex-col justify-between",
                        "md:col-span-4 lg:row-span-2 min-h-[350px] lg:min-h-[450px]"
                    )}
                >
                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-dark-1 group-hover:text-light-1 dark:group-hover:text-dark-1 transition-colors">
                                <Trophy className="w-5 h-5" />
                            </div>
                            {/* MBC Logo */}
                            <Image
                                src="/images/mbc-logo.webp"
                                alt="Midwest Blockchain Consortium"
                                width={140}
                                height={40}
                                className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 dark:invert group-hover:dark:invert-0 transition-all"
                            />
                        </div>
                        <h3 className="text-2xl font-serif mb-3 leading-tight">MBC Conference</h3>
                        <p className="text-sm font-mono opacity-60 max-w-xs">Midwest Blockchain Consortium. Connecting blockchain innovators across the region.</p>
                    </div>

                    {/* Action */}
                    <div className="mt-8 flex items-center text-sm font-mono opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                        EXPLORE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>

                    {/* ASCII Background */}
                    <div className="absolute right-4 bottom-4 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-300">
                        <div className="text-dark-1/10 group-hover:text-light-1/10 dark:text-light-1/10 dark:group-hover:text-dark-1/10">
                            <AsciiIsometricBuild className="scale-[4] opacity-100 lg:opacity-40 lg:group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    </div>
                </Link>

                {/* Row 2 Right: Web3 Unfolded - Stacked vertically */}
                <FeatureCard
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Web3 Unfolded"
                    description="Curated curriculum. From zero to shipped dApp."
                    href="/learn"
                    className="md:col-span-2 min-h-[200px]"
                    ascii={<AsciiGlobe className="scale-[2] opacity-80 lg:opacity-30 lg:group-hover:opacity-80 transition-opacity duration-700" />}
                />

                {/* Row 2 Right Bottom: Digital Membership - Full ASCII coverage */}
                <Link
                    href="/join"
                    className={cn(
                        "group relative p-8 md:p-12 border-r border-b border-dark-1/10 transition-all duration-300",
                        "hover:bg-dark-1 hover:text-light-1 dark:hover:bg-light-1 dark:hover:text-dark-1 overflow-hidden bg-grid-pattern",
                        "flex flex-col justify-between",
                        "md:col-span-2 min-h-[200px]"
                    )}
                >
                    {/* ASCII Background - Full coverage */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-300">
                        <div className="text-dark-1/10 group-hover:text-light-1/10 dark:text-light-1/10 dark:group-hover:text-dark-1/10">
                            <AsciiFluxCard className="scale-[3] md:scale-[4] opacity-100 lg:opacity-40 lg:group-hover:opacity-70 transition-opacity duration-700" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="mb-6 text-dark-1 group-hover:text-light-1 dark:group-hover:text-dark-1 transition-colors">
                            <Box className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-serif mb-3 leading-tight">Digital Membership</h3>
                        <p className="text-sm font-mono opacity-60 max-w-xs">Exclusive NFT access. Crafted by student artists.</p>
                    </div>

                    {/* Action */}
                    <div className="mt-8 flex items-center text-sm font-mono opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                        EXPLORE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                </Link>
            </div>
        </section>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    href,
    className,
    ascii
}: {
    icon: React.ReactNode,
    title: string,
    description: string,
    href: string,
    className?: string,
    ascii?: React.ReactNode
}) {
    const isExternal = href.startsWith('http');

    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            className={cn(
                "group relative p-8 md:p-12 border-r border-b border-dark-1/10 transition-all duration-300",
                "hover:bg-dark-1 hover:text-light-1 dark:hover:bg-light-1 dark:hover:text-dark-1 overflow-hidden bg-grid-pattern",
                "flex flex-col justify-between",
                className
            )}
        >
            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6 text-dark-1 group-hover:text-light-1 dark:group-hover:text-dark-1 transition-colors">
                    {icon}
                </div>
                <h3 className="text-2xl font-serif mb-3 leading-tight">{title}</h3>
                <p className="text-sm font-mono opacity-60 max-w-xs">{description}</p>
            </div>

            {/* Action */}
            <div className="mt-8 flex items-center text-sm font-mono opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                EXPLORE <ArrowRight className="ml-2 w-4 h-4" />
            </div>

            {/* ASCII Background */}
            <div className="absolute right-4 bottom-4 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-300">
                <div className="text-dark-1/10 group-hover:text-light-1/10 dark:text-light-1/10 dark:group-hover:text-dark-1/10">
                    {ascii}
                </div>
            </div>
        </Link>
    );
}

