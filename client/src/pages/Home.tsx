import { useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import TechHighlightsSection from "@/components/sections/tech-highlights-section";
import FeaturesSection from "@/components/sections/features-section";
import BenefitsSection from "@/components/sections/benefits-section";
import DualWaitlistSection from "@/components/sections/dual-waitlist-section";
import FAQSection from "@/components/sections/faq-section";
import TechnologySection from "@/components/sections/technology-section";
import WhyItMattersSection from "@/components/sections/why-it-matters-section";
import BlockchainVisualizationSection from "@/components/sections/blockchain-visualization-section";
import TechStackDemoSection from "@/components/sections/tech-stack-demo-section";


export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Set focus for accessibility
      ref.current.focus();
    }
  };
  
  return (
    <div className="min-h-screen gradient-background">
      {/* Skip to content link - hidden but available for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to content
      </a>
      
      <Header 
        onFeatureClick={() => scrollToRef(featuresRef)}
        onBenefitsClick={() => scrollToRef(benefitsRef)}
        onTechnologyClick={() => scrollToRef(technologyRef)}
        onWaitlistClick={() => scrollToRef(waitlistRef)}
        onFaqClick={() => scrollToRef(faqRef)}
      />
      
      <main className="pt-16 md:pt-20" id="main-content" tabIndex={-1}>
        <HeroSection 
          onExploreClick={() => scrollToRef(featuresRef)}
          onJoinClick={() => scrollToRef(waitlistRef)}
        />
        
        <TechHighlightsSection 
          onExploreClick={() => scrollToRef(technologyRef)}
        />
        
        <div 
          id="features" 
          ref={featuresRef} 
          tabIndex={-1}
          className="scroll-mt-20" // Offset for fixed header
        >
          <FeaturesSection />
        </div>
        
        <div 
          id="benefits" 
          ref={benefitsRef} 
          tabIndex={-1}
          className="scroll-mt-20" // Offset for fixed header
        >
          <BenefitsSection />
        </div>
        
        <div 
          id="technology" 
          ref={technologyRef} 
          tabIndex={-1}
          className="scroll-mt-20" // Offset for fixed header
        >
          <TechnologySection />
        </div>
        
        <BlockchainVisualizationSection />
        
        <TechStackDemoSection />
        
        <WhyItMattersSection />
        
        <div 
          id="waitlist" 
          ref={waitlistRef} 
          tabIndex={-1}
          className="scroll-mt-20" // Offset for fixed header
        >
          <DualWaitlistSection />
        </div>
        
        <div 
          id="faq" 
          ref={faqRef} 
          tabIndex={-1}
          className="scroll-mt-20" // Offset for fixed header
        >
          <FAQSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
