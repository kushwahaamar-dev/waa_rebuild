import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-1">Upcoming Events</h1>
                <p className="text-xl text-dark-1/60 font-sans max-w-2xl">
                    Join us at our upcoming workshops, speaker sessions, and hackathons.
                </p>
            </div>

            {/* Luma Embed Section */}
            <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-20">
                <div className="bg-white rounded-2xl border border-dark-1/10 overflow-hidden shadow-sm min-h-[600px] relative">
                    {/* Luma Iframe */}
                    <iframe
                        src="https://lu.ma/embed/calendar/cal-NMz1EFCa5I7aJ8w" // Used a placeholder/example ID. The user needs to swap this.
                        className="w-full h-[800px] border-none"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex={0}
                    ></iframe>

                    {/* Fallback / Overlay if needed */}
                    <div className="absolute top-4 right-4 z-10">
                        <Link href="https://luma.com/user/WAA" target="_blank">
                            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white">
                                Open in Luma <ExternalLink className="ml-2 w-3 h-3" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-dark-1/40 text-sm">
                        If the calendar is not loading, please <Link href="https://luma.com/user/WAA" className="underline hover:text-dark-1">click here</Link> to view our events on Luma.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
