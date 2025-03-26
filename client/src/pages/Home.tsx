import { useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import TechHighlightsSection from "@/components/sections/tech-highlights-section";
import FeaturesSection from "@/components/sections/features-section";
import BenefitsSection from "@/components/sections/benefits-section";
import WaitlistSection from "@/components/sections/waitlist-section";
import FAQSection from "@/components/sections/faq-section";
import TechnologySection from "@/components/sections/technology-section";
import WhyItMattersSection from "@/components/sections/why-it-matters-section";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

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
        onTechnologyClick={() => scrollToRef(technologyRef)}
        onWaitlistClick={() => scrollToRef(waitlistRef)}
        onFaqClick={() => scrollToRef(faqRef)}
      />
      <main>
        <HeroSection 
          onExploreClick={() => scrollToRef(featuresRef)}
          onJoinClick={() => scrollToRef(waitlistRef)}
        />
        <TechHighlightsSection 
          onExploreClick={() => scrollToRef(technologyRef)}
        />
        <div id="features" ref={featuresRef}>
          <FeaturesSection />
        </div>
        <div id="benefits" ref={benefitsRef}>
          <BenefitsSection />
        </div>
        <div id="technology" ref={technologyRef}>
          <TechnologySection />
        </div>
        <WhyItMattersSection />
        <div id="waitlist" ref={waitlistRef}>
          <WaitlistSection />
        </div>
        <div id="faq" ref={faqRef}>
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
