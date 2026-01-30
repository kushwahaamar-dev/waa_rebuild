import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-light-1 selection:bg-purple-500/30 selection:text-purple-900">
      <Navbar />
      <Hero />

      <div className="border-t border-dark-1/5">
        <FeatureGrid />
      </div>

      <CTASection />

      <Footer />
    </main>
  );
}

