import { Navigation } from "@/app/components/landing/Navigation";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { FeaturesSection } from "@/app/components/landing/FeaturesSection";
import { CTASection } from "@/app/components/landing/CTASection";
import { Footer } from "@/app/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
