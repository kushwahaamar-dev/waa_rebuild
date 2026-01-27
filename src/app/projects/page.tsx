"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Trophy } from "lucide-react";
import Link from "next/link";
import { AsciiCube } from "@/components/AsciiAnimations";

const projects = [
    {
        title: "N3XUS",
        description: "An 11-week inter-college buildathon onboarding students into Web3 and highlighting the need for blockchain education in universities.",
        link: "https://app.buidlbox.io/ttu-waa/n3xus/overview",
        tags: ["Buildathon", "Education"],
        image: "/images/projects/project-1.png",
        featured: true
    },
    {
        title: "AMA Mini-App (Farcaster)",
        description: "A Farcaster AMA mini-app where fans send anonymous questions to creators, who can reply in public threads.",
        creator: "Laksh",
        link: "https://farcaster.xyz/miniapps/mfGsIEm7lz4F/ama",
        image: "/images/projects/project-2.jpg",
        tags: ["Farcaster", "Social"]
    },
    {
        title: "WAA NFT Collection",
        description: "An NFT collection designed by every board member who has ever been a part of WAA.",
        link: "https://magiceden.io/collections/base/0x3e495e2341773af7aebe481a5cdff2705e07226c",
        image: "/images/projects/project-3.jpg",
        tags: ["NFT", "Art"]
    },
    {
        title: "Web3 Keychain",
        description: "A Web3 version of Apple's Keychain, earning an honorable mention prize at Consensus 2024.",
        image: "/images/projects/project-4.png",
        tags: ["Hackathon", "Security", "Consensus"]
    },
    {
        title: "Decentralized Education Platform",
        description: "A platform that transforms self-taught learning into verifiable proof — built for the future of decentralized education.",
        link: "https://arena.colosseum.org/hackathon/project",
        image: "/images/projects/project-5.png",
        tags: ["EdTech", "Solana"]
    },
    {
        title: "WAP (Women in Web3)",
        description: "A WAA sub-chapter focused on empowering women in their Web3 journey.",
        link: "https://x.com/wap_waa",
        tags: ["Community", "Diversity"],
        image: "/images/projects/project-6.png"
    },
    {
        title: "Eth GPT AI Bot",
        description: "An Eth A.I. designed to answer questions about Eth.",
        creator: "J.T. Duchamp",
        link: "http://t.me/Eth_GPT_AI_BOT",
        tags: ["AI", "Ethereum", "Telegram"]
    },
    {
        title: "Campus Art Web3 Experience",
        description: "A student-led project transforming campus art into an immersive web3 experience!",
        tags: ["AR/VR", "Art"]
    },
    {
        title: "TruCritic",
        description: "A Solana Colosseum Hackathon project!",
        creator: "Jerry Chen & Ezven Galarraga",
        tags: ["Solana", "Hackathon"]
    },
    {
        title: "Cast Aloud",
        description: "A Farcaster mini app helps you read casts aloud and create voice replies with AI assistance.",
        creator: "Ezven",
        link: "https://castaloud.replit.app/",
        tags: ["AI", "Farcaster"]
    }
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Header with ASCII Cube */}
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 text-center lg:text-left">
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-1">What's WAA Cooking?</h1>
                        <p className="text-xl text-dark-1/60 font-sans max-w-2xl mx-auto lg:mx-0">
                            From hackathon wins to community tools, explore what our students are building.
                        </p>
                    </div>
                    <div className="hidden lg:flex justify-center">
                        <AsciiCube size={200} />
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Card key={index} className={`bg-white dark:bg-white/5 border-dark-1/5 hover:border-dark-1/20 transition-all duration-300 group flex flex-col overflow-hidden ${project.featured ? 'md:col-span-2 md:flex-row' : ''}`}>
                            {/* Featured Image or Standard Image */}
                            {project.image ? (
                                <div className={`${project.featured ? 'w-full md:w-1/2 h-64 md:h-auto' : 'w-full h-48'} bg-dark-1/5 relative overflow-hidden border-b md:border-b-0 ${project.featured ? 'md:border-r' : ''} border-dark-1/5`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                project.featured && (
                                    <div className="w-full md:w-1/2 bg-dark-1/5 h-64 md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-dark-1/5">
                                        <Trophy className="w-16 h-16 text-dark-1/20" />
                                    </div>
                                )
                            )}

                            <div className={`p-6 flex flex-col flex-grow ${project.featured ? 'md:w-1/2' : ''}`}>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs font-normal text-dark-1/60 border-dark-1/10">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <CardTitle className="font-serif text-2xl mb-2">{project.title}</CardTitle>
                                <CardDescription className="text-base text-dark-1/70 mb-4 font-sans leading-relaxed flex-grow">
                                    {project.description}
                                </CardDescription>

                                {project.creator && (
                                    <p className="text-xs text-dark-1/40 mb-6 font-sans">
                                        Creator: <span className="text-dark-1/60">{project.creator}</span>
                                    </p>
                                )}

                                <div className="mt-auto">
                                    {project.link ? (
                                        <Link href={project.link} target="_blank">
                                            <Button variant="outline" size="sm" className="rounded-full border-dark-1/20 text-dark-1 hover:bg-dark-1 hover:text-light-1 w-full sm:w-auto">
                                                View Project <ExternalLink className="ml-2 w-3 h-3" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button disabled size="sm" variant="ghost" className="text-dark-1/30 px-0">
                                            Coming Soon
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
