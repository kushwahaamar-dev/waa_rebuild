"use client"

import Link from "next/link";
import { ArrowRight, Box, GraduationCap, Trophy } from "lucide-react";
import { AsciiIsometricBuild, AsciiGlobe, AsciiFluxCard } from "@/components/AsciiAnimations";
import { cn } from "@/lib/utils";

export function FeatureGrid() {
    return (
        <section className="py-24 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-dark-1/10 bg-white">
                {/* Feature 1 - N3XUS */}
                <FeatureCard
                    icon={<Trophy className="w-5 h-5" />}
                    title="N3XUS Buildathon"
                    description="11-week inter-college buildathon. Onboarding the next generation of builders."
                    href="https://app.buidlbox.io/ttu-waa/n3xus/overview"
                    className="lg:col-span-2 lg:row-span-2 min-h-[400px]"
                    ascii={<AsciiIsometricBuild className="scale-[3.5] opacity-100 lg:opacity-40 lg:group-hover:opacity-100 transition-opacity duration-700" />}
                />

                {/* Feature 2 - Learn */}
                <FeatureCard
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Web3 Unfolded"
                    description="Curated curriculum. From zero to shipped dApp."
                    href="/learn"
                    ascii={<AsciiGlobe className="scale-[2.5] opacity-80 lg:opacity-30 lg:group-hover:opacity-80 transition-opacity duration-700" />}
                />

                {/* Feature 3 - Membership */}
                <FeatureCard
                    icon={<Box className="w-5 h-5" />}
                    title="Digital Membership"
                    description="Exclusive NFT access. Crafted by student artists."
                    href="/join"
                    ascii={<AsciiFluxCard className="scale-[2.5] opacity-80 lg:opacity-30 lg:group-hover:opacity-80 transition-opacity duration-700" />}
                />
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
    return (
        <Link href={href} className={cn(
            "group relative p-8 md:p-12 border-r border-b border-dark-1/10 transition-all duration-300",
            "hover:bg-dark-1 hover:text-white overflow-hidden bg-grid-pattern",
            "flex flex-col justify-between",
            className
        )}>
            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6 text-dark-1 group-hover:text-white transition-colors">
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
                <div className="text-dark-1/10 group-hover:text-white/10">
                    {ascii}
                </div>
            </div>
        </Link>
    );
}
