"use client"

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Flame, Gem, Heart, Lightbulb, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { TerminalTyping, AsciiNetwork, AsciiRocket } from "@/components/AsciiAnimations";

export default function JoinPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-dark-1/20 text-dark-1/60 rounded-full font-sans">
                            Community First
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-1">Join the Movement</h1>
                        <p className="text-xl md:text-2xl text-dark-1/60 font-sans max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-8">
                            Everyone is welcome to join, learn, and play a role in shaping the future of Web3 with us.
                        </p>

                        {/* Terminal Typing Effect */}
                        <div className="bg-dark-1/5 rounded-xl p-6 border border-dark-1/10">
                            <TerminalTyping
                                lines={[
                                    "Checking eligibility...",
                                    "Location: Texas Tech ✓",
                                    "Interest: Web3 ✓",
                                    "Status: Welcome aboard!"
                                ]}
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                        <AsciiNetwork className="scale-150" />
                    </div>
                </div>
            </div>

            {/* Tracks: New vs Existing */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* New to Web3 */}
                    <Card className="border-dark-1/10 bg-white dark:bg-white/5 shadow-sm hover:border-dark-1/20 transition-all overflow-hidden relative group">
                        {/* Rocket positioned in corner */}
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
                            <AsciiRocket />
                        </div>
                        <CardHeader>
                            <div className="w-12 h-12 bg-dark-1/5 rounded-full flex items-center justify-center mb-4 text-dark-1">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <CardTitle className="font-serif text-3xl">New to Web3?</CardTitle>
                            <CardDescription className="text-lg mt-2 font-sans">
                                Curious but don&apos;t know where to start? We&apos;ll guide you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-dark-1/70 leading-relaxed font-sans">
                                By completing our interest form, we&apos;ll connect with you directly to provide guidance or direct you to our workshops. No prior knowledge required.
                            </p>
                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfXRPB0qqfE7RiOcstA8M2WDxG4ywcBD8AWcj7ennHVkDISXA/viewform" target="_blank">
                                <Button className="w-full rounded-full py-6 text-base bg-dark-1 text-light-1 hover:bg-dark-1/90 transition-transform group-hover:scale-[1.02]">
                                    Fill Interest Form
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Web3 Native */}
                    <Card className="border-dark-1/10 bg-white dark:bg-white/5 shadow-sm hover:border-dark-1/20 transition-all overflow-hidden relative group">
                        <CardHeader>
                            <div className="w-12 h-12 bg-dark-1/5 rounded-full flex items-center justify-center mb-4 text-dark-1">
                                <Gem className="w-6 h-6" />
                            </div>
                            <CardTitle className="font-serif text-3xl">Familiar to Web3?</CardTitle>
                            <CardDescription className="text-lg mt-2 font-sans">
                                Ready to contribute? Mint our membership NFT.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-dark-1/70 leading-relaxed font-sans">
                                For those well-versed in Web3, you can show your support by minting our exclusive open edition NFT. To explore the benefits and opportunities this membership brings, simply click below.
                            </p>
                            <Link href="https://manifold.xyz/@waa/id/4147314928" target="_blank">
                                <Button variant="outline" className="w-full rounded-full py-6 text-base border-dark-1 text-dark-1 hover:bg-dark-1 hover:text-light-1">
                                    Mint Our NFT
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Digital Membership Detail */}
            <section className="bg-white dark:bg-white/5 border-y border-dark-1/5 py-24 mb-24">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-dark-1">Digital Membership: Semesters 4 & 5</h2>
                        <div className="space-y-6 text-lg text-dark-1/70 font-sans leading-relaxed">
                            <p>
                                Our digital membership is a blend of art and utility. Each semester, we collaborate with a new artist to create an exclusive NFT.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="bg-dark-1/5 p-1 rounded-full mr-3 mt-1"><Users className="w-4 h-4 text-dark-1" /></span>
                                    <span><strong>Community Access:</strong> Verify your involvement and join exclusive channels.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-dark-1/5 p-1 rounded-full mr-3 mt-1"><Flame className="w-4 h-4 text-dark-1" /></span>
                                    <span><strong>Burn Mechanics:</strong> Burn multiple memberships later for special rewards.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-dark-1/5 p-1 rounded-full mr-3 mt-1"><Gem className="w-4 h-4 text-dark-1" /></span>
                                    <span><strong>Collectibility:</strong> Open editions available for anyone to mint in any quantity.</span>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <p className="text-sm text-dark-1/50">Designed by <strong>Damariscosss</strong> • Price: ~$20 (Crypto accepted)</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/3] bg-dark-1/5 rounded-2xl overflow-hidden flex items-center justify-center border border-dark-1/10 shadow-sm">
                        <video
                            src="/videos/nft-preview.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Support Sections */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Innovate */}
                    <div className="bg-white dark:bg-white/5 border border-dark-1/10 text-dark-1 rounded-3xl p-8 md:p-12">
                        <Lightbulb className="w-10 h-10 mb-6 text-dark-1" />
                        <h3 className="text-3xl font-serif mb-4">Innovate with WAA</h3>
                        <p className="text-dark-1/70 mb-8 leading-relaxed font-sans">
                            We&apos;re always seeking collaboration with forward-thinking individuals, organizations, and companies. Whether you&apos;re a fellow innovator in the Web3 space or bring a unique set of skills from another domain, your support is invaluable.
                        </p>
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScxeqNQcjTNAS15EsA1wSoLC5lK1y68mYtRtsxSaaQe_E--lA/viewform" target="_blank">
                            <Button variant="outline" className="rounded-full border-dark-1 text-dark-1 hover:bg-dark-1 hover:text-light-1">
                                BUIDL With Us <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Donate */}
                    <div className="bg-dark-1 text-light-1 rounded-3xl p-8 md:p-12">
                        <Heart className="w-10 h-10 mb-6 text-light-1" />
                        <h3 className="text-3xl font-serif mb-4">Donate to WAA</h3>
                        <p className="text-light-1/70 mb-8 leading-relaxed font-sans">
                            As a nonprofit, WAA greatly values your support. If your looking into doing more than mininting our nft we are open to bigger donations through things like crypto and of course we accept other forms.
                        </p>
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfrmQAS9TV810ER8BOk-Z34Bv-aSL78ZCrOmDu3f5j94rc9AQ/viewform" target="_blank">
                            <Button variant="secondary" className="rounded-full bg-light-1 text-dark-1 hover:bg-light-1/90">
                                Support With Crypto <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full mb-32">
                <h2 className="text-4xl font-serif text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-medium">What is a Digital Membership?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            A Digital Membership is a digital token that represents your membership in our club. It&apos;s a blockchain-based asset that offers unique benefits to our ecosystem and is also an awesome piece of digital art created by various artists each semester.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-medium">Why a Digital Membership?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            Our digital membership offers a unique advantage over traditional memberships. Instead of intangible benefits that end, each membership is a collectible digital asset. It provides lasting proof of your involvement and enduring value.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-medium">How do I purchase one?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            You&apos;ll need a digital wallet compatible with our platform. Once set up and funded, connect it to our purchase page and follow the instructions. We have workshops if you need help!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-medium">How much is it?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            The cost is set at $20. We accept payment in various cryptocurrencies, equivalent to $20 at the current exchange rate.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-lg font-medium">Can I own more than one?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            Yes! Each membership serves as a unique token for a semester. HODLing multiple may be important for burning mechanics later.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="text-lg font-medium">Does it expire?</AccordionTrigger>
                        <AccordionContent className="text-dark-1/70 leading-relaxed">
                            Membership validity is for the semester it&apos;s issued. However, as a piece of digital art, it never expires and remains a collectible in your wallet forever.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            <Footer />
        </main >
    );
}
