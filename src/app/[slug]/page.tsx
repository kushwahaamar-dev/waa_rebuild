import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
    return [
        { slug: "about" },
        { slug: "team" },
        { slug: "events" },
        { slug: "projects" },
        { slug: "learn" },
        { slug: "join" },
    ];
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <main className="min-h-screen bg-light-1 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-8 text-dark-1">{title}</h1>
                <p className="text-xl text-dark-1/60 font-sans max-w-2xl">
                    This page is currently being rebuilt to match our new world-class design standard.
                    Check back soon for updates.
                </p>
            </div>
            <Footer />
        </main>
    );
}
