import { useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import BenefitsSection from "@/components/sections/benefits-section";
import WaitlistSection from "@/components/sections/waitlist-section";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="min-h-screen gradient-background">
      <Header 
        onFeatureClick={() => scrollToRef(featuresRef)}
        onBenefitsClick={() => scrollToRef(benefitsRef)}
        onWaitlistClick={() => scrollToRef(waitlistRef)}
      />
      <main>
        <HeroSection 
          onExploreClick={() => scrollToRef(featuresRef)}
          onJoinClick={() => scrollToRef(waitlistRef)}
        />
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        <div ref={benefitsRef}>
          <BenefitsSection />
        </div>
        <div ref={waitlistRef}>
          <WaitlistSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
