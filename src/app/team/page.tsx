import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TeamGrid } from "@/components/TeamGrid";
import { TerminalTyping } from "@/components/AsciiAnimations";

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 text-dark-1">Meet the Team</h1>
                <div className="max-w-md mx-auto h-24 flex items-center justify-center">
                    <TerminalTyping
                        lines={[
                            "Initializing team_sequence...",
                            "Loading developers...",
                            "The Red Raiders Behind WAA."
                        ]}
                        className="text-base text-dark-1/60"
                    />
                </div>
            </div>

            {/* Team Grid */}
            <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24">
                <TeamGrid />
            </div>

            <Footer />
        </main>
    );
}
