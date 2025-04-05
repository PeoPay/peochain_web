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
import ProblemSolutionSection from "@/components/sections/problem-solution-section";
import TechnicalFeaturesSection from "@/components/sections/technical-features-section";
import PerformanceComparisonSection from "@/components/sections/performance-comparison-section";
import TokenomicsSection from "@/components/sections/tokenomics-section";
import RoadmapSection from "@/components/sections/roadmap-section";
import CommunitySection from "@/components/sections/community-section";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

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
      <main className="pt-16 md:pt-20">
        {/* Hero Banner */}
        <HeroSection 
          onExploreClick={() => scrollToRef(featuresRef)}
          onJoinClick={() => scrollToRef(waitlistRef)}
        />

        {/* Core Values - Blockchain Trilemma Resolution */}
        <TechHighlightsSection 
          onExploreClick={() => scrollToRef(technologyRef)}
        />

        {/* Problem-Solution Section with interactive cards */}
        <ProblemSolutionSection />

        {/* Features & Benefits */}
        <div id="features" ref={featuresRef}>
          <FeaturesSection />
        </div>
        <div id="benefits" ref={benefitsRef}>
          <BenefitsSection />
        </div>

        {/* Technical Overview Sections */}
        <div id="technology" ref={technologyRef}>
          <TechnologySection />
        </div>
        <TechnicalFeaturesSection />
        
        {/* Interactive Visualizations */}
        <BlockchainVisualizationSection />
        <TechStackDemoSection />
        
        {/* Performance Comparison */}
        <PerformanceComparisonSection />
        
        {/* Tokenomics / Economic Model */}
        <TokenomicsSection />
        
        {/* Why It Matters - Value Proposition */}
        <WhyItMattersSection />
        
        {/* Roadmap */}
        <div id="roadmap" ref={roadmapRef}>
          <RoadmapSection />
        </div>
        
        {/* Community & Social Proof */}
        <div id="community" ref={communityRef}>
          <CommunitySection />
        </div>
        
        {/* FAQ Section */}
        <div id="faq" ref={faqRef}>
          <FAQSection />
        </div>
        
        {/* Waitlist/CTA Section */}
        <div id="waitlist" ref={waitlistRef}>
          <DualWaitlistSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
