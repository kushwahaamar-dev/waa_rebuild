import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { AsciiNetwork, AsciiChain } from "@/components/AsciiAnimations";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />

            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* Intro */}
                <section className="mb-24 text-center max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-dark-1/20 text-dark-1/60 rounded-full font-sans">
                        About WAA
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 text-dark-1 leading-tight">
                        Embrace the <span className="italic">Future.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-dark-1/70 font-sans leading-relaxed">
                        Web3 Acceleration Association is a student-led nonprofit built out of Texas Tech University, focusing on the exploration and expansion of Web3 technologies.
                    </p>

                    {/* ASCII Blockchain Chain Animation */}
                    <div className="mt-12 flex justify-center overflow-x-auto">
                        <AsciiChain blocks={5} />
                    </div>
                </section>

                {/* Mission */}
                <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="aspect-square bg-dark-1/5 rounded-2xl flex items-center justify-center overflow-hidden relative border border-dark-1/10 shadow-sm">
                            <AsciiNetwork className="scale-150" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <h2 className="text-4xl font-serif text-dark-1">Our Mission</h2>
                        <div className="w-20 h-1 bg-dark-1"></div>
                        <p className="text-xl text-dark-1/70 leading-relaxed font-sans">
                            Is to provide knowledge about all things Web3, from AI to blockchain while also fostering an innovative approach, and connecting members with opportunities in the Web3 sector.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Badge className="bg-dark-1/10 hover:bg-dark-1/20 text-dark-1 px-4 py-2 text-sm">Educate</Badge>
                            <Badge className="bg-dark-1/10 hover:bg-dark-1/20 text-dark-1 px-4 py-2 text-sm">Innovate</Badge>
                            <Badge className="bg-dark-1/10 hover:bg-dark-1/20 text-dark-1 px-4 py-2 text-sm">Connect</Badge>
                        </div>
                    </div>
                </section>

                {/* Info Grid */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white border border-dark-1/10 rounded-2xl p-12 shadow-sm">
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Location</h3>
                            <p className="text-dark-1/60 font-sans">Texas Tech University<br />Lubbock, TX</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Type</h3>
                            <p className="text-dark-1/60 font-sans">Student-led Nonprofit</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Mascot</h3>
                            <p className="text-dark-1/60 font-sans">Red Raiders</p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
